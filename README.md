# New Extensions for QuPath

**From simple (dialog manager, wizard wand, image export) to complex (DL cell and pixel
classifiers, microscope control)**

An I2K workshop at the BioImaging North America Congress 2026.

| | |
|---|---|
| **Date** | Tuesday 29 September 2026 |
| **Time** | 10:30 – 12:30 |
| **Location** | Morgridge Hall, WARF Seminar Hub — Rm. 7560 |
| **Format** | Hour 1 presentation and demos · Hour 2 optional hands-on |
| **Requires** | QuPath **0.7.0 or later** |

**Live site → https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/**

Workshop materials for an [I2K](https://www.i2kconference.org/) workshop at the
[BioImaging North America](https://www.bioimagingnorthamerica.org/) Congress 2026, covering the
suite of open-source QuPath extensions developed at
[LOCI](https://loci.wisc.edu/), University of Wisconsin–Madison.

> QuPath is widely used for analysis of large 2D images, and its extension mechanism enables
> capabilities far beyond post-acquisition analysis. At LOCI, we have developed a suite of
> open-source QuPath extensions that add microscope hardware control and automated acquisition
> (QPSC), publication-quality image export with integrated QUAREP-LiMi guidance (QuIET),
> retrainable deep learning pixel classification, slide label OCR for automated metadata
> extraction, enhanced annotation tools, classifier validation with bootstrap statistics, and
> specialized imaging analysis including polychromatic polarization microscopy. In this
> workshop we will demonstrate these extensions through a mix of live microscope demos,
> interactive exercises, and hands-on exploration, showing how QuPath can serve as a unified
> environment from acquisition through publication. The first hour will be dedicated to
> introducing the tools, with the second hour being optional exploration of the extensions with
> provided or user-provided data sets.

---

## Start here

| | |
|---|---|
| **[Extensions, catalogs & AI-assisted development](docs/00-extensions-catalogs-and-ai.md)** | Read this first — what an extension is, how catalogs work, and how this suite was built |
| **[Walkthroughs & videos](docs/walkthroughs.md)** | A written walkthrough and a video for every tool, plus the vote for what we demo live |
| **[Extension index](docs/extensions.md)** | Every extension with its install source and guide — for picking just the ones you want |
| **[Setup guide](docs/setup.md)** | **Do this before you travel.** Several extensions download large Python environments on first run |
| **[Schedule & hands-on tracks](docs/schedule.md)** | Hour-by-hour running order, plus four self-directed tracks |

## For organisers

**[I2K form responses](I2K_FORM_RESPONSES.md)** — paste-ready answers for the I2K
"Additional Details and Information for Participants" form. **Due 1 September 2026.**

## Files on Google Drive

| | |
|---|---|
| Workshop folder | %%DRIVE_FOLDER_URL%% |
| Presentation slides | %%DRIVE_SLIDES_URL%% |
| Datasets (`DATA-01`–`DATA-05`) | %%DRIVE_DATA_URL%% |

## Presented only (live demo, no hands-on)

Shown during the first hour but not practised. Each has a hard barrier to installing it in a
conference room, stated on its page.

- **[QPSC — QuPath Scope Control](docs/presented/qpsc.md)** — microscope control and automated
  acquisition driven from QuPath. *Needs a microscope.*
- **[Confusion Matrix](docs/presented/confusion-matrix.md)** — classifier validation with
  bootstrap confidence intervals and calibration analysis. *Repository is currently private, so
  there is no jar for attendees to install.*
- **[Collagen fibre and texture analysis](docs/presented/fiber-analysis.md)** — Fiber Analysis
  (straightness, morphometrics, texture over a boundary zone) and TME-Quant (CT-FIRE fibre
  tracing with TACS classification). *Long environment build, or a Windows-only server plus a
  non-redistributable pipeline.*

## Hands-on extensions

| # | Extension | What it does | Licence |
|---|---|---|---|
| 01 | **[QuIET — Image Export Toolkit](docs/01-quiet-image-export.md)** | Publication figures, masks, ML tile pairs, object crops and montages in batch, with QUAREP-LiMi guidance | Apache-2.0 |
| 02 | **[DL Pixel Classifier](docs/02-dl-pixel-classifier.md)** | Retrainable deep-learning pixel classification from sparse annotations | Apache-2.0 |
| 03 | **[QP-CAT — Cell Analysis Tools](docs/03-qp-cat-cell-analysis-tools.md)** | Clustering, phenotyping and spatial statistics for multiplexed data, with embedded Python | Apache-2.0 |
| 04 | **[Cluster 3D Navigator](docs/04-cluster-3d-navigator.md)** | Rotatable 3D point cloud of clustered cells; click a point, land on the cell | GPL-3.0 |
| 05 | **[Wizard Wand](docs/05-wizard-wand.md)** | A faster, more forgiving wand with settings auto-tuned from your own example | GPL-3.0 |
| 06 | **[Polyline Wand & Brush](docs/06-polyline-wand.md)** | Brush editing for lines and polylines, not just areas | GPL-3.0 |
| 07 | **[Classify Object Subset](docs/07-classify-object-subset.md)** | Run a saved classifier on a chosen subset, with a live count before you commit | Apache-2.0 |
| 08 | **[OCR for Labels](docs/08-ocr4labels.md)** | Slide-label OCR and barcode scanning into project metadata, in batch | Apache-2.0 |
| 09 | **[Project Metadata Browser](docs/09-project-metadata-browser.md)** | Whole-project metadata table with buffered editing and full undo | GPL-3.0 |
| 10 | **[Class Distribution](docs/10-class-distribution.md)** | Live charts of annotation and training-class balance | Apache-2.0 |
| 11 | **[Channel Names Viewer](docs/11-channel-names-viewer.md)** | Always-visible colour-coded channel legend | Apache-2.0 |
| 12 | **[Dialog Position Manager](docs/12-dialog-position-manager.md)** | Remembers dialog positions; rescues off-screen windows | Apache-2.0 |
| 13 | **[Tiles to Pyramid](docs/13-tiles-to-pyramid.md)** | Stitch tile directories into pyramidal OME-TIFF / OME-ZARR | Apache-2.0 |

## Install everything

Add these two catalogs in QuPath (`Extensions > Manage extensions > Manage extension catalogs
> Add catalog`):

- **LOCI QuPath Extensions** — `https://github.com/uw-loci/qupath-catalog-mikenelson`
- **QPSC Microscope Extensions** — `https://github.com/uw-loci/qupath-catalog-qpsc`

Full instructions, including the dataset list, are in the **[setup guide](docs/setup.md)**.

---

## For maintainers of this repo

The site is plain Jekyll on GitHub Pages, served from the root of `main`.

- `index.html` — the landing page. No front matter, so Jekyll copies it verbatim. Links point
  at `.html`.
- `docs/*.md` — one page per extension. Front matter sets the layout; `_config.yml` applies it
  to everything under `docs/`.
- `_layouts/default.html` — the dark house style, plus a small script that rewrites *relative*
  `.md` links to `.html` at runtime, so the same markdown reads correctly both on GitHub and on
  the published site.
- `images/`, `assets/` — screenshots and any media.

**Drive links are placeholders.** Fill them in everywhere with:

```bash
grep -rl '%%DRIVE_' . --exclude-dir=.git
sed -i 's|%%DRIVE_FOLDER_URL%%|https://…|g' $(grep -rl '%%DRIVE_FOLDER_URL%%' . --exclude-dir=.git)
```

Repeat for `%%DRIVE_SLIDES_URL%%` and `%%DRIVE_DATA_URL%%`.

## Licence

Workshop materials in this repository are **CC BY 4.0**. Each extension is licensed
separately — see the table above and the individual repositories.
