---
layout: default
title: Deep Learning Pixel Classifier
---

# Deep Learning Pixel Classifier

> Train a deep-learning pixel classifier from sparse brush annotations, inside QuPath, with
> an embedded Python environment. Retrain, adapt to a new scanner or stain, and run inference
> without leaving the application.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-dl-pixel-classifier](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier) |
| **Extension version** | 0.9.0 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+, Java 21+. **A CUDA GPU for training.** ~2–4 GB download for the Python environment on first use |
| **Where to find it** | `Extensions > DL Pixel Classifier` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on (inference), demo (training) |

> **Research use only.** Not a diagnostic device, not cleared for clinical use, not validated
> for patient care. Models trained or loaded here must not drive clinical decisions.

> **Walkthrough video:** %%VIDEO_DL_PIXEL_CLASSIFIER%%
> The walkthrough below is self-contained. You can work through it during the workshop, or on your own afterwards.

> **New to QuPath?** Words like *project*, *annotation*, *detection*, *class* and
> *measurement* are explained in the [glossary](glossary.md). For QuPath itself, the
> [official documentation](https://qupath.readthedocs.io/en/stable/) is the place to go.

---

## What it does

QuPath's built-in pixel classifier is a shallow model over hand-chosen features. It is fast,
interpretable, and often enough. When it is not (subtle textures, tissue classes that differ
by architecture rather than color, images where stain normalization keeps failing), this
extension gives you the same *interaction model* (draw a few sparse annotations per class)
backed by a real segmentation network.

**Train:**

- Sparse brush annotations are the training signal; the extension samples tiles from the
  regions you mark. You do not annotate exhaustively.
- Train across **multiple project images** in one run for representative sampling.
- Works on **brightfield RGB and multi-channel fluorescence/spectral** images, with
  per-channel normalization.
- Normalization statistics can be computed over the **whole image** rather than per tile,
  which removes tile-boundary artifacts, a visible and common failure of naive tiled
  inference.
- Choose your encoder: ResNet / EfficientNet / MobileNet (U-Net), **MuViT** (a multi-scale
  vision transformer with multi-resolution feature fusion), or bring your own ONNX model.
- Start from **histology-pretrained weights** (TCGA, Lunit, Kather100K) instead of ImageNet.
- Or from **pathology foundation-model encoders** (h-optimus-0, virchow, hibou-l/b,
  midnight, dinov2-large), downloaded on demand, all under permissive licences.

**Adapt:**

- **MAE pretraining**: masked-autoencoder self-supervised pretraining on your own unlabeled
  tiles.
- **AdaBN / "Calibrate model to current image"**: recompute BatchNorm statistics on a new
  acquisition in seconds, with *zero retraining*. This is the cheap first thing to try when a
  model that worked last month stops working on this month's scanner.

**Run:**

- Output as per-pixel measurements, detection objects, or a classification overlay.
- Full per-pixel **probability maps**, not just argmax labels.
- Fast embedded Python inference via Appose with zero-copy tile transfer, with no conda
  environment to manage, no external server.
- An **out-of-distribution check** warns before inference when the image's pixel statistics
  differ markedly from the training data, catching stain, exposure and sensor shifts that
  would silently degrade predictions.

## Hardware reality check

> What you can train is decided by which encoder you pick, and they span five orders of
> magnitude. Tiny U-Net trains from scratch at 10k–300k parameters. The ImageNet- and
> histopathology-pretrained backbones (ResNet, EfficientNet) sit in the middle. The pathology
> foundation models are another matter: Virchow is 632M parameters, H-optimus-0 and Midnight
> are 1.1B each. Those were trained on GPU clusters and are demanding even to fine-tune.
>
> - **Without a dedicated NVIDIA GPU (CUDA), training is impractical.** Apple Silicon (MPS)
>   can take 1–2+ hours *per epoch* on larger models. CPU training is for toy experiments only.
> - Larger model + larger tiles + larger batch = more VRAM. Exceeding it can hang or crash
>   QuPath, occasionally requiring a force-quit.
> - **Start small:** Tiny U-Net if you have enough annotation to train from scratch, ResNet-18
>   or ResNet-34 if you want pretrained weights. 256 px tiles, batch size 2–4. Scale up only
>   if your hardware is comfortable.

This is why **training is a demo today and inference is the hands-on part**. Workshop laptops
are not going to train a transformer in twenty minutes, and pretending otherwise wastes your
hour.

<details markdown="1">
<summary><b>Install</b> — from the LOCI catalog, then restart QuPath</summary>

Install from the **LOCI QuPath Extensions** catalog, then restart QuPath. Full steps, including the catalog URL, are in the [setup guide](setup.md).

</details>

> **Do this before the workshop.** The first run downloads an embedded Python environment, and it is a substantial download.

---

## Hands-on exercise

> ⚠️ **Not runnable yet — watch the demo instead.** Every step below needs a pre-trained model
> that is not published. Until it is, **do not download the 229 MB dataset for this guide**: there
> is nothing here you can complete with it. The steps are listed so you can follow the
> demonstration and know what to come back to.
>
> Still worth doing beforehand if this is your track: install the extension and open it once, so
> its Python environment (**2–4 GB**) downloads at home rather than on conference wifi.

**Data, once the model is published:** the CMU-1 H&E slide in
[`Scripting Demo.zip`](https://drive.google.com/uc?export=download&id=1bWZtjZEtgqZnJOVBc91_Wk_HPgw8dmNY)
(229 MB; see [setup](setup.md#5-download-the-workshop-data)), plus the model itself.

**Before you start.** Unzip `Scripting Demo.zip`, then **drag the unzipped folder onto an open QuPath window** — it is already a project, and dropping it opens it. (The menu route is `File > Project > Open project`, if you prefer.) Then double-click the **CMU-1 H&E** slide in the project list to open it.

The extension is at `Extensions > DL Pixel Classifier`.


<img src="../images/dl-pixel-classifier/menu.png" alt="QuPath's Extensions menu open on DL Pixel Classifier, showing Train and Apply at the top, then Select Overlay Model, Toggle Prediction Overlay and Manage Classifiers, with the Utilities submenu expanded to show Python Console, MAE Pretrain Encoder, Calibrate model to current image, Load Saved Training Area Issues and the environment controls" width="720">

Note the **Utilities** submenu — pretraining, AdaBN calibration and the environment controls
live there, not on the top level.

1. `Extensions > DL Pixel Classifier`. Open the extension and confirm the Python environment
   reports as ready.
2. **Load the provided pre-trained model** rather than training one.
3. Run inference on a modest annotated region. Choose **overlay** output first so you can see
   the prediction on the slide.
4. Look at the **probability map**, not just the class assignment. Find a region where the
   model is genuinely uncertain. The boundaries between classes are usually the honest ones.
5. Re-run with **detection objects** as the output so the result becomes QuPath objects you
   can measure and classify downstream.
6. Now open a *different* image with a visibly different stain. Run inference again and watch
   for the **out-of-distribution warning**.
7. Try **"Calibrate model to current image"** (AdaBN) on that second image, re-run, and compare.

### What to notice

- Sparse annotation is a genuinely different workflow from exhaustive labeling: you are
  steering a sampler, not building a dataset by hand.
- The OOD warning and the probability map are the two things that tell you when *not* to
  trust the output. They are the most important features in the extension, and the easiest to
  ignore.
- AdaBN often recovers most of the loss from a domain shift in seconds. Try it before you
  consider retraining.

---

## The training loop (demo)

Training is a demonstration today rather than a hands-on step — see the hardware note above.
These are the four stages worth watching. Each is deliberately brief: what is *specific to this
extension* is described here, and the method behind it is linked rather than explained.

### 1. Create a classifier

`Extensions > DL Pixel Classifier > Train DL Pixel Classifier...`

Draw sparse brush annotations for each class, load the classes into the dialog, pick an
architecture, and train. The dialog opens in a simplified Basic view; **Show All Settings**
exposes everything else.

Two things here are unlike QuPath's built-in pixel classifier: your annotations are a
*sampler*, not a dataset, so you mark a few representative regions rather than labelling
exhaustively; and one run can train across **several project images** at once.

→ [Training Guide](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier/blob/main/docs/TRAINING_GUIDE.md)

### 2. Review the training data the model disagrees with

**Review Training Areas...**, in the training progress dialog when a run finishes.

Your first annotations will be wrong somewhere, and this is how you find out where. The model
is run back over every training tile and the tiles are ranked by loss, so the ones it fought
hardest with rise to the top. A confusion matrix tab shows which class is being mistaken for
which; click a cell to jump straight to the tiles where that specific confusion happens.
**Apply Annotation Adjustment** can then push corrections back into your annotations, one
class-to-class transition at a time, with a live preview.

> **Do it before you close the dialog.** Training tiles are deleted when the progress dialog
> closes. Save the session first if you want to reopen it later via
> `Extensions > DL Pixel Classifier > Utilities > Load Saved Training Area Issues...`.

This is the stage people skip, and it is usually worth more than a bigger model.

→ [Training Guide, Step 9](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier/blob/main/docs/TRAINING_GUIDE.md#step-9-review-training-areas-optional)

### 3. Pretrain on your own images

`Extensions > DL Pixel Classifier > Utilities > MAE Pretrain Encoder...`

If you have far more unlabelled tissue than annotation time — which is most people — the
encoder can learn your imagery before it ever sees a label, by reconstructing masked patches
of your own tiles. You then train the classifier on top of that encoder.

Extension-specific: it runs on your project images, in the embedded environment, with no data
leaving QuPath. Masked autoencoders themselves are a published method and the guide below
links onward.

→ [Domain Adaptation Guide](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier/blob/main/docs/DOMAIN_ADAPTATION_GUIDE.md)

### 4. Adapt a model to a domain shift

*Described only — we have no second-batch data to demonstrate this on today.*

A classifier that worked last month can fail on this month's slides: new scanner, new stain
lot, different exposure. The extension offers three responses, cheapest first:

- **Calibrate model to current image (AdaBN)** — recomputes BatchNorm statistics on the new
  image in seconds, no retraining. Try this first; it often recovers most of the loss.
- **Domain-adaptive MAE** — continue MAE pretraining from the existing encoder on the new
  images, then fine-tune. For when the shift is too large for AdaBN.
- **Retrain** — when the new data is genuinely a different problem, not a shifted version of
  the old one.

The **out-of-distribution check** is what tells you a shift has happened at all, before you
have trusted a bad result.

→ [Domain Adaptation Guide](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier/blob/main/docs/DOMAIN_ADAPTATION_GUIDE.md)

---

## Sharing and moving a model

`Extensions > DL Pixel Classifier > Manage Classifiers...`

<img src="../images/dl-pixel-classifier/manage_classifiers.png" alt="The Manage Classifiers dialog: a table of trained classifiers with Name, Architecture, Classes and Created columns, a details panel showing architecture, classes, training info and settings for the selected model, and Delete, Import, Export Descriptor and Export Full buttons along the bottom" width="820">

*The screenshot is from a different project — yours will list only what you have trained.*

Every classifier you train lands here, with the architecture, classes and settings it was
trained with. Two export buttons, and the difference matters:

- **Export Descriptor...** writes the model's `metadata.json` alone: architecture, classes,
  normalization, training settings. A few kilobytes, readable as text, and **not runnable**.
  This is what you attach to a methods section or send someone who asks how you configured a
  model.
- **Export Full (with weights)** writes the whole thing, weights included — 500 MB to several
  gigabytes. This is the one to use when you want the model to actually *run* somewhere else.
  **Import...** takes that zip; it cannot take a descriptor.

---

## Going further

- [Domain Adaptation Guide](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier/blob/main/docs/DOMAIN_ADAPTATION_GUIDE.md)
  covers when to use AdaBN, when to use domain-adaptive MAE, and when you really do need to retrain.
- **You do not need to pre-tile anything.** The extension exports its own training patches
  from your annotations when a run starts, so there is no separate export step to prepare.
- **Accuracy numbers** for the pixel output come from this extension's own confusion matrix,
  in *Review Training Areas* above — it is pixel-level, aggregated over the training tiles.
  The separate [Confusion Matrix](presented/confusion-matrix.md) extension is a different
  tool for a different job: it evaluates **cell** classifiers by matching detected cells
  against ground-truth points or regions. Reach for it once you have turned predictions into
  classified objects, not for the pixel classification itself.

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier#readme)
and `QUICKSTART.md`.
