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
| 0:22 | **From tiles to a real project** — stitching, slide-label OCR, and project metadata at scale | [Tiles to Pyramid](13-tiles-to-pyramid.md) · [OCR](08-ocr4labels.md) · [Metadata Browser](09-project-metadata-browser.md) |
| 0:29 | **Annotating and classifying** — better wands, subset classification, class balance, and deep-learning pixel classification | [Wizard Wand](05-wizard-wand.md) · [Polyline Wand](06-polyline-wand.md) · [Classify Subset](07-classify-object-subset.md) · [Class Distribution](10-class-distribution.md) · [DL Classifier](02-dl-pixel-classifier.md) |
| 0:39 | **Did it actually work?** — confusion matrices with bootstrap confidence intervals *(demo)* | [Confusion Matrix](presented/confusion-matrix.md) |
| 0:44 | **Multiplexed data** — clustering, spatial statistics, and navigating cluster space back to the slide | [QP-CAT](03-qp-cat-cell-analysis-tools.md) · [Cluster 3D](04-cluster-3d-navigator.md) |
| 0:49 | **Collagen fibre and texture analysis** — straightness, morphometrics, texture, and TACS *(demo)* | [Fibre analysis](presented/fiber-analysis.md) |
| 0:55 | **Getting it out** — publication-quality export with QUAREP-LiMi guidance, and where to get everything | [QuIET](01-quiet-image-export.md) |

**Slides:** %%DRIVE_SLIDES_URL%%

### Demo-only segments

Three things are shown but not practised, for reasons that are worth stating plainly:

- **[QPSC](presented/qpsc.md)** drives real microscope hardware. We are not connecting a room
  full of laptops to a microscope.
- **[Confusion Matrix](presented/confusion-matrix.md)** is in a private repository, so there is
  no jar for attendees to install. It has no other barrier — if the repo goes public before the
  workshop we will say so on the day.
- **[Fibre and texture analysis](presented/fiber-analysis.md)** needs either a long Appose
  environment build (Fiber Analysis) or a Windows-only Python server plus a pipeline that cannot
  be redistributed (TME-Quant).

---

## Hour 2 — Hands-on, optional (60 min)

There are thirteen hands-on extensions and sixty minutes. **Do not try to do all of them.**
Pick one track, or bring your own data and pick the tools that fit it.

| Time | |
|---|---|
| 1:00 | Setup triage — if anything from the [setup guide](setup.md) did not work, grab us now |
| 1:05 | Work through a track (or your own data) |
| 1:55 | Wrap-up, questions, and how to get help afterwards |

### Track A — Annotation and classification

*Best if you do brightfield/H&E work and spend a lot of time annotating.* **Data:** `DATA-01`

1. [Wizard Wand](05-wizard-wand.md) — 10 min
2. [Polyline Wand](06-polyline-wand.md) — 10 min
3. [Class Distribution](10-class-distribution.md) — 8 min
4. [Classify Object Subset](07-classify-object-subset.md) — 10 min

Finish early? Export your annotations as masks with [QuIET](01-quiet-image-export.md) and see
what a training set built from them looks like.

### Track B — Multiplexed imaging

*Best if you work with highly multiplexed IF.* **Data:** `DATA-02`

1. [Channel Names Viewer](11-channel-names-viewer.md) — 5 min
2. [QP-CAT — Cell Analysis Tools](03-qp-cat-cell-analysis-tools.md) — 20 min
3. [Cluster 3D Navigator](04-cluster-3d-navigator.md) — 10 min
4. [Classify Object Subset](07-classify-object-subset.md) — 10 min

*Requires the QP-CAT Python environment — install it before you arrive.*

### Track C — Publication and deep learning

*Best if your bottleneck is getting figures and datasets out of QuPath.* **Data:** `DATA-01`

1. [QuIET — Image Export Toolkit](01-quiet-image-export.md) — 15 min
2. [DL Pixel Classifier](02-dl-pixel-classifier.md), inference only — 15 min
3. **Join them up** — 15 min. Use QuIET's **Tiled export (ML)** to write image/label pairs from
   your annotations, then run the DL classifier over the same region and compare its output
   with the labels you exported. This is the round trip the two tools were built for.

*The DL extension requires its embedded Python environment — install it before you arrive.*

### Track D — Data wrangling at scale

*Best if you manage a lot of slides, or run a core facility.* **Data:** `DATA-03`, `DATA-04`

1. [OCR for Labels](08-ocr4labels.md) — 15 min
2. [Project Metadata Browser](09-project-metadata-browser.md) — 12 min
3. [Tiles to Pyramid](13-tiles-to-pyramid.md) — 12 min
4. [Dialog Position Manager](12-dialog-position-manager.md) — 5 min

*This track needs no large downloads and no GPU. It is the safest choice on a laptop.*

### Bring your own data

Genuinely encouraged. Tell us what you are trying to do and we will point you at the right
tool — and if there isn't one, that is useful for us to hear.
