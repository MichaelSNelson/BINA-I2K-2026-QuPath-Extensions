---
layout: default
title: Setup - do this before the workshop
---

# Setup — please do this **before** the workshop

Conference wifi will not survive thirty people downloading multi-gigabyte Python
environments at 9:05 am. Fifteen minutes at home saves you the whole hands-on hour.

If you can only do one thing: **install QuPath 0.7 and add the two catalogs.**

> **Want to vote on what we demonstrate live?** See
> [walkthroughs and videos](walkthroughs.md) — we will not get through all sixteen tools, so the
> live time follows the room's interest. Every tool has a walkthrough and a video regardless.

> **Only interested in one or two extensions?** You do not need any of the tracks. Go to the
> **[extension index](extensions.md)**, find the ones you care about, and install just those.

---

## 1. QuPath 0.7.0 or later

Download from [qupath.github.io](https://qupath.github.io/) and install.

Everything in this workshop requires **0.7.0+**. If you already run 0.6 for other work, note
that 0.7 uses a **separate extensions folder**, so installing today's extensions will not
disturb your existing setup.

## 2. Add the two LOCI catalogs

In QuPath: `Extensions > Manage extensions > Manage extension catalogs > Add catalog`, then
add both of these:

| Catalog | URL |
|---|---|
| LOCI QuPath Extensions | `https://github.com/uw-loci/qupath-catalog-mikenelson` |
| QPSC Microscope Extensions | `https://github.com/uw-loci/qupath-catalog-qpsc` |

Background on what a catalog is and why we use them:
[How extensions, catalogs, and AI-assisted development work](00-extensions-catalogs-and-ai.md).

## 3. Install the extensions

From the catalogs, install:

**Everything (small, fast, no extra downloads):**

- QuIET — Image Export Toolkit
- Wizard Wand
- Polyline Wand
- Classify Object Subset
- Class Distribution
- Channel Names Viewer
- Project Metadata Browser
- Dialog Position Manager
- Cluster 3D Navigator
- OCR for Labels
- Tiles to Pyramid

**Large downloads — only if you plan to do these tracks:**

- **QP-CAT — Cell Analysis Tools** — after installing, run
  `Extensions > QP-CAT > Setup environment`. **~1.5–2.5 GB download, ~2.5 GB on disk.**
- **Deep Learning Pixel Classifier** — the first run downloads an embedded Python
  environment. Also substantial.

**Then restart QuPath.** Extensions are not loaded on the fly; the menu items will not appear
until you do.

## 4. OCR language data (only for the OCR track)

`Extensions > OCR for Labels > OCR Settings...` → **Required Downloads**:

- **eng.traineddata** (~4 MB) — required
- **osd.traineddata** (~10 MB) — recommended, handles rotated labels

Set **Tessdata Path** to the folder containing them, click OK. Barcode scanning needs no setup.

## 5. Download the workshop data

**Google Drive folder:** %%DRIVE_DATA_URL%%

Download the datasets for the track(s) you plan to do. Total for all four is roughly 3–4 GB;
each individual set is much smaller.

| ID | Contents | Used by |
|---|---|---|
| `DATA-01_HE_WSI` | Annotated brightfield H&E project | QuIET, DL Pixel Classifier, Wizard Wand, Polyline Wand, Class Distribution — **Tracks A and C** |
| `DATA-02_multiplex_IF` | Multiplexed IF project with detected cells, per-marker measurements, and a saved object classifier | QP-CAT, Cluster 3D Navigator, Channel Names Viewer, Classify Object Subset |
| `DATA-03_labeled_slides` | WSIs with slide label images — some barcoded, at least one rotated | OCR for Labels, Project Metadata Browser |
| `DATA-04_tiles` | A tile directory with `TileConfiguration.txt`, plus a drift-affected copy | Tiles to Pyramid |

**You are also very welcome to bring your own data.** The second hour is optional exploration,
and working on a problem you actually have is a better use of the time than working on ours.
If you bring your own, tell us what you are trying to do — we will point you at the right tool.

---

## Check your setup

Open QuPath and confirm:

- [ ] Help → About shows **0.7.0** or later
- [ ] `Extensions >` contains **QuIET**, **Class Distribution**, **Classify Object Subset**,
      **Cluster 3D Navigator**, **Project Metadata Browser**, **Channel Names Viewer**,
      **OCR for Labels**, **Tiles to Pyramid**
- [ ] `Window >` contains **Dialog Position Manager...**
- [ ] The toolbar has a **sparkle wand** (Shift+W) and a **polyline wand** (Shift+P) button
- [ ] If doing the multiplex track: `Extensions > QP-CAT` reports its environment as ready
- [ ] The datasets for your track are on disk

## If something goes wrong

- **A menu item is missing.** Did you restart QuPath? This is the answer roughly half the time.
- **The extension loads but throws `NoSuchMethodError`.** You are probably on QuPath 0.6.
- **`ClassNotFoundException`.** You downloaded a jar without `-all` in the name. Get the
  `-all` jar.
- **Anything else.** Come find us at the start of the session — we will have people circulating
  during the hands-on hour specifically for this.

---

## Not installable today

Three tools are demonstrated in the first hour but cannot be installed by attendees, so they are
not in the list above:

- **QPSC** needs a microscope.
- **Confusion Matrix** is in a private repository. If that changes before the workshop we will
  say so on the day.
- **Fiber Analysis / TME-Quant** need a long environment build, or a Windows-only server plus a
  pipeline that cannot be redistributed.

See the [schedule](schedule.md) for where they appear.
