---
layout: default
title: Collagen fiber and texture analysis (presented only)
---

# Collagen fiber and texture analysis

> **Shown, not run.** Both tools need a long environment build or a Windows-only server, and one
> of them wraps a pipeline that cannot be redistributed. There is nothing to install in the
> session. Watch the demo; these links are for afterwards.

Two tools for quantifying collagen architecture — not whether collagen is present, but how it is
arranged, which is what carries the biology in tumor stroma and fibrosis.

> **Walkthrough video:** %%VIDEO_FIBER_ANALYSIS%%

---

## Where to read more

| Tool | What it does | Repository |
|---|---|---|
| **Fiber Analysis** | Straightness, morphometrics and texture over a boundary zone. Embedded Python via Appose | [uw-loci/qupath-extension-fiber-analysis](https://github.com/uw-loci/qupath-extension-fiber-analysis#readme) |
| **TME-Quant** | A QuPath client for the CT-FIRE fiber-extraction pipeline, with TACS classification. Talks to a separate Python server | [MichaelSNelson/qupath-extension-TME-Quant](https://github.com/MichaelSNelson/qupath-extension-TME-Quant#readme) |

If you want to try TME-Quant on Windows, its README has a
[setup guide](https://github.com/MichaelSNelson/qupath-extension-TME-Quant/blob/main/server/WINDOWS_SETUP_GUIDE.md).

## Cite the methods, not just the tools

Both wrap published work from other people — CT-FIRE, CurveAlign and the TACS classification
scheme. If you use either, cite the underlying methods; the full list with references is in
[acknowledgments](../acknowledgements.md).
