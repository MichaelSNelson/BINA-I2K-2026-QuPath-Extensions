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
| **Extension version** | 1.2.14 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+, Java 21+ |
| **Where to find it** | `Extensions > QuIET > Image Export...` and `Extensions > QuIET > Panel / Montage Export...` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> **Walkthrough video:** %Video not ready yet%
> The walkthrough below is self-contained. You can work through it during the workshop, or on your own afterwards.

> **New to QuPath?** Words like *project*, *annotation*, *detection*, *class* and
> *measurement* are explained in the [glossary](glossary.md). For QuPath itself, the
> [official documentation](https://qupath.readthedocs.io/en/stable/) is the place to go.

**Steps:** [1. Get the data](#1-get-the-data) · [2. Load it into QuPath](#2-load-it-into-qupath) · [3. A figure you could publish](#3-a-figure-you-could-publish) · [4. The reproducibility half](#4-the-reproducibility-half) · [5. A multi-panel figure](#5-a-multi-panel-figure)
{: .toc}

---

## What it does

Exporting one image from QuPath takes a menu click. Exporting *the right image, the same way,
from forty slides, with a scale bar, at a stated resolution* normally means writing a Groovy
script. QuIET does that export without the script: a three-step wizard where you pick a
category, configure it, pick your images, and export.

**Five export categories**, all sharing the same 3-step flow:

| Category | Produces | Typical use |
|---|---|---|
| **Rendered** | The image as displayed, with overlays, scale bar, panel labels | Figures and collaborator review |
| **Label / Mask** | Per-class segmentation masks | ML training targets, QC |
| **Raw image data** | Pixel data at any downsample | Handing data to another tool |
| **Tiled export (ML)** | Image + label tile pairs | Deep-learning frameworks |
| **Object crops** | One small image per object | Cell-type classifier training |

A sixth workflow, `Extensions > QuIET > Panel / Montage Export...`, is a separate menu item with
its own wizard:
select several project images, choose a *recipe* (saved settings for how a single image is
exported), and lay them out into one grid figure, with captions, spacing and background color.
QuPath renders every panel identically, so you do not assemble the figure by hand in
another program.

## Two bonuses

**Every export records a Groovy script.** Whatever you clicked in the wizard is emitted as a
self-contained script you can save, version-control, re-run next year, or send to a
collaborator who does not have QuIET installed. Save it from **Save Script...** on the wizard's last screen
(in **Advanced** mode), or find it afterwards in `Automate > Show workflow command history`.

The two exceptions: exports using the **active overlay**, which cannot be reproduced from a
script because the classifier is ephemeral, and the case where you have turned script recording
off in Preferences.

**QUAREP-LiMi guidance is in the dialog.** [QUAREP-LiMi](https://quarep.org/) is the
community effort to define minimum reporting standards for light microscopy. The settings screen
shows a guidance panel driven by your project's actual images, and the last screen has
**Publication Advice** for the images you selected, before you export. The point is to catch "what magnification was that,
and is there a scale bar?" *before* the figure goes into a manuscript, not during review.

> **Simple vs Advanced.** The navigation bar has a Simple/Advanced toggle; Simple is the
> default and hides rarely-used controls. If a setting described here seems to be missing,
> flip to Advanced. The choice persists across sessions.

<details markdown="1">
<summary><b>Install</b> — from the LOCI catalog, then restart QuPath</summary>

Install from the **LOCI QuPath Extensions** catalog, then restart QuPath. Full steps, including the catalog URL, are in the [setup guide](setup.md).

Both menu items stay grayed out until a project with at least one image is open.

</details>

---

## Hands-on exercise

### 1. Get the data

**Download:** `multiplex-synthetic-data-demo-project-v1.2.zip` —
**[direct download](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-demo-project-v1.2.zip)**
(20 MB). The same project used by Classify Object Subset and Class Distribution, so if you
already have it, you are done here. It is a ready-made QuPath project of eight synthetic
8-channel multiplexed images, `tme_00.tif` … `tme_07.tif`, from the CC0
[multiplex synthetic dataset](https://github.com/uw-loci/multiplex-synthetic-data/tree/v1.2). Cells are
already detected on every image, and every cell carries a classified ground-truth point, so
there are objects to draw in step 3 and a known answer to check mask and tile exports against.

**You will also need:** QuPath **0.7.0 or later**, and this extension installed from the LOCI
catalog (see the **Install** box above, or the [setup guide](setup.md)).

> **Steps 3 and 4 need one image. Step 5 needs at least two**, because it builds a figure out
> of several panels. This project gives you eight.

> **Already have the 14 MB `multiplex-synthetic-data-v1.2.zip` from Track B?** Those are the
> same eight images as loose files, with the ground truth beside them as CSV and GeoJSON, but
> with no project and no cells detected. The 14 MB zip works for this exercise once you have added the
> images to a project and run cell detection — the recipe is in the
> [QP-CAT guide](03-qp-cat-cell-analysis-tools.md#hands-on-exercise). The demo project above
> skips both steps.

### 2. Load it into QuPath

1. **Drag `project.qpproj` onto an open QuPath window.** The unzipped folder itself works too.
   (Menu route: `File > Project > Open project...`.) QuPath opens an **Update URIs** dialog with
   the images listed in red. This is expected: QuPath cannot find the images until you show it
   the folder once.
2. **Click Search...** (bottom-right) and choose the folder you unzipped.
3. **Click Apply changes.**
4. **Double-click `tme_00.tif`** to open it. You should see cell outlines (the detections) and a
   colored dot on each cell (the ground-truth points). Those are the objects step 3 draws
   onto the figure, so there is nothing to annotate by hand.

### 3. A figure you could publish

#### 3.1 Open the wizard and pick a category

1. **Open `Extensions > QuIET > Image Export...`.** The second entry in the same menu,
   `Extensions > QuIET > Panel / Montage Export...`, is used in step 5.

   <img src="../images/quiet/menu.png" alt="QuPath's Extensions menu open on QuIET, showing Image Export and Panel / Montage Export" width="720">
2. **Click Rendered Image**, the leftmost of the five categories.

   <img src="../images/quiet/step1-categories.png" alt="The Select Export Category screen with five cards: Rendered Image, Label / Mask, Raw Image Data, Tiled Export, Object Crops" width="820">
3. **Click Next >.**

#### 3.2 Configure the export

The numbers match the badges in the picture below the table.

| # | Setting | Set to |
|---|---|---|
| 1 | **Render Mode** | **Object Overlay**. It starts on **None (no overlay source)**, which exports a clean image with no objects drawn |
| 2 | **Downsample** | **1** |
| 3 | **Output Format** | Leave it. Choosing Object Overlay switches it from **PNG** to **SVG** by itself, so the outlines stay sharp at any zoom |
| 4 | **Include annotations** | Ticked. The ground-truth points are annotations, and this box starts unticked. **Include detections**, the cell outlines, is already ticked |
| 5 | **Show scale bar** | Ticked |
| 6 | **Preview Current Image** | Click it to check the result before exporting |

<img src="../images/quiet/step2-settings-numbered.png" alt="The Configure Export screen with red numbered badges down the left edge: 1 Render Mode set to Object Overlay, 2 Downsample set to 1, 3 Output Format showing SVG, 4 Include annotations ticked with Include detections ticked below it, 5 Show scale bar ticked, 6 the Preview Current Image button. The QUAREP-LiMi Publication Guidelines panel runs down the right side" width="820">

The **Object Overlays** and **Scale Bar** sections may be collapsed when you arrive.
**Click a section's title** to open it.

**Click Preview Current Image.** A window opens with the image as it will be exported: cell
outlines, a colored dot on each cell, and a `200 um` scale bar in the lower right.

<img src="../images/quiet/export-preview.jpg" alt="The Export Preview window: the synthetic tissue image tme_00 with every cell outlined and a colored ground-truth dot on each cell, and a white 200 um scale bar in the lower-right corner" width="560">

**Close the preview window**, then **click Next >**.

<details markdown="1">
<summary>What Downsample and the guidelines panel are for</summary>

**Downsample** shrinks the exported image: **1** means full size, **4** means a quarter as
wide. These images are 2048 × 2048 pixels, so full size is fine. On a whole-slide image tens
of thousands of pixels wide, check the width in QuPath's **Image** tab (the wizard does not
block the main window, so you can do it with the wizard open) and divide by roughly 2000 to
get the number to enter.

The panel down the right is general QUAREP-LiMi guidance for the kind of export you picked,
plus one line saying how many of your images it scanned and what type they are. Advice about
the images you select comes at the next screen, under **Publication Advice**.

SVG keeps outlines and the scale bar as vector shapes, but only up to 1000 objects. These
images have about 1500 cells each, so QuIET draws the cells into the picture itself and keeps
the scale bar as a vector.

</details>

#### 3.3 Choose one image and read the advice

The wizard opens in **Simple** mode. **Save Script...**, which step 4 needs, only shows in
**Advanced** mode.

| # | Control | Do this |
|---|---|---|
| 1 | **Simple** / **Advanced** toggle | Click it so it reads **Advanced** |
| 2 | **Deselect All** | Click it. Every image in the project starts ticked |
| 3 | `tme_00.tif` | Tick it, and only it. The count beside **Deselect All** reads `1 images selected` |
| 4 | **Copy Script** / **Save Script...** | Leave for step 4 |
| 5 | **Publication Advice [i]** | Click it |
| 6 | **Export** | Click it when you have read the advice |

<img src="../images/quiet/step3-select-numbered.png" alt="The Select Images and Run screen in Advanced mode with red numbered badges: 1 the Advanced toggle at the bottom left, 2 the Deselect All button, 3 tme_00.tif ticked as the only image, 4 the Copy Script and Save Script buttons, 5 the Publication Advice button, 6 the Export button at the bottom right. The output directory reads exports/rendered inside the project folder" width="820">

**Output Directory** is already filled in: an `exports/rendered` folder inside the project
folder. Leave it.

**Click Publication Advice [i].** A window lists what QuIET found in the images you
selected, each item tagged with its QUAREP-LiMi checklist code. With the settings above you
get two suggestions and no warnings. Remove the scale bar and an item about the missing scale
bar appears.

<img src="../images/quiet/publication-advice.png" alt="The Publication Advice window: 0 issues, 0 warnings, 2 suggestions. The first, IC-3, is about per-image display settings and suggests Global Matched. The second, IC-5, is about a multi-channel image exported without split channels and suggests enabling Split channels" width="450">

**Close the advice window**, then **click Export.** In a few seconds the bottom of the wizard
reads `Exported 1 images.`, and **Open Result Folder** and **Close** appear beside **Export**.
Leave the wizard open for step 4.

#### 3.4 Check the result

**Click Open Result Folder.** It holds two files:

```
export_info.txt
tme_00.svg
```

**Open `tme_00.svg`** in a web browser. It matches the preview. Check that the scale bar is
legible at the size you would print it.

`export_info.txt` records the settings: category, downsample, pixel size (0.5 µm per pixel)
and every channel's name and display color, ready for a figure legend.

### 4. The reproducibility half

#### 4.1 Copy the script

**Click Copy Script** (badge 4 in the step 3.3 picture). The Groovy script for the export you just ran is now on
the clipboard. **Save Script...** writes the same script to a file instead.

**Click Close** to close the wizard.

#### 4.2 Run it from the script editor

1. **Open `Automate > Script editor`.**
2. **Paste the script with Ctrl+V** (Cmd+V on a Mac).
3. **Click Run** (badge 1, bottom right).

<img src="../images/quiet/script-editor-run-numbered.png" alt="QuPath's Script Editor holding the QuIET script. The header comment reads Object Overlay Export Script, exports all project images with object overlays. The configuration block below sets downsample 1.0 and outputFormat png, with a note that SVG export requires the QuIET extension. The output pane at the bottom reads Export complete: 8 succeeded, 0 failed. A red badge 1 sits beside the Run button" width="820">

The output pane at the bottom lists each image as it goes, then
`Export complete: 8 succeeded, 0 failed`.

#### 4.3 Compare

**Open the `exports/rendered` folder again.** Beside `tme_00.svg` there are now eight PNGs,
`tme_00.png` to `tme_07.png`, all rendered with the settings you chose in step 3.

The script differs from the wizard in two ways, both written at the top of the script:

- **It runs on every image in the project**, not only the ones you ticked.
- **It writes PNG, not SVG.** SVG export needs QuIET installed; the script runs on any
  QuPath 0.7 without it, so you can send it to a collaborator.

The **CONFIGURATION** block at the top holds every setting as a line you can edit, for
example `def downsample = 1.0`, before running it again.

### 5. A multi-panel figure

#### 5.1 Pick the images

1. **Open `Extensions > QuIET > Panel / Montage Export...`.** A message titled **Build one
   figure from many images** explains recipes.
2. **Click OK.**

| # | Control | Do this |
|---|---|---|
| 1 | **Use Project Default** | Click it. **Output Directory** starts empty |
| 2 | **Deselect All** | Click it |
| 3 | Image list | Tick `tme_00.tif`, `tme_01.tif`, `tme_06.tif` and `tme_07.tif`. `tme_06` is immune-rich and `tme_07` immune-poor, the two most different images in the set |
| 4 | **Next >** | Click it |

<img src="../images/quiet/panel-select-numbered.png" alt="Step 1 of 3 of the Panel / Montage wizard, Select images for the panel, with red numbered badges: 1 the Output Directory row with Use Project Default at its right, 2 the Deselect All button, 3 the image list with tme_00, tme_01, tme_06 and tme_07 ticked, 4 the Next button. The line under the list says panels are filled row-major in list order" width="820">

Panels are filled in list order, left to right and then top to bottom, so this order gives
`tme_00` and `tme_01` on the top row.

#### 5.2 Accept the recipe

The **recipe** is the set of settings applied to every panel. It starts from your most recent
Image Export, so it already has **Object Overlay**, **Downsample** 1 and the scale bar from
step 3.

**Click Next >.**

#### 5.3 Layout, captions and panel letters

| # | Setting | Set to |
|---|---|---|
| 1 | **Rows** / **Columns** | Leave at **2** and **2**. The line beside them reads `4 images -> 2 x 2 = 4` |
| 2 | **Show filename caption** (under **Captions**) | Ticked |
| 3 | **Caption font size** | **64**. At the default 14 the captions are too small to read on a figure 4126 pixels wide |
| 4 | **Style** (under **Panel labels (A, B, C...)**) | **A, B, C** |
| 5 | **Export** | Click it |

<img src="../images/quiet/panel-layout-numbered.png" alt="Step 3 of 3 of the Panel / Montage wizard, Layout, captions and output, shown full height with red numbered badges: 1 Rows 2 and Columns 2, 2 Show filename caption ticked under Captions, 3 Caption font size set to 64, 4 panel label Style set to A, B, C, 5 the Export button. The Output section near the bottom shows Format PNG, an exports/panels output folder and the filename panel_figure" width="820">

**Captions** and **Panel labels (A, B, C...)** are collapsed sections further down the
screen. **Scroll down and click each title** to open it.

**Open layout preview...** shows the grid as thumbnails in a separate window, where you can
drag one panel onto another to swap them.

#### 5.4 Open the figure

**Click Open Result Folder.** `exports/panels` holds `panel_figure.png` and
`panel_figure_info.txt`, which lists the layout, the recipe and the four source images in
order.

**Open `panel_figure.png`.** It looks like this: four panels drawn with the same recipe,
lettered A to D, each with its own scale bar and its filename underneath.

<img src="../images/quiet/panel-figure.jpg" alt="A 2 by 2 montage of four synthetic multiplex images with cell outlines and ground-truth dots, lettered A to D in white in the upper-left corners, each with a white 200 um scale bar at the lower right and its filename, tme_00.tif, tme_01.tif, tme_06.tif and tme_07.tif, in black underneath" width="640">

### What to notice

- Every panel in the montage got the same rendering, downsample and overlays, so differences
  between panels come from the images and not from how each one was exported.
- Publication Advice never blocks an export. It lists what a reviewer may ask about.
- **Label / Mask** (the second category on the wizard's first screen) exports masks from the
  same annotations, for training a model, with no extra annotation work. Try it if you have
  time.

---

## Going further

- Object Crops is the fastest route from "I have classified cells" to "I have a labeled
  image dataset for a cell-type classifier."
- Tiled export writes image and label-mask tile pairs at a fixed tile size, for training a
  model outside QuPath (StarDist, Cellpose and similar tools). The
  [DL Pixel Classifier](02-dl-pixel-classifier.md) does not need it: it trains directly from
  the annotations in your QuPath project.

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-image-export-toolkit#readme).
