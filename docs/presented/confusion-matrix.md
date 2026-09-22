---
layout: default
title: Confusion Matrix
---

# Confusion Matrix

> **Presentation only, no hands-on component** — the repository is currently **private**, so
> there is no jar for attendees to install. We demonstrate it live. The walkthrough below is
> the exact use case we walk through on screen, so you can follow it once you have access.
>
> What it gives you: per-class precision, recall, F1 and specificity with **bootstrap
> confidence intervals**, an interactive **N × N confusion matrix**, and calibration analysis
> for OpenCV ML classifiers — accuracy numbers you can put in a paper.

| | |
|---|---|
| **Origin** | Concept and half of the initial scripts by Kristin Gallik; built out into the extension at LOCI |
| **Repository** | [kgallik/QuPath_Confusion_Matrix_Extension](https://github.com/kgallik/QuPath_Confusion_Matrix_Extension) |
| **Version at workshop** | 0.2.2 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+, classified detections, and ground-truth annotations |
| **Where to find it** | `Extensions > Confusion Matrix > Analyze Current Image...` / `Analyze Project...` |
| **Availability** | Repository currently **private**, so not installable by attendees |
| **Session** | Presented only |

> **Walkthrough video:** %%VIDEO_CONFUSION_MATRIX%%

---

## The idea in one sentence

You trained a cell classifier and it looks good; this tells you **how good, exactly, on how
many cells, and which classes it confuses** — the difference between an impression and a result.

---

## Walkthrough: validate a classifier and see what it confuses

This is the use case demonstrated in the session. It uses the same ready-made project as the
[Classify Object Subset](../07-classify-object-subset.md) exercise, so if you did that one you
already have the data.

### 1. The data

**Download:** `multiplex-synthetic-data-demo-project-v1.2.zip` —
**[direct download](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-demo-project-v1.2.zip)**
(20 MB). It is a **ready-made QuPath project**, not loose files. Inside:

- `images/` — eight synthetic 8-channel multiplexed images (`tme_00.tif` … `tme_07.tif`)
- **cells already detected**, with measurements — you do not run detection
- **ground truth**: one classified **point** per cell, colored by the cell's true type. This is
  what the confusion matrix compares the classifier against
- a **trained object classifier**, `cell_type_classifier` (an OpenCV ML / RTrees model)
- a `scripts/` folder of helper scripts, reached from `Automate > Project scripts`

Unzip it anywhere and **work on `tme_00.tif`** throughout.

### 2. Load it into QuPath

1. `File > Project... > Open project`, and pick **`project.qpproj`** in the unzipped folder.
2. QuPath pops up an **Update URIs** dialog — a project stores absolute image paths, so after
   unzipping on your machine it cannot find the images (they are listed in red). Click
   **Search...** (bottom-right), choose the folder you unzipped, and QuPath fills in the
   replacements; then click **Apply changes**. This happens once.
3. Double-click **`tme_00.tif`** in the project list to open it.

%%SHOT_CM_01_PROJECT_OPEN%%
> *Screenshot to add: the project open on `tme_00`, showing the detected cells and the scatter
> of colored ground-truth points.*

### 3. What you are looking at

- **Cells** are *detections* — the outlines. They start **unclassified** (no fill).
- The **colored dots** are *annotations* — the **ground truth**, one per cell.

The confusion matrix compares the class you put on the **cells** (the prediction) against the
class on the **points** (the truth). So first the cells need a classification.

### 4. Classify the cells (the thing being tested)

Run one of the bundled scripts from `Automate > Project scripts`:

- **`classify_with_marker_gate`** — a deliberately imperfect single-marker classifier. Use this
  one for the demo: it makes real, interpretable mistakes, so the matrix has interesting
  off-diagonal entries to click into.
- **`apply_trained_classifier`** — the trained RTrees model; near-perfect on this clean data,
  and the one to use for the probability/calibration tab (step 8), because it is an OpenCV ML
  classifier.

Run `Automate > Project scripts > classify_with_marker_gate`. The cells are now colored by
predicted class.

%%SHOT_CM_02_CLASSIFIED%%
> *Screenshot to add: the cells now colored by predicted class, with the ground-truth points
> still visible on top.*

### 5. Run the confusion matrix

`Extensions > Confusion Matrix > Analyze Current Image...`. The N × N matrix appears — rows are
the ground truth, columns the prediction — with per-class precision, recall, specificity and F1
beside it, each with a bootstrap 95% confidence interval.

%%SHOT_CM_03_MATRIX%%
> *Screenshot to add: the Confusion Matrix window on `tme_00` — the matrix on the left, the
> per-class metrics on the right.*

### 6. Read the interval, not just the number

Pick a class with a **wide** confidence interval and note how few ground-truth cells it has. A
95% accuracy from 40 cells and from 4000 cells are not the same claim, and the interval is what
makes that visible.

%%SHOT_CM_04_METRICS_CI%%
> *Screenshot to add: the per-class metrics panel, with a wide-CI class and its support count.*

### 7. Click the biggest off-diagonal cell

This is the moment worth watching. Click the largest off-diagonal cell of the matrix and those
cells **highlight in the QuPath viewer**. "The classifier is 87% accurate" becomes "it confuses
*these two things*, for *this visible reason*" — with the marker gate, the T cells called
`tumor` light up along the edges of the tumor nests, where the 5 µm cell expansion picked up
PanCK from the neighbouring tumour. It is also where you find out how often the *ground truth*
itself was wrong.

%%SHOT_CM_05_OFFDIAGONAL%%
> *Screenshot to add: an off-diagonal matrix cell selected, and the same cells highlighted in
> the viewer at a tumor-nest boundary.*

### 8. The whole project, and outliers (optional)

`Extensions > Confusion Matrix > Analyze Project...` aggregates across all eight images, with a
per-image breakdown and **automatically flagged outliers**. Open a flagged image and look for
the cause: the ground-truth labeling, the tissue or staining, or the classifier failing to
generalise.

%%SHOT_CM_06_PROJECT%%
> *Screenshot to add: the project-wide view with the per-image breakdown and a flagged outlier.*

### 9. Probability metrics and calibration (optional)

For an OpenCV ML classifier — run `apply_trained_classifier` first — the **Probability Metrics**
tab gives log-loss, Brier score, AUC-ROC, PR-AUC, and a per-class calibration curve. A model
that is 95% confident and 70% correct is a different problem from one that is simply inaccurate,
and it needs a different fix.

%%SHOT_CM_07_CALIBRATION%%
> *Screenshot to add: the Probability Metrics tab with a calibration curve.*

### The point to take away

**Report an interval.** A classifier accuracy without a confidence interval, and without a look
at *what* is being confused, is not yet a result — and getting both is a five-minute job here,
not a research project.

---

## What it does, in full

**Accuracy you can cite** — per-class precision, recall, specificity, F1 and overall accuracy,
each with a bootstrap confidence interval; an N × N matrix for any number of classes, including
composite classes like `Macrophage: FoxP3`; CSV export of the matrix and every metric.

**Probability metrics** (OpenCV ML classifiers) — log-loss, Brier, AUC-ROC, PR-AUC, and
calibration: whether the predicted probabilities themselves are trustworthy, not merely whether
the top class is right.

**Single image or whole project** — project-wide analysis with a per-image breakdown, automatic
statistical outlier detection, and class discovery from both detections and ground-truth
annotations with warnings when the two disagree.

**Flexible ground truth** — point annotations *or* classified area annotations, because
point-clicking every cell is often impractical; and the matrix is interactive.

## Where it came from

**Kristin Gallik** originated this one — the initial concept, and half of the scripts it grew
from. We built it out into the extension you see here, which is why the repository sits under her
account while the development history is ours. Good tools often start as somebody's script plus a
clear idea of what the number should mean.

## Availability

The repository is **private** at the time of writing, so the jar is not reachable without access.
That is the only reason this is a demo rather than an exercise; the extension has no hardware or
server requirement. If you want to use it, ask us during the session and we will sort out access.

---

**Full documentation:** the
[repository README](https://github.com/kgallik/QuPath_Confusion_Matrix_Extension#readme).
