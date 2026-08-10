# QuPath, end to end — I2K / BINA Congress 2026

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

**Format:** 1 hour presentation + 1 hour optional hands-on.
**Requires:** QuPath **0.7.0 or later**.

---

## Start here

| | |
|---|---|
| **[Extensions, catalogs & AI-assisted development](docs/00-extensions-catalogs-and-ai.md)** | Read this first — what an extension is, how catalogs work, and how this suite was built |
| **[Setup guide](docs/setup.md)** | **Do this before you travel.** Several extensions download large Python environments on first run |
| **[Schedule & hands-on tracks](docs/schedule.md)** | Hour-by-hour running order, plus four self-directed tracks |

## Files on Google Drive

| | |
|---|---|
| Workshop folder | %%DRIVE_FOLDER_URL%% |
| Presentation slides | %%DRIVE_SLIDES_URL%% |
| Datasets (`DATA-01`–`DATA-05`) | %%DRIVE_DATA_URL%% |

## Presented only (live demo, no hands-on)

These control real microscope hardware, so there is no interactive component — we are not
connecting a room full of laptops to a microscope.

- **[QPSC — QuPath Scope Control](docs/presented/qpsc.md)** — microscope control and automated
  acquisition driven from QuPath
- **[PPM — Polychromatic Polarization Microscopy](docs/presented/ppm.md)** — fibre orientation
  from colour-encoded polarised light

## Hands-on extensions

| # | Extension | What it does | Licence |
|---|---|---|---|
| 01 | **[QuIET — Image Export Toolkit](docs/01-quiet-image-export.md)** | Publication figures, masks, ML tile pairs, object crops and montages in batch, with QUAREP-LiMi guidance | Apache-2.0 |
| 02 | **[DL Pixel Classifier](docs/02-dl-pixel-classifier.md)** | Retrainable deep-learning pixel classification from sparse annotations | Apache-2.0 |
| 03 | **[QP-CAT — Cell Analysis Tools](docs/03-qp-cat-cell-analysis-tools.md)** | Clustering, phenotyping and spatial statistics for multiplexed data, with embedded Python | Apache-2.0 |
| 04 | **[Cluster 3D Navigator](docs/04-cluster-3d-navigator.md)** | Rotatable 3D point cloud of clustered cells; click a point, land on the cell | GPL-3.0 |
| 05 | **[Confusion Matrix](docs/05-confusion-matrix.md)** | Classifier validation with bootstrap confidence intervals and calibration analysis | Apache-2.0 |
| 06 | **[Wizard Wand](docs/06-wizard-wand.md)** | A faster, more forgiving wand with settings auto-tuned from your own example | GPL-3.0 |
| 07 | **[Polyline Wand & Brush](docs/07-polyline-wand.md)** | Brush editing for lines and polylines, not just areas | GPL-3.0 |
| 08 | **[Classify Object Subset](docs/08-classify-object-subset.md)** | Run a saved classifier on a chosen subset, with a live count before you commit | Apache-2.0 |
| 09 | **[OCR for Labels](docs/09-ocr4labels.md)** | Slide-label OCR and barcode scanning into project metadata, in batch | Apache-2.0 |
| 10 | **[Project Metadata Browser](docs/10-project-metadata-browser.md)** | Whole-project metadata table with buffered editing and full undo | GPL-3.0 |
| 11 | **[Class Distribution](docs/11-class-distribution.md)** | Live charts of annotation and training-class balance | Apache-2.0 |
| 12 | **[Channel Names Viewer](docs/12-channel-names-viewer.md)** | Always-visible colour-coded channel legend | Apache-2.0 |
| 13 | **[Dialog Position Manager](docs/13-dialog-position-manager.md)** | Remembers dialog positions; rescues off-screen windows | Apache-2.0 |
| 14 | **[Tiles to Pyramid](docs/14-tiles-to-pyramid.md)** | Stitch tile directories into pyramidal OME-TIFF / OME-ZARR | Apache-2.0 |

## Install everything

Add these two catalogs in QuPath (`Extensions > Manage extensions > Manage extension catalogs
> Add catalog`):

- **LOCI QuPath Extensions** — `https://github.com/uw-loci/qupath-catalog-mikenelson`
- **QPSC Microscope Extensions** — `https://github.com/uw-loci/qupath-catalog-qpsc`

Confusion Matrix is not currently in a catalog; install its jar from
[Releases](https://github.com/kgallik/QuPath_Confusion_Matrix_Extension/releases).

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
