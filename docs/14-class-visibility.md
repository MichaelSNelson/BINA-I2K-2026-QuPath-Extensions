---
layout: default
title: Class Visibility
---

# Class Visibility

> Show or hide objects by class — or by **one marker inside a class name**. On a panel of
> thirty combinatorial classes like `CD3: CD8: PD1`, `CD8` is one row here and twenty-six rows
> in QuPath's built-in class list.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-class-visibility](https://github.com/uw-loci/qupath-extension-class-visibility) |
| **Extension version** | 0.2.2 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+ |
| **Where to find it** | Toolbar button · `Extensions > Class Visibility > Show panel` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> **Walkthrough video:** %%VIDEO_CLASS_VISIBILITY%%
> The walkthrough below is self-contained. You can work through it in the hands-on hour, or on your own afterwards.

---

## Do you need this? Often, no

This is the rare extension whose README opens by talking you out of installing it, and that
is worth repeating here.

**If you have five or ten classes, QuPath's built-in class list is the better tool.** Open the
**Annotations** tab of the analysis pane and the **Class list** on the right already gives you
per-class show and hide, a color picker on every row, a `Show by default` / `Hide by default`
dropdown, and a filter field that accepts regular expressions — which this panel's does not.

This panel is for one situation: **class names built by combining markers.** `CD3: CD8: PD1`
is one class made of three components. Twenty or forty such names are not a list of categories,
they are a lattice of overlapping supersets, and that is where the built-in list runs out.

## What it adds, and all of it is about scale

- **A component list.** `CD8` is one row. In the built-in class list it is however many of your
  classes happen to contain `CD8` — find them all, tick them all, be sure you missed none. Here
  the rule follows the marker, not the spelling of each class name.
- **An `Any` / `All` switch** over those components. `CD3` **and** `CD8` **and** `PD1` together
  is one rule. Nothing else in QuPath expresses that.
- **A `Spread` column** — `26/28` beside a component — because multiplex naming schemes put
  `positive`, `pos` or `Cell` into nearly every class name, and on screen those look exactly
  like markers. The number tells you a component is a near-synonym for "everything" *before*
  you click it. It is off by default, in the column menu button at the right of the component
  list's header.
- **`Find`** over both lists, with the matched text in **bold**.
- **Named presets, saved in the project**, so a filter worth building on a 30-class panel gets
  built once.

It writes to the same QuPath setting the built-in class list writes to, so the two stay in
agreement. Nothing here is a private copy of QuPath's state.

## Provenance

A port of the community Groovy script *"Show specific classes of objects v3"*
([image.sc topic 31828](https://forum.image.sc/t/31828)), which stopped working when
`OverlayOptions.hiddenClassesProperty()` was removed from QuPath.

<details markdown="1">
<summary><b>Install</b> — from the LOCI catalog, then restart QuPath</summary>

Install from the **LOCI QuPath Extensions** catalog, then restart QuPath. Full steps, including
the catalog URL, are in the [setup guide](setup.md).

</details>

---

## Try it yourself

The synth multiplex project ships **six flat classes** — `tumor`, `fibroblast`, `cd8_t`,
`helper_t`, `b_cell`, `macrophage`. By the standard above, that is a case where you should use
the built-in class list and skip this extension entirely.

So the first thing this walkthrough does is **change the shape of the data**: one script turns
those six categories into the combinatorial lattice that real hi-plex panels have. Then the
panel has something to do.

### 1. Get the data

**Download:** `multiplex-synthetic-data-demo-project-v1.2.zip` —
**[direct download](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-demo-project-v1.2.zip)**
(20 MB). The same ready-made project used by Classify Object Subset and Class Distribution, so
if you already have it, you are done here.

### 2. Load it into QuPath

1. **Drag `project.qpproj` onto an open QuPath window** — or the unzipped folder itself, either
   works. (Menu route: `File > Project... > Open project`.)
2. QuPath pops up an **Update URIs** dialog with the images listed in red. This is expected.
   The project ships with *relative* image paths so the zip is portable, and QuPath cannot
   resolve those until you show it the folder once. Click **Search...** (bottom-right), choose
   the folder you unzipped, then **Apply changes**.
3. Double-click **`tme_00.tif`** to open it.

### 3. Build the class lattice

Open `Automate > Script editor`, then paste in
**[`composite_marker_classes.groovy`](https://raw.githubusercontent.com/MichaelSNelson/BINA-I2K-2026-QuPath-Extensions/main/scripts/composite_marker_classes.groovy)**
— click the link, select all, copy, paste — and **Run**.

The script gates each of the seven markers independently, using the same Otsu threshold the
project's own `08_apply_otsu_gate.groovy` uses, then names every cell after **all** the markers
it is positive for: `CD3: CD8`, `PanCK: Ki67`, `aSMA: CD68`, and so on. Six categories become
a couple of dozen overlapping combinations.

> **This overwrites cell classifications.** It replaces whatever is on the cells — the
> `cell_type_classifier` output, or the Otsu gate from script 08. It does **not** touch the
> ground-truth point annotations, because those are annotations rather than detections, so
> nothing the other walkthroughs need is lost. To get the flat six classes back, re-run the
> object classifier, or close the image without saving.

Read what the script prints before moving on. It reports the per-marker Otsu threshold, how
many cells each marker is positive in, every composite class with its count, and — most
relevant here — **how many of the classes each marker appears in**. That last table is the
`Spread` column, computed before you ever open the panel, and it tells you which markers are
going to be interesting and which are near-synonyms for "everything".

### 4. Open the panel

The toolbar button, or `Extensions > Class Visibility > Show panel`.

**Your objects will disappear, and that is the intended starting state.** The mode radio sits
on **`Show only checked classes`** with nothing checked, so the status strip reads:

```
[!] Every object is hidden. "Show only checked classes" is on and nothing is checked.
```

The check box at the top of the classes list is haloed in blue; one click on it puts everything
back. The panel starts this way so you check your way *toward* what you want to see.

### 5. One component instead of many classes

In the **Components** list, check **`CD3`**.

Every class containing `CD3` is now the only thing on screen — the T cells, whether they are
`CD3: CD8`, `CD3: Ki67`, or any other combination the gate produced. `Active rules` reads
`Active rules (1)`: one checked component is **one rule**, however many class names it covers.

Now look at the **Classes** list and count how many rows you would have had to tick to get the
same result. That difference is the entire argument for this extension.

### 6. `Any` vs `All`

Check a second component — **`CD8`**.

With the combination on **`Any`**, the default, you see everything CD3-positive **plus**
everything CD8-positive. Switch `Checked components combine as:` to **`All`** and you see only
the cells positive for both.

`CD3` **and** `CD8` together, as one rule, is the thing no other QuPath interface expresses.
In the built-in class list it is a manual hunt for whichever class names carry both, repeated by
hand on the next image.

### 7. Turn on `Spread`, and find the fake marker

Click the **column menu button** at the right of the component list's header and switch on
**`Spread`**.

Compare what the panel shows against the spread table the script printed in step 3. In this
dataset `PanCK` is the one to look at: the 5 µm cell expansion picks up PanCK from neighboring
tumor cytoplasm, so it turns up in far more combinations than a clean marker would. A high
spread does not mean a marker is wrong — it means checking it will select nearly everything,
which is exactly what you want to know *before* you click it.

### 8. Save it as a preset

Build a filter worth keeping — say `CD3` and `CD8` on `All` — then use **`Preset`** in the
panel header and **Save** it under a name.

Presets are stored **in the project**, so the filter is there next week, and for whoever else
opens that project. On a thirty-class panel this is the difference between a filter you rebuild
every session and one you build once.

### 9. Get your view back

Three different things, worth keeping straight:

| You want | Do this |
|---|---|
| Every listed class visible again | The check box in the **classes list's header** |
| The view you had *before* you opened the panel | **Close the panel.** That state is recorded automatically |
| QuPath's own defaults — no rules, `Hide checked classes`, `Exact matches only` off | **`Reset all`** |

`Extensions > Class Visibility > Restore the state from when the panel opened` does the middle
one from the menu, if the panel is still open.

### What to notice

- The component list is not a convenience layer over the class list. It expresses a filter —
  "all three of these markers, together" — that the class list cannot state at all, only
  approximate by hand.
- `Spread` exists because a name that looks like a marker may not behave like one. Any naming
  scheme that appends `positive` or `Cell` to every class produces components that match
  everything, and they are indistinguishable from real markers until you count.
- This same script is a second, richer way into
  **[Class Distribution](10-class-distribution.md)**: charting two dozen combinatorial classes
  instead of six flat ones is a very different picture, and a more realistic one.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-class-visibility#readme), the
[user guide](https://github.com/uw-loci/qupath-extension-class-visibility/blob/main/docs/user-guide.md),
and [migrating from the script](https://github.com/uw-loci/qupath-extension-class-visibility/blob/main/docs/migration-from-the-script.md).
