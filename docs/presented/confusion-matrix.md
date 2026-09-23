---
layout: default
title: Confusion Matrix (presented only)
---

# Confusion Matrix

> **Shown, not run.** The repository is currently **private**, so there is no jar for attendees
> to install and no exercise to follow. Watch the demo.

Validates an object classifier against ground-truth annotations: an interactive N × N confusion
matrix you can click into, plus per-class precision, recall, F1 and specificity with bootstrap
confidence intervals.

> **Walkthrough video:** %%VIDEO_CONFUSION_MATRIX%%

---

## Where to read more

[kgallik/QuPath_Confusion_Matrix_Extension](https://github.com/kgallik/QuPath_Confusion_Matrix_Extension#readme)
— **note that this link needs access you probably do not have yet**, for the same reason there
is no download.

The concept and the initial scripts are **Kristin Gallik's**; it was built out into an extension
at LOCI. See [acknowledgements](../acknowledgements.md).

## What to do instead, today

You can get the same comparison with **core QuPath and no extension**. The
[synth multiplex project](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-demo-project-v1.2.zip)
bundles `check_against_ground_truth.groovy`, which prints a confusion matrix and overall
accuracy and selects the misclassified cells in the viewer. The
[Classify Object Subset walkthrough](../07-classify-object-subset.md) uses it, and that one you
can run.
