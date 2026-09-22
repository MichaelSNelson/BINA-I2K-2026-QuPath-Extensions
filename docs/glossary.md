---
layout: default
title: Glossary
---

# The words these guides assume

Every guide here was written by someone who uses QuPath daily, and it shows: a dozen words turn
up with no explanation. This page defines them once, in plain language. Nothing here is specific
to our extensions — it is ordinary QuPath vocabulary.

> **This is a quick reference, not the real documentation.** For anything about QuPath itself —
> how a feature works, what a setting does, why something behaves the way it does — go to the
> **[official QuPath documentation](https://qupath.readthedocs.io/en/stable/)**. It is thorough, maintained by the people who write
> QuPath, and will always be more complete and more current than this page.

## Getting an image open

| Word | What it means |
|---|---|
| **Project** | A folder QuPath manages for you, holding a list of images plus everything you have drawn and measured on them. You make one with `File > Project > Create project`, or open an existing one with `File > Project > Open project` and pointing at the folder. Almost every exercise here starts by opening a project, because that is where your work gets saved |
| **Image type** | Brightfield (H&E, stained slides, looks like a photo) or Fluorescence (separate channels, usually on black). QuPath asks the first time you open an image. Getting it wrong breaks channel handling and cell detection |
| **Channel** | One color of a fluorescence image, measured separately — DAPI for nuclei, say. A brightfield image has red, green and blue; a multiplexed one can have eight or more, each a different marker |

## Things on the image

| Word | What it means |
|---|---|
| **Object** | The umbrella word for anything in the image hierarchy: annotations *and* detections are both objects. Worth knowing because tools often act on one kind and not the other — a cell classifier processes detections, so classes sitting on annotations are invisible to it |
| **Annotation** | A region *you* draw — a rectangle, a freehand outline, a line. Use the toolbar tools. Annotations are what you use to say "analyze here" or "this area is tumor" |
| **Detection** | An object QuPath *found* for you, usually one per cell, from running `Analyze > Cell detection`. There are often thousands. The practical difference: you make annotations, QuPath makes detections |
| **ROI** | Region of interest — the shape itself, separate from what it means. An annotation is an ROI plus a label |
| **Class** | A label on an object: Tumor, Stroma, Immune. Shown by color. Both annotations and detections can carry one |
| **Measurement** | A number attached to an object — area, mean intensity in a channel, and so on. QuPath stores many per detection, and tools here add more |

## Classifying

| Word | What it means |
|---|---|
| **Classifier** | Something that assigns a class to objects automatically, trained by you giving examples. Built in `Classify > Object classification > Train object classifier`, then saved into the project by name so it can be reused |
| **Training annotations** | The examples you draw to teach a classifier: a few regions of each class |
| **Clustering** | Grouping cells by how similar their measurements are, *without* telling it what the groups should be. Related to classification but the opposite way round: a classifier learns labels you supply, clustering finds groups and leaves naming to you |
| **Embedding / UMAP** | A way of squashing many measurements per cell down to two or three numbers, so similar cells land near each other on a plot. UMAP is the usual method. Stored as extra measurements, often named `UMAP1`, `UMAP2` |

## Files and data

| Word | What it means |
|---|---|
| **Workflow** | QuPath's running record of what you did to an image. Most commands add a step as you go, and `Automate > Show workflow command history` lists them. Right-click a step to turn it into a script, which is how an afternoon of clicking becomes something you can re-run over a whole project |
| **Metadata** | Information *about* an image rather than the pixels: case ID, stain, scanner, date. In QuPath it is a set of key-and-value pairs per image, where the key is the field name (`Stain`) and the value is its content (`H&E`) |
| **Tile** | One camera field of view. A microscope photographs a slide as a grid of overlapping tiles, which are then stitched into one large image |
| **Stitching** | Joining those tiles back into a single image, using recorded stage positions and, optionally, the image content itself |
| **Pyramid** | A large image saved at several zoom levels at once, so it opens and pans quickly. OME-TIFF and OME-ZARR are two file formats that store one |
| **Script** | A text file of QuPath commands. Several tools here write one for you; you do not need to read or write scripts to use them. QuPath's scripts are in a language called Groovy |

---

**Something missing?** If a guide used a word this page does not cover, that is a bug in the
guide — please say so, and it will get fixed.
