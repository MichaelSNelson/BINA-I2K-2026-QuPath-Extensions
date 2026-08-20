---
layout: default
title: Cluster 3D Navigator
---

# Cluster 3D Navigator

> A rotatable 3D point cloud of your clustered cells, inside QuPath. Click a point in cluster
> space and land on that cell on the slide.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-cluster-3d-navigator](https://github.com/uw-loci/qupath-extension-cluster-3d-navigator) |
| **Version at workshop** | 0.1.5 |
| **License** | GPL-3.0-or-later |
| **Requires** | QuPath 0.7.0+. No Python, no browser, no network, no large download — pure Java |
| **Where to find it** | `Extensions > Cluster 3D Navigator > Open 3D navigator...` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> **Walkthrough video:** %%VIDEO_CLUSTER_3D_NAVIGATOR%%
> The walkthrough below is self-contained. You can work through it during the workshop, or on your own afterwards.

---

## What it does

One point per detection, coloured by its classification (PathClass). Rotate, zoom, and pan
the cloud — then **click a point to select and centre that cell in the QuPath viewer**. An
interesting spot in cluster space becomes an actual cell on the slide in one click.

There is a flat **2D** view for genuine 2D embeddings (a 2D UMAP) and a **3D** view for
three-component embeddings.

The extension is deliberately **generic**: it does not care which tool produced your
clusters. If your detections carry a PathClass and at least three numeric measurement
columns — say `UMAP1`, `UMAP2`, `UMAP3` — it will plot them. QP-CAT output works; so does
anything you computed elsewhere and imported as measurements.

**It reads detections only and writes nothing to the hierarchy.** Navigation selects existing
cells; it cannot damage your project.

### How it relates to QP-CAT

QP-CAT ships a 2D embedding scatter, and a one-way "Export for VEST" that opens in a browser
and cannot navigate back. Cluster 3D Navigator is the complementary **in-QuPath,
bidirectional, 3D** tool. Use either, or both.

## Requirements in practice

Your detections need:

- a **PathClass** (the colour), and
- **at least three numeric measurement columns** to use as X, Y, Z.

If you have run clustering in QP-CAT with UMAP components saved as measurements, you already
satisfy both.

> **Platform caveat:** verified on Linux for this build. Windows is a claimed target that
> still needs real-world verification (HiDPI pointer mapping, native window behaviour). If
> you are on Windows and clicking a point selects the *wrong* cell, that is a bug worth
> reporting — please do.

## Install

Via the **LOCI QuPath Extensions** catalog, or drop the `-all.jar` into your extensions
folder and restart.

---

## Hands-on exercise (~10 min)

**Data:** the clustered project you produced in the
[QP-CAT exercise](03-qp-cat-cell-analysis-tools.md) — the synthetic tumour-microenvironment
dataset, ~20 MB from [GitHub](https://github.com/uw-loci/tme-quant-synthetic-data/releases/latest). Save UMAP components as measurements when you
cluster and they become your X, Y and Z here.

This pairing is worth doing in order: because every cell in that data has a known type, when you
click a point in cluster space you can check whether the cell you land on really is what the
cluster claims. Do that a few times on **boundary** points — the cells sitting between two
clusters — and you will learn more about your clustering than any metric will tell you.

1. `Extensions > Cluster 3D Navigator > Open 3D navigator...`
2. Assign three measurement columns to X, Y, Z (e.g. `UMAP1`, `UMAP2`, `UMAP3`).
3. Rotate the cloud. Look for structure that is *invisible* in a 2D projection — two clusters
   that overlap in 2D but separate cleanly along the third axis.
4. Find a point sitting between two clusters. Click it. Go look at that cell on the slide.
5. Repeat for a point at the dense core of a cluster. Compare the two cells.
6. Switch to the **2D** view and confirm which structure you would have missed.

### What to notice

- Boundary cells are where classifier and clustering errors live. This tool makes them a
  one-click investigation rather than a scripting exercise.
- Three components is not automatically better than two — but when it is, it is obvious the
  moment you rotate.
- Because it only reads, you can explore freely without worrying about your hierarchy.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-cluster-3d-navigator#readme).
