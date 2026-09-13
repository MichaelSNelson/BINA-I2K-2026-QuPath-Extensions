# New Extensions for QuPath

**From simple (dialog manager, wizard wand, image export) to complex (DL cell and pixel
classifiers, microscope control)**

An I2K workshop at the BioImaging North America Congress 2026.

| | |
|---|---|
| **Date** | Tuesday 29 September 2026 |
| **Time** | 10:30 – 12:30 |
| **Location** | Morgridge Hall, WARF Seminar Hub, Rm. 7560 |
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


> ### ⚠️ This site is still being built
>
> Setup, guides and exercises are all current and usable now, and the **datasets are now linked**
> and ready to download. Still to come: the slides and the walkthrough videos. Anywhere you see a `%%PLACEHOLDER%%` instead of a link, that is why.
> It will all be in place before 29 September.

## Setup: do this before you travel

**1. Install QuPath 0.7.0 or later** from [qupath.github.io](https://qupath.github.io/). Nothing
here runs on 0.6. QuPath 0.7 keeps its own extensions folder, so an existing 0.6 setup is
untouched.

**2. Add one catalog.** Go to `Extensions > Manage extensions > Manage extension catalogs >
Add catalog`, then paste:

```
https://github.com/uw-loci/qupath-catalog-mikenelson
```

That is the only catalog you need. Everything hands-on in this workshop is in it.

**3. Install only the extensions you want, then restart QuPath.**

> **Adding the catalog installs nothing.** It shows you a list. **Do not install everything in
> it.** QP-CAT and the DL Pixel Classifier each fetch a **1.5–2.5 GB** Python environment on
> first use. If one or two extensions are why you are coming, install just those.

**4. Download the data** for the track you plan to do. The multiplexed track needs only a
[20 MB public dataset](https://github.com/uw-loci/tme-quant-synthetic-data/releases/latest).

**Full instructions, including the per-track dataset list: [setup guide](docs/setup.md).**

---

## Start here

| | |
|---|---|
| **[Extensions, catalogs & AI-assisted development](docs/00-extensions-catalogs-and-ai.md)** | Read this first: what an extension is, how catalogs work, and how this suite was built |
| **[Acknowledgements](docs/acknowledgements.md)** | Data providers, the QuPath team, and the methods these tools build on |
| **[Walkthroughs & videos](docs/walkthroughs.md)** | A written walkthrough and a video for every tool, plus the vote for what we demo live |
| **[Extension index](docs/extensions.md)** | Every extension with its install source and guide, for picking just the ones you want |
| **[Schedule](docs/schedule.md)** | Hour-by-hour running order, plus suggested tracks for the second hour |

## Files on Google Drive

| | |
|---|---|
| **QuPath intro project** (`DATA-01` + `DATA-02`) | [Drive folder](https://drive.google.com/drive/folders/1waxGfZt3Ua_EKcC86fOn8Qr89lZXnrIX?usp=sharing), ~500 MB. CMU-1 H&E and LuCa-7color, cells detected, classifiers saved. From [imagescientist.com/qupath-intro](https://www.imagescientist.com/qupath-intro) |
| **Synthetic TME** (`TME-SYNTH`) | [GitHub release](https://github.com/uw-loci/tme-quant-synthetic-data/releases/latest), ~20 MB, CC0 |
| **Slides with labels** (`DATA-03`) | [LabelImageExamples_from_LJI.zip](https://drive.google.com/file/d/1xm99nEa0okF7USeip0PTDv6PT4Ut5eWX/view?usp=sharing), **over 500 MB** |
| `DATA-04_tiles` | Not yet assembled |
| Workshop folder | %DRIVE_FOLDER_URL% |
| Presentation slides | %DRIVE_SLIDES_URL% |

## Shown, not practised

These three appear in the first hour, but attendees do not run them. Each has a hard barrier to
installing it in a conference room, stated on its page. **QPSC in particular is watched, never driven**: nobody in the room connects to
a microscope.

- **[QPSC — QuPath Scope Control](docs/presented/qpsc.md)** does microscope control and automated
  acquisition from QuPath. *Needs a microscope.*
- **[Confusion Matrix](docs/presented/confusion-matrix.md)** does classifier validation with
  bootstrap confidence intervals and calibration analysis. *Repository is currently private, so
  there is no jar for attendees to install.*
- **[Collagen fibre and texture analysis](docs/presented/fiber-analysis.md)** covers Fiber Analysis
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
| 07 | **[Classify Object Subset](docs/07-classify-object-subset.md)** | Run a saved classifier on a chosen subset, with a live count before you commit. *Shown in Sara McArdle’s earlier session* | Apache-2.0 |
| 08 | **[OCR for Labels](docs/08-ocr4labels.md)** | Slide-label OCR and barcode scanning into project metadata, in batch | Apache-2.0 |
| 09 | **[Project Metadata Browser](docs/09-project-metadata-browser.md)** | Whole-project metadata table with buffered editing and full undo | GPL-3.0 |
| 10 | **[Class Distribution](docs/10-class-distribution.md)** | Live charts of annotation and training-class balance | Apache-2.0 |
| 11 | **[Channel Names Viewer](docs/11-channel-names-viewer.md)** | Always-visible colour-coded channel legend. *Shown in Sara McArdle’s earlier session* | Apache-2.0 |
| 12 | **[Dialog Position Manager](docs/12-dialog-position-manager.md)** | Remembers dialog positions; rescues off-screen windows | Apache-2.0 |
| 13 | **[Tiles to Pyramid](docs/13-tiles-to-pyramid.md)** | Stitch tile directories into pyramidal OME-TIFF / OME-ZARR | Apache-2.0 |

---

## For maintainers of this repo

The site is plain Jekyll on GitHub Pages, served from the root of `main`.

- `index.html` is the landing page. It has no front matter, so Jekyll copies it verbatim. Its
  links point at `.html`.
- `docs/*.md` holds one page per extension. Front matter sets the layout, and `_config.yml`
  applies it to everything under `docs/`.
- `_layouts/default.html` holds the dark house style, plus a small script that rewrites
  *relative* `.md` links to `.html` at runtime, so the same markdown reads correctly both on GitHub and on
  the published site.
- `images/` and `assets/` hold screenshots and any media.

**Drive links are placeholders.** Fill them in everywhere with:

```bash
grep -rl '%%DRIVE_' . --exclude-dir=.git
sed -i 's|%%DRIVE_FOLDER_URL%%|https://…|g' $(grep -rl '%%DRIVE_FOLDER_URL%%' . --exclude-dir=.git)
```

Repeat for `%%DRIVE_SLIDES_URL%%`. (`%%DRIVE_DATA_URL%%` is retired: datasets now link directly to where they are hosted.)

## Acknowledgements

**The majority of the test and demonstration data used throughout this workshop was provided by
Sara McArdle and Zbigniew Mikulski at the La Jolla Institute for Immunology (LJI).** Almost every
exercise here was developed against their images. Please credit LJI if you use the workshop
datasets in your own work.

Sara McArdle also shaped the software directly. Two extensions in this workshop began as her
Groovy scripts, and her [FS2K](https://github.com/saramcardle/FS2K) course was the model for how
these pages are structured.

Full credits, including the methods these tools wrap and the QuPath team:
**[docs/acknowledgements.md](docs/acknowledgements.md)**.

## Licence

Workshop materials in this repository are **CC BY 4.0**. Each extension is licensed separately;
see the table above and the individual repositories.
