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
| **Version at workshop** | 0.8.6 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+, Java 21+. **A CUDA GPU for training.** |
| **Where to find it** | `Extensions > DL Pixel Classifier` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on (inference), demo (training) |

> **Research use only.** Not a diagnostic device, not cleared for clinical use, not validated
> for patient care. Models trained or loaded here must not drive clinical decisions.

---

## What it does

QuPath's built-in pixel classifier is a shallow model over hand-chosen features. It is fast,
interpretable, and often enough. When it is not — subtle textures, tissue classes that differ
by architecture rather than colour, images where stain normalisation keeps failing — this
extension gives you the same *interaction model* (draw a few sparse annotations per class)
backed by a real segmentation network.

**Train:**

- Sparse brush annotations are the training signal; the extension samples tiles from the
  regions you mark. You do not annotate exhaustively.
- Train across **multiple project images** in one run for representative sampling.
- Works on **brightfield RGB and multi-channel fluorescence/spectral** images, with
  per-channel normalisation.
- Normalisation statistics can be computed over the **whole image** rather than per tile,
  which removes tile-boundary artefacts — a visible and common failure of naive tiled
  inference.
- Choose your encoder: ResNet / EfficientNet / MobileNet (U-Net), **MuViT** (a multi-scale
  vision transformer with multi-resolution feature fusion), or bring your own ONNX model.
- Start from **histology-pretrained weights** (TCGA, Lunit, Kather100K) instead of ImageNet.
- Or from **pathology foundation-model encoders** — h-optimus-0, virchow, hibou-l/b,
  midnight, dinov2-large — downloaded on demand, all under permissive licences.

**Adapt:**

- **MAE pretraining** — masked-autoencoder self-supervised pretraining on your own unlabelled
  tiles.
- **AdaBN / "Calibrate model to current image"** — recompute BatchNorm statistics on a new
  acquisition in seconds, with *zero retraining*. This is the cheap first thing to try when a
  model that worked last month stops working on this month's scanner.

**Run:**

- Output as per-pixel measurements, detection objects, or a classification overlay.
- Full per-pixel **probability maps**, not just argmax labels.
- Fast embedded Python inference via Appose with zero-copy tile transfer — no conda
  environment to manage, no external server.
- An **out-of-distribution check** warns before inference when the image's pixel statistics
  differ markedly from the training data — catching stain, exposure, and sensor shifts that
  would silently degrade predictions.

## Hardware reality check

> These models were originally trained on GPU clusters. On a workstation you hit limits fast.
>
> - **Without a dedicated NVIDIA GPU (CUDA), training is impractical.** Apple Silicon (MPS)
>   can take 1–2+ hours *per epoch* on larger models. CPU training is for toy experiments only.
> - Larger model + larger tiles + larger batch = more VRAM. Exceeding it can hang or crash
>   QuPath, occasionally requiring a force-quit.
> - **Start small:** ResNet-18 or ResNet-34, 256 px tiles, batch size 2–4. Scale up only if
>   your hardware is comfortable.

This is why **training is a demo today and inference is the hands-on part**. Workshop laptops
are not going to train a transformer in twenty minutes, and pretending otherwise wastes your
hour.

## Install

Via the **LOCI QuPath Extensions** catalog, or the `-all.jar` from
[Releases](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier/releases). Restart
QuPath. The first run downloads the embedded Python environment — **do this before the
workshop**, it is a substantial download.

---

## Hands-on exercise (~15 min)

**Data:** `DATA-01_HE_WSI` plus the pre-trained model from the workshop Drive folder.

1. `Extensions > DL Pixel Classifier` — open the extension and confirm the Python environment
   reports as ready.
2. **Load the provided pre-trained model** rather than training one.
3. Run inference on a modest annotated region. Choose **overlay** output first so you can see
   the prediction on the slide.
4. Look at the **probability map**, not just the class assignment. Find a region where the
   model is genuinely uncertain — the boundaries between classes are usually the honest ones.
5. Re-run with **detection objects** as the output so the result becomes QuPath objects you
   can measure and classify downstream.
6. Now open a *different* image with a visibly different stain. Run inference again and watch
   for the **out-of-distribution warning**.
7. Try **"Calibrate model to current image"** (AdaBN) on that second image, re-run, and compare.

### What to notice

- Sparse annotation is a genuinely different workflow from exhaustive labelling — you are
  steering a sampler, not building a dataset by hand.
- The OOD warning and the probability map are the two things that tell you when *not* to
  trust the output. They are the most important features in the extension, and the easiest to
  ignore.
- AdaBN often recovers most of the loss from a domain shift in seconds. Try it before you
  consider retraining.

---

## Going further

- [Domain Adaptation Guide](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier/blob/main/docs/DOMAIN_ADAPTATION_GUIDE.md)
  — when to use AdaBN, when to use domain-adaptive MAE, and when you really do need to retrain.
- Training data for this extension pairs naturally with [QuIET](01-quiet-image-export.md)'s
  Tiled export, and results pair with the
  [Confusion Matrix](05-confusion-matrix.md) extension for a defensible accuracy number.

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier#readme)
and `QUICKSTART.md`.
