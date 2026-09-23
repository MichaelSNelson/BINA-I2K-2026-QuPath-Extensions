---
layout: default
title: Walkthroughs and videos - every tool, whether or not we reach it
---

# Walkthroughs and videos

**We will not get through all sixteen tools in two hours, and we are not going to pretend
otherwise.** There are roughly forty minutes of live demonstration in the first hour and sixty
optional minutes in the second. That is enough for a handful of tools done properly, not all of
them done badly.

So every tool has a **complete written walkthrough** and a **recorded video** of it being done.
Nothing depends on being in the room when a particular tool comes up.

---

## Tell us what you want to see

We will spend the live time on whatever the room actually cares about. Vote before or during the
session:

### [Vote on the Padlet →](https://padlet.com/imagescientistwebsite/qupath-workshop-questions-ovrlzqdphnojda44)

Vote for as many as you like, and add a comment if you have a specific question or a dataset
you are stuck on. A few slots are already fixed: QPSC, the Confusion Matrix and the fiber tools
are shown regardless, and Channel Names Viewer and Classify Object Subset are
demonstrated in **Sara McArdle's** Monday session, so the vote decides the rest. We will read it at the start and adjust the order. If your tool does not make
the cut, its walkthrough and video are below and we are happy to sit with you in the second
hour.

---

## How the three formats relate

| | What it is | When to use it |
|---|---|---|
| **Live demo** | A handful of tools, driven by the vote, in the first hour | Being in the room |
| **Written walkthrough** | Every tool. Step-by-step, with a "what to notice" section | Following along, or working alone in the second hour |
| **Video** | Every tool. Short, and the same steps as the walkthrough | When a step does not behave, or you would rather watch than read |

The written walkthrough is the source of truth. The video follows it step for step, so you can
switch between them without losing your place.

**Everything in the extension index is yours to install and keep**, whether or not we demo it
live. Demoing is just about what fits in the first hour. Three tools are the exception, and only
because you cannot run them here: QPSC needs a microscope, the Confusion Matrix repository is
private, and the fiber tools need a long environment build or a Windows-only server.

---

## Hands-on tools

<div class="legend">
  <span><i class="d-ok"></i> Walkthrough verified and video recorded</span>
  <span><i class="d-wip"></i> Being revised now</span>
  <span><i class="d-todo"></i> Not yet checked end to end</span>
</div>


Each of these you can install and run yourself; see the [extension index](extensions.md).

**Four datasets cover all of them.** The **Data** column says which one a tool needs, so if two
tools you want share a name, that is one download, not two. Each is linked here once:

| Data | Download | Size |
|---|---|---|
| **Scripting Demo** | [`Scripting Demo.zip`](https://drive.google.com/uc?export=download&id=1bWZtjZEtgqZnJOVBc91_Wk_HPgw8dmNY) | 229 MB |
| **Synthetic** | [`multiplex-synthetic-data-v1.2.zip`](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-v1.2.zip) | 14 MB |
| **Demo project** | [`multiplex-synthetic-data-demo-project-v1.2.zip`](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-demo-project-v1.2.zip) | 20 MB |
| **Slide labels** | [`OCR_Test_Images_LJI.zip`](https://drive.google.com/uc?export=download&id=1HIAm8hbVkVQHNqJziyfBf3r1hYDjUaRS) | 244 MB |

> **Synthetic** and **Demo project** are not the same download, although they share the same
> eight images. *Synthetic* is the raw dataset with its ground-truth tables; *Demo project* is a
> ready-to-open QuPath project built from it, with cells already detected and a trained
> classifier. If you want both tracks, take both — together they are still under 35 MB.

| Tool | Walkthrough | Video | Data |
|---|---|---|---|
| QuIET — Image Export Toolkit | [Guide](01-quiet-image-export.md){: .g-todo} | %%VIDEO_QUIET_IMAGE_EXPORT%% | Demo project |
| DL Pixel Classifier | [Guide](02-dl-pixel-classifier.md){: .g-todo} | %%VIDEO_DL_PIXEL_CLASSIFIER%% | Scripting Demo |
| QP-CAT — Cell Analysis Tools | [Guide](03-qp-cat-cell-analysis-tools.md){: .g-todo} | %%VIDEO_QP_CAT_CELL_ANALYSIS_TOOLS%% | Synthetic |
| Cluster 3D Navigator | [Guide](04-cluster-3d-navigator.md){: .g-todo} | %%VIDEO_CLUSTER_3D_NAVIGATOR%% | Demo project |
| Wizard Wand | [Guide](05-wizard-wand.md){: .g-wip} | %%VIDEO_WIZARD_WAND%% | Scripting Demo |
| Polyline Wand & Brush | [Guide](06-polyline-wand.md){: .g-wip} | %%VIDEO_POLYLINE_WAND%% | Scripting Demo |
| Classify Object Subset *(shown in Sara McArdle’s session)* | [Guide](07-classify-object-subset.md){: .g-wip} | %%VIDEO_CLASSIFY_OBJECT_SUBSET%% | Demo project |
| OCR for Labels | [Guide](08-ocr4labels.md){: .g-wip} | %%VIDEO_OCR4LABELS%% | Slide labels |
| Project Metadata Browser | [Guide](09-project-metadata-browser.md){: .g-wip} | %%VIDEO_PROJECT_METADATA_BROWSER%% | Slide labels |
| Class Distribution | [Guide](10-class-distribution.md){: .g-todo} | %%VIDEO_CLASS_DISTRIBUTION%% | Demo project |
| Channel Names Viewer *(shown in Sara McArdle’s session)* | [Guide](11-channel-names-viewer.md){: .g-todo} | %%VIDEO_CHANNEL_NAMES_VIEWER%% | Synthetic |
| Dialog Position Manager | [Guide](12-dialog-position-manager.md){: .g-todo} | %%VIDEO_DIALOG_POSITION_MANAGER%% | *none needed* |
| Tiles to Pyramid | [Guide](13-tiles-to-pyramid.md){: .g-wip} | %%VIDEO_TILES_TO_PYRAMID%% | *not ready yet* |

The second hour is a menu rather than a queue: take whichever of these you came for. The
[extension index](extensions.md) groups them into four tracks.

## Presented tools

You cannot install these today, but their pages and videos are complete.

| Tool | Walkthrough | Video | Why not hands-on |
|---|---|---|---|
| QPSC — QuPath Scope Control | [Overview](presented/qpsc.md){: .g-todo} | %%VIDEO_QPSC%% | Needs a microscope; shown, never run |
| Confusion Matrix | [Guide](presented/confusion-matrix.md){: .g-todo} | %%VIDEO_CONFUSION_MATRIX%% | Repository currently private |
| Collagen fiber and texture analysis | [Guide](presented/fiber-analysis.md){: .g-todo} | %%VIDEO_FIBER_ANALYSIS%% | Long environment build, or a Windows-only server plus a pipeline that cannot be redistributed |

---

## A note on the data

Each walkthrough names the dataset it uses, and they come from different places: public images,
a CC0 synthetic dataset, tiles acquired at LOCI, and the slide-label images provided by
**Sara McArdle** and **Zbigniew Mikulski** at the **La Jolla Institute for Immunology**. The
[setup guide](setup.md) lists what to download for each; see also
[acknowledgements](acknowledgements.md).

---

## If a walkthrough does not work for you

Tell us. A step that reads clearly to the person who wrote the tool and makes no sense to
anyone else is a documentation bug, and we would rather hear about it than not.

Grab us during the session. We will be circulating for the whole second hour.
