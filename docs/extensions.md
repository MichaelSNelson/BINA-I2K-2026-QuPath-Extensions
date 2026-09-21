---
layout: default
title: Extension index - install just what you need
---

# Extension index

**You do not have to install all of these.** If one or two extensions are the reason you are
coming, install those and ignore the rest. Every one works on its own.

Each row links to a full guide (what it does, and a step-by-step exercise) and to the source
repository. Two of them, Channel Names Viewer and Classify Object Subset, are demonstrated in
**Sara McArdle's** Monday session, *Tips and tricks for maintaining sanity during hi-plex classification in QuPath*;
her scripts are where both extensions came from. They are still fully installable, we simply do
not demo them twice in one morning. If you would rather be told exactly what to install for a particular hands-on
track, use the [setup guide](setup.md) instead. Every tool also has a
[written walkthrough and a video](walkthroughs.md), whether or not we reach it live.

---

## Installing

All of these install the same way: add the **LOCI QuPath Extensions** catalog once, tick the ones
you want, restart QuPath. The [setup guide](setup.md) has the catalog URL and the exact steps, and
says what each hands-on track needs.

**Adding a catalog installs nothing by itself, and you should not install everything in it.**
QP-CAT fetches a 1.5–2.5 GB Python environment; the DL Pixel Classifier fetches 2–4 GB.

---

## Hands-on extensions

| Extension | What it is for | Notes | Guide |
|---|---|---|---|
| **A · Annotation and classification** | | | |
| **Class Distribution** | Live charts of annotation balance and implied training balance | | [Guide](10-class-distribution.md) · [repo](https://github.com/uw-loci/qupath-extension-class-distribution) |
| **Classify Object Subset** | Run a saved classifier on a chosen subset, with a live count first · *needs 0.2.0; earlier jars carry the old name* · *shown in Sara McArdle’s session* | | [Guide](07-classify-object-subset.md) · [repo](https://github.com/uw-loci/qupath-extension-classify-object-subset) |
| **Polyline Wand & Brush** | Brush editing for lines and polylines, not just areas | | [Guide](06-polyline-wand.md) · [repo](https://github.com/uw-loci/qupath-extension-polyline-wand) |
| **QuIET — Image Export Toolkit** | Publication figures, masks, ML tile pairs and montages in batch, with QUAREP-LiMi guidance | also in Track C | [Guide](01-quiet-image-export.md) · [repo](https://github.com/uw-loci/qupath-extension-image-export-toolkit) |
| **Wizard Wand** | A faster, more forgiving wand, with settings auto-tuned from your own example | | [Guide](05-wizard-wand.md) · [repo](https://github.com/uw-loci/qupath-extension-wizard-wand) |
| **B · Multiplexed imaging** | | | |
| **Channel Names Viewer** | Always-visible, color-coded legend of selected fluorescence channels · *shown in Sara McArdle’s session* | | [Guide](11-channel-names-viewer.md) · [repo](https://github.com/uw-loci/qupath-extension-channel-names-viewer) |
| **Cluster 3D Navigator** | Rotatable 3D point cloud of clustered cells; click a point, land on the cell | | [Guide](04-cluster-3d-navigator.md) · [repo](https://github.com/uw-loci/qupath-extension-cluster-3d-navigator) |
| **QP-CAT — Cell Analysis Tools** | Clustering, phenotyping and spatial statistics for multiplexed data | **large download**| [Guide](03-qp-cat-cell-analysis-tools.md) · [repo](https://github.com/uw-loci/qupath-extension-cell-analysis-tools) |
| **C · Publication and deep learning** | | | |
| **QuIET — Image Export Toolkit** | Publication figures, masks, ML tile pairs and montages in batch, with QUAREP-LiMi guidance | also in Track A | [Guide](01-quiet-image-export.md) · [repo](https://github.com/uw-loci/qupath-extension-image-export-toolkit) |
| **DL Pixel Classifier** | Deep-learning pixel classification from sparse annotations | **large download**| [Guide](02-dl-pixel-classifier.md) · [repo](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier) |
| **D · Data wrangling at scale** | | | |
| **Dialog Position Manager** | Remembers dialog positions; rescues windows lost with a disconnected monitor | | [Guide](12-dialog-position-manager.md) · [repo](https://github.com/uw-loci/qupath-extension-dialog-manager) |
| **OCR for Labels** | Slide-label OCR and barcode scanning into project metadata | [extra setup](08-ocr4labels.md#setup-do-this-before-the-workshop)| [Guide](08-ocr4labels.md) · [repo](https://github.com/uw-loci/qupath-extension-ocr4labels) |
| **Project Metadata Browser** | Whole-project metadata table with buffered editing and full undo | | [Guide](09-project-metadata-browser.md) · [repo](https://github.com/uw-loci/qupath-extension-project-metadata-browser) |
| **Tiles to Pyramid** | Stitch tile directories into pyramidal OME-TIFF / OME-ZARR | | [Guide](13-tiles-to-pyramid.md) · [repo](https://github.com/uw-loci/qupath-extension-tiles-to-pyramid) |

### The two that need a large download

**QP-CAT** and the **DL Pixel Classifier** each install an embedded Python environment on first
run — **1.5–2.5 GB** for QP-CAT, **2–4 GB** for the DL Pixel Classifier. If you want either,
trigger that download **at home**:

- QP-CAT: `Extensions > QP-CAT > Setup environment`
- DL Pixel Classifier: open the extension once and let it prepare its environment

Everything else in the table installs in seconds.

**OCR for Labels** also needs a small extra step: two Tesseract language files, about 14 MB,
downloaded from inside the extension. See [its guide](08-ocr4labels.md#setup-do-this-before-the-workshop).

---

## Demonstrated, but not installable today

These three appear in the first hour but are not part of the hands-on session. Each page says
why.

| Extension | What it is for | Why not hands-on |
|---|---|---|
| **[QPSC — QuPath Scope Control](presented/qpsc.md)** | Microscope control and automated acquisition driven from QuPath | Needs a microscope; shown only |
| **[Confusion Matrix](presented/confusion-matrix.md)** | Classifier validation with bootstrap confidence intervals and calibration | Repository is currently private, so there is no jar to install |
| **[Collagen fiber and texture analysis](presented/fiber-analysis.md)** | Straightness, morphometrics, texture, and TACS fiber classification | Long environment build, or a Windows-only server plus a pipeline that cannot be redistributed |

---

## Files to download

Sample datasets and the presentation slides are linked from the
**[setup guide](setup.md)**, which also says which dataset each exercise uses, so you only need
to download what you will actually use.

The multiplexed-imaging exercises use the
[TME-QUANT synthetic dataset](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-v1.2.zip), ~14 MB, public domain, fully ground-truthed, and
downloadable straight from GitHub without waiting on us.

You are also very welcome to **bring your own data**. Tell us what you are trying to do and we
will point you at the right tool.
