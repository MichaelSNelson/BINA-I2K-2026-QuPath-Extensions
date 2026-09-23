---
layout: default
title: Wizard Wand
---

# Wizard Wand

> **Drag it like a brush.** Hold the button down and sweep across a structure and it keeps
> adding as you go, instead of one click, one region. Pause mid-drag and the selection keeps
> growing on its own. Boundaries come out smoother and interior holes are filled for you.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-wizard-wand](https://github.com/uw-loci/qupath-extension-wizard-wand) |
| **Version at workshop** | 0.4.3 |
| **License** | GPL-3.0 |
| **Requires** | QuPath 0.6.0+ (use 0.7 today) |
| **Where to find it** | Toolbar <img src="../images/icon-wizard-wand.png" alt="Wizard Wand toolbar icon" height="13"> · **Shift+W** |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> **Walkthrough video:** %%VIDEO_WIZARD_WAND%%
> The walkthrough below is self-contained. You can work through it during the workshop, or on your own afterwards.

---

## Finding the button

The Wizard Wand adds its own toolbar button and leaves QuPath's wand alone. It sits to the
right of QuPath's wand, alongside the [Polyline Wand](06-polyline-wand.md) — which of the two
comes first depends on the order you installed them, so match the icon rather than the position:

<img src="../images/wand-toolbar.png" alt="QuPath's wand and the two added wand buttons in the toolbar; the order of the two added buttons depends on install order" height="24">


| | Which button | How to tell it apart |
|---|---|---|
| <img src="../images/icon-wand-builtin.png" alt="" height="22"> | QuPath's own wand | Outline only, no fill |
| <img src="../images/icon-wizard-wand.png" alt="" height="22"> | **Wizard Wand** (Shift+W) | Solid wand, sparkles, no arrow |
| <img src="../images/icon-polyline-wand.png" alt="" height="22"> | **Polyline Wand** (Shift+P) | Crosses a line, and has a small grey arrow in the corner |

---

## What it does

Annotation is where most people spend most of their QuPath time, so a wand that needs fewer
corrections is worth more than it sounds.

Wizard Wand installs as a **separate toolbar button**. QuPath's built-in wand is untouched:
you can ignore this one entirely until you want it.

Out of the box it differs from the built-in wand in four ways, all already on:

- **It works as a brush.** Hold the button down and sweep, and it keeps extending the same
  annotation instead of starting a new selection with every click. This is the one that
  changes how the tool feels to use.
- If you **hold the cursor still** mid-drag, the selection keeps growing outward on its own.
  There is no setting to switch on — pause for about a third of a second and it starts, move
  again and it stops. Good for a structure with a clear outer edge and a messy interior.
- Small holes inside the selection are **filled automatically** (up to 10,000 px).
- The boundary is **lightly smoothed**.

> **To add to an annotation you already have, select it first.** The wand extends whatever is
> currently selected. With nothing selected it quietly starts a **new** annotation instead —
> which is the usual reason someone reports that it "did not work on" an existing one. Click
> the annotation so it highlights, then wand. Erasing needs the selection too.

Everything below is optional. The settings are under `Edit > Preferences > Wizard Wand`;
presets and tuning are on the **right-click menu of the toolbar button**.

**Color-space modes.** How the wand decides "this is the same color as where I clicked":

| Mode | When to use |
|---|---|
| **RGB** (default) | General-purpose |
| **GRAY** | Ignores color, brightness only. Grayscale, or H&E where you want stain intensity |
| **LAB_DISTANCE** | Perceptual color distance, better than RGB for subtle stain differences |
| **HSV** | Select by hue regardless of brightness, e.g. all blue nuclei, including dark ones |

**Sensitivity.** How greedy the wand is. Lower stays tight against obvious edges; higher
swallows bigger uniform regions per click.

**Presets** save you setting it by hand. Right-click the toolbar button → **Presets**:

| Preset | Sensitivity |
|---|---|
| Fine | 0.30 |
| Standard | 1.00 |
| Broad | 2.00 |
| Aggressive | 4.00 |

You can also **Save current as preset...** once you find settings that suit your images, and
they appear in the same menu afterwards.

<details markdown="1">
<summary><b>The rest of the settings</b> — edge stops, simplification, and how sensitivity works</summary>

**Sensitivity** sets the tolerance as `threshold = stddev × sensitivity`, measured on the
region around your click. Note this is the opposite of QuPath's built-in wand, which uses
`1/sensitivity`; here higher always means a larger selection, in every mode, so the scroll
wheel and the presets push the same direction.

**Edge stops** (off by default) make the wand respect image gradients, so it is less likely to
leak through a faint boundary. **Simplification** reduces the number of vertices in the
resulting polygon, which matters if you are exporting a lot of annotations.

Both are off or neutral by default, and neither is worth touching until the basic wand is
behaving.

</details>

<details markdown="1">
<summary><b>Install</b> — from the LOCI catalog, then restart QuPath</summary>

Install from the **LOCI QuPath Extensions** catalog, then restart QuPath. Full steps, including the catalog URL, are in the [setup guide](setup.md).

The sparkle-wand button appears in the toolbar and responds to **Shift+W**. **Right-click the button itself** for presets, tuning and reset — right-clicking the image or a selection gives you QuPath's own menu, not this one.

</details>

---

> **New to QuPath?** Words like *project*, *annotation*, *detection*, *class* and
> *measurement* are explained in the [glossary](glossary.md). For QuPath itself, the
> [official documentation](https://qupath.readthedocs.io/en/stable/) is the place to go.

## Hands-on exercise
**Data:** `DATA-01_HE_WSI`, the CMU-1 H&E slide in the **[`Scripting Demo.zip`](https://drive.google.com/uc?export=download&id=1bWZtjZEtgqZnJOVBc91_Wk_HPgw8dmNY)** (229 MB; see [setup](setup.md#5-download-the-workshop-data)).

**Before you start.** Unzip `Scripting Demo.zip`. In QuPath, `File > Project > Open project` and pick the unzipped folder — it is already a project. Double-click the **CMU-1 H&E** slide in the project list to open it.

The wand is a toolbar tool, not a menu item: once an image is open, press **Shift+W** to
select it.


1. Press **Shift+W**, then **hold the mouse button down and sweep** across a piece of tissue,
   the way you would use a brush. Notice it keeps extending the same annotation as you move,
   rather than making a new selection each click. This is the thing to take away.
2. Do the same region with QuPath's built-in wand for comparison: one click, one region, and
   you join them up yourself.
3. **Mid-drag, stop moving and keep the button down.** The selection carries on growing
   outward until you move again. Use this when a structure has a clean outer edge but a messy
   middle — start inside and let it find the edge.
4. Now try a preset. **Right-click the wand button in the toolbar** — not the image, not your
   annotation — and pick **Presets > Broad**, then wand the same structure. Then **Fine**.
   Broad for large uniform areas, Fine when you keep spilling into neighbouring tissue.
5. Change the color-space mode in `Edit > Preferences > Wizard Wand` and re-try somewhere RGB
   struggled: **GRAY** when color is irrelevant and only intensity matters, **LAB_DISTANCE**
   for two stains that are close in color, **HSV** to catch every blue nucleus including the
   dark ones.
6. Optional: draw an annotation the way you want it, **leave it selected**, then right-click
   the toolbar button and choose **Tune wand from selection...**, which tries to derive
   settings from your example.

   > **Expect little from this one.** It tunes for a *single click* placed inside your
   > annotation, and almost nobody annotates with single clicks — so the settings it picks
   > often do not match how the wand behaves when you drag. It is worth knowing about, and
   > worth a try if presets are not getting you there, but reach for the presets first.

### What to notice

- **Dragging is the whole point.** A wand you can sweep is a different tool from a wand you
  click, and it is why this exists. If you take one thing away, take that.
- **Presets beat fiddling.** Four named presets cover most of what the sliders would, and you
  can save your own once you find settings that suit your slides.
- **Hole filling and smoothing sound cosmetic but change your numbers.** Area measurements,
  mask exports and training data all inherit boundary noise, so a tidier boundary is not just
  nicer to look at.
- If it ever gets strange, right-click the toolbar button and choose
  **Reset Wizard Wand preferences**. Your saved presets survive that.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-wizard-wand#readme).
