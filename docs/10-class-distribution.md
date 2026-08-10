---
layout: default
title: Class Distribution
---

# Class Distribution

> Live pie charts of class distribution across your project — and the classifier training
> balance those annotations imply. Spot class imbalance *before* you export training data,
> not after the classifier disappoints you.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-class-distribution](https://github.com/uw-loci/qupath-extension-class-distribution) |
| **Version at workshop** | 0.1.8 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+ and a project (single-image use works but is degraded) |
| **Where to find it** | `Extensions > Class Distribution` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

---

## What it does

Two dialogs:

- **Annotation class distribution** — how your annotation classes are distributed. Closed
  annotations count by **area**; polylines count by **length**.
- **Detection-classifier training balance** — how many *detections* each class would label,
  given your current training annotations. This is the number that actually determines
  whether a classifier can learn a class, and it is not the same as the number of annotations
  you drew.

Each dialog has three tabs:

| Tab | Shows |
|---|---|
| **Project** | An aggregate chart over every image |
| **Current image** | A live chart for the open image, updating as you annotate |
| **All images** | A grid of one mini-chart per project image |

You can filter to a single **ImageType**, and classes that are dramatically over- or
under-represented relative to the rest are marked `[over]` / `[under]` in the legend.

The charts update **as you annotate**. That is the design intent: the feedback arrives while
you can still act on it, rather than in a post-mortem after training.

## Why it matters

Class imbalance is the most common reason a QuPath classifier underperforms, and the hardest
to see by eye. Drawing ten large stroma annotations and forty small tumour ones *feels*
balanced; by area it may be 20:1. The training-balance dialog is the one to watch, because a
classifier learns from pixels and detections, not from your sense of effort.

For PIs and supervisors, the **All images** grid is a fast read on whether a trainee's project
is annotated consistently across slides.

## Install

Via the **LOCI QuPath Extensions** catalog (`Extensions > Manage extensions >
Manage extension catalogs > Add catalog` → `https://github.com/uw-loci/qupath-catalog-mikenelson`),
or the release jar. Restart QuPath.

---

## Hands-on exercise (~8 min)

**Data:** `DATA-01_HE_WSI`.

1. `Extensions > Class Distribution`. Open the **annotation** distribution dialog.
2. Look at the **Project** tab, then the **All images** grid. Which slide is the outlier?
3. Switch to the **Current image** tab and leave the dialog open beside the viewer.
4. Draw a few more annotations of your least-represented class. Watch the chart move in real
   time.
5. Now open the **detection-classifier training balance** dialog. Compare it to the annotation
   chart — they will not agree, and the gap is the point.
6. Find a class marked `[under]`. Annotate until it is no longer marked.
7. Filter to a single **ImageType** and see whether the imbalance is type-specific.

### What to notice

- Annotation count, annotation area, and implied training-detection count are three different
  numbers. Only the third predicts classifier behaviour.
- Live feedback while annotating is a genuinely different workflow from checking afterwards.
- `[over]` / `[under]` markers are relative to the rest of your project, so they tell you about
  *your* balance, not a universal target.

---

## Going further

The natural companion is the [Confusion Matrix](presented/confusion-matrix.md) extension: class
imbalance visible here is usually the explanation for a wide confidence interval there.

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-class-distribution#readme).
