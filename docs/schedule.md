---
layout: default
title: Workshop schedule
---

# Workshop schedule

**Tuesday 29 September 2026, 10:30 – 12:30. Morgridge Hall, WARF Seminar Hub, Rm. 7560.** The first hour is presentation
and live demos; the second is optional, self-directed hands-on exploration. You are welcome to leave after the first hour, and equally welcome to
spend the second hour on your own data instead of ours.

> **Sara McArdle's session is the day before ours**: *Tips and tricks for maintaining sanity
> during hi-plex classification in QuPath*, **Monday 28 September, 11:00–12:00, Discovery
> Building, H.F. DeLuca Forum, Rm. 1255**. It does not clash with this one, so you can attend
> both, and they are designed to fit together. She demonstrates two of the extensions documented
> here, and her material on keeping a hi-plex classification honest is the natural lead-in to our
> QP-CAT segment. Worth stating plainly: **we do not cover QuPath's object classifiers** because
> that is core QuPath. What we introduce are alternative mechanisms for getting a class onto a
> cell: unsupervised clustering, rule-based marker gating, propagation from a small hand-labeled
> subset, and applying an existing classifier to a chosen subset rather than to everything.

---

## Session details

| | |
|---|---|
| **Title** | New Extensions for QuPath: From simple (dialog manager, wizard wand, image export) to complex (DL cell and pixel classifiers, microscope control) |
| **Date** | Tuesday 29 September 2026 |
| **Time** | 10:30 – 12:30 |
| **Location** | Morgridge Hall, WARF Seminar Hub, Rm. 7560 |
| **Format** | Hour 1 presentation and demos · Hour 2 optional hands-on |

---

## Hour 1: Presentation and demos

The order follows the session title: start with tools you can install in two minutes and use
this afternoon, end with the ones that need a Python server and a microscope.

| Topic | Pages |
|---|---|
| **Welcome and framing.** QuPath as one environment from acquisition to publication | — |
| **Extensions, catalogs, and how this suite was built**, including where AI-assisted development helped and where it did not | [catalogs](00-extensions-catalogs-and-ai.md) · [how it was built](how-this-was-built.md) |
| **Simple wins.** Dialog positions that survive an undocked laptop, plus a callback to two tools you saw in **Sara McArdle’s** earlier session: a channel legend and subset classification | [Dialog Manager](12-dialog-position-manager.md) · [Channel Names](11-channel-names-viewer.md) · [Classify Subset](07-classify-object-subset.md) |
| **Annotation, live (10 min).** Both wands in one sitting: wand a structure, auto-tune from your own example, then reshape and split a polyline boundary | [Wizard Wand](05-wizard-wand.md) · [Polyline Wand](06-polyline-wand.md) |
| **Image export.** Publication figures, masks and ML datasets in batch, with QUAREP-LiMi guidance and a generated Groovy script every time | [QuIET](01-quiet-image-export.md) |
| **Project-scale housekeeping.** Slide-label OCR into metadata, whole-project metadata editing, and class balance | [OCR](08-ocr4labels.md) · [Metadata Browser](09-project-metadata-browser.md) · [Class Distribution](10-class-distribution.md) |
| **Did it actually work?** Confusion matrices with bootstrap confidence intervals *(shown)* | [Confusion Matrix](presented/confusion-matrix.md) |
| **DL cell and pixel classifiers.** Deep pixel classification from sparse annotations; clustering, cell classification and spatial statistics on multiplexed data, checked against ground truth. Picks up where Sara's hi-plex classification session left off. [Cluster 3D Navigator](04-cluster-3d-navigator.md) gets a mention here, as the navigation half of the same job | [DL Classifier](02-dl-pixel-classifier.md) · [QP-CAT](03-qp-cat-cell-analysis-tools.md) |
| **Collagen fiber and texture analysis.** Straightness, morphometrics, texture, and TACS *(shown)* | [Fiber analysis](presented/fiber-analysis.md) |
| **Microscope control.** Draw a box in QuPath, acquire, stitch, land back in the project *(shown; nobody in the room drives a microscope).* The stitching half, [Tiles to Pyramid](13-tiles-to-pyramid.md), you can install and use today | [QPSC](presented/qpsc.md) |
| **Where to get everything**, and what to do in the second hour | [setup](setup.md) |

**Slides:** %%DRIVE_SLIDES_URL%%

> **We cannot demo everything.** There is time for a handful of tools done properly, not sixteen
> done badly. Which ones we spend the live time on is driven by
> [your vote](walkthroughs.md), and every tool, demoed or not, has a full walkthrough and video.

Three tools are demonstrated rather than run: QPSC needs a microscope, the Confusion Matrix is in
a private repository, and the fiber tools need a long environment build or a Windows-only server.
Everything else is yours to install.

## Hour 2: Hands-on, optional

There are thirteen hands-on extensions and sixty minutes. **Do not try to do all of them.**
Pick one track, or bring your own data and pick the tools that fit it.

Whatever you do not get to, you lose nothing: every tool has a
[written walkthrough and a recorded video](walkthroughs.md), so you can work through the rest at
your own pace afterwards.

We start with setup triage: if anything from the [setup guide](setup.md) or the
[extension index](extensions.md) did not work, grab us then. After that it is your hour, and we
will be circulating throughout.

### Suggested tracks for exploration

Four coherent groupings of the extensions, each about fifty minutes. They are suggestions, not a
timetable. Take one, take half of one, or ignore them and bring your own data.

| Track | Best if | Data | Extensions |
|---|---|---|---|
| **A · Annotation and classification** | You do brightfield/H&E work and spend a lot of time annotating | [`DATA-01`](https://drive.google.com/drive/folders/1waxGfZt3Ua_EKcC86fOn8Qr89lZXnrIX?usp=sharing) | [Wizard Wand](05-wizard-wand.md) 10 → [Polyline Wand](06-polyline-wand.md) 10 → [Class Distribution](10-class-distribution.md) 8 → [Classify Object Subset](07-classify-object-subset.md) 10. Finish early? Export those annotations as masks with [QuIET](01-quiet-image-export.md) and see what a training set built from them looks like |
| **B · Multiplexed imaging** | You work with highly multiplexed IF | `TME-SYNTH`, [14 MB, straight from GitHub](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-v1.2.zip) | [QP-CAT](03-qp-cat-cell-analysis-tools.md) 20 (parts A and B alone are ~10) → [Cluster 3D Navigator](04-cluster-3d-navigator.md) 10, on the same cells, since it is the navigation half of the clustering you just ran. Optional: [Channel Names Viewer](11-channel-names-viewer.md) 5. **Needs the QP-CAT Python environment installed beforehand** |
| **C · Publication and deep learning** | Your bottleneck is getting figures and datasets *out* of QuPath | [`DATA-01`](https://drive.google.com/drive/folders/1waxGfZt3Ua_EKcC86fOn8Qr89lZXnrIX?usp=sharing) | [QuIET](01-quiet-image-export.md) 15 → [DL Pixel Classifier](02-dl-pixel-classifier.md) 15, inference only → **join them up** 15: QuIET's *Tiled export (ML)* writes image/label pairs from your annotations, then run the classifier over the same region and compare. **Needs its Python environment installed beforehand** |
| **D · Data wrangling at scale** | You manage a lot of slides, or run a core facility | [`DATA-03`](https://drive.google.com/file/d/1xm99nEa0okF7USeip0PTDv6PT4Ut5eWX/view?usp=sharing) **(500+ MB)**, `DATA-04` | [OCR for Labels](08-ocr4labels.md) 15 → [Project Metadata Browser](09-project-metadata-browser.md) 12 → [Tiles to Pyramid](13-tiles-to-pyramid.md) 12 → [Dialog Position Manager](12-dialog-position-manager.md) 5. **No GPU and no Python environment, but the label slides are a 500+ MB download, so get them before you travel** |

Track B's synthetic data is fully ground-truthed, so every step of that exercise can be checked
against the right answer, a luxury real multiplexed tissue never gives you.

Two of the tools above, Classify Object Subset and Channel Names Viewer, are demonstrated in
Sara McArdle's Monday session. Their walkthroughs here are complete if you want to work through
them yourself.

### Bring your own data

Genuinely encouraged. Tell us what you are trying to do and we will point you at the right
tool, and if there isn't one, that is useful for us to hear.
