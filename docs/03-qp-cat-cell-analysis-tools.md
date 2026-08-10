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
| **Version at workshop** | 0.9.13 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+. ~1.5–2.5 GB download, ~2.5 GB on disk for the Python environment |
| **Where to find it** | `Extensions > QP-CAT` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> **Maturity warning, from the author.** This is a continuation of earlier work integrating
> other people's software into QuPath (Caleb Hallinan's CytoMAP work, Alan O'Callaghan's
> QuBaLab). Many features are **lightly tested or entirely untested**. Treat results as a
> starting point for investigation, not as findings.

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

## Hands-on exercise (~20 min)

**Data:** `DATA-02_multiplex_IF` — a multiplexed IF project with cells already detected and
per-marker measurements.

### Part A — clustering, then back to the tissue

1. `Extensions > QP-CAT`, confirm the environment is ready.
2. Run **clustering**. Start with **Leiden**; select the marker measurements you actually
   want to cluster on (this choice matters more than the algorithm).
3. When the results dialog opens, look at the **UMAP**. Brush a region of the embedding —
   watch the corresponding cells highlight in the QuPath viewer.
4. Double-click a single point and jump to that cell on the slide. Ask yourself whether it
   looks like what the cluster claims.
5. Open the **cluster-defining markers** plot (Wilcoxon ranking). Do the top markers per
   cluster make biological sense?

### Part B — the same thing, spatially aware

6. Re-run clustering with **spatial feature smoothing** enabled.
7. Compare: the clusters should now read as tissue *regions* rather than scattered cells.

### Part C — a spatial statistic

8. Run **neighbourhood enrichment** on your clusters.
9. Pick one pair of clusters that the test says co-localise and go look at them on the slide.

### What to notice

- Every result stays clickable back to the tissue. The value here is the round trip, not the
  algorithm list.
- Changing the *measurement selection* usually changes the answer more than changing the
  algorithm. Try it.
- A statistical test that says two populations co-localise, and a slide where they visibly do
  not, means the test is answering a different question than you asked. Look at both.

---

## Going further

- **[How-To Guide](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/HOW_TO_GUIDE.md)** — step-by-step for every workflow.
- **[Best Practices](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/BEST_PRACTICES.md)** — measurement selection, normalisation, algorithm choice, phenotyping strategy.
- **[Scripting (Groovy)](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/SCRIPTING.md)** and the **[YAML headless-batch runner](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/YAML_SCHEMA.md)** — for running this across a whole cohort.
- **[References](https://github.com/uw-loci/qupath-extension-cell-analysis-tools/blob/main/documentation/REFERENCES.md)** — papers and DOIs for every algorithm used.
- Once you have clusters, [Cluster 3D Navigator](04-cluster-3d-navigator.md) gives you a
  rotatable 3D point cloud with click-to-navigate.

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-cell-analysis-tools#readme).
