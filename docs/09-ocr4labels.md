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
| **Version at workshop** | 0.3.0 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+, Java 21+, Tesseract language data (see Setup) |
| **Where to find it** | `Extensions > OCR for Labels` |
| **Catalog** | QPSC Microscope Extensions |
| **Session** | Hands-on |

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
- **Vocabulary matching** — correct OCR errors by matching against a list of known valid
  values. If you know the only legal stains are `H&E`, `CD3`, `CD8`, then `CD９` resolves.
- **Rotated label support** — automatic orientation detection for sideways or upside-down
  labels.

Once the metadata is in the project, the
[Project Metadata Browser](10-project-metadata-browser.md) is how you review, correct, and
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
3. Set **Scope** to *Full Image*, **Type** to *Auto* (barcode first, then OCR), and leave
   **Min Conf** at its default.
4. **Scan.** Review the table: correct the **Text** column where OCR guessed wrong, and set
   sensible **Metadata Key** names.
5. **Apply.** Confirm the metadata landed on the image (right-click the image in the project
   pane → *Edit metadata*, or use the Metadata Browser).

### Part B — a template, then the whole project

6. Draw a rectangle over just the region of the label that holds the case ID. Set **Scope** to
   *Selection*, **Type** to *Text*, and scan only that.
7. Do the same for the barcode region with **Type** = *Barcode*.
8. **Save this as a template** with the field positions, types, and metadata key assignments.
9. Run **batch processing** with that template across the project.
10. Try a **vocabulary list** for a field with a small known set of valid values, and re-run.
11. Find the rotated label and confirm orientation detection handled it.

### What to notice

- Region templates beat full-image OCR by a wide margin when labels are laid out consistently
  — which, within one institution, they nearly always are.
- Vocabulary matching converts OCR from "usually right" to "right or obviously wrong," which
  is the difference between usable and not for automated metadata.
- The review step is not optional. OCR on a photographed label is *good*, not *correct*.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-ocr4labels#readme).
