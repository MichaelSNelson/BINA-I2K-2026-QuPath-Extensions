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
| **Extension version** | 0.9.5 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+, Java 21+. **A CUDA GPU for training.** ~2–4 GB download for the Python environment on first use |
| **Where to find it** | `Extensions > DL Pixel Classifier` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on (training and inference); the large encoders are demonstrated rather than run |

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
extension keeps the way you work — you still draw a few sparse annotations per class — and
puts a deep segmentation network behind it.

### Train

- The extension samples training tiles from the regions you mark, so a few brush strokes per
  class are enough. You do not annotate exhaustively.
- Train across **multiple project images** in one run for representative sampling.
- Works on **brightfield RGB and multi-channel fluorescence/spectral** images, with
  per-channel normalization.
- Normalization statistics can be computed over the **whole image** rather than per tile.
  Per-tile statistics make neighboring tiles scale their pixel values differently, which
  shows up as a visible grid of seams in the output.
- Choose your encoder: ResNet / EfficientNet / MobileNet (U-Net), **MuViT** (a multi-scale
  vision transformer with multi-resolution feature fusion), or bring your own ONNX model.
- Start from **histology-pretrained weights** (TCGA, Lunit, Kather100K) instead of ImageNet.
- Or from **pathology foundation-model encoders** (h-optimus-0, virchow, hibou-l/b,
  midnight, dinov2-large), downloaded on demand, all under permissive licenses.

### Adapt

- **MAE pretraining**: masked-autoencoder self-supervised pretraining on your own unlabeled
  tiles.
- **AdaBN / "Calibrate model to current image"**: recompute BatchNorm statistics on a new
  acquisition in seconds, with *zero retraining*. This is the cheap first thing to try when a
  model that worked last month stops working on this month's scanner.

### Run

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
>   can take 1–2+ hours *per epoch* on larger models. CPU is slower still, and is realistic only
>   for very small models on very few tiles.
> - Larger model + larger tiles + larger batch = more VRAM. Exceeding it can hang or crash
>   QuPath, occasionally requiring a force-quit.
> - **Start small:** Tiny U-Net if you have enough annotation to train from scratch, ResNet-18
>   or ResNet-34 if you want pretrained weights. 256 px tiles, batch size 2–4. Scale up only
>   if your hardware is comfortable.

This is why the large encoders are a demonstration rather than a hands-on step: a workshop
laptop will not fine-tune a 1.1B-parameter model in the time available. A **small pretrained
encoder is a different matter** — ResNet-18 on a two-class problem trains in well under a
minute on a workstation GPU, which is what the
[hands-on training exercise](#train-your-own-in-about-a-minute) uses.

<details markdown="1">
<summary><b>Install</b> — from the LOCI catalog, then restart QuPath</summary>

Install from the **LOCI QuPath Extensions** catalog, then restart QuPath. Full steps, including the catalog URL, are in the [setup guide](setup.md).

</details>

> **Do this before the workshop.** The first run downloads an embedded Python environment, and it is a substantial download.

---

## Exercise

What you can run depends on your hardware. **With an NVIDIA (CUDA) GPU**, the training exercise
below runs end to end in about a minute. **Without one**, follow along as a demonstration —
training on CPU or Apple Silicon is too slow for a workshop slot. The inference steps need a
pre-trained model we have not published yet, so those are a demonstration for everyone until it
is released.

> ⚠️ **Do this before the workshop.** Install the extension and open it once, so its Python
> environment (**2–4 GB**) downloads at home rather than on conference wifi.

**Data:** the CMU-1 H&E slide in
[`Scripting Demo.zip`](https://drive.google.com/uc?export=download&id=1bWZtjZEtgqZnJOVBc91_Wk_HPgw8dmNY)
(229 MB; see [setup](setup.md#5-download-the-workshop-data)), plus
[`CMU-1_NanoTissueTrainingData.geojson`](../data/dl-pixel-classifier/CMU-1_NanoTissueTrainingData.geojson)
(100 KB) if you want to train your own.

**Before you start.** Unzip `Scripting Demo.zip`, then **drag the unzipped folder onto an open QuPath window** — it is already a project, and dropping it opens it. (The menu route is `File > Project > Open project`, if you prefer.) Then double-click the **CMU-1 H&E** slide in the project list to open it.

The extension is at `Extensions > DL Pixel Classifier`.


<img src="../images/dl-pixel-classifier/menu.png" alt="QuPath's Extensions menu open on DL Pixel Classifier, showing Train and Apply at the top, then Select Overlay Model, Toggle Prediction Overlay and Manage Classifiers, with the Utilities submenu expanded to show Python Console, MAE Pretrain Encoder, Calibrate model to current image, Load Saved Training Area Issues and the environment controls" width="720">

Note the **Utilities** submenu — pretraining, AdaBN calibration and the environment controls
live there, not on the top level.

1. `Extensions > DL Pixel Classifier`. Open it once and check that the Python environment
   reports as ready.
2. **Load a trained model.** In the workshop this is demonstrated with a model we have not
   published yet. To follow along on your own, train one first with
   [Train your own, in about a minute](#train-your-own-in-about-a-minute), then come back.
3. Draw a rectangle over a small area of tissue, then choose
   `Extensions > DL Pixel Classifier > Apply DL Pixel Classifier...`. Set the output to
   **overlay** so the prediction is drawn on the slide.
4. Look at the **probability map**, not just the class assignment. Find a region where the
   model is genuinely uncertain. Uncertainty is usually highest at class boundaries; that is
   expected, and a model that looks confident everywhere is the one to distrust.
5. Run it again with **detection objects** as the output, so the result becomes QuPath objects
   you can measure and classify downstream.
6. Open a slide with a visibly different stain and run inference again, watching for the
   **out-of-distribution warning**. The workshop project does not contain a second H&E slide,
   so use one of your own if you have one — otherwise this step is a demonstration.
7. On that second slide, try
   `Extensions > DL Pixel Classifier > Utilities > Calibrate model to current image...`
   (AdaBN), run inference again, and compare.

### Train your own, in about a minute

This part you *can* run today. It trains tissue-vs-background on CMU-1 and finishes in seconds
on a workstation GPU.

**1. Load the annotations.** Download
[`CMU-1_NanoTissueTrainingData.geojson`](../data/dl-pixel-classifier/CMU-1_NanoTissueTrainingData.geojson),
open the CMU-1 slide, then **drag the `.geojson` file onto the open slide** — QuPath imports the
objects directly. (The menu route is `File > Import objects from file...`.) You get
**15 annotations**: 9 `Tissue` and 6 `Ignore*`.

That is the whole training set. Here it is on the slide, and again with the slide hidden:

<img src="../images/dl-pixel-classifier/CMU-1%20full.png" alt="The CMU-1 H&E slide at low magnification: four tissue fragments stained pink and purple on a white background, with a scattering of small outlined annotation shapes. Dark-outlined shapes sit on the tissue; pale gray shapes sit on the empty background between fragments" width="760">

<img src="../images/dl-pixel-classifier/CMU-1%20anno.png" alt="The same 15 annotations with the slide image hidden, leaving only the outlines on white: about a dozen small curved strokes and a few rounded blobs, in two colors for the two classes, scattered across the frame with large empty gaps between them" width="760">

**That is all the labeling this took** — a dozen short strokes and a few blobs, not a traced
outline of every fragment.

<details markdown="1">
<summary><b>Why the class is called <code>Ignore*</code></b> — the trailing asterisk changes how QuPath treats the class</summary>

The `Ignore*` strokes sit on empty slide. In QuPath, a class name ending in `*` marks it as an
*ignored* class, and the extension honors that: those regions train the model (it still has to
learn what background looks like) but are left out when you generate objects from a prediction.
Without it you would get a detection object covering every piece of empty slide.

</details>

**2. Open `Extensions > DL Pixel Classifier > Train DL Pixel Classifier...`** and walk the
dialog.

> **Click "Show All Settings" first.** The dialog opens in a basic view that hides four of the
> panels below — Learning Rate & Optimizer, Loss Function, Performance and Data Augmentation.
> The button is at the top right, and it reads **Show Basic View** once the full set is showing.

The panels appear in this order. Two of them, **Channel Configuration** and **Annotation
Classes**, stay empty until you press **Load Classes from Selected Images** in the first panel,
so they are listed here without a screenshot.

| | Panel | What matters here |
|---|---|---|
| 1 | **Training Data Source** | Tick the slide, then press **Load Classes from Selected Images**. Nothing downstream is populated until you do — the tile count and the class list both appear only after this. |
| 2 | **Model Architecture** | `unet` with a **ResNet-18** encoder. This is the choice that makes the run fast. |
| 3 | **Weight Initialization** | **Use pretrained backbone weights**. Pretrained ImageNet features mean the model starts knowing what an edge is, so it converges in far fewer epochs. The transfer-learning list below lets you freeze early blocks. |
| 4 | **Tiles & Resolution** | Tile size and downsample. The gray line under **Resolution** reports the effective pixel size the model will actually train at — that is the number to remember, not the slide's native one. |
| 5 | **Duration & Stopping** | Epochs, validation split, early stopping. |
| 6 | **Batch Size & Memory** | Batch size, and the green VRAM estimate. **See the note below.** |
| 7 | **Learning Rate & Optimizer** | Learning rate, encoder LR factor, weight decay, scheduler. The gray text spells out the resulting per-group rates. |
| 8 | **Loss Function** | Cross Entropy + Dice, plus hard-pixel mining (OHEM). |
| 9 | **Performance** | Mixed precision, in-memory caching, DataLoader workers. Leave workers at 0 unless you know otherwise. |
| — | **Channel Configuration** | Which channels the model sees, and how they are normalized. Populated by **Load Classes from Selected Images**. |
| — | **Annotation Classes** | The classes found in your annotations, with per-class weights. Also populated by **Load Classes**. |
| 10 | **Data Augmentation** | Flips, rotation, stain jitter, elastic deformation. |
| 11 | **Name Your Classifier** | Name it, then **Start Training**. `Copy as Groovy Script` on this row reproduces the exact run as a script. |

<img src="../images/dl-pixel-classifier/6.png" alt="The Batch Size and Memory panel: Batch Size 20, Gradient Accumulation 1, then a line of green text reading Est. VRAM colon approximately 4600 MB of 24,575 MB, 19 percent, 358px with context padding, rough colon not yet calibrated for this architecture, above a checked Enable mixed precision AMP box" width="820">

> **The green line will not match yours, and that is expected.** The first number is what this
> configuration is predicted to need; **the second is your own GPU's memory**, so the percentage
> is specific to your machine. On a smaller card the same settings might read 60%, or refuse to
> fit. If it says it will not fit, lower the batch size first.

<details markdown="1">
<summary><b>The two bracketed notes on that line</b> — what 358px and "rough" mean</summary>

- **`[358px with context padding]`** — the tiles handed to the model are larger than the tile
  size you set, because real image data is added around each one so training geometry matches
  inference. Memory scales with *that* number, not with the 256 you typed.
- **`[rough: not yet calibrated for this architecture]`** — the estimate is a formula rather
  than a measurement for this particular architecture. Treat it as a guide and leave headroom.

</details>

**3. Watch the training log.** On a recent GPU this reaches a usable model within the first
handful of epochs.

<details markdown="1">
<summary><b>Two lines near the top of the log</b> — the step budget, and the validation size</summary>

- the **step budget** — how many optimizer steps each epoch actually buys. If your batch size
  is at or above the number of training patches, an epoch buys a single step and the epoch
  count stops meaning anything. The extension asks before starting in that case.
- the **validation size** — with a small validation set, one patch is a large fraction of the
  reported score, so the best-epoch number is optimistic. With a handful of patches from a
  single slide it is optimistic for a second reason too: the validation tiles are near
  neighbors of the training tiles, so a high score partly measures memorization of one slide.

</details>

**4. Apply it, and expect the edges to be wrong.** A model trained on 15 sparse annotations
learns the places you showed it. Run it over the whole slide and look for where it fails —
usually the tissue boundary and anything you never annotated. Those failing regions are what you
annotate next, and *Review Training Areas* (below) is how you find them systematically.

### What to notice

- Where you put a stroke decides which tiles the model trains on, so covering the *variety* in
  your slide matters more than the total area you label.
- The OOD warning and the probability map are the two things that tell you when *not* to
  trust the output.
- AdaBN often recovers most of the loss from a domain shift in seconds. Try it before you
  consider retraining.

---

## The training loop (demo)

Training is a demonstration today rather than a hands-on step — see the hardware note above.
These are the four stages worth watching. What is *specific to this extension* is
described here; the method behind it is linked rather than explained.

### 1. Create a classifier

`Extensions > DL Pixel Classifier > Train DL Pixel Classifier...`

Draw sparse brush annotations for each class, load the classes into the dialog, pick an
architecture, and train. The dialog opens in a simplified Basic view; **Show All Settings**
exposes everything else.

Two things here differ from QuPath's built-in pixel classifier: tiles are drawn from the
regions you mark, so you label a few representative areas rather than everything; and one run
can train across **several project images** at once.

→ [Training Guide](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier/blob/main/docs/TRAINING_GUIDE.md)

### 2. Review the training data the model disagrees with

**Review Training Areas...**, in the training progress dialog when a run finishes.

Your first annotations will be wrong somewhere, and this is how you find out where. The model
is run back over every training tile and the tiles are ranked by loss, highest first. A confusion matrix tab shows which class is being mistaken for
which; click a cell to jump straight to the tiles where that specific confusion happens.
The collapsible **Annotation Adjustment** panel can then push corrections back into your
annotations, one class-to-class transition at a time. Set a confidence threshold, preview which
pixels would change, and confirm — nothing is edited until you do.

> **Do it before you close the dialog.** Training tiles are deleted when the progress dialog
> closes. Save the session first if you want to reopen it later via
> `Extensions > DL Pixel Classifier > Utilities > Load Saved Training Area Issues...`.

Correcting annotations here typically improves results more than moving to a larger model.

→ [Training Guide, Step 9](https://github.com/uw-loci/qupath-extension-dl-pixel-classifier/blob/main/docs/TRAINING_GUIDE.md#step-9-review-training-areas-optional)

### 3. Pretrain on your own images

`Extensions > DL Pixel Classifier > Utilities > MAE Pretrain Encoder...`

If you have far more unlabeled tissue than annotation time — which is most people — the
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
trained with. Two export buttons, for two different purposes:

- **Export Descriptor...** writes the model's `metadata.json` alone: architecture, classes,
  normalization, training settings. A few kilobytes, readable as text, and **not runnable**.
  This is what you attach to a methods section or send someone who asks how you configured a
  model.
- **Export Full (with weights)** writes the whole thing, weights included. This is the one to
  use when you want the model to run somewhere else. **Import...** takes that zip; it cannot
  take a descriptor. Size follows the encoder — a few megabytes for a Tiny U-Net, several
  hundred for a ResNet. The zip holds every file in the classifier folder, including the
  training checkpoints, which are usually the largest part of it.

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
