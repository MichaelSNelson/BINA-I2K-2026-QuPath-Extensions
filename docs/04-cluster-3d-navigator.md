---
layout: default
title: Cluster 3D Navigator
---

# Cluster 3D Navigator

> A rotatable **3D point cloud of your cells** inside QuPath — one point per cell, colored by
> its class. Click a point in cluster space and land on that cell on the slide, in one click.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-cluster-3d-navigator](https://github.com/uw-loci/qupath-extension-cluster-3d-navigator) |
| **Extension version** | 0.1.5 |
| **License** | GPL-3.0-or-later |
| **Requires** | QuPath 0.7.0+. No Python, no browser, no network. Pure Java |
| **Where to find it** | `Extensions > Cluster 3D Navigator > Open 3D navigator...` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> **Walkthrough video:** %%VIDEO_CLUSTER_3D_NAVIGATOR%%

---

## The idea in one sentence

It plots every cell as a point in a 3D space you choose (three measurements as the axes),
colors each point by its class, and lets you **click a point to select and center that exact
cell in the viewer** — so a spot in cluster space becomes a real cell on the slide.

It reads detections only and writes nothing to the hierarchy, so you can explore freely.

---

## Walkthrough: navigate cells in 3D and land on the real thing

Uses the same ready-made project as the
[Classify Object Subset](07-classify-object-subset.md) exercise.

### 1. The data

**Download:** `multiplex-synthetic-data-demo-project-v1.2.zip` —
**[direct download](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-demo-project-v1.2.zip)**
(20 MB). A ready-made QuPath project: eight 8-channel images with cells already detected (and
their per-marker measurements), ground-truth points, a trained classifier, and helper scripts.

The navigator needs two things on your cells, both of which this project has once you classify:
a **class** (the color) and **at least three numeric measurement columns** to use as the X, Y
and Z axes. Here the axes are marker means (`Cell: PanCK mean`, `Cell: aSMA mean`, …). If you
run the [QP-CAT clustering exercise](03-qp-cat-cell-analysis-tools.md) and save UMAP components
as measurements, those work as axes too. A current QP-CAT run names them
`QPCAT 3D UMAP1/2/3`; the pre-computed download predates that and has `UMAP1/2/3`. The navigator
recognises either.

> **Coming: pre-computed QP-CAT results.** Clustering takes real compute, and a conference
> laptop may not want to spend it. A zip of finished QP-CAT output will be offered here so you
> can load the results and come straight to this exercise with the embedding columns already on
> your cells. It is optional and separate from the track downloads — do the QP-CAT exercise yourself
> if you want to see how the numbers were produced. **Not available yet.**

Work on **`tme_00.tif`**.

### 2. Load it into QuPath

1. **Drag `project.qpproj` onto an open QuPath window** — or the unzipped folder itself, either works. (Menu route: `File > Project... > Open project`.)
2. QuPath pops up an **Update URIs** dialog with the images listed in red. This is expected.
   The project ships with *relative* image paths so the zip is portable,
   and QuPath cannot resolve those until you show it the folder once. Click **Search...**
   (bottom-right), choose the folder you unzipped, and QuPath fills in the **Replacement URI**
   column; then click **Apply changes**.
3. Double-click **`tme_00.tif`** to open it.

### 3. Give the cells a class (the color)

The cells start unclassified, so the cloud would be one flat color. Classify them first: run
**`Automate > Project scripts > apply_trained_classifier`** (the bundled classifier). The cells
are now colored by cell type — those colors carry straight into the point cloud.

%%SHOT_C3D_01_CLASSIFIED%%
> *Screenshot to add: `tme_00` with cells colored by predicted class.*

### 4. Open the navigator and choose the axes

1. `Extensions > Cluster 3D Navigator > Open 3D navigator...`.
2. Pick three numeric measurements for the **X, Y and Z** axes. With no embedding columns
   present, choose three marker means — for example `Cell: PanCK mean`, `Cell: aSMA mean`, and
   `Cell: CD3 mean` — which spread tumor, fibroblast and T cells apart. (If embedding columns
   exist, the navigator preselects them.)

%%SHOT_C3D_02_AXES%%
> *Screenshot to add: the axis-selection controls with three measurements chosen.*

### 5. Explore the cloud

- **Drag to rotate**, **scroll to zoom**, **middle-drag (or Shift+drag) to pan**.
- Each point is one cell; its color is its class. Use the class legend's checkboxes to show or
  hide classes and declutter.
- Look for structure that a flat 2D view hides — two classes that overlap along two axes but
  separate cleanly along the third.

%%SHOT_C3D_03_CLOUD%%
> *Screenshot to add: the rotated 3D cloud, colored by class, with the class legend.*

### 6. Click a point, land on the cell

Click a point in the cloud and the matching cell is **selected and centered in the QuPath
viewer**. Try a point at the dense core of one color, then
a point sitting **between** two colors — the boundary cells are where classification and
clustering disagreements live. Because this data has ground truth (the colored points on the
slide), you can immediately check whether the cell you landed on really is what its color
claims.

%%SHOT_C3D_04_CLICK_TO_CELL%%
> *Screenshot to add: a point selected in the cloud and the corresponding cell centered/selected
> in the viewer (side by side).*

### 7. 2D when that is what you have

Switch to the **2D** view for a genuine 2D embedding (a 2D UMAP). Rotating the 3D cloud and then
comparing to 2D is the fastest way to see what a third component would have told you.

%%SHOT_C3D_05_2D%%
> *Screenshot to add: the 2D view of the same data.*

### What to notice

- Boundary cells — where two colors meet in the cloud — are where errors live, and this makes
  them a one-click investigation rather than a scripting exercise.
- Three components is not automatically better than two, but when it is, it is obvious the
  moment you rotate.
- The tool only reads, so nothing you do here can damage your project.

---

## What it does, in full

One point per detection, colored by its classification (PathClass); a **3D** view for
three-component data and a flat **2D** view for 2D embeddings. It is deliberately **generic** —
it does not care which tool produced your clusters. Any detections carrying a class and at least
three numeric measurement columns will plot: QP-CAT output, or anything you computed elsewhere
and imported as measurements. It **reads detections only and writes nothing to the hierarchy**.

**How it relates to QP-CAT.** QP-CAT ships a 2D embedding scatter and a one-way "Export for
VEST" that opens in a browser and cannot navigate back. Cluster 3D Navigator is the
complementary **in-QuPath, bidirectional, 3D** tool. Use either, or both.

> **Platform caveat:** verified on Linux for this build; Windows is a claimed target that still
> needs real-world verification (HiDPI pointer mapping, native window behavior). If clicking a
> point selects the *wrong* cell on Windows, that is a bug worth reporting.

> **New to QuPath?** *project*, *detection*, *class* and *measurement* are in the
> [glossary](glossary.md); QuPath's [official docs](https://qupath.readthedocs.io/en/stable/) go
> deeper.

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-cluster-3d-navigator#readme).
