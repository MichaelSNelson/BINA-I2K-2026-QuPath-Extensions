---
layout: default
title: Workshop schedule
---

# Workshop schedule

**Tuesday 29 September 2026, 10:30 – 12:30. Morgridge Hall, WARF Seminar Hub — Rm. 7560.** The first hour is presentation
and live demos; the second is optional, self-directed hands-on exploration. You are welcome to leave after the first hour, and equally welcome to
spend the second hour on your own data instead of ours.

---

## Session details

| | |
|---|---|
| **Title** | New Extensions for QuPath: From simple (dialog manager, wizard wand, image export) to complex (DL cell and pixel classifiers, microscope control) |
| **Date** | Tuesday 29 September 2026 |
| **Time** | 10:30 – 12:30 |
| **Location** | Morgridge Hall, WARF Seminar Hub — Rm. 7560 |
| **Format** | Hour 1 presentation and demos · Hour 2 optional hands-on |

---

## Hour 1 — Presentation and demos (10:30 – 11:30)

The order follows the session title: start with tools you can install in two minutes and use
this afternoon, end with the ones that need a Python server and a microscope.

| Time | Topic | Pages |
|---|---|---|
| 10:30 | **Welcome and framing** — QuPath as one environment from acquisition to publication | — |
| 10:35 | **Extensions, catalogs, and how this suite was built** — including where AI-assisted development helped and where it did not | [intro](00-extensions-catalogs-and-ai.md) |
| 10:41 | **Simple wins** — small extensions that pay for themselves the first day: dialog positions that survive an undocked laptop, a channel legend for presenting, and two better wands | [Dialog Manager](12-dialog-position-manager.md) · [Channel Names](11-channel-names-viewer.md) · [Wizard Wand](05-wizard-wand.md) · [Polyline Wand](06-polyline-wand.md) |
| 10:49 | **Image export** — publication figures, masks and ML datasets in batch, with QUAREP-LiMi guidance and a generated Groovy script every time | [QuIET](01-quiet-image-export.md) |
| 10:55 | **Project-scale housekeeping** — slide-label OCR into metadata, whole-project metadata editing, class balance, and subset classification | [OCR](08-ocr4labels.md) · [Metadata Browser](09-project-metadata-browser.md) · [Class Distribution](10-class-distribution.md) · [Classify Subset](07-classify-object-subset.md) |
| 11:02 | **Did it actually work?** — confusion matrices with bootstrap confidence intervals *(demo)* | [Confusion Matrix](presented/confusion-matrix.md) |
| 11:07 | **DL cell and pixel classifiers** — deep pixel classification from sparse annotations; clustering, autoencoder cell classification and spatial statistics on multiplexed data; navigating cluster space back to the slide | [DL Classifier](02-dl-pixel-classifier.md) · [QP-CAT](03-qp-cat-cell-analysis-tools.md) · [Cluster 3D](04-cluster-3d-navigator.md) |
| 11:15 | **Collagen fibre and texture analysis** — straightness, morphometrics, texture, and TACS *(demo)* | [Fibre analysis](presented/fiber-analysis.md) |
| 11:20 | **Microscope control** — draw a box in QuPath, acquire, stitch, land back in the project *(live demo)* | [QPSC](presented/qpsc.md) · [Tiles to Pyramid](13-tiles-to-pyramid.md) |
| 11:29 | **Where to get everything**, and what to do in the second hour | [setup](setup.md) |

**Slides:** %%DRIVE_SLIDES_URL%%

> **We cannot demo everything.** There is time for a handful of tools done properly, not sixteen
> done badly. Which ones we spend the live time on is driven by
> [your vote](walkthroughs.md) — and every tool, demoed or not, has a full walkthrough and video.

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

## Hour 2 — Hands-on, optional (11:30 – 12:30)

There are thirteen hands-on extensions and sixty minutes. **Do not try to do all of them.**
Pick one track, or bring your own data and pick the tools that fit it.

Whatever you do not get to, you lose nothing: every tool has a
[written walkthrough and a recorded video](walkthroughs.md), so you can work through the rest at
your own pace afterwards.

| Time | |
|---|---|
| 11:30 | Setup triage — if anything from the [setup guide](setup.md) or the [extension index](extensions.md) did not work, grab us now |
| 11:35 | Work through a track (or your own data) |
| 12:25 | Wrap-up, questions, and how to get help afterwards |

### Track A — Annotation and classification

*Best if you do brightfield/H&E work and spend a lot of time annotating.* **Data:** `DATA-01`

1. [Wizard Wand](05-wizard-wand.md) — 10 min
2. [Polyline Wand](06-polyline-wand.md) — 10 min
3. [Class Distribution](10-class-distribution.md) — 8 min
4. [Classify Object Subset](07-classify-object-subset.md) — 10 min

Finish early? Export your annotations as masks with [QuIET](01-quiet-image-export.md) and see
what a training set built from them looks like.

### Track B — Multiplexed imaging

*Best if you work with highly multiplexed IF.* **Data:** `TME-SYNTH` (~20 MB, straight from
[GitHub](https://github.com/uw-loci/tme-quant-synthetic-data/releases/latest); `DATA-02` only for step 4)

1. [Channel Names Viewer](11-channel-names-viewer.md) — 5 min
2. [QP-CAT — Cell Analysis Tools](03-qp-cat-cell-analysis-tools.md) — 20 min (parts A and B alone are ~10)
3. [Cluster 3D Navigator](04-cluster-3d-navigator.md) — 10 min
4. [Classify Object Subset](07-classify-object-subset.md) — 10 min

*Requires the QP-CAT Python environment — install it before you arrive.*

The synthetic data is fully ground-truthed, so every step of the QP-CAT exercise can be checked
against the right answer — a luxury real multiplexed tissue never gives you.

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
