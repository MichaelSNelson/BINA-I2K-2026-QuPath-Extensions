---
layout: default
title: Workshop schedule
---

# Workshop schedule

**Two hours.** The first is presentation and live demos; the second is optional, self-directed
hands-on exploration. You are welcome to leave after the first hour, and equally welcome to
spend the second hour on your own data instead of ours.

---

## Hour 1 — Presentation and demos (60 min)

| Time | Topic | Pages |
|---|---|---|
| 0:00 | **Welcome and framing** — QuPath as one environment from acquisition to publication | — |
| 0:05 | **Extensions, catalogs, and how this suite was built** — including where AI-assisted development helped and where it did not | [intro](00-extensions-catalogs-and-ai.md) |
| 0:12 | **QPSC — microscope control from QuPath.** Live demo: draw a box, acquire, stitch, land back in the project | [QPSC](presented/qpsc.md) |
| 0:24 | **PPM — polychromatic polarization.** Calibration through to quantitative fibre orientation | [PPM](presented/ppm.md) |
| 0:30 | **From tiles to a real project** — stitching, slide-label OCR, and project metadata at scale | [Tiles to Pyramid](14-tiles-to-pyramid.md) · [OCR](09-ocr4labels.md) · [Metadata Browser](10-project-metadata-browser.md) |
| 0:36 | **Annotating and classifying** — better wands, subset classification, class balance, and deep-learning pixel classification | [Wizard Wand](06-wizard-wand.md) · [Polyline Wand](07-polyline-wand.md) · [Classify Subset](08-classify-object-subset.md) · [Class Distribution](11-class-distribution.md) · [DL Classifier](02-dl-pixel-classifier.md) |
| 0:46 | **Did it actually work?** — confusion matrices with bootstrap confidence intervals | [Confusion Matrix](05-confusion-matrix.md) |
| 0:51 | **Multiplexed data** — clustering, spatial statistics, and navigating cluster space back to the slide | [QP-CAT](03-qp-cat-cell-analysis-tools.md) · [Cluster 3D](04-cluster-3d-navigator.md) |
| 0:56 | **Getting it out** — publication-quality export with QUAREP-LiMi guidance, and where to get everything | [QuIET](01-quiet-image-export.md) |

**Slides:** %%DRIVE_SLIDES_URL%%

---

## Hour 2 — Hands-on, optional (60 min)

There are fourteen hands-on extensions and sixty minutes. **Do not try to do all of them.**
Pick one track, or bring your own data and pick the tools that fit it.

| Time | |
|---|---|
| 1:00 | Setup triage — if anything from the [setup guide](setup.md) did not work, grab us now |
| 1:05 | Work through a track (or your own data) |
| 1:55 | Wrap-up, questions, and how to get help afterwards |

### Track A — Annotation and classification

*Best if you do brightfield/H&E work and spend a lot of time annotating.* **Data:** `DATA-01`, `DATA-05`

1. [Wizard Wand](06-wizard-wand.md) — 10 min
2. [Polyline Wand](07-polyline-wand.md) — 10 min
3. [Class Distribution](11-class-distribution.md) — 8 min
4. [Classify Object Subset](08-classify-object-subset.md) — 10 min
5. [Confusion Matrix](05-confusion-matrix.md) — 15 min

### Track B — Multiplexed imaging

*Best if you work with highly multiplexed IF.* **Data:** `DATA-02`

1. [Channel Names Viewer](12-channel-names-viewer.md) — 5 min
2. [QP-CAT — Cell Analysis Tools](03-qp-cat-cell-analysis-tools.md) — 20 min
3. [Cluster 3D Navigator](04-cluster-3d-navigator.md) — 10 min
4. [Classify Object Subset](08-classify-object-subset.md) — 10 min

*Requires the QP-CAT Python environment — install it before you arrive.*

### Track C — Publication and deep learning

*Best if your bottleneck is getting figures and datasets out of QuPath.* **Data:** `DATA-01`

1. [QuIET — Image Export Toolkit](01-quiet-image-export.md) — 15 min
2. [DL Pixel Classifier](02-dl-pixel-classifier.md), inference only — 15 min
3. [Confusion Matrix](05-confusion-matrix.md) — 15 min

*The DL extension requires its embedded Python environment — install it before you arrive.*

### Track D — Data wrangling at scale

*Best if you manage a lot of slides, or run a core facility.* **Data:** `DATA-03`, `DATA-04`

1. [OCR for Labels](09-ocr4labels.md) — 15 min
2. [Project Metadata Browser](10-project-metadata-browser.md) — 12 min
3. [Tiles to Pyramid](14-tiles-to-pyramid.md) — 12 min
4. [Dialog Position Manager](13-dialog-position-manager.md) — 5 min

*This track needs no large downloads and no GPU. It is the safest choice on a laptop.*

### Bring your own data

Genuinely encouraged. Tell us what you are trying to do and we will point you at the right
tool — and if there isn't one, that is useful for us to hear.
