---
layout: default
title: Confusion Matrix
---

# Confusion Matrix

> **Presentation only — no hands-on component.**
> Accuracy numbers you can put in a paper: per-class precision, recall, F1 and specificity
> with **bootstrap confidence intervals**, across one image or a whole project, plus
> calibration analysis for OpenCV ML classifiers.
>
> The repository is currently **private**, so there is no jar for attendees to install. We
> demonstrate it live; if it goes public before the workshop we will say so on the day.

| | |
|---|---|
| **Author** | Kristin Gallick |
| **Repository** | [kgallik/QuPath_Confusion_Matrix_Extension](https://github.com/kgallik/QuPath_Confusion_Matrix_Extension) |
| **Version at workshop** | 0.2.2 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+, classified detections, and ground-truth annotations |
| **Where to find it** | `Extensions > Confusion Matrix > Analyze Current Image...` / `Analyze Project...` |
| **Availability** | Repository currently **private** — not installable by attendees |
| **Session** | Presented only |

> **Walkthrough video:** %%VIDEO_CONFUSION_MATRIX%%
> This tool is demonstrated rather than practised, but the walkthrough below is complete — you can follow it yourself once you have access to the tool.

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

## Availability

The repository is **private** at the time of writing, so the
[Releases page](https://github.com/kgallik/QuPath_Confusion_Matrix_Extension/releases) and the
jar are not reachable without access. That is the only reason this is a demo rather than an
exercise — the extension itself has no hardware or server requirement and would otherwise sit
comfortably in the hands-on hour.

If you want to use it, ask us during the session and we will put you in touch with Kristin.

---

## What the demo shows (~5 min)

Using a project with cells detected, classified, and ground-truth point annotations placed on a
subset:

1. **`Extensions > Confusion Matrix > Analyze Current Image...`** — the N × N matrix appears,
   with per-class precision, recall, specificity and F1 beside it.
2. **The interval, not the point estimate.** We look at a class with a wide confidence
   interval and count how many ground-truth cells it has. A 95% accuracy from 40 cells and from
   4000 cells are not the same claim, and the CI is what makes that visible.
3. **Click the biggest off-diagonal cell.** Those cells highlight in the viewer. This is the
   moment worth watching: "the classifier is 87% accurate" becomes "the classifier confuses
   these two things, for this visible reason" — which is the sentence that actually gets a
   classifier fixed. It is also where you find out how often the *ground truth* was wrong.
4. **`Analyze Project...`** — aggregated across images, with a per-image breakdown and
   automatically flagged **outliers**. We open a flagged image and look for the cause; it is
   usually a staining or scanning problem upstream, not a classifier problem.
5. **Probability metrics tab** — for an OpenCV ML classifier, the calibration curve. A model
   that is 95% confident and 70% correct is a different problem from one that is simply
   inaccurate, and it needs a different fix.

### The point to take away

Report an interval. If you take one thing from this segment, it is that a classifier accuracy
without a confidence interval and without a look at *what* is being confused is not yet a
result — and that getting both is a five-minute job, not a research project.

---

## Going further

Pairs naturally with the [DL Pixel Classifier](../02-dl-pixel-classifier.md) — an accuracy
number with an interval is what makes "the deep model is better" a claim rather than an
impression — and with [Class Distribution](../10-class-distribution.md), which shows you the
class imbalance that produced those wide intervals in the first place.

**Full documentation:** the
[repository README](https://github.com/kgallik/QuPath_Confusion_Matrix_Extension#readme).
