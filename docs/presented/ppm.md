---
layout: default
title: PPM Analysis Tools (presented only)
---

# PPM — Polychromatic Polarization Microscopy

> **Presentation only — no hands-on component today.**
> The analysis half of this extension genuinely needs no microscope. It is presented rather
> than practised here because the calibration and acquisition half does, and because the
> workflows only make sense once you have seen where the calibration comes from.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-ppm](https://github.com/uw-loci/qupath-extension-ppm) |
| **License** | GPL-3.0 |
| **Requires** | QuPath 0.7.0+ (analysis workflows run on any workstation) |
| **Where to find it** | `Extensions > PPM Analysis` |
| **Catalog** | QPSC Microscope Extensions |
| **Session** | Presented only |

---

## What it is

**Polychromatic Polarization Microscopy** (Shribak 2015) encodes the orientation of
birefringent fibres — collagen, muscle — as **colour** in a single image. One acquisition,
and fibre direction is in the hue.

This extension turns those colours back into quantitative fibre angles: mapping fibre
direction across whole slides, comparing alignment between regions, and scoring how fibres run
relative to tissue boundaries. That is directly relevant to fibrosis, tumour stroma, cardiac
remodelling, and developmental tissue studies.

> **Reference:** Shribak, M. (2015). "Polychromatic polarization microscope: bringing colors
> to a colorless world." *Scientific Reports* **5**, 17340.
> [doi:10.1038/srep17340](https://doi.org/10.1038/srep17340)

## The split: hardware vs analysis

This is a good illustration of how the suite is factored, and worth understanding even if you
never touch a polariser.

- **Acquisition and calibration** (rotation control, polarizer calibration, angle selection)
  live in [QPSC](qpsc.md), under `Scope > PPM`. They need the microscope.
- **Analysis** lives in *this* extension, under `Extensions > PPM Analysis`, and runs on any
  workstation. This extension registers **no** modality handler and contains **no** hardware
  code.

So offline reanalysis of an existing PPM dataset needs only this extension — which is exactly
the point of separating them.

### Analysis workflows (no microscope needed)

| Workflow | What it answers |
|---|---|
| **PPM Hue Range Filter** | Where do fibres point in a chosen direction? A live overlay you can sweep through |
| **PPM Polarity Plot** | Are fibres in this annotation aligned or randomly oriented? Rose/polar diagram plus circular statistics — mean angle, dispersion, resultant length |
| **Surface Perpendicularity (PS-TACS)** | Do fibres run *along* a tissue boundary or *into* it? TACS-style tumour-stroma and basement-membrane scoring |
| **Batch PPM Analysis** | The same analysis across every annotation in a project, exported as a CSV ready for stats software |
| **Back-Propagate Annotations** | Draw on a high-resolution sub-image and push those annotations back onto the parent whole-slide image |

### Calibration workflows (in QPSC, require the microscope)

| Workflow | Purpose |
|---|---|
| **Polarizer Calibration** | Make fibre colours map correctly to fibre angles — the foundation for any quantitative claim |
| **PPM Rotation Sensitivity Test** | How much do small mechanical errors in the rotation stage affect measurements? |
| **PPM Birefringence Optimization** | Find the polariser setting giving the cleanest signal for a sample type |
| **PPM Reference Slide (Sunburst)** | Build the hue-to-angle lookup from a known radial test pattern, by linear regression |

The **Reference Slide (Sunburst)** step is the one to pay attention to during the demo: it is
what converts "this pixel is orange" into "this fibre is at 47°." Every quantitative number
downstream inherits that calibration, which is why the analysis tools are not much use without
having seen where it comes from.

## Related repositories

| Repository | Role |
|---|---|
| [qupath-extension-qpsc](https://github.com/uw-loci/qupath-extension-qpsc) | PPM hardware/acquisition, modality handler, microscope communication, coordinate transforms |
| [ppm_library](https://github.com/uw-loci/ppm_library) | Python image-processing library — radial calibration, birefringence computation, background correction, circular statistics |
| [QPSC](https://github.com/uw-loci/QPSC) | System overview and installation for the whole platform |

## If you want to try it later

Start with the
[PPM: Setup and Use guide](https://github.com/uw-loci/qupath-extension-ppm/blob/main/documentation/ppm-setup-and-use.md)
— it walks calibration → camera/white-balance/background → acquisition → analysis, linking each
detailed guide in order. Every dialog also has a **?** button that opens the matching
documentation page.

If you already have PPM data and just want to reanalyse it, install this extension alone and
go straight to the analysis workflows.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-ppm#readme) and its
`documentation/` folder.
