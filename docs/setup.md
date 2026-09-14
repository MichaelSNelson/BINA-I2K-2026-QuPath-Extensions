---
layout: default
title: Setup - do this before the workshop
---

# Setup: please do this **before** the workshop

Conference wifi will not survive thirty people downloading multi-gigabyte Python
environments at 9:05 am. Fifteen minutes at home saves you the whole hands-on hour.

If you can only do one thing: **install QuPath 0.7 and add the one catalog.**

> **Want to vote on what we demonstrate live?** See
> [walkthroughs and videos](walkthroughs.md). We will not get through all sixteen tools, so the
> live time follows the room's interest. Every tool has a walkthrough and a video regardless.

> **Only interested in one or two extensions?** You do not need any of the tracks. Go to the
> **[extension index](extensions.md)**, find the ones you care about, and install just those.

---

## 1. QuPath 0.7.0 or later

Download from [qupath.github.io](https://qupath.github.io/) and install.

Everything in this workshop requires **0.7.0+**. If you already run 0.6 for other work, note
that 0.7 uses a **separate extensions folder**, so installing today's extensions will not
disturb your existing setup.

## 2. Add the LOCI catalog

In QuPath: `Extensions > Manage extensions > Manage extension catalogs > Add catalog`, then add
this one:

| Catalog | URL |
|---|---|
| LOCI QuPath Extensions | `https://github.com/uw-loci/qupath-catalog-mikenelson` |

That is the only catalog you need. Everything hands-on in this workshop is in it.

Background on what a catalog is and why we use them:
[How extensions, catalogs, and AI-assisted development work](00-extensions-catalogs-and-ai.md).

## 3. Install the extensions

**Adding the catalog installs nothing**; it just shows you a list. Now install what you
actually want, and **only** what you actually want:

**Everything (small, fast, no extra downloads):**

- QuIET — Image Export Toolkit
- Wizard Wand
- Polyline Wand
- Classify Object Subset
- Class Distribution
- Channel Names Viewer
- Project Metadata Browser
- Dialog Position Manager
- Cluster 3D Navigator
- OCR for Labels
- Tiles to Pyramid

**Large downloads, only if you plan to do these tracks:**

- **QP-CAT — Cell Analysis Tools**. After installing, run
  `Extensions > QP-CAT > Setup environment`. **~1.5–2.5 GB download, ~2.5 GB on disk.**
- **Deep Learning Pixel Classifier**. The first run downloads an embedded Python
  environment. Also substantial.

**Then restart QuPath.** Extensions are not loaded on the fly; the menu items will not appear
until you do.

## 4. OCR language data (only for the OCR track)

`Extensions > OCR for Labels > OCR Settings...` → **Required Downloads**:

- **eng.traineddata** (~4 MB), required
- **osd.traineddata** (~10 MB), recommended, handles rotated labels

Set **Tessdata Path** to the folder containing them, click OK. Barcode scanning needs no setup.

## 5. Download the workshop data

**Only download what your track needs.** There is no single bundle; each dataset comes from
wherever it already lives, and the sizes differ by more than an order of magnitude.

| Dataset | Where to get it | Size | Used by |
|---|---|---|---|
| **QuPath intro project**<br>`DATA-01_HE_WSI` + `DATA-02_multiplex_IF` | [Project folder](https://drive.google.com/drive/folders/1waxGfZt3Ua_EKcC86fOn8Qr89lZXnrIX?usp=sharing). Download the whole folder and open it as a QuPath project | ~500 MB | QuIET, DL Pixel Classifier, Wizard Wand, Polyline Wand, Class Distribution, Classify Object Subset. **Tracks A and C** |
| **`TME-SYNTH`**<br>synthetic tumour microenvironment | [GitHub release](https://github.com/uw-loci/multiplex-synthetic-data/releases/latest). 8 images, 8 channels, 6 cell types, full per-cell ground truth, CC0 | **~20 MB** | QP-CAT, Cluster 3D Navigator, Channel Names Viewer. **Track B** |
| **`DATA-03_labeled_slides`**<br>slides with label images | [LabelImageExamples_from_LJI.zip](https://drive.google.com/file/d/1xm99nEa0okF7USeip0PTDv6PT4Ut5eWX/view?usp=sharing). 6 CZI whole-slide images, each carrying an embedded slide label | **over 500 MB** ⚠️ | OCR for Labels, Project Metadata Browser. **Track D** |
| `DATA-04_tiles` | Coming: a tile directory with `TileConfiguration.txt` | small | Tiles to Pyramid. **Track D** |

**The intro project** is the demo project from
[imagescientist.com/qupath-intro](https://www.imagescientist.com/qupath-intro), already public and
already assembled. It holds **CMU-1** (brightfield H&E) and **LuCa-7color** (8-channel multiplexed
IF: PDL1 · CD8 · FoxP3 · CD68 · PD1 · CK · DAPI · autofluorescence), with cells detected and
several saved object classifiers. Download the project folder and open it. That is the whole
setup for Tracks A and C.

> Prefer the individual images? That page links them at source: CMU-1 from the
> [OpenSlide test data](http://openslide.cs.cmu.edu/download/openslide-testdata/Aperio/) and
> LuCa-7color from the
> [OME image repository](https://downloads.openmicroscopy.org/images/Vectra-QPTIFF/perkinelmer/).
> You will have to build the project and detect cells yourself, so the folder is the faster route.

> ### ⚠️ The label-slide zip is over 500 MB
> It is six whole-slide CZI files, and the label image only exists *inside* the slide file, which
> is why it cannot be a folder of small PNGs. **Download it at home**, and only if you are doing
> the OCR / metadata track. Everything else in this workshop is far smaller.

> **Sample slides provided by Sara McArdle and Zbigniew Mikulski**, La Jolla Institute for
> Immunology. The majority of the workshop's test data comes from them, so please credit LJI if you
> use these datasets in your own work. See [acknowledgements](acknowledgements.md).

**You are also very welcome to bring your own data.** The second hour is optional exploration,
and working on a problem you actually have is a better use of the time than working on ours.
If you bring your own, tell us what you are trying to do and we will point you at the right tool.

---

## Check your setup

Open QuPath and confirm:

- [ ] Help → About shows **0.7.0** or later
- [ ] `Extensions >` contains the tools **you chose to install**. This list is what you would
      see having installed all of them: **QuIET**, **Class Distribution**, **Classify Object
      Subset**, **Cluster 3D Navigator**, **Project Metadata Browser**, **Channel Names Viewer**,
      **OCR for Labels**, **Tiles to Pyramid**. Missing entries you never installed are not a
      problem
- [ ] `Window >` contains **Dialog Position Manager...**
- [ ] The toolbar has a **sparkle wand** (Shift+W) and a **polyline wand** (Shift+P) button
- [ ] If doing the multiplex track: `Extensions > QP-CAT` reports its environment as ready
- [ ] The datasets for your track are on disk

## If something goes wrong

- **A menu item is missing.** Did you restart QuPath? This is the answer roughly half the time.
- **The extension loads but throws `NoSuchMethodError`.** You are probably on QuPath 0.6.
- **`ClassNotFoundException`.** You downloaded a jar without `-all` in the name. Get the
  `-all` jar.
- **Anything else.** Come find us at the start of the session. We will have people circulating
  during the hands-on hour specifically for this.

---

## Not installable today

Three tools are demonstrated in the first hour but cannot be installed by attendees, so they are
not in the list above:

- **QPSC** needs a microscope.
- **Confusion Matrix** is in a private repository. If that changes before the workshop we will
  say so on the day.
- **Fiber Analysis / TME-Quant** need a long environment build, or a Windows-only server plus a
  pipeline that cannot be redistributed.

See the [schedule](schedule.md) for where they appear.
