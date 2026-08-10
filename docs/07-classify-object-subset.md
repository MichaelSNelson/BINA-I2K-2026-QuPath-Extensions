---
layout: default
title: Classify Object Subset
---

# Classify Object Subset

> Run a saved object classifier on a *chosen subset* of objects instead of every object in
> the image. Pick the subset by class, by measurement value, by what you have selected — or
> any combination — with a live count before you commit.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-classify-object-subset](https://github.com/uw-loci/qupath-extension-classify-object-subset) |
| **Version at workshop** | 0.1.0 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+ |
| **Where to find it** | `Extensions > Classify Object Subset` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

---

## What it does

QuPath's built-in `Classify > Object classification > Apply classifier` always runs on
**every** compatible object in the image. There is no built-in GUI for "apply this classifier
only to cells that are Tumor," or "only to cells the previous classifier left unclassified."

You can do it in Groovy — this pattern was originally explored in
[Sara McArdle's `B_Helper_Cyto.groovy`](https://github.com/saramcardle/Image-Analysis-Scripts/blob/master/QuPath%20Groovy%20Scripts/Workshop%20Examples/B_Helper_Cyto.groovy)
and discussed in [this image.sc thread](https://forum.image.sc/t/feature-request-apply-classifiers-to-only-some-selected-objects/86383)
— but only if you are comfortable writing scripts. This extension is the GUI for it.

**Pick the subset by:**

- **class** (one or several),
- **measurement value** (e.g. `Cell: Autofluorescence max` greater than 11.0),
- **current viewer selection**,
- or any combination of the above.

The dialog shows a **live count** — "337 of 5,353 objects will be classified" — before you
click Apply. That number is the whole point: you find out you targeted the wrong 5,000
objects *before* you overwrite them.

**Common uses:**

- **Stack two classifiers.** Run a CD20 classifier first, then run a CD4/CD8 classifier only
  on the cells the first one left unclassified.
- **Pre-filter a noisy image.** Run a strong-marker classifier only on cells whose intensity
  is already above threshold.
- **Iterate on a small region.** Classify just what you have selected in the viewer, without
  touching the rest of the image.

**Every Apply is recorded as a workflow step**, so the same subset operation can be re-run
across a whole project as a script — the GUI is exploratory, the script is reproducible.

## Install

Via the **LOCI QuPath Extensions** catalog, or the jar from
[Releases](https://github.com/uw-loci/qupath-extension-classify-object-subset/releases).
Restart QuPath.

---

## Hands-on exercise (~10 min)

**Data:** `DATA-02_multiplex_IF` — cells detected, with at least one saved object classifier.

1. `Extensions > Classify Object Subset`.
2. Choose a saved classifier. Set **Object source** to *Custom filter*.
3. Add a **class filter**. Watch the live count change.
4. Add a **measurement filter** on top of it. Watch it change again.
5. Before clicking Apply, predict what the count *should* be. Check whether you were right —
   this is the habit the tool is trying to build.
6. Apply.
7. Now do the stacked-classifier trick: filter to **unclassified** cells only, and run a
   second classifier on just those. Confirm the first classifier's calls survived untouched.
8. Open `Automate > Show workflow command history` and find the recorded steps. Export them
   as a script.

### What to notice

- The live count is a guard against the most expensive mistake in object classification:
  silently reclassifying work you already did.
- Stacked classifiers are often much easier to build and validate than one big multi-class
  classifier — each one only has to be good at one distinction.
- Because every Apply becomes a workflow step, the exploratory session you just did converts
  directly into a batch script.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-classify-object-subset#readme).
