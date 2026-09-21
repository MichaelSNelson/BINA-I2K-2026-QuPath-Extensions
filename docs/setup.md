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
[Extensions and catalogs in five minutes](00-extensions-catalogs-and-ai.md).

## 3. Install the extensions

**Adding the catalog installs nothing**; it just shows you a list. Now install what you
actually want, and **only** what you actually want:

**These eleven are small and install in seconds**, with nothing extra to download. Pick the ones
you want; the [extension index](extensions.md) says which track each belongs to:

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

| If you are doing | Download exactly this | Size |
|---|---|---|
| **Track A or C** (QuIET, DL Pixel Classifier, both wands, Class Distribution, Classify Object Subset) | **`Scripting Demo.zip`**, from [this Drive folder](https://drive.google.com/uc?export=download&id=1bWZtjZEtgqZnJOVBc91_Wk_HPgw8dmNY). Unzip it, then in QuPath use `File > Project > Open project` and pick the unzipped folder | <span title="About a quarter of a gigabyte. Fine at home, slow on conference wifi. Do it before you travel.">⚠️ **229 MB**</span> |
| **Track B** (QP-CAT, Cluster 3D Navigator, Channel Names Viewer) | **`multiplex-synthetic-data-v1.2.zip`**, from [this release page](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-v1.2.zip). It is the first file under Assets. Ignore "Source code (zip)" and "(tar.gz)" | **14 MB** |
| **Track D** (OCR for Labels, Project Metadata Browser) | **`LabelImageExamples_from_LJI.zip`**, [direct link](https://drive.google.com/uc?export=download&id=1xm99nEa0okF7USeip0PTDv6PT4Ut5eWX) or the same Drive folder | <span title="Half a gigabyte, and it unzips to more. Fetch it at home on a connection you trust and check you have the disk space before you travel — not on conference wifi at 10:30.">⚠️ **512 MB**</span> |
| **Track D** (Tiles to Pyramid) | Still being prepared. Nothing to download yet | — |

That folder holds four zips, each linked directly below. Take whichever ones you want — these
are the sizes so you can decide, not a rule about what you are allowed to have.

| Zip | Size | What it is for |
|---|---|---|
| **[`Scripting Demo.zip`](https://drive.google.com/uc?export=download&id=1bWZtjZEtgqZnJOVBc91_Wk_HPgw8dmNY)** | 229 MB | The assembled QuPath project. **Tracks A and C** |
| [`LabelImageExamples_from_LJI.zip`](https://drive.google.com/uc?export=download&id=1xm99nEa0okF7USeip0PTDv6PT4Ut5eWX) | 512 MB | Slide labels. **Track D** (OCR / metadata) |
| [`Multiplex demo images.zip`](https://drive.google.com/uc?export=download&id=11PmdpYIrdSEn15Rgv9aa_4BDeF6pXODE) | 1.86 GB | Loose multiplexed images. No track here uses them |
| [`Brightfield demo.zip`](https://drive.google.com/uc?export=download&id=1ghskMkToAP6DoQSfGxrdQiOKjIMpHtI0) | 90 MB | Loose brightfield images, also inside Scripting Demo.zip |

> If you only plan to follow one track, one zip is enough. All four together are about 2.7 GB,
> and most of that is the multiplex demo images, which nothing here needs — so it is worth
> knowing before you start the download rather than after.
>
> Drive cannot virus-scan files this large, so it will show a confirmation page before the
> download starts. That is expected; click through it.

**`Scripting Demo.zip`** is the demo project from
[imagescientist.com/qupath-intro](https://www.imagescientist.com/qupath-intro), already assembled:
**CMU-1** (brightfield H&E) and **LuCa-7color** (8-channel multiplexed IF), with cells already
detected and several saved object classifiers. Unzip, open as a project, and Tracks A and C are
ready.

> Prefer the individual images? The imagescientist page links them at source: CMU-1 from the
> [OpenSlide test data](http://openslide.cs.cmu.edu/download/openslide-testdata/Aperio/) and
> LuCa-7color from the
> [OME image repository](https://downloads.openmicroscopy.org/images/Vectra-QPTIFF/perkinelmer/).
> You will have to build the project and detect cells yourself, so the folder is the faster route.

> ### ⚠️ The label-slide zip is over 500 MB
> It is six whole-slide CZI files, and the label image only exists *inside* the slide file, which
> is why it cannot be a folder of small PNGs. **Download it at home**, and only if you are doing
> the OCR / metadata track. It is the largest thing any track here needs; `Scripting Demo.zip`
> is 229 MB and the synthetic set is 14 MB.

> **These slides were provided by Sara McArdle and Zbigniew Mikulski**, La Jolla Institute for
> Immunology. Please credit LJI if you use them in your own work. See
> [acknowledgements](acknowledgements.md).

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
- [ ] Two new wand buttons sit in the toolbar, to the right of QuPath's own wand:

  <img src="../images/wand-toolbar.png" alt="QuPath's wand and the two added wand buttons in the toolbar; the order of the two added buttons depends on install order" height="24">


| | Which button | How to tell it apart |
|---|---|---|
| <img src="../images/icon-wand-builtin.png" alt="" height="22"> | QuPath's own wand | Outline only, no fill |
| <img src="../images/icon-wizard-wand.png" alt="" height="22"> | **Wizard Wand** (Shift+W) | Solid wand, sparkles, no arrow |
| <img src="../images/icon-polyline-wand.png" alt="" height="22"> | **Polyline Wand** (Shift+P) | Crosses a line, and has a small grey arrow in the corner |

  **QuPath's own wand** is the leftmost and was already there. The two new ones sit to its
  right: **Wizard Wand** (**Shift+W**) and **Polyline Wand** (**Shift+P**). Their order
  depends on which you installed first, so go by the icon, not the position. If both
  shortcuts work, both are installed
- [ ] If doing the multiplex track, open `Extensions > QP-CAT` and read the menu — it tells
  you which state you are in:

  - **“Set up analysis environment (first run)…”** means the environment is *not* built.
    Click it, and expect 1.5–2.5 GB and 5–15 minutes. Do this at home
  - **“Find cell populations (clustering)…”** means it is ready and you are done
- [ ] The download for your track is unzipped and on disk (see the table above)

## If something goes wrong

- **A menu item is missing.** Did you restart QuPath? Extensions are only loaded at startup.
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
