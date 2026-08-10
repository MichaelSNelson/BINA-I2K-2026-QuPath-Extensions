---
layout: default
title: Wizard Wand
---

# Wizard Wand

> A faster, more forgiving wand. Click and drag like the built-in one, or hold still and let
> the selection grow. Smoother boundaries, automatic hole filling, and it can teach itself
> the right settings from one example annotation you draw.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-wizard-wand](https://github.com/uw-loci/qupath-extension-wizard-wand) |
| **Version at workshop** | 0.4.3 |
| **License** | GPL-3.0 |
| **Requires** | QuPath 0.6.0+ (use 0.7 today) |
| **Where to find it** | Toolbar (sparkle-wand icon) — **Shift+W** |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

---

## What it does

Annotation is where most people spend most of their QuPath time, so a wand that needs fewer
corrections is worth more than it sounds.

Wizard Wand installs as a **separate toolbar button**. QuPath's built-in wand is untouched —
you can ignore this one entirely until you want it.

Out of the box it behaves like the built-in wand with two upgrades already on:

- small holes inside the selection are **filled automatically** (up to 10,000 px), and
- the boundary is **lightly smoothed**.

Everything else is off until you turn it on in Preferences:

**Hold-to-grow.** Keep the cursor still and the selection expands on its own — a region-growing
behaviour rather than a drag-to-cover one. Good for structures with a well-defined edge and a
messy interior.

**Colour-space modes.** How the wand decides "this is the same colour as where I clicked":

| Mode | When to use |
|---|---|
| **RGB** (default) | General-purpose |
| **GRAY** | Ignores colour, brightness only — grayscale, or H&E where you want stain intensity |
| **LAB_DISTANCE** | Perceptual colour distance — better than RGB for subtle stain differences |
| **HSV** | Select by hue regardless of brightness — e.g. all blue nuclei, including dark ones |

**Sensitivity.** How greedy the wand is. Lower stays tight against obvious edges; higher
swallows bigger uniform regions per click. (Internally `threshold = stddev × sensitivity`.)

**Auto-tuning.** Draw one annotation the way you want it, then let the wand derive its own
settings from your example. This is the feature to try first — it converts "fiddle with four
sliders" into "show me once."

**Edge stops** and **simplification** are also available in Preferences.

## Install

Via the **LOCI QuPath Extensions** catalog, or drag the `-all.jar` from
[Releases](https://github.com/uw-loci/qupath-extension-wizard-wand/releases) onto QuPath.
Restart. The sparkle-wand button appears in the toolbar and responds to **Shift+W**.

Right-click the toolbar button for presets, auto-tuning, and reset.

---

## Hands-on exercise (~10 min)

**Data:** `DATA-01_HE_WSI`.

1. Press **Shift+W**. Click and drag on some tissue. Note that it already behaves like the
   built-in wand, with holes filled and edges smoothed.
2. Now do the same region with QuPath's built-in wand and compare the boundaries.
3. Right-click the toolbar button → try a **preset**.
4. Turn on **hold-to-grow** in Preferences. Click on a structure and *hold still*. Watch it
   grow to the edge.
5. Draw one careful annotation of the structure type you actually care about. Then run
   **auto-tune** from the right-click menu and wand a comparable structure. Compare the
   result to your hand-drawn one.
6. Switch the colour-space mode to **LAB_DISTANCE** or **GRAY** and re-try a region where RGB
   struggled.

### What to notice

- Auto-tuning is the headline. Settings derived from your own example beat settings you
  guessed.
- Hole filling and smoothing sound cosmetic but change downstream numbers — area
  measurements, mask exports, and training data all inherit boundary noise.
- If it ever gets weird, `Reset Wizard Wand preferences` from the right-click menu puts
  everything back.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-wizard-wand#readme).
