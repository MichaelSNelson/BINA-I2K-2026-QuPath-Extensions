---
layout: default
title: Confusion Matrix
---

# Confusion Matrix

> Accuracy numbers you can put in a paper. Per-class precision, recall, F1 and specificity
> with **bootstrap confidence intervals**, across one image or a whole project — plus
> calibration analysis for OpenCV ML classifiers.

| | |
|---|---|
| **Repository** | [kgallik/QuPath_Confusion_Matrix_Extension](https://github.com/kgallik/QuPath_Confusion_Matrix_Extension) |
| **Version at workshop** | 0.2.2 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+, classified detections, and ground-truth annotations |
| **Where to find it** | `Extensions > Confusion Matrix > Analyze Current Image...` / `Analyze Project...` |
| **Catalog** | *not currently in a catalog* — install the jar directly |
| **Session** | Hands-on |

---

## What it does

You trained a cell classifier. It looks good. How good, exactly, and how sure are you?

This extension answers that. You mark a sample of cells with their correct class — the
ground truth — and it compares those labels against the classifier's predictions.

**Accuracy you can cite**

- Per-class **precision, recall, specificity, F1**, and overall accuracy — each with a
  **bootstrap confidence interval**, so you write "F1 = 0.87, 95% CI [0.82, 0.91]" instead of
  a bare point estimate that nobody can evaluate.
- An **N × N confusion matrix** for any number of classes, including **composite
  classifications** like `Macrophage: FoxP3`.
- CSV export of the matrix and every metric, for downstream figures.

**Probability metrics** (OpenCV ML classifiers only)

- Log-loss, Brier score, AUC-ROC, PR-AUC, and **calibration analysis** — i.e. whether the
  predicted probabilities themselves are trustworthy, not merely whether the top class is
  right. A classifier that is 95% confident and 70% correct is a different problem from one
  that is simply inaccurate, and it needs a different fix.

**Single image or whole project**

- Project-wide analysis with a **per-image breakdown** showing each image's contribution.
- **Statistical outlier detection** flags images whose accuracy diverges from the project —
  usually a staining or scanning problem, not a classifier problem.
- Automatic class discovery from both detections and ground-truth annotations, with warnings
  when the two sets disagree.

**Flexible ground truth**

- Ground truth from **point annotations** *or* **classified area annotations** (rectangle,
  polygon, freehand) — because point-clicking every cell is often not practical.
- The matrix is **interactive**: click any cell of it to highlight those cells in the QuPath
  viewer and look at what is actually being confused.

## Install

Download the latest release jar from
[Releases](https://github.com/kgallik/QuPath_Confusion_Matrix_Extension/releases), drag it
onto QuPath, accept the copy, restart.

---

## Hands-on exercise (~15 min)

**Data:** `DATA-05_classified_project` — cells detected and classified, with ground-truth
point annotations already placed on a subset.

1. `Extensions > Confusion Matrix > Analyze Current Image...`
2. Read the matrix. Find the largest off-diagonal cell — the most common confusion.
3. **Click that cell.** Look at the misclassified cells in the viewer. Is the classifier
   wrong, or was the ground truth wrong? (Both happen. The second is more common than people
   admit.)
4. Look at the confidence intervals. Find a class where the CI is wide. How many ground-truth
   cells does that class have? This is the number that determines whether your metric means
   anything.
5. Run `Analyze Project...` across all images. Check the **per-image breakdown** and any
   **flagged outliers**. Open a flagged image and look for the reason.
6. If the project includes an OpenCV ML classifier, open the **Probability metrics** tab and
   read the calibration curve.
7. Export the CSV.

### Optional: add your own ground truth

8. Pick an unlabelled image. Place ~30 point annotations, assign classes, and re-run. Watch
   the confidence intervals tighten as N grows.

### What to notice

- The confidence interval, not the point estimate, is the honest result. A 95% accuracy from
  40 cells and from 4000 cells are not the same claim.
- Clicking into the matrix turns "the classifier is 87% accurate" into "the classifier
  confuses these two things, for this visible reason." That is the sentence that gets your
  classifier fixed.
- Outlier images usually indicate a batch problem upstream. Fixing acquisition beats
  retraining.

---

## Going further

Pairs naturally with the [DL Pixel Classifier](02-dl-pixel-classifier.md) — an accuracy
number with an interval is what makes "the deep model is better" a claim rather than an
impression — and with [Class Distribution](11-class-distribution.md), which shows you the
class imbalance that produced those wide intervals in the first place.

**Full documentation:** the
[repository README](https://github.com/kgallik/QuPath_Confusion_Matrix_Extension#readme).
