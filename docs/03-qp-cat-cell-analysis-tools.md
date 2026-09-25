---
layout: default
title: QP-CAT - Cell Analysis Tools
---

# QP-CAT — Cell Analysis Tools

> Python-powered clustering, phenotyping, and spatial statistics for highly multiplexed
> imaging, with the full scientific Python stack embedded inside QuPath. No conda, no
> servers, no command line.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-cell-analysis-tools](https://github.com/uw-loci/qupath-extension-cell-analysis-tools) |
| **Extension version** | 0.12.0 |
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

**Find cell types.** Note what this is *not*: QuPath already has object classification (train
on measurements, or threshold a single one), and this workshop does not re-teach it. What QP-CAT
adds are other routes to a class on a cell, for when you have thirty markers and no training set
worth the name:

- **Unsupervised clustering**: Leiden or KMeans to start, HDBSCAN for rare populations,
  BANKSY when tissue architecture matters, plus several others.
- **Rule-based phenotyping**: classic flow-cytometry-style marker gating, with a threshold
  *suggested* per marker (Triangle, GMM, Gamma). Since 0.11.0, `anypos` / `anyneg` conditions
  express "Macrophage = CD68 **or** CD163 **or** CD206" as one rule instead of three sharing a
  name.
- **Spatial feature smoothing**: blend each cell with its neighbors before clustering
  (graph convolution), so niches come out as coherent regions instead of salt-and-pepper.
- **Autoencoder cell classifier**: label a small subset by hand and have the rest of the
  project labeled for you (variational autoencoder over marker measurements, image patches,
  or both). Original to QP-CAT and unpublished.
- **Batch correction** (Harmony) so clusters reflect biology rather than staining day.

**Ask spatial questions**

- Neighborhood enrichment, Ripley K/L, Geary's C, Moran's I, co-occurrence (via squidpy),
  over kNN / radius / Delaunay graphs. Do two phenotypes co-localize or avoid each other,
  and at what distance?
- **Cellular neighborhoods**: recurring tissue niches derived from the cell-type
  composition around each cell.

**Keep separate tissue separate** *(new in 0.10.0)*

- **Independent areas.** Cells in physically separate pieces of tissue (different TMA cores,
  different sections, different images) must never share a spatial graph. A neighbor
  relationship across two cores is an artifact of how the slide was laid out, not biology.
  Configure them in the **Independent areas** section and QP-CAT resolves areas by geometry,
  guaranteeing no graph edge joins two of them, across every spatial statistic and
  cellular-neighborhood run. Left unconfigured, the graph is global.
- **Composition by area**: one row per independent area. The core-to-core comparison: how
  does cluster makeup vary across physically separate regions?
- **Composition by class**: clusters grouped by annotation *class* (Tumor, Stroma, …), pooled
  across images and areas. Keyed on class rather than annotation name, so the table stays
  readable however many named regions you have.

Areas decide which cells may share a graph; class decides how results are compared.

**Look at results**

- Interactive **UMAP / PCA / t-SNE** (plus a 3D view). Brush a region of the embedding and
  those cells highlight on the slide; double-click to jump to one.
- **Lasso gating** on any biaxial marker plot. Draw a polygon and the objects inside it are
  selected in QuPath, in the current image.
- Cluster-defining markers via Wilcoxon ranking, plotted as dotplot, matrix plot, violin, or
  PAGA, without leaving QuPath.

<details markdown="1">
<summary><b>Install</b> — from the LOCI catalog, then restart QuPath</summary>

Install from the **LOCI QuPath Extensions** catalog, then restart QuPath. Full steps, including the catalog URL, are in the [setup guide](setup.md).

Then run `Extensions > QP-CAT > Setup & help > Set up analysis environment (first run)...`. One click configures the full Python environment.

</details>

> **Do this before the workshop.** It is a 1.5–2.5 GB download, and conference wifi will be slow with several people fetching it at once.

---

## The data: a synthetic tumor microenvironment

<details markdown="1">
<summary><b>Coming: a real multiplexed Orion dataset</b> — seven images, shown in the walkthrough video; not downloadable yet</summary>

A second dataset is being prepared for QP-CAT specifically — a QuPath project
(`multiplexTesting`) of **seven Orion images**, six numbered `Orion1`–`Orion6` plus
`Orion_Tonsil_10follicles`. Real tissue, real markers, and **several GB**, which is why it is
not the hands-on exercise. **You will see it in the walkthrough video**, showing what this
workflow looks like on real data, and the download is there for exploring afterwards on a
machine with room for it.

<img src="../images/qp-cat/orion-tonsil-follicles.png" alt="A multiplexed tonsil image in green, magenta and yellow. Pale rounded follicles fill the field, several with a darker, more densely stained core, separated by magenta-rich bands of surrounding tissue" width="680">

The tonsil image is the one to start from: ten follicles in a single field, each with a
distinct core and a surrounding zone, so clustering and neighborhood analysis have real
structure to recover rather than a schematic one.

**It does not replace the synthetic set below, and is not meant to.** The synthetic data
stays the one you learn the workflow on: it is small, it is quick to look at, and it has
ground truth, so you can tell whether you got the right answer. Come here once you trust the
workflow and want it on real tissue.

**Not downloadable yet.** The link will appear here and in the [setup guide](setup.md).

</details>


This exercise uses the
**[multiplex synthetic dataset](https://github.com/uw-loci/multiplex-synthetic-data)**, a
small, fully ground-truthed synthetic tumor microenvironment. It is **CC0**: public domain,
no attribution required, yours to reuse in your own teaching.

The hands-on exercise below hands you a **ready-made QuPath project** built from it — the
eight images with cells already detected — so you do not need to run any detection yourself.
It also carries the ground truth as classified **point annotations**, one per cell, so you can
check an answer without leaving QuPath. Get the source zip (**~14 MB**, the
[latest release](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-v1.2.zip))
when you want that same truth as **CSVs** to open in a spreadsheet, the per-image generation
parameters, or the raw images to build the project yourself.

Why synthetic, for a workshop:

- **You can check the answer.** Real multiplexed tissue has no ground truth, so you never
  actually know which cell is which type, or whether two populations really co-localize.
  Here every cell has a known type, known marker positivity, and a known place in the tissue.
- **It is fast.** ~1,430 cells per image; 11,421 across all eight. Clustering one image is
  seconds, not coffee.
- **Everything has something to recover.** Six cell types, tissue niches, a proliferation
  gradient, and deliberate per-image intensity offsets.

> **None of the biology is real.** Treat it as you would fake news: the biological accuracy
> has not been checked by a biologist. Or even by me. It is built so the analysis has
> structure to find, not so the tissue is right.

**What is in it**

| | |
|---|---|
| 8 images | 8 channels (DAPI, PanCK, Ki67, aSMA, CD3, CD8, CD20, CD68), 2D, 0.5 µm/pixel |
| 6 cell types | tumor, fibroblast, CD8 T, helper T, B cell, macrophage |
| Tissue niches | tumor nests, an immune-infiltrated nest boundary, B-cell follicles, stroma |
| Ground truth | per-cell CSV: type, region, position, morphology, per-marker positivity |

**What you get when you unzip the source zip**

Thirty-four files, and QuPath only wants eight of them:

| Files | How many | What to do with them |
|---|---|---|
| `tme_00.tif` ... `tme_07.tif` | 8 | **These are the images.** Drag them into a QuPath project. Everything else is reference material |
| `tme_NN_groundtruth.csv` | 8 | The answer key: one row per cell, with its true type, region and per-marker positivity. Open in a spreadsheet when you want to check a result |
| `all_groundtruth.csv` | 1 | The same thing for all eight images in one file |
| `tme_NN_points.geojson` | 8 | The same cells as QuPath point annotations. `File > Import objects from file...` if you want the truth drawn on the image |
| `tme_NN_params.json` | 8 | How each image was generated: cell counts per type, niche layout, batch offset |
| `INSTRUCTIONS.md` | 1 | The dataset's own guide, with the full channel and region tables |

> **Set the image type to Fluorescence.** QuPath asks the first time you open one, and the
> answer is **Fluorescence**. The brightfield options are RGB-only and are not offered for
> an eight-channel image, so this is a quick confirmation rather than something to get
> wrong.

---

> **New to QuPath?** Words like *project*, *annotation*, *detection*, *class* and
> *measurement* are explained in the [glossary](glossary.md). For QuPath itself, the
> [official documentation](https://qupath.readthedocs.io/en/stable/) is the place to go.

## Hands-on exercise

**Download:** `multiplex-synthetic-data-demo-project-clustered.zip` —
**[direct download](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-demo-project-clustered.zip)** (23 MB). All eight synthetic images with cells already detected, plus
a saved KMeans k = 6 clustering of all 11,421 of them. Unzip it and drag `project.qpproj` onto
an open QuPath window; if the images come up red in an **Update URIs** dialog, click
**Search...**, point it at the unzipped folder, and **Apply changes**.

That saved result means **you can read every number in Part A without running anything** — useful
if the environment build is slow, or if you would rather spend the hour on Parts B and C.

> **The embedding columns in the download are named `3DUMAP1`, `3DUMAP2` and `3DUMAP3`** — the
> dialog's **Name** field was `3D UMAP`, and the space is dropped when the columns are written. A
> run you do with a newer QP-CAT build may write `QPCAT 3D UMAP1` instead. Nothing is broken
> either way — the saved result knows which columns it wrote — but if you go on to the
> [Cluster 3D Navigator](04-cluster-3d-navigator.md) exercise, those are the three names to pick.

<details markdown="1">
<summary><b>Building it yourself instead</b> — detection settings, if you want to start from the images</summary>

You need **one** image to start, `tme_00.tif`; Parts C and D add `tme_06.tif` and
`tme_07.tif`, and only batch correction wants all eight.

Create a QuPath project and add `tme_00.tif`. Set the image type to **Fluorescence** if
prompted. Add a rectangle covering the whole image, then run `Analyze > Cell detection` on the
**DAPI** channel.

> **One parameter matters more than the rest: background radius = 0.**
> DAPI in this data has no background. Any nonzero radius smaller than the largest nucleus
> hollows out the biggest round nuclei and **silently drops about 20% of the tumor cells**,
> and a tumor compartment that is quietly 20% short still looks entirely plausible. This is
> worth internalizing beyond this dataset: segmentation defaults chosen for one image type
> fail *silently* on another, and the failure shows up as biology.

Other settings that work: requested pixel size 0.5 µm, sigma 1.5 µm, minimum area 8 µm²,
maximum 1000 µm², threshold 50, cell expansion 5 µm, include nuclei and measurements. You
should detect close to 1,530 cells on `tme_00`.

</details>

### Part A: recover the cell types
*Concept: cell identity from marker combinations, and what "resolution" costs you.*

1. **Check the environment first.** Open `Extensions > QP-CAT`. Until the Python environment
   is installed, every group except **Setup & help** is hidden, so a fresh install shows a menu
   with one item on it — that is expected, not a broken install. Build it from
   `Setup & help > Set up analysis environment (first run)...`. Once it is ready the menu fills
   out:

   <img src="../images/qp-cat/menu.png" alt="The Extensions menu with QP-CAT expanded. Its first item is Find cell populations (clustering), followed by the submenus Classify cells, Explore and spatial, Results and populations, Export, and Setup and help. The extensions list behind it shows QuIET, Classify Object Subset, Project Metadata Browser, Channel Names Viewer, Class Distribution and Cluster 3D Navigator" width="586">

2. **`Extensions > QP-CAT > Find cell populations (clustering)...`**, and set it up like this:

   | Section | Setting |
   |---|---|
   | Scope | **All project images (8)** — 11,421 cells |
   | Measurements | **`Select 'Mean' only`**, then also tick the six **`Nucleus:`** shape measurements (Area, Perimeter, Circularity, Max caliper, Min caliper, Eccentricity). **30 in total** |
   | Normalization | **Z-score (standard)**, the default |
   | Dimensionality Reduction | **UMAP**, **Dimensions: 3D** |
   | Clustering Algorithm | **KMeans**, **k = 6** |

   Leave the random seed at 42. KMeans runs ten initializations and keeps the best, so the run
   is repeatable. The dialog reopens with whatever you last ran, so the second and third runs in
   this exercise start from the first rather than from defaults. While a run is going, the
   progress checklist shows how long each step has taken — useful for deciding which spatial
   statistics are worth their time on your own data. Tick **`Neighborhood enrichment + Moran's I`** and, under Spatial statistics,
   **`Ripley K and L`** as well — Parts B and C need them, and computing them now saves a second
   run.

   > **Short on time, or something went wrong?** Everything below is already computed in the
   > **clustered project** download. Open it, then
   > `Results & populations > View Past Results...` and pick `auto_20260924_135415_kmeans`.
   > The run's settings are also saved as `K-Means-6.json`, loadable from the Run Clustering
   > dialog's **`Load Config from file...`**, if you would rather reproduce it than read it.

   > **Why keep the shape measurements?** General advice says to cluster on markers alone. This
   > dataset is built so that shape carries real information — fibroblasts have elongated
   > spindle nuclei, tumor nuclei are large and round — and you will see the shape features earn
   > their place in the next step. It is worth knowing the general advice and knowing when the
   > data contradicts it.
   >
   > `Explore & spatial > Quick clustering presets > Quick KMeans (k=10)` is **k = 10**, not 6.
   > It is not a shortcut for this step.

3. **Read the Marker Fingerprints tab.** One card per cluster, showing each measurement's
   enrichment as log2 fold-change against every other cell. This is where you name the clusters:

   <img src="../images/qp-cat/fingerprints-kmeans6.png" alt="The Marker Fingerprints tab showing six cluster cards. Cluster 0, 3306 cells, is led by Cytoplasm aSMA mean plus nucleus eccentricity and max caliper. Cluster 1, 1914 cells, by PanCK. Cluster 2, 2752 cells, by CD3 across three compartments and by CD8. Cluster 3, 1093 cells, by CD20. Cluster 4, 1566 cells, by CD68. Cluster 5, 790 cells, by Ki67 across three compartments together with PanCK" width="1000">

   | Cluster | Cells | Led by | Read it as |
   |---|---|---|---|
   | 0 | 3,306 | aSMA, **plus eccentric, long nuclei** | fibroblast |
   | 1 | 1,914 | PanCK | tumor |
   | 2 | 2,752 | CD3 **and** CD8 | T cells |
   | 3 | 1,093 | CD20 | B cell |
   | 4 | 1,566 | CD68 | macrophage |
   | 5 | 790 | Ki67 **and** PanCK | proliferating tumor |

   Cluster 0 is the shape argument made concrete: `Nucleus: Eccentricity` and `Nucleus: Max
   caliper` sit alongside aSMA, because a fibroblast is both aSMA-positive *and* spindle-shaped.

4. **Now compare that against the ground truth, and notice it does not line up the way you
   would expect.** Every cluster matches a real population to within about one percent —
   but they are not the six types the dataset was built from:

   | Cluster | % of cells | Ground-truth population | % |
   |---|---|---|---|
   | 0 fibroblast | 28.9 | `fibroblast` | 28.9 |
   | 1 tumor | 16.8 | `tumor`, Ki67-negative | 16.4 |
   | 5 proliferating tumor | 6.9 | `tumor`, Ki67-positive | 7.2 |
   | 2 T cells | 24.1 | `cd8_t` **+** `helper_t` | 24.3 |
   | 3 B cell | 9.6 | `b_cell` | 9.5 |
   | 4 macrophage | 13.7 | `macrophage` | 13.6 |

   **KMeans spent one of its six clusters splitting the tumor by proliferation, and paid for it
   by merging the two T-cell lineages.** Ki67 is a *state* — a cell cycling or not — while CD8
   marks a *lineage*. Nothing in the algorithm knows the difference; both are just columns that
   separate cells.

   The cost is not cosmetic. "T cells are present" and "*cytotoxic* T cells are present" are
   different claims about a tumor, and only the second speaks to whether the immune response has
   effector potential. You got the right *number* of clusters and the wrong *partition*, and the
   only reason you can tell is that this dataset ships a ground truth. On real data you could not.

5. **So what would you change?** Two honest routes, both worth trying:
   - **k = 7**, which gives the algorithm room to keep the tumor split *and* separate the T cells.
   - **Drop Ki67 from the measurements** and re-run at k = 6. If proliferation cannot define a
     cluster, the spare cluster goes somewhere else.

   Neither is more correct in the abstract. Which you want depends on whether proliferation or
   cytotoxic identity is the question you came with — and that is a decision about biology, not
   about clustering.

6. Check your own numbers against `all_groundtruth.csv` in the dataset download; every cell's
   true type is in the `cell_type` column.

### Part B: is the tumor infiltrated?
*Concept: immune infiltration at the invasive margin.*

Cell types alone do not tell you much. **Where** they sit does. In this image, T cells are
concentrated in a band just outside each tumor nest, the computational version of a
pathologist's read on whether an immune response has reached the tumor.

6. Run **neighborhood enrichment** on your classified cells. It is a tick-box —
   `Neighborhood enrichment + Moran's I` — in the Run Clustering dialog, so the easiest route is
   to turn it on before you cluster. After the fact, use
   `Explore & spatial > Spatial statistics on existing clusters...` instead.
7. Read the matrix for four specific pairs, and predict each before you look:

   | Pair | Expect | Because |
   |---|---|---|
   | tumor ↔ tumor | strongly positive | tumor grows in nests, not as single cells |
   | B ↔ B | strongly positive | follicles: dense aggregates, not scattered cells |
   | tumor ↔ fibroblast | strongly **negative** | they occupy different compartments |
   | tumor ↔ CD8 T | positive | cytotoxic T cells sit at the nest boundary |

8. **Now the control that makes it a result.** Check tumor ↔ *helper* T. It should be
   markedly weaker than tumor ↔ CD8 T. The enrichment is specific to the cytotoxic subset,
   which is exactly why Part A's k = 5 merge would have destroyed this finding: the two
   T-cell populations would have been averaged into one indifferent number.
9. Run **Ripley K/L** per type: tumor and B cells clustered, fibroblasts dispersed.
   `Ripley K and L (point-pattern, dual plot)` is one of four tick-boxes under **Spatial
   statistics**, in the same two places as step 6.

   > **You may see one plot, not two.** Recent versions of squidpy dropped Ripley K and keep
   > only L. When that happens QP-CAT shows L alone and says so, rather than drawing a K chart
   > of placeholder zeros that would read as "no clustering at any radius". Read L: it is the
   > variance-stabilized transform of K and answers the same question. Above the dashed Poisson
   > reference means clustered, below means dispersed.
10. Go and look. Click a boundary CD8 T cell in the viewer and confirm it really is where the
    statistic says.

    > **Taking the numbers with you.** The Geary's C, Ripley and co-occurrence tabs each have
    > `Copy`, `Copy CSV` and `Save CSV...`. The CSV is written one row per observation, so a
    > pairwise co-occurrence row names both clusters — easier to work with than the on-screen
    > table, which is one column per ordered pair and scrolls off the right on a run with many
    > clusters.

### Part C: inflamed versus desert
*Concept: immune phenotypes of the tumor microenvironment, and comparing separate tissue.*

Add **`tme_06`** (immune-rich) and **`tme_07`** (immune-poor) to the project, detect cells in
both, and cluster all three images **jointly**, about 4,200 cells, still fast.

11. Open the new **Composition by area** tab. Each image is an independent area, so you get
    one row per image.
12. The contrast is stark, and it is the point:

    | | `tme_00` | `tme_06` | `tme_07` |
    |---|---|---|---|
    | Cells | 1,530 | 1,722 | 945 |
    | Lymphoid fraction | 33% | **50%** | **6%** |
    | B-cell follicles | present | more | **none at all** |

    Those are the two ends of a distinction that matters clinically: an **immune-inflamed**
    tumor, with lymphocytes throughout and organized B-cell aggregates, versus an **immune
    desert**, where the tumor sits in fibroblast-rich stroma with almost no lymphoid presence.
    It is the same axis used to stratify patients for immunotherapy: inflamed tumors tend to
    respond; deserts tend not to.
13. Note what `tme_07` is *missing*. Zero B cells, no follicles. An absent population is easy
    to overlook in a UMAP, where it simply is not drawn, and obvious in a composition table.
14. **Why "independent areas" is not a technical detail.** These are three separate images. If
    a spatial graph were allowed to join them, cells at the edge of one image would acquire
    "neighbors" from another, a neighborhood relationship that exists only because of how
    files were laid out. QP-CAT guarantees no graph edge crosses an area boundary. The same
    applies to TMA cores on one slide, which is the case you are far more likely to meet.
15. If your project has annotation classes (Tumor, Stroma, …), the **Composition by class** tab
    pools clusters by class across every image and area, the way to compare compartments that
    share a spatial graph.

### Optional, and slower: batch effects

Best done at home; clustering all eight images is ~11,400 cells.

16. `tme_02`, `tme_04` and `tme_05` carry deliberate intensity offsets (×0.8, ×1.2, ×0.85),
    a synthetic staining-day effect.
17. Cluster all eight jointly, **without** correction. Cells of one type from the offset images
    split off into their own clusters: you have discovered your slide scanner, not biology.
18. Re-run **with Harmony**. The same cell type should now cluster together across all eight
    images.

    > **Before any second run, click `Deselect QPCAT` in the Measurements list.** The first run
    > wrote its own columns onto the cells — embedding coordinates, spatial and component
    > measurements — all named with a leading `QPCAT`. They are output, not input: clustering on
    > them clusters on the previous run's answer. One button clears every one of them and leaves
    > your own measurements ticked.

### Saved results: reopen a run instead of repeating it

Clustering is the slow part of this exercise, and you do not have to do it twice. **Every
successful run auto-saves** to `<project>/qpcat/cluster_results/` under a timestamped name like
`auto_20260617_193235_leiden`. Nothing to click.

<img src="../images/qp-cat/menu-savedresults.png" alt="The QP-CAT menu with Results and populations expanded, showing View Past Results, Manage Saved Results, then Modify cell populations (rename, merge, split, sub-cluster), Analyze current cell classifications, Apply saved result to detections, and Apply cluster color palette" width="1000">

- **`Results & populations > View Past Results...`** reopens the whole results window — heatmap,
  marker rankings, embedding, every tab — with no Python run and no re-clustering. This is the
  one to use if you want to go back to Part A's plots while working on Part B, or to look again
  after the session.
- **`Apply saved result to detections...`** is the different one: it writes a saved run's labels
  back onto the cells. Reach for it when the labels are right in the saved result but are not on
  the image — most often after closing and reopening the project. It matches cells by source
  image id and centroid rather than by count, and shows a predicted match count before you
  commit, so cells it cannot match are reported rather than mislabeled.
- **`Manage Saved Results...`** lists everything saved with its size, for deleting the runs you
  no longer want. Auto-saves are never removed for you.

> Applied labels are namespaced by the result name — `<result>: Cluster N` — so results from
> different runs can coexist on the same detections without colliding. Handy, with one
> consequence worth knowing: any embedding measurements come back prefixed too
> (`<result>: QPCAT 3D UMAP1`). QP-CAT's own **3D View** tab is unaffected, because the result
> tells the view which columns it wrote; the standalone Cluster 3D Navigator reads the columns
> generically and may still need the three axes picked by hand.

### What to notice

- Every result stays clickable back to the tissue. The value here is the round trip.
- Changing the *measurement selection* usually changes the answer more than changing the
  algorithm. Try it.
- A statistical test that says two populations co-localize, over a slide where they visibly do
  not, means the test answered a different question than you asked. Look at both.
- **A single cluster is a result about your measurements, not about the tissue.** If you try
  [HDBSCAN](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.HDBSCAN.html) here
  and it collapses to one population plus scattered noise, that is a property of the method meeting
  this kind of data, not a verdict on the tissue: on a 304,083-cell TMA it gave one population plus
  22% noise where KMeans over the identical measurements separated the cores 91–99% cleanly.
  Evenly-spread noise is the tell. Try another algorithm on the same measurements before
  concluding your data lack structure.
- Ground truth is a luxury you will not have again. Use this dataset to learn what a *correct*
  result looks like, so you can recognize a wrong one on data where nobody can tell you.

---

## Going further

- **[Documentation index](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/README.md)**: one page per topic; the place to start.
- **[Clustering](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/clustering.md)**: measurement selection, normalization and algorithm choice.
- **[Scripting (Groovy)](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/scripting.md)** and the **[YAML headless-batch runner](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/yaml-reference.md)**: for running this across a whole cohort, including `area_levels` for TMA cores.
- **[References](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/references.md)**: papers and DOIs for every algorithm used.
- **[Dataset instructions](https://github.com/uw-loci/multiplex-synthetic-data/blob/master/INSTRUCTIONS.md)**: channel tables, the full detection recipe, what every analysis should recover, and the ground-truth CSV reference.
- Once you have clusters, [Cluster 3D Navigator](04-cluster-3d-navigator.md) gives you a
  rotatable 3D point cloud with click-to-navigate.

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-cell-analysis-tools#readme).

### The analysis libraries underneath

QP-CAT is a QuPath front end for established Python tools: it moves your measurements out, runs
these, and brings the answers back onto the cells. Nothing in this guide re-teaches them, so when
you want to know what a parameter actually does, or how a method behaves, go to its own
documentation.

| Library | What QP-CAT uses it for |
|---|---|
| [scanpy](https://scanpy.readthedocs.io/) | Leiden clustering, marker ranking, PAGA, the dotplot / matrixplot / stacked-violin figures |
| [squidpy](https://squidpy.readthedocs.io/) | Neighborhood enrichment, Ripley's K/L, Geary's C, Moran's I, co-occurrence |
| [umap-learn](https://umap-learn.readthedocs.io/) | UMAP embeddings, 2D and 3D |
| [scikit-learn](https://scikit-learn.org/stable/) | KMeans, agglomerative clustering, HDBSCAN, PCA, t-SNE |
| [leidenalg](https://leidenalg.readthedocs.io/) + [python-igraph](https://python.igraph.org/) | The graph partitioning behind Leiden |
| [harmonypy](https://github.com/slowkow/harmonypy) | Harmony batch correction |
| [pybanksy](https://pypi.org/project/pybanksy/) | BANKSY spatially aware clustering |
| [anndata](https://anndata.readthedocs.io/) | The data structure the analysis is assembled in |

Versions are pinned per release; the exact set is in the extension's
[`pixi.toml`](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/src/main/resources/qupath/ext/qpcat/pixi.toml).
