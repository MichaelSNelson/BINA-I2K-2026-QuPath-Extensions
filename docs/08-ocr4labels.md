---
layout: default
title: OCR for Labels
---

# OCR for Labels

> Read the slide label. Text via Tesseract OCR, barcodes via ZXing, saved straight into
> QuPath project metadata — for one image or for a whole project via a reusable template.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-ocr4labels](https://github.com/uw-loci/qupath-extension-ocr4labels) |
| **Version at workshop** | 0.4.2 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+, Java 21+, Tesseract language data (see Setup) |
| **Where to find it** | `Extensions > OCR for Labels` |
| **Catalog** | QPSC Microscope Extensions |
| **Session** | Hands-on |

> **Walkthrough video:** %%VIDEO_OCR4LABELS%%
> The walkthrough below is self-contained. You can work through it during the workshop, or on your own afterwards.

---

## What it does

Whole-slide image files usually carry a **label image** — the photograph of the physical
slide label, with the case ID, stain, block number and often a barcode written on it. That
information is already in your file, and almost nobody uses it, because getting it out means
squinting at an image and typing.

This extension extracts the label image, runs OCR and/or barcode detection on it, and lets
you assign the detected content to QuPath metadata keys.

- **Label image access** — pulls the label out of the WSI file and displays it.
- **Tesseract OCR** for text (via the Tess4J wrapper).
- **ZXing barcode scanning** for 1D and 2D barcodes — no extra setup needed.
- **Hybrid templates** — mix text regions and barcode regions in one template.
- **Interactive review** — the detected content lands in an editable table before anything is
  written. Fix the OCR's mistakes, set the metadata key names, then apply.
- **Project navigation** — browse every project image without closing the dialog.
- **Batch processing** — apply a template across the whole project.
- **Text filtering** — one-click character filters to clean up OCR noise.
- **Literal transcription** *(on by default since 0.4.0)* — OCR reports the characters it saw
  instead of correcting them toward English words. Labels are overwhelmingly codes, dates and
  accession numbers, and dictionary correction damages those more than it repairs.
- **Vocabulary matching** — correct OCR errors by matching against a list of known valid
  values. If you know the only legal stains are `H&E`, `CD3`, `CD8`, then `CD９` resolves.
- **Rotated label support** — automatic orientation detection for sideways or upside-down
  labels.

Once the metadata is in the project, the
[Project Metadata Browser](09-project-metadata-browser.md) is how you review, correct, and
export it in bulk.

## Setup — do this before the workshop

Tesseract needs language data files, which are not bundled:

1. `Extensions > OCR for Labels > OCR Settings...`
2. Under **Required Downloads**:
   - click **eng.traineddata** (~4 MB) for English;
   - optionally **osd.traineddata** (~10 MB) for orientation detection — get this one, rotated
     labels are common.
3. Set **Tessdata Path** to the folder containing the downloaded files.
4. **OK**.

Barcode scanning works immediately with no setup.

> **Leave Enhance unticked.** As of 0.4.2 it is off by default, and it should stay that way
> unless you have measured it helping on your own labels. See
> [what to notice](#what-to-notice) below for what it was doing.

## Install

Via the **QPSC Microscope Extensions** catalog, or the release jar. Restart QuPath.

> This extension lives in the QPSC catalog because it grew out of the acquisition workflow —
> but it needs no microscope and no server. It is entirely a post-acquisition metadata tool.

---

## Hands-on exercise (~15 min)

**Data:** `DATA-03_labeled_slides` — several WSIs with label images, some with barcodes, at
least one rotated.

### Part A — one slide

1. Open an image with a label. `Extensions > OCR for Labels > Run OCR on Label`.
2. The dialog lists all project images on the left; select one.
3. Set **Scope** to *Full Image*, **Decode As** to *Try Both* (barcode first, then OCR), and
   leave **Min Conf** at its default. **Check that Enhance is unticked** — it is off by default
   in 0.4.2, and step 12 is about why.
4. **Scan.** Review the table: correct the **Text** column where OCR guessed wrong, and set
   sensible **Metadata Key** names.
5. **Apply.** Confirm the metadata landed on the image (right-click the image in the project
   pane → *Edit metadata*, or use the Metadata Browser).

### Part B — a template, then the whole project

6. Draw a rectangle over just the region of the label that holds the case ID, set **Decode As**
   to *Text*, and click **Add Region** — this adds the row without reading it, which is what you
   want while laying out a template.
7. Now work the other way round for the barcode: set **Decode As** to *Barcode*, click
   **Add Field**, and drag its rectangle. This one decodes the moment you finish drawing.
8. Before saving anything, set **Scope** to *Drawn Regions* and click **Rescan Regions**. Every
   row is re-read in place, each using its own **Decode As** value, so you find out what your
   template will actually produce while it is still cheap to fix.
9. **Save this as a template** with the field positions, types, and metadata key assignments.
10. Run **batch processing** with that template across the project.
11. Try a **vocabulary list** for a field with a small known set of valid values, and re-run.
12. Find the rotated label and confirm orientation detection handled it.

### Part C — the two-minute experiment worth doing (~2 min)

13. Go back to a label with an e-mail address, a code, or any dense punctuation on it. Tick
    **Enhance**, set **Scope** to *Drawn Regions*, and **Rescan Regions**. Compare against the
    unenhanced read.

### What to notice

- Region templates beat full-image OCR by a wide margin when labels are laid out consistently
  — which, within one institution, they nearly always are.
- Vocabulary matching converts OCR from "usually right" to "right or obviously wrong," which
  is the difference between usable and not for automated metadata.
- **"Enhance image contrast" made OCR worse, and it took measurement to find out.** Its adaptive
  threshold forces every pixel to pure black or white before Tesseract sees it, discarding the
  smooth edges the classifier depends on. Dense glyphs suffer first — `histology@lji.org` came
  back as `histoloawalli.org`, because `@` is the densest glyph in ASCII and hard thresholding
  closes the gap between the `a` and its ring. Across a blur series the untouched image read
  correctly at every level while the enhanced one degraded steadily. Tesseract already
  thresholds internally, and does it better. It is now off by default.
- **The generalisable lesson:** the option was called *Enhance*, it was recommended for faded
  labels, and it was wrong. A pre-processing step that sounds helpful is a hypothesis, not a
  fix — and OCR is one of the few places where you can actually test it, because you know what
  the answer should be.
- **If a read is still wrong, suspect the image before the settings.** A label image cropped
  through the descenders turns `g` into `a`, `y` into `v`, and `j` into `i` — the reason a real
  label kept coming back ending in `.ora`. No amount of processing recovers pixels that were
  never captured.
- The review step is not optional. OCR on a photographed label is *good*, not *correct*.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-ocr4labels#readme).
