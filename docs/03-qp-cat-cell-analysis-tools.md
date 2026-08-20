---
layout: default
title: QP-CAT - Cell Analysis Tools
---

# QP-CAT — Cell Analysis Tools

> Python-powered clustering, phenotyping, and spatial statistics for highly multiplexed
> imaging — with the full scientific Python stack embedded inside QuPath. No conda, no
> servers, no command line.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-cell-analysis-tools](https://github.com/uw-loci/qupath-extension-cell-analysis-tools) |
| **Version at workshop** | 0.10.0 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+. ~1.5–2.5 GB download, ~2.5 GB on disk for the Python environment |
| **Where to find it** | `Extensions > QP-CAT` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> **Maturity warning, from the author.** This is a continuation of earlier work integrating
> other people's software into QuPath (CytoMAP, QuBaLab). Many features are **lightly tested or
> entirely untested**. Treat results as a starting point for investigation, not as findings.

> **Walkthrough video:** %%VIDEO_QP_CAT_CELL_ANALYSIS_TOOLS%%
> The walkthrough below is self-contained. You can work through it during the workshop, or on
> your own afterwards.

---

## What it does

The standard multiplex workflow is: segment cells in QuPath, export a measurement table,
open Python, cluster, produce a UMAP, and then lose the connection back to the tissue.
QP-CAT collapses that loop by embedding the Python environment (via
[Appose](https://github.com/apposed/appose)) inside QuPath, so cluster space and slide space
stay linked.

**Find cell types**

- **Unsupervised clustering** — Leiden or KMeans to start, HDBSCAN for rare populations,
  BANKSY when tissue architecture matters, plus several others.
- **Rule-based phenotyping** — classic flow-cytometry-style marker gating, with a threshold
  *suggested* per marker (Triangle, GMM, Gamma).
- **Spatial feature smoothing** — blend each cell with its neighbours before clustering
  (graph convolution), so niches come out as coherent regions instead of salt-and-pepper.
- **Autoencoder cell classifier** — label a small subset by hand and have the rest of the
  project labelled for you (variational autoencoder over marker measurements, image patches,
  or both). Original to QP-CAT and unpublished.
- **Batch correction** (Harmony) so clusters reflect biology rather than staining day.

**Ask spatial questions**

- Neighbourhood enrichment, Ripley K/L, Geary's C, Moran's I, co-occurrence (via squidpy),
  over kNN / radius / Delaunay graphs — do two phenotypes co-localise or avoid each other,
  and at what distance?
- **Cellular neighbourhoods** — recurring tissue niches derived from the cell-type
  composition around each cell.

**Keep separate tissue separate** *(new in 0.10.0)*

- **Independent areas.** Cells in physically separate pieces of tissue — different TMA cores,
  different sections, different images — must never share a spatial graph. A neighbour
  relationship across two cores is an artefact of how the slide was laid out, not biology.
  QP-CAT now resolves areas by geometry and guarantees no graph edge joins two of them,
  across every spatial statistic and cellular-neighbourhood run.
- **Composition by area** — one row per independent area. The core-to-core comparison: how
  does cluster makeup vary across physically separate regions?
- **Composition by class** — clusters grouped by annotation *class* (Tumor, Stroma, …), pooled
  across images and areas. Keyed on class rather than annotation name, so the table stays
  readable however many named regions you have.

Areas decide which cells may share a graph; class decides how results are compared.

**Look at results**

- Interactive **UMAP / PCA / t-SNE** (plus a 3D view). Brush a region of the embedding and
  those cells highlight on the slide; double-click to jump to one.
- **Lasso gating** on any biaxial marker plot — draw a polygon, act on what falls inside.
- Cluster-defining markers via Wilcoxon ranking, plotted as dotplot, matrix plot, violin, or
  PAGA, without leaving QuPath.

There is also an experimental **LLM cluster explainer** that proposes a plain-English cell
type per cluster with a rationale citing markers. It is beta, largely untested, and always
logs its prompt and response. Read it as a hypothesis generator.

## Install

Via the **LOCI QuPath Extensions** catalog. Then run
`Extensions > QP-CAT > Setup environment` — one click configures the full Python environment.

> **Do this before the workshop.** It is a 1.5–2.5 GB download. Conference wifi will not
> enjoy thirty people doing it simultaneously.

---

## The data: a synthetic tumour microenvironment

This exercise uses the
**[TME-QUANT synthetic dataset](https://github.com/uw-loci/tme-quant-synthetic-data)** — a
small, fully ground-truthed synthetic tumour microenvironment. Download the zip
(**~20 MB**) from its
[latest release](https://github.com/uw-loci/tme-quant-synthetic-data/releases/latest).
It is **CC0** — public domain, no attribution required, yours to reuse in your own teaching.

Why synthetic, for a workshop:

- **You can check the answer.** Real multiplexed tissue has no ground truth — you never
  actually know which cell is which type, or whether two populations really co-localise.
  Here every cell has a known type, known marker positivity, and a known place in the tissue.
- **It is fast.** ~2,860 cells per image; 22,428 across all eight. Clustering one image is
  seconds, not coffee.
- **Everything has something to recover.** Six cell types, tissue niches, a proliferation
  gradient, and deliberate per-image intensity offsets.

**What is in it**

| | |
|---|---|
| 8 images | 8 channels (DAPI, PanCK, Ki67, aSMA, CD3, CD8, CD20, CD68), 2D, 0.5 µm/pixel |
| 6 cell types | tumour, fibroblast, CD8 T, helper T, B cell, macrophage |
| Tissue niches | tumour nests, an immune-infiltrated nest boundary, B-cell follicles, stroma |
| Ground truth | per-cell CSV: type, region, position, morphology, per-marker positivity |

> **It is a test fixture, not biology.** Proportions, morphology and intensities were chosen to
> exercise analysis tools, not to reproduce any real tumour or panel. The *concepts* below are
> real; the tissue is not.

---

## Hands-on exercise (~20 min, or ~10 for parts A and B)

**Setup (do once).** Create a QuPath project and add `tme_00.tif`. Set the image type to
**Fluorescence** if prompted. Add a rectangle covering the whole image, then run
`Analyze > Cell detection` on the **DAPI** channel.

> **One parameter matters more than the rest: background radius = 0.**
> DAPI in this data has no background. Any nonzero radius smaller than the largest nucleus
> hollows out the biggest round nuclei and **silently drops about 20% of the tumour cells** —
> and a tumour compartment that is quietly 20% short still looks entirely plausible. This is
> worth internalising beyond this dataset: segmentation defaults chosen for one image type
> fail *silently* on another, and the failure shows up as biology.

Other settings that work: requested pixel size 0.5 µm, sigma 1.5 µm, minimum area 8 µm²,
maximum 1000 µm², threshold 50, cell expansion 5 µm, include nuclei and measurements. You
should detect close to 2,860 cells.

### Part A — recover the cell types (~6 min)

*Concept: cell identity from marker combinations, and what "resolution" costs you.*

1. `Extensions > QP-CAT`, confirm the environment is ready.
2. Run **clustering**. Choose **KMeans with k = 6**, on the seven marker means
   (`Cell: PanCK mean`, `Nucleus: Ki67 mean`, `Cell: aSMA mean`, `Cell: CD3 mean`,
   `Cell: CD8 mean`, `Cell: CD20 mean`, `Cell: CD68 mean`), z-scored. Seconds on 2,860 cells.
3. Open the **cluster-defining markers** plot. Each cluster should be driven by one marker —
   name them: PanCK → tumour, aSMA → fibroblast, CD20 → B cell, CD68 → macrophage, and two
   CD3⁺ clusters.
4. **The interesting pair.** CD8 T cells and helper T cells differ by *one* marker — both are
   CD3⁺, only one is CD8⁺. Look at where they land. Then re-run with **k = 5** and watch them
   merge.

   That merge is not a cosmetic loss. "T cells are present" and "*cytotoxic* T cells are
   present" are different claims about a tumour, and only one of them speaks to whether the
   immune response has effector potential. Under-resolve, and the distinction disappears
   without any error message.
5. Compare against `tme_00_groundtruth.csv`. Every cell's true type is in the `cell_type`
   column.

### Part B — is the tumour infiltrated? (~6 min)

*Concept: immune infiltration at the invasive margin.*

Cell types alone do not tell you much. **Where** they sit does. In this image, T cells are
concentrated in a band just outside each tumour nest — the computational version of a
pathologist's read on whether an immune response has reached the tumour.

6. Run **neighbourhood enrichment** on your classified cells.
7. Read the matrix for four specific pairs, and predict each before you look:

   | Pair | Expect | Because |
   |---|---|---|
   | tumour ↔ tumour | strongly positive | tumour grows in nests, not as single cells |
   | B ↔ B | strongly positive | follicles — dense aggregates, not scattered cells |
   | tumour ↔ fibroblast | strongly **negative** | they occupy different compartments |
   | tumour ↔ CD8 T | positive | cytotoxic T cells sit at the nest boundary |

8. **Now the control that makes it a result.** Check tumour ↔ *helper* T. It should be
   markedly weaker than tumour ↔ CD8 T. The enrichment is specific to the cytotoxic subset,
   which is exactly why Part A's k = 5 merge would have destroyed this finding — the two
   T-cell populations would have been averaged into one indifferent number.
9. Run **Ripley K/L** per type: tumour and B cells clustered, fibroblasts dispersed.
10. Go and look. Click a boundary CD8 T cell in the viewer and confirm it really is where the
    statistic says.

### Part C — inflamed versus desert (~8 min)

*Concept: immune phenotypes of the tumour microenvironment, and comparing separate tissue.*

Add **`tme_06`** (immune-rich) and **`tme_07`** (immune-poor) to the project, detect cells in
both, and cluster all three images **jointly** — about 8,400 cells, still fast.

11. Open the new **Composition by area** tab. Each image is an independent area, so you get
    one row per image.
12. The contrast is stark, and it is the point:

    | | `tme_00` | `tme_06` | `tme_07` |
    |---|---|---|---|
    | Cells | 2,860 | 3,314 | 2,199 |
    | Lymphoid fraction | intermediate | **55%** | **14%** |
    | B-cell follicles | present | more | **none at all** |

    Those are the two ends of a distinction that matters clinically: an **immune-inflamed**
    tumour, with lymphocytes throughout and organised B-cell aggregates, versus an **immune
    desert**, where the tumour sits in fibroblast-rich stroma with almost no lymphoid presence.
    It is the same axis used to stratify patients for immunotherapy — inflamed tumours tend to
    respond; deserts tend not to.
13. Note what `tme_07` is *missing*. Zero B cells, no follicles. An absent population is easy
    to overlook in a UMAP, where it simply is not drawn, and obvious in a composition table.
14. **Why "independent areas" is not a technical detail.** These are three separate images. If
    a spatial graph were allowed to join them, cells at the edge of one image would acquire
    "neighbours" from another — a neighbourhood relationship that exists only because of how
    files were laid out. QP-CAT guarantees no graph edge crosses an area boundary. The same
    applies to TMA cores on one slide, which is the case you are far more likely to meet.
15. If your project has annotation classes (Tumor, Stroma, …), the **Composition by class** tab
    pools clusters by class across every image and area — the way to compare compartments that
    share a spatial graph.

### Optional, and slower — batch effects

Best done at home; clustering all eight images is ~22,400 cells.

16. `tme_02`, `tme_04` and `tme_05` carry deliberate intensity offsets (×0.8, ×1.2, ×0.85) —
    a synthetic staining-day effect.
17. Cluster all eight jointly, **without** correction. Cells of one type from the offset images
    split off into their own clusters: you have discovered your slide scanner, not biology.
18. Re-run **with Harmony**. The same cell type should now cluster together across all eight
    images.

### What to notice

- Every result stays clickable back to the tissue. The value here is the round trip.
- Changing the *measurement selection* usually changes the answer more than changing the
  algorithm. Try it.
- A statistical test that says two populations co-localise, over a slide where they visibly do
  not, means the test answered a different question than you asked. Look at both.
- Ground truth is a luxury you will not have again. Use this dataset to learn what a *correct*
  result looks like, so you can recognise a wrong one on data where nobody can tell you.

---

## Going further

- **[How-To Guide](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/HOW_TO_GUIDE.md)** — step-by-step for every workflow.
- **[Best Practices](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/BEST_PRACTICES.md)** — measurement selection, normalisation, algorithm choice, phenotyping strategy.
- **[Scripting (Groovy)](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/SCRIPTING.md)** and the **[YAML headless-batch runner](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/YAML_SCHEMA.md)** — for running this across a whole cohort, including `area_levels` for TMA cores.
- **[References](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/REFERENCES.md)** — papers and DOIs for every algorithm used.
- **[Dataset instructions](https://github.com/uw-loci/tme-quant-synthetic-data/blob/main/INSTRUCTIONS.md)** — channel tables, the full detection recipe, what every analysis should recover, and the ground-truth CSV reference.
- Once you have clusters, [Cluster 3D Navigator](04-cluster-3d-navigator.md) gives you a
  rotatable 3D point cloud with click-to-navigate.

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-cell-analysis-tools#readme).
