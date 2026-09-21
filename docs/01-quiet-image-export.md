---
layout: default
title: QuIET - QuPath Image Export Toolkit
---

# QuIET — QuPath Image Export Toolkit

> Turn an annotated project into publication-ready figures, collaborator review images, or
> machine-learning training sets, in batch, without writing an export script. With
> QUAREP-LiMi reporting guidance built into the dialog.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-image-export-toolkit](https://github.com/uw-loci/qupath-extension-image-export-toolkit) |
| **Version at workshop** | 1.2.8 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+, Java 21+ |
| **Where to find it** | `Extensions > QuIET > Image Export...` and `Extensions > QuIET > Panel / Montage Export...` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> **Walkthrough video:** %%VIDEO_QUIET_IMAGE_EXPORT%%
> The walkthrough below is self-contained. You can work through it during the workshop, or on your own afterwards.

---

## What it does

Exporting an image out of QuPath is easy. Exporting *the right image, the same way, from
forty slides, with a scale bar, at a stated resolution, with a record of how you did it* is
not. That is normally a Groovy scripting job.

QuIET is a three-step wizard over that job. You pick a category, configure it, pick your
images, and export.

**Five export categories**, all sharing the same 3-step flow:

| Category | Produces | Typical use |
|---|---|---|
| **Rendered** | The image as displayed, with overlays, scale bar, panel labels | Figures and collaborator review |
| **Label / Mask** | Per-class segmentation masks | ML training targets, QC |
| **Raw image data** | Pixel data at any downsample | Handing data to another tool |
| **Tiled export (ML)** | Image + label tile pairs | Deep-learning frameworks |
| **Object crops** | One small image per object | Cell-type classifier training |

A sixth workflow, **Panel / Montage Export**, is a separate menu item with its own wizard:
select several project images, choose a *recipe* (saved settings for how a single image is
exported), and lay them out into one grid figure, with captions, spacing and background color.
QuPath renders every panel identically, so you do not assemble the figure by hand in
another program.

## Two things that make it worth your time

**Every export writes a Groovy script.** Whatever you clicked in the wizard is emitted as a
self-contained script you can save, version-control, re-run next year, or send to a
collaborator who does not have QuIET installed. The wizard is a script *generator*, not a
black box, which is the difference between a convenience and a reproducibility tool.

**QUAREP-LiMi guidance is in the dialog.** [QUAREP-LiMi](https://quarep.org/) is the
community effort to define minimum reporting standards for light microscopy. Step 2 shows a
context-sensitive guidance panel driven by your project's actual images, and Step 3 shows
"Publication Advice" before you export. The point is to catch "what magnification was that,
and is there a scale bar?" *before* the figure goes into a manuscript, not during review.

> **Simple vs Advanced.** The navigation bar has a Simple/Advanced toggle; Simple is the
> default and hides rarely-used controls. If a setting described here seems to be missing,
> flip to Advanced. The choice persists across sessions.

## Install

Install from the **LOCI QuPath Extensions** catalog, then restart QuPath. Full steps, including the catalog URL, are in the [setup guide](setup.md).

Both menu items stay greyed out until a project with at least one image is open.

---

## Hands-on exercise (~15 min)

**Data:** `DATA-01_HE_WSI`, the CMU-1 H&E slide in the **`Scripting Demo.zip`** ([Drive folder](https://drive.google.com/drive/folders/1waxGfZt3Ua_EKcC86fOn8Qr89lZXnrIX?usp=sharing), four zips — this is the one that is a QuPath project) (~500 MB; see [setup](setup.md#5-download-the-workshop-data)).

> **Or use the synthetic multiplex set instead.** If you are on the multiplexed track, or you
> just want something small, the CC0
> [multiplex synthetic dataset](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-v1.2.zip)
> (~14 MB) works for every part of this exercise. Its eight-channel images exercise the channel
> handling that a brightfield slide cannot, and because every cell carries a known type, the
> label-mask and tile-pair exports have a ground truth you can check the output against.
> You will need to detect cells first — the recipe is in the
> [QP-CAT guide](03-qp-cat-cell-analysis-tools.md#hands-on-exercise-20-min-or-10-for-parts-a-and-b).

### Part A: a figure you could publish

1. Open the project. Confirm at least one annotation exists.
2. `Extensions > QuIET > Image Export...`
3. **Step 1:** choose **Rendered Image**.
4. **Step 2:** turn on a **scale bar**. Set the downsample so the exported image is roughly
   2000 px on its long edge. Read the QUAREP panel on the right and note what it says is
   missing from your project's metadata.
5. **Step 3:** select one image, choose an output folder, read the Publication Advice, export.
6. Open the result. Check that the scale bar is legible at the size you would print it.

### Part B: the reproducibility half

7. Find the Groovy script QuIET wrote alongside your export.
8. Open QuPath's script editor (`Automate > Script editor`), paste it in, and run it against
   a *different* image in the project.
9. Confirm you get the same treatment applied to new data with zero clicks.

### Part C: a multi-panel figure

10. `Extensions > QuIET > Panel / Montage Export...`
11. Select 4 images, apply one recipe to all of them, and lay them out 2×2 with captions.
12. Export and open the montage.

### What to notice

- The recipe concept is what makes panels *comparable*: every panel got the same rendering,
  downsample, and overlay treatment, which is exactly the claim a figure implicitly makes.
- The QUAREP panel is advisory, not blocking. It is telling you what a reviewer may ask.
- Exporting masks (Step 1 → **Label / Mask**) from the same annotations gives you ML training
  targets with no extra annotation work. Try it if you have time.

---

## Going further

- Object Crops is the fastest route from "I have classified cells" to "I have a labeled
  image dataset for a cell-type classifier."
- Tiled export writes image/label pairs in the layout deep-learning frameworks expect. This
  is the natural handoff to the [DL Pixel Classifier](02-dl-pixel-classifier.md) or to
  training outside QuPath.

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-image-export-toolkit#readme).
