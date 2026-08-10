---
layout: default
title: QPSC - QuPath Scope Control (presented only)
---

# QPSC — QuPath Scope Control

> **Presentation only — no hands-on component.**
> QPSC drives real microscope hardware. We are not connecting thirty laptops to a microscope
> from a conference room, so this one is a live demo (network permitting) plus this page.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-qpsc](https://github.com/uw-loci/qupath-extension-qpsc) |
| **System overview & install** | [uw-loci/QPSC](https://github.com/uw-loci/QPSC) |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+, plus Micro-Manager, Pycro-Manager, a Python command server, and a microscope |
| **Catalog** | QPSC Microscope Extensions |
| **Session** | Presented only |

---

## What it is

QPSC lets you **control your microscope directly from QuPath** and automatically acquire
high-resolution images of regions you select.

In plain terms: draw a box around a region in QuPath, and QPSC moves the stage, captures every
tile needed to cover that region, stitches them, and adds the resulting image back into your
QuPath project — with metadata intact.

The extension talks to the microscope through
[Pycro-Manager](https://pycro-manager.readthedocs.io/) and
[Micro-Manager](https://micro-manager.org/), via a Python command server. QuPath is the
interface; Micro-Manager remains the device layer.

## Why it matters for this workshop

QPSC is the reason the rest of this suite exists in the shape it does. Once acquisition is
driven from QuPath, the boundary between "acquisition software" and "analysis software"
stops being where your data has to change hands:

- The region you *analysed* is the region you *acquire at high resolution* — targeting is
  driven by annotations, not by re-finding the spot by eye.
- Acquisition metadata arrives in the QuPath project rather than in a separate folder that
  gets separated from the images by Christmas.
- [Tiles to Pyramid](../13-tiles-to-pyramid.md) is the stitching stage of this pipeline —
  and it is fully usable on its own, which is why *it* is in the hands-on session.

## Core capabilities

| Feature | Description |
|---|---|
| **Bounding-box acquisition** | Draw a region in QuPath; it is tiled and acquired at high resolution automatically |
| **Existing-image acquisition** | Target specific annotations on a previously scanned slide |
| **Setup wizard** | Step-by-step creation of the microscope YAML configuration for first-time setup |
| **Acquisition wizard** | Checks prerequisites and walks new users through configuration |
| **Automated stage control** | XY, Z and rotation stages, with safety bounds checking |
| **Multi-angle imaging (PPM)** | Polarised-light acquisition with automatic rotation sequences |
| **Multi-channel widefield IF** | Vendor-agnostic channel library driven by YAML presets and device property writes — works with any Micro-Manager-driven illuminator |
| **BF + IF** | Combined brightfield and immunofluorescence in a single acquisition pass on single-camera scopes |
| **Micro-Manager MDA export** | Auto-exports MM-compatible MDA files (`.txt` settings, `.pos` positions) alongside every acquisition |

### Live imaging and stage control

- **Live camera viewer** — real-time feed with a dockable histogram, per-channel saturation %,
  RGB readouts, an optional on-image XYZ(R) position overlay, display scale controls, and
  snapshot capture with optional background correction.
- **Integrated stage control** — virtual joystick, FOV-based step sizes, saved stage
  positions, double-step arrows, all inside the live viewer.
- **Stage map** — a visual map of the stage insert with configurable macro-image overlay and
  real-time position tracking.

### Calibration and camera tools

White-balance calibration for JAI/prism cameras, background collection, polarizer calibration
for PPM, and an autofocus settings editor.

## Architecture, briefly

```
QuPath  ──►  QPSC extension  ──►  Python command server  ──►  Pycro-Manager  ──►  Micro-Manager  ──►  hardware
   ▲                                                                                    │
   └──────────────  stitched images + metadata back into the project  ◄─────────────────┘
```

The Python layers live in separate repositories
([microscope_command_server](https://github.com/uw-loci/microscope_command_server),
[microscope_control](https://github.com/uw-loci/microscope_control),
[microscope_configurations](https://github.com/uw-loci/microscope_configurations)) and are
configured per instrument with YAML. That separation is deliberate: the QuPath side does not
know what kind of microscope it is talking to.

## If you want to try it later

Start with the [QPSC system overview](https://github.com/uw-loci/QPSC) and its
[installation guide](https://github.com/uw-loci/qupath-extension-qpsc/blob/main/documentation/INSTALLATION.md).
Budget real time for the Micro-Manager side; the QuPath extension is the easy part.

We are happy to talk through what it would take on your instrument — find us after the
session.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-qpsc#readme) and the
`documentation/` folder (workflows, channels, utilities, installation).
