---
layout: default
title: Collagen fibre and texture analysis (presented only)
---

# Collagen fibre and texture analysis

> **Presentation only — no hands-on component.**
> Two complementary tools for quantifying collagen architecture in tissue: a **Fiber Analysis**
> testbed for straightness, morphometrics and texture over a boundary zone, and **TME-Quant**,
> a QuPath client for the CT-FIRE fibre-extraction pipeline with TACS classification.

| | Fiber Analysis | TME-Quant |
|---|---|---|
| **Repository** | [uw-loci/qupath-extension-fiber-analysis](https://github.com/uw-loci/qupath-extension-fiber-analysis) | [MichaelSNelson/qupath-extension-TME-Quant](https://github.com/MichaelSNelson/qupath-extension-TME-Quant) |
| **Version** | 0.1.1 | 0.1.0 |
| **License** | Apache-2.0 | Apache-2.0 |
| **Menu** | `Extensions > Fiber Analysis` | `Extensions > TME Quant` |
| **Backend** | Embedded Python via Appose | Separate Python FIRE server over a local socket |
| **Session** | Presented only | Presented only |

---

## Why fibre architecture, and why it is hard

Collagen is not just present or absent. In tumour stroma, fibrosis, cardiac remodelling and
developmental tissue, what carries the biology is **how the fibres are arranged** — wavy versus
straightened, aligned versus isotropic, dense-and-uniform versus sparse-and-clumped, and how all
of that changes relative to a tissue boundary.

The clinical motivation is concrete. In TACS-3 breast pathology
(Conklin *et al.* 2011, *Am J Pathol* **178**:1221), straightened collagen fibres running
*perpendicular* to the tumour–stroma boundary act as contact-guidance tracks for invading cells,
with a hazard ratio of 3.0–3.9 for disease-free survival — **independent of grade, size, and
receptor status**. The same wavy-to-straight axis recurs in arterial adventitia, sclera,
alveolar wall, and cardiac fibrosis.

Getting a number out of that is the hard part, and it is why there are two tools here rather
than one.

---

## Fiber Analysis — metrics over a boundary zone

The organising idea is the **dilated border zone**: you draw an annotation (typically a
tumour–stroma boundary), and every metric is computed in a band of specified width on the
inside, the outside, or both. Optionally the zone is divided into a grid of moving windows so
you get spatial maps rather than one number per region.

Segmentation is either internal (a threshold on a chosen channel, with an optional
Frangi / Sato / Meijering ridge filter to enhance line-like structures) or supplied — it will
consume a pixel-classifier output, thresholded objects, an annotation class, or a mask file. So
the [DL Pixel Classifier](../02-dl-pixel-classifier.md) can produce the fibre mask that this
then measures.

**Three metric families:**

**Straightness / persistence** — distinguishes wavy from straightened collagen. Per-window
skeleton tortuosity (chord/arc, the CT-FIRE convention; Bredfeldt *et al.* 2014,
*J Biomed Opt* **19**:016007), plus per-ROI Radon scalars — peak-to-mean ratio and FWHM at θ*
(Schaub & Gilbert 2011).

**Morphometrics** — shape statistics of the segmented fibre graph: HDM coverage, total fibre
length, branch and end-point counts, mean curvature, box-counting fractal dimension (collagen
networks typically land at 1.4–1.8), lacunarity, and max-inscribed-circle gap analysis. This is
a native re-implementation of the inexpensive metrics from TWOMBLI
(Wershof *et al.* 2021, *Life Sci Alliance* **4**:e202000880); the TWOMBLI FIJI plugins are not
bundled, which is what keeps the extension Apache-2.0.

**Texture** — the information fibre-tracing misses. A dense uniform mat and a sparse clumped
field can share the same mean alignment and differ completely in texture. Per-window
GLCM / Haralick features (contrast, correlation, energy, homogeneity, entropy, dissimilarity)
via scikit-image.

> **Status: testbed.** This is an explicit research prototype for evaluating fibre-analysis
> methods against the dilated-border pattern. Research use only. Parameter names and output
> formats may change between revisions, and metrics may or may not later graduate into a
> production extension. It is not distributed through a catalog.

---

## TME-Quant — CT-FIRE fibre extraction with TACS classification

Where Fiber Analysis measures a *mask*, TME-Quant traces **individual fibres**. It sends a
selected region to the **TMEQuant FIRE** pipeline — a Python translation of
[CurveAlign](https://loci.wisc.edu/software/curvealign/), built on CT-FIRE — over a local
socket, previews the detected fibres interactively, and commits them back into QuPath as
`Fiber` objects.

The interaction is the interesting part:

- **Threshold by eye, with feedback.** A red mask shows exactly which pixels FIRE will treat as
  collagen before you spend time on a trace.
- **Interactive preview.** Trace, then zoom and pan two synchronised previews; double-click to
  pick a single tile for a fast iteration loop.
- **Supervised parameter tuning.** Draw a few *real* fibres as line annotations inside your
  region and click **Suggest parameters…**. It searches the detection knobs to match what you
  traced and ranks the candidates; you pick a row and preview it. This is the same "show me
  once" idea as the [Wizard Wand](../05-wizard-wand.md)'s auto-tuning, applied to a much larger
  parameter space.
- **TACS classification.** Select a larger region, tick **Classify TACS…**, and nominate a
  tumour-boundary annotation. Fibres are committed as `TACS-2` / `TACS-3` objects according to
  their orientation relative to that boundary.

### Why this one is a demo and not an exercise

Three reasons, all practical:

1. The FIRE backend is a **separate Python server**; the extension is the QuPath-side client.
2. The documented setup path is **Windows-only** (MSYS2 UCRT64). First run installs several
   hundred MB and builds the FIRE engine — 5–15 minutes.
3. **The FIRE pipeline itself cannot be redistributed.** It has to be obtained from the
   maintainer, which means it cannot go in a public workshop Drive folder.

None of that is a problem for a lab that wants to adopt it. It is fatal for sixty minutes in a
conference room.

---

## How the two relate

| | Fiber Analysis | TME-Quant |
|---|---|---|
| **Unit of analysis** | A zone (and windows within it) | Individual traced fibres |
| **Output** | Per-window / per-ROI measurements and maps | Fibre objects in the hierarchy, optionally TACS-classified |
| **Boundary handling** | Dilated border zone, inside / outside / both | Orientation relative to a nominated tumour boundary |
| **Setup cost** | One Appose environment build (5–10 min) | Separate server + non-redistributable pipeline |
| **Best for** | Screening many metrics; texture; comparing regions | Fibre-level morphology and TACS scoring |

They answer different questions and are worth running together. If you want a number per region
across a cohort, start with Fiber Analysis. If you want the fibres themselves, and TACS, use
TME-Quant.

---

## Please cite the methods

Both tools are thin wrappers over other people's science. If you publish with either:

- **CT-FIRE / FIRE** — Bredfeldt J S, Liu Y, Pehlke C A, Conklin M W, Szulczewski J M, Inman D R,
  Keely P J, Nowak R D, Mackie T R, Eliceiri K W (2014). *Computational segmentation of collagen
  fibers from second-harmonic generation images of breast cancer.* **J Biomed Opt** 19(1):016007.
- **CurveAlign** — [LOCI, UW–Madison](https://loci.wisc.edu/software/curvealign/); `tme-quant`
  is a Python translation of it.
- **TACS** — Conklin M W, Eickhoff J C, Riching K M, *et al.* (2011). *Aligned collagen is a
  prognostic signature for survival in human breast carcinoma.* **Am J Pathol** 178(3):1221–1232.
  Provenzano P P, Inman D R, Eliceiri K W, *et al.* (2008). *Collagen density promotes mammary
  tumor initiation and progression.* **BMC Medicine** 6:11.
- **TWOMBLI** — Wershof E, Park D, Barry D J, *et al.* (2021). *A FIJI macro for quantifying
  pattern in extracellular matrix.* **Life Sci Alliance** 4(3):e202000880.
- **QuPath** — Bankhead P, Loughrey M B, Fernández J A, *et al.* (2017). **Sci Rep** 7:16878.

---

## If you want to try either afterwards

- **Fiber Analysis** — install the `-all.jar` from
  [Releases](https://github.com/uw-loci/qupath-extension-fiber-analysis/releases), then run
  `Extensions > Fiber Analysis > Setup environment...` **before** your first analysis. Skipping
  that step makes the first run appear to hang. Linux and Windows are supported; macOS is not
  verified.
- **TME-Quant** — start with
  [Test it today (Windows)](https://github.com/MichaelSNelson/qupath-extension-TME-Quant#test-it-today-windows)
  and the [Windows setup guide](https://github.com/MichaelSNelson/qupath-extension-TME-Quant/blob/main/server/WINDOWS_SETUP_GUIDE.md).
  Come and talk to us about getting the FIRE pipeline.
