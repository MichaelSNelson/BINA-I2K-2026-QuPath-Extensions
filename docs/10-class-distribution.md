---
layout: default
title: Class Distribution
---

# Class Distribution

> Live pie charts of how your classes are distributed across a whole project — by annotation
> area, or by how many detections each class labels. Spot class imbalance *before* it quietly
> wrecks a classifier, not after.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-class-distribution](https://github.com/uw-loci/qupath-extension-class-distribution) |
| **Extension version** | 0.1.8 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+ and a project (single-image use works but is degraded) |
| **Where to find it** | `Extensions > Class Distribution` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> **Walkthrough video:** %%VIDEO_CLASS_DISTRIBUTION%%

---

## The idea in one sentence

It charts how your classes are distributed — across the project, the current image, or every
image side by side — so class imbalance, the most common and least visible reason a classifier
underperforms, is something you can see at a glance.

---

## Walkthrough: read the class balance across a project

Uses the same ready-made project as the other exercises. It follows naturally **after
classification / labeling**: once your cells carry classes, this is how you check whether those
classes are balanced enough to trust.

### 1. The data

**Download:** `multiplex-synthetic-data-demo-project-v1.2.zip` —
**[direct download](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-demo-project-v1.2.zip)**
(20 MB). A ready-made project of eight images. Each cell carries a **classified ground-truth
point** — a labeled point annotation — and the eight images were built with deliberately
different compositions: **`tme_06` is immune-rich**, **`tme_07` is immune-poor with no B cells
at all**. That built-in imbalance is exactly what this tool is for.

Keep the whole **project** open — this extension reads across all images, not just the open one.

### 2. Load it into QuPath

1. **Drag `project.qpproj` onto an open QuPath window** — or the unzipped folder itself, either works. (Menu route: `File > Project... > Open project`.)
2. QuPath pops up an **Update URIs** dialog with the images listed in red. This is expected.
   The project ships with *relative* image paths so the zip is portable,
   and QuPath cannot resolve those until you show it the folder once. Click **Search...** (bottom-right),
   choose the folder you unzipped, then **Apply changes**.
3. Double-click any image (e.g. `tme_00.tif`) so the viewer has something open.

### 3. Open the distribution that uses your labels

The ground-truth points are classified **point** annotations, and they are what labels the
cells. Open **`Extensions > Class Distribution > Show Detection Training Distribution...`** — it
counts, for each class, how many detections those points label. (The other dialog, *Show Class
Distribution...*, measures drawn **area** annotations by area; points contribute no area, so use
that one when you are annotating regions — see below.)

%%SHOT_CD_01_DIALOG%%
> *Screenshot to add: the Detection Training Distribution dialog open beside the viewer.*

### 4. The project as a whole

On the **Project** tab, each slice is a class in its own QuPath color, sized by how many cells
carry it across all eight images. Hover for the exact percentage.

%%SHOT_CD_02_PROJECT%%
> *Screenshot to add: the Project tab pie chart with per-class percentages.*

### 5. Every image at once — where the imbalance shows

Switch to the **All images** tab: one mini-chart per image, shared legend. This is the moment
worth watching. `tme_06`'s chart is visibly heavier on the immune classes; **`tme_07` has no
B-cell slice at all**, and a class that is far below the others is flagged **`[under]`** in the
legend (dramatically over-represented ones get `[over]`).

%%SHOT_CD_03_ALL_IMAGES%%
> *Screenshot to add: the All images grid, with `tme_06` (immune-rich) and `tme_07` (no B cells)
> visibly different, and an `[under]` marker in the legend.*

### 6. One image, and the ImageType filter

The **Current image** tab charts just the open image and also surfaces project classes that are
*missing* from it. The **Image Type** dropdown at the top aggregates only images of one type —
useful when a project mixes stains or magnifications.

%%SHOT_CD_04_CURRENT%%
> *Screenshot to add: the Current image tab, with a missing-class note and the Image Type filter.*

### What to notice

- **The number that predicts classifier behavior is the detection count per class, not the
  count of annotations you drew.** Ten big stroma regions and forty small tumor ones can be 20:1
  by the count that matters.
- **`[over]` / `[under]` are relative to your project's own median**, so they describe *your*
  balance, not a universal target.
- The `tme_07` gap (no B cells) is the kind of thing that silently produces a classifier that
  cannot call a class it never really saw — and here it is, obvious, before you train anything.

---

## What it does, in full

**Two dialogs.** *Show Class Distribution...* charts **annotation** classes — closed annotations
by pixel area, polylines by length × width (points contribute nothing). *Show Detection Training
Distribution...* charts how many **detections** each class would label given your training
annotations (area regions, or classified counting **points** like this dataset's ground truth).

**Three tabs each** — Project (aggregate), Current image (live), and All images (a grid of one
mini-chart per image with a shared legend and a thumbnail-size slider) — plus an **Image Type**
filter and the `[over]`/`[under]` highlighting.

**Live as you annotate.** With the annotation dialog open on the Current image tab, draw or edit
area annotations and the chart updates immediately — the feedback arrives while you can still act
on it. That is the intended workflow for building balanced training data; try it by drawing a
couple of classified rectangles on an image and watching the chart move.

**It stores nothing in your project** — preferences live in QuPath's own settings.

> **New to QuPath?** *project*, *annotation*, *detection*, *class* are in the
> [glossary](glossary.md).

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-class-distribution#readme).
