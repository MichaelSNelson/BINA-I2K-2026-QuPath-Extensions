---
layout: default
title: Tiles to Pyramid
---

# Tiles to Pyramid

> Stitch a directory of acquisition tiles into a seamless pyramidal OME-TIFF or OME-ZARR,
> from inside QuPath — with optional content-based tile registration for stages that lie
> about where they were.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-tiles-to-pyramid](https://github.com/uw-loci/qupath-extension-tiles-to-pyramid) |
| **Version at workshop** | 0.6.5 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+ |
| **Where to find it** | `Extensions > Tiles to Pyramid` |
| **Catalog** | QPSC Microscope Extensions |
| **Session** | Hands-on |

> Part of the [QPSC](presented/qpsc.md) system, but **usable entirely on its own** — it needs
> no microscope, no Python server, and no acquisition running. If you have a folder of tiles,
> this stitches them.

> **Walkthrough video:** %%VIDEO_TILES_TO_PYRAMID%%
> The walkthrough below is self-contained. You can work through it during the workshop, or on your own afterwards.

---

## What it does

**Multiple stitching strategies**, depending on how your acquisition recorded positions:

| Strategy | Reads positions from |
|---|---|
| Filename `[x,y]` | The tile filenames |
| TileConfiguration.txt | A Fiji-style position file |
| Vectra | Vectra metadata |
| MicroManager | MMStack or single-plane TIFF series metadata |

**Content-based tile registration** (off by default) positions tiles by correlating the image
content in their overlap, rather than trusting nominal stage coordinates. It corrects
backlash, encoder error, and thermal drift. One solve is measured on a reference subdirectory
and **reused by every angle and channel**, so co-captured images stay registered *to each
other* — which is the property that matters for multi-angle or multi-channel acquisitions.

**Output**

- **OME-TIFF** or cloud-native **OME-ZARR** (directory-based, good for cloud storage and
  parallel access).
- True multi-resolution **pyramids**, so the result opens instantly at low zoom.
- Compression from QuPath's OME writer set (`LZW`, `JPEG`, `J2K`, `J2K_LOSSY`, `ZLIB`,
  `UNCOMPRESSED`); for OME-ZARR these map to Blosc codecs internally.
- **Batch processing** across multiple slides with matching criteria, creating separate outputs
  per matched subdirectory.
- **Multichannel merge** — combine N same-shape single-channel pyramids into one multichannel
  image via a separate `ChannelMerger` step.

**Memory behaviour** is worth calling out: the direct tile stitcher holds roughly **40 MB
steady state regardless of tile count** (the older SparseImageServer approach used 2–4+ GB),
and handles 1600+ tiles without running out of memory via spatial indexing and a bounded
reader pool.

## Read this before planning an acquisition

Whether Z and time survive stitching depends on **how the input encodes them**:

| Input layout | Z | T |
|---|---|---|
| TileConfiguration.txt + `z{nn}/` directories | preserved | — |
| TileConfiguration.txt + `t{nn}/z{nn}/` directories | preserved | preserved |
| TileConfiguration.txt, flat | 2D (z=0) | 2D (t=0) |
| MicroManager, Filename[x,y], Vectra | 2D only | 2D only |
| Z/T **inside** a multi-page file (e.g. an MMStack z-stack per position) | **collapsed** | **collapsed** |

Two limits stated plainly:

- **MicroManager, Filename[x,y], and Vectra strategies are 2D only.** They read each tile's XY
  position and place it at z=0, t=0.
- **Planes inside a multi-page or multi-series file are not expanded.** The tile reader reads
  only the *first* image in each file. An MMStack storing a z-stack inside one file is
  stitched as a single plane. To preserve those dimensions, export to the separate-file
  `z{nn}/` / `t{nn}/` layout and use the TileConfiguration.txt strategy.

Directory names must be exactly `z00`, `z01`, `t00`, … (a number after `z`/`t`,
case-insensitive). The two levels match independently, so both `z{nn}/t{nn}/` and
`t{nn}/z{nn}/` nesting work.

There is no maximum-intensity projection and no flattening — planes are written through as-is.

## Install

Via the **QPSC Microscope Extensions** catalog, or the release jar. Restart QuPath.

---

## Hands-on exercise (~12 min)

**Data:** `DATA-04_tiles` — a directory of tiles with a `TileConfiguration.txt`, plus a
deliberately drift-affected copy.

1. `Extensions > Tiles to Pyramid`.
2. Point it at the tile directory, choose the **TileConfiguration.txt** strategy, output
   **OME-TIFF** with `LZW`, and stitch.
3. Open the result in QuPath. Zoom to a seam between tiles and look for a visible offset.
4. Now stitch the drift-affected copy the same way. Find the seams — they should be obviously
   wrong.
5. Re-stitch that copy with **content-based tile registration** enabled. Compare the same seam.
6. Stitch once more to **OME-ZARR** and compare the on-disk result (a directory, not a file)
   and the time it takes to open.
7. If time permits: run batch mode across two subdirectories at once.

### What to notice

- Nominal stage coordinates are a hypothesis. Content-based registration tests it, and on a
  drifting stage the difference is unmistakable at a seam.
- Reusing one solve across angles and channels is what keeps co-captured images aligned with
  each other — re-solving per channel would not.
- Pyramid output is not cosmetic; it is the difference between an image that opens and one
  that does not.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-tiles-to-pyramid#readme) and
`Workflow.md`.
