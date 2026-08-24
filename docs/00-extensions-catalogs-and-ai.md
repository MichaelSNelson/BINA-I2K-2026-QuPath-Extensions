---
layout: default
title: How QuPath extensions, catalogs, and AI-assisted development work
---

# How extensions, catalogs, and AI-assisted development work

*Read this one first. Everything else in this workshop assumes it.*

QuPath is a desktop application for analysing large 2D images, but almost none of what
we are showing you today lives inside QuPath itself. It lives in **extensions** —
separate, independently released pieces of software that QuPath loads at startup and
that can add menus, toolbar buttons, dialogs, viewers, and entire analysis pipelines.

This page covers three things:

1. What an extension actually *is*, and how you install and update one.
2. What a **catalog** is, and why it is the only sane way to distribute more than one extension.
3. How this suite was built — including, honestly, where a large language model helped and
   where it did not.

---

## 1. What an extension is

A QuPath extension is a single Java **`.jar` file** that you drop into a folder. When
QuPath starts, it scans that folder, finds any jar that declares itself an extension, and
calls into it so the extension can install its menu items and tools.

Concretely, an extension is a class implementing `QuPathExtension`, declared in the jar's
`META-INF/services/` directory so Java's service loader finds it. Everything you see in
QuPath's UI from one of our extensions — a new item under `Extensions >`, a toolbar
button, a preferences category — was registered by that class during startup.

Three consequences follow, and all three will bite you at some point:

**Extensions are not loaded on the fly.** QuPath will happily copy a jar into your
extensions folder when you drag it onto the window, and then *not use it*. You must
**restart QuPath**. Roughly half of all "the menu item isn't there" reports are this.

**Extensions live per QuPath version.** The default extensions folder is version-scoped:

| OS | Default extensions folder |
|---|---|
| Windows | `C:\Users\<you>\QuPath\v0.7\extensions\` |
| macOS | `~/QuPath/v0.7/extensions/` |
| Linux | `~/QuPath/v0.7/extensions/` |

Install QuPath 0.7 alongside 0.6 and you get a *separate* extensions folder. You can see
and change the folder in QuPath at `Extensions > Installed extensions`. If you ever need
to clean house, deleting the jars in that folder is safe and reversible.

**Extensions are compiled against a specific QuPath API.** QuPath's internal API changes
between minor versions. A jar built for 0.5 may throw `NoSuchMethodError` on 0.7 — often
not at startup, but at the moment you click the one menu item that touches the changed
method. This is why every extension declares a *minimum QuPath version*, and why almost
everything in this workshop requires **QuPath 0.7.0 or later**.

> **Workshop requirement:** QuPath **0.7.0+**. Two extensions (Wizard Wand, Polyline
> Wand) also run on 0.6, but do not mix — install 0.7 and use it for everything today.

### Installing one extension, three ways

- **Catalog** (preferred — see below). Updates arrive automatically.
- **Drag and drop.** Drag the `.jar` onto a running QuPath window; accept the offer to
  copy it into your extensions folder; restart.
- **By hand.** Copy the `.jar` into the extensions folder yourself; restart.

Note that our release jars are named `...-all.jar`. That "all" means a **shadow jar** —
the extension plus all of its own dependencies bundled into one file, with conflicting
packages relocated so they cannot collide with QuPath's own copies of the same libraries.
If you download a jar *without* `-all` in the name, it will load and then fail with
`ClassNotFoundException` the moment it needs a dependency. Always take the `-all` jar.

---

## 2. Catalogs: extension distribution that scales

Installing one extension by hand is fine. Installing fourteen by hand, keeping them in
sync across the eight machines in a core facility, and noticing when four of them ship a
bugfix, is not.

A **catalog** solves this. It is a plain `catalog.json` file, published in a public GitHub
repository, that lists a set of extensions and their releases. QuPath's extension manager
reads it, shows you the list, installs what you pick, and tells you when a newer release
is available.

### Adding a catalog

1. In QuPath: `Extensions > Manage extensions`
2. `Manage extension catalogs > Add catalog`
3. Paste the catalog URL and confirm.
4. Pick extensions from the list and click **Install**.
5. **Restart QuPath.**

### The catalog you need

**One catalog covers every hands-on tool in this workshop:**

| Catalog | URL |
|---|---|
| **LOCI QuPath Extensions** | `https://github.com/uw-loci/qupath-catalog-mikenelson` |

> ## ⚠️ Do **not** install everything in it
>
> Adding a catalog does **not** install anything. It shows you a list. **Install only the
> extensions you actually want** — two of them (QP-CAT and the DL Pixel Classifier) each pull
> down a **1.5–2.5 GB** Python environment on first use, and installing them by accident is the
> single fastest way to ruin your morning on conference wifi.
>
> Pick individual tools from the **[extension index](extensions.md)**, or follow the
> **[setup guide](setup.md)** for exactly what each hands-on track needs.

There is a second LOCI catalog — **QPSC Microscope Extensions**
(`https://github.com/uw-loci/qupath-catalog-qpsc`) — carrying the microscope-control stack.
**You do not need it for this workshop.** The two tools from it that need no hardware, OCR for
Labels and Tiles to Pyramid, are now in the main catalog as well, so there is no reason to add a
whole acquisition catalog to reach them.

### What a catalog entry looks like

```json
{
  "name": "LOCI QuPath Extensions",
  "description": "General-purpose QuPath extensions developed at LOCI...",
  "extensions": [
    {
      "name": "QuIET - Image Export Toolkit",
      "description": "Publication-ready figure and dataset export",
      "author": "Michael Nelson",
      "homepage": "https://github.com/uw-loci/qupath-extension-image-export-toolkit",
      "releases": [
        {
          "name": "v1.2.8",
          "main_url": "https://github.com/.../qupath-extension-image-export-toolkit-1.2.8-all.jar",
          "version_range": { "min": "v0.6.0" }
        }
      ]
    }
  ]
}
```

Three fields carry all the weight:

- **`main_url`** points at a jar attached to a **GitHub release**. The catalog does not
  host binaries; it points at release assets. That means the catalog file stays tiny and
  every version you ever shipped stays downloadable.
- **`version_range.min`** is the compatibility contract. QuPath uses it to hide or warn
  about extensions that will not work with the version you are running.
- The **`releases` array is a history**, newest first. Users can roll back to an older
  release without hunting through GitHub — which matters enormously when a new release
  breaks something in the middle of someone's analysis.

### Why you might want your own catalog

If you write even two extensions, or if you maintain a core facility where everyone needs
the same six tools, publishing a catalog costs about twenty minutes and removes an entire
category of support burden. A catalog repo is one JSON file, a README, and nothing else.
You are welcome to fork `qupath-catalog-mikenelson` as a starting point.

---

## 3. How this suite was actually built

Fourteen extensions is not a normal output for one person. It is fair to ask how, and the
honest answer is that a large fraction of the code was written by an LLM coding agent
(Claude Code) under close human direction. Since several of you will go home and try this,
here is what genuinely worked and what did not.

### What works

**Give the model the API, not your memory of the API.** The single biggest failure mode is
a confidently hallucinated QuPath method that does not exist. The fix is mechanical: point
the agent at the actual QuPath source, and require it to compile. A build that fails is a
cheap, correct, automatic signal. An agent that cannot run `./gradlew build` is an agent
guessing.

**Write the documentation first, and treat it as the specification.** Several of these
extensions began as a README describing a tool that did not exist yet. That README then
constrained the implementation, and disagreements between doc and code were treated as
bugs in whichever was wrong. It is far easier to notice "this workflow makes no sense for
a pathologist" in prose than in a 900-line dialog class.

**Keep a persistent map of the codebase.** Most of these repos contain a `CLAUDE.md` (project
conventions, gotchas, build commands) and several contain a `codemap/` directory. These
exist because a fresh agent session otherwise re-derives the same architecture every time,
badly. Writing down "the dialog layer must never touch the hierarchy directly" once saves
you from re-litigating it weekly.

**Automate the compatibility check.** When QuPath 0.7 landed, checking fourteen extensions
by hand against a changed API was not realistic. The
[`qupath-update-extension-validator`](https://github.com/MichaelSNelson/qupath-update-extension-validator)
points at N extension repos and two QuPath versions and produces a per-repo
BROKEN / DEPRECATED / OPPORTUNITY worklist by inspecting bytecode with `javap`. This is
the kind of tedious, mechanical, high-value work that agents are genuinely good at — and
it is checkable, because the compiler agrees or does not.

**Small, reviewable, releasable increments.** Every extension here ships as versioned
GitHub releases with a changelog. Anything that cannot be released cannot be validated by
a user, and anything unvalidated is not finished.

### What does not work

**"Build me an extension that does X."** You get something that compiles and is wrong in
ways you will discover in front of an audience. Scope has to be decomposed by a person who
understands the science.

**Trusting the model on scientific correctness.** An agent will implement a bootstrap
confidence interval that runs, produces plausible numbers, and resamples the wrong axis.
Statistical and image-analysis correctness needs a human who knows the method, plus tests
with known answers. Several tools here carry explicit "lightly tested" warnings for
exactly this reason, and you should read those warnings as sincere.

**Trusting it on GUI behaviour.** Nothing catches a dialog that opens off-screen, a
progress bar that never finishes, or a control that is unreachable at 4K scaling except a
human opening the application. Notably, the Dialog Position Manager extension exists
*because* of this class of bug.

**Licensing by vibes.** QuPath's core is GPL-3.0. Linking it generally makes your extension
GPL-3.0 too — which is why some tools here are GPL and others (which avoid that linkage)
are Apache-2.0. Get this wrong and you cannot legally distribute your work. It is worth
twenty minutes of a human's attention per project.

### The honest summary

AI assistance changed the *cost* of building a QuPath extension by roughly an order of
magnitude, and changed the *correctness* of one not at all. The bottleneck moved from
"can I write this Java" to "do I know what this tool should do, and can I tell when it is
lying to me." That is a better bottleneck to have, but it is still a bottleneck, and it is
still yours.

---

## Where to go next

- [Extension index](extensions.md) — every extension, its install source, and its guide.
- [Setup guide](setup.md) — what to install before the hands-on hour.
- [Workshop schedule](schedule.md) — what happens when.
- The per-extension pages, linked from the [workshop home page](../).
