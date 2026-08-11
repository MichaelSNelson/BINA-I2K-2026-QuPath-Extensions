---
layout: default
title: Acknowledgements
---

# Acknowledgements

## Sample data

**The majority of the test and demonstration data used throughout this workshop was provided by
Sara McArdle and Zbigniew Mikulski at the La Jolla Institute for Immunology (LJI).**

This is not a small contribution and it is not a footnote. Almost every exercise on this site —
the annotation work, the classifier training and validation, the multiplexed analysis, the
export examples — was developed against their images. Tools like these cannot be built, tested,
or taught without real data from people willing to share it, and far more of this workshop rests
on that generosity than on any single piece of software here.

Sara McArdle has also shaped the software directly. Two of the extensions in this workshop began
as her Groovy scripts:

- **[Channel Names Viewer](11-channel-names-viewer.md)** packages her
  [`FluorescentChannelNames.groovy`](https://github.com/saramcardle/Image-Analysis-Scripts/blob/master/QuPath%20Groovy%20Scripts/FluorescentChannelNames.groovy)
  (originally written by Pete Bankhead at the 2022 QuPath Hackathon) as a full extension.
- **[Classify Object Subset](07-classify-object-subset.md)** implements the pattern she explored
  in [`B_Helper_Cyto.groovy`](https://github.com/saramcardle/Image-Analysis-Scripts/blob/master/QuPath%20Groovy%20Scripts/Workshop%20Examples/B_Helper_Cyto.groovy).

Her [FS2K](https://github.com/saramcardle/FS2K) QuPath course was also the model for how these
instructional pages are structured.

If you use the workshop datasets in your own work, please credit LJI and the contributors above.

---

## QuPath

**Pete Bankhead** and the QuPath team. None of this exists without QuPath, and its extension
mechanism is what makes a suite like this possible at all.

> Bankhead P, Loughrey M B, Fernández J A, *et al.* (2017). *QuPath: Open source software for
> digital pathology image analysis.* **Scientific Reports** 7:16878.

---

## Methods these tools build on

Several extensions here are thin wrappers over other people's science. If you publish with them,
cite the method, not just the extension.

| Tool | Builds on |
|---|---|
| [Collagen fibre analysis](presented/fiber-analysis.md) | **CT-FIRE** — Bredfeldt J S, Liu Y, Pehlke C A, *et al.* (2014). **J Biomed Opt** 19(1):016007 · **CurveAlign** (LOCI, UW–Madison) |
| [Collagen fibre analysis](presented/fiber-analysis.md) | **TACS** — Conklin M W, Eickhoff J C, Riching K M, *et al.* (2011). **Am J Pathol** 178(3):1221–1232 · Provenzano P P, Inman D R, Eliceiri K W, *et al.* (2008). **BMC Medicine** 6:11 |
| [Collagen fibre analysis](presented/fiber-analysis.md) | **TWOMBLI** — Wershof E, Park D, Barry D J, *et al.* (2021). **Life Sci Alliance** 4(3):e202000880 |
| [QP-CAT](03-qp-cat-cell-analysis-tools.md) | **CytoMAP** and **QuBaLab**, whose approaches to bringing clustering into QuPath this continues · **scanpy**, **squidpy**, **Harmony**, **Leiden**, **HDBSCAN**, **BANKSY** |
| [QuIET](01-quiet-image-export.md) | **QUAREP-LiMi** — the community reporting standards embedded in its guidance panels |
| [DL Pixel Classifier](02-dl-pixel-classifier.md) | Histology-pretrained and pathology foundation-model encoders released by their respective authors · integration approach inspired by **LazySlide** (Zheng *et al.* 2026, *Nature Methods*) |
| [Confusion Matrix](presented/confusion-matrix.md) | Written by **Kristin Gallick** — [QuPath_Confusion_Matrix_Extension](https://github.com/kgallik/QuPath_Confusion_Matrix_Extension) |
| Several tools | **Appose**, which makes the embedded Python environments possible without conda |

Full per-method references are in each extension's own repository.

---

## Contributed extensions

**Kristin Gallick** wrote the [Confusion Matrix](presented/confusion-matrix.md) extension, which
is the tool in this workshop that turns "the classifier looks good" into a number with a
confidence interval attached.

---

## The community

Several features here exist because someone asked for them on
[image.sc](https://forum.image.sc/). The Project Metadata Browser's project-wide key rename
began as a request from `sebg`, building on a script by Pete Bankhead; Classify Object Subset
came out of a forum thread about applying classifiers to a subset of objects. The forum is a
large part of why QuPath tooling improves at the rate it does.

---

## LOCI

Developed at the **Laboratory for Optical and Computational Instrumentation**, University of
Wisconsin–Madison.
