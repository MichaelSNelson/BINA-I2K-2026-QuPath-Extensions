---
layout: default
title: Polyline Wand and Brush
---

# Polyline Wand and Brush

> QuPath's brush and wand work on areas. This adds the same fluid editing to **lines and
> polylines** — push a section of a traced boundary outward, erase backwards from an
> overshot endpoint, smooth a noisy trace, or cut a polyline in two.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-polyline-wand](https://github.com/uw-loci/qupath-extension-polyline-wand) |
| **Version at workshop** | 0.3.6 |
| **License** | GPL-3.0 |
| **Requires** | QuPath 0.6.0+ (use 0.7 today) |
| **Where to find it** | Toolbar (wand-pushing-a-polyline icon) — **Shift+P** |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

---

## Why this exists

Four situations, all of which currently mean "delete it and start over":

- Tracing the leading edge of a tumour along a long polyline, then needing to push one
  section outward to include tissue you originally passed through.
- Drawing a long polyline for a vessel and overshooting the endpoint with a jerky hand
  movement.
- A trace that is correct but noisy.
- A polyline that should be two annotations.

## Two engines, one tool

The toolbar exposes a single **Polyline Wand** tool. Right-click the button to switch engines
at runtime; each solves "push the line around" differently.

**Direct vertex push** (default) — a per-frame brush displaces affected vertices with a
configurable falloff (cosine / linear / gaussian). Local densification keeps sparse segments
responsive; end-of-stroke runs a vertex compactor and a self-intersection loop remover, so
the line collapses cleanly when pushed over itself. The most reactive of the two: the brush
can start anywhere and pulls the line toward it whenever the line enters the brush footprint.

**Arc-length displacement field** — locks an active arc-length window of 2× brush radius at
press, and per frame touches only the K vertices in that window. Each vertex moves by
`kernel_weight × strength × (brush_motion · local_normal)`, so **only the perpendicular
component of cursor motion shifts the curve**. Holding still, or dragging along the line,
produces zero push. A self-intersection guard refuses any move that would create a local
crossing.

If you want a brush that feels like paint, use the first. If you want a brush that cannot
accidentally drag your line sideways, use the second.

## Other behaviour worth knowing

- **Local region editing.** At mouse-press only the section within ~3× brush radius is
  editable; head and tail are spliced back bit-exact at commit, so untouched segments are
  never re-shaped. This also keeps long polylines fast — the engine sees ~50 vertices, not
  10,000.
- **Scissors / cut-at-click.** Right-click → **Mode** → *Scissors*. The icon swaps to
  scissors; a click on the selected polyline splits it into two annotations at the closest
  point, removes the original, and selects the first half. Both pieces inherit the original's
  class, name, and colour.
- **Zoom-aware brush.** By default the radius is in *screen* pixels, so the on-screen size
  stays constant and zooming out covers more image — matching QuPath's built-in brush. Turn
  it off to lock the brush to image pixels.
- **Cursor matches felt effect.** The solid circle is drawn where the falloff still has
  significant strength (75% of radius by default); the faint dashed ring is the true maximum
  reach.
- **Auto endpoint erase.** Start a stroke near an endpoint and the brush shortens the line
  from that end instead. Hold **Shift** to override and edit normally at an endpoint.
- **LineROI promotion.** Editing a 2-point line densifies it into a polyline (32 vertices by
  default) so the engines have interior vertices to work with.
- **Clean undo.** Mid-drag commits are throttled to ~30 Hz, so one stroke is one undo entry.

## Right-click menu

```
Engine >              (Direct vertex push / Displacement field)
Mode >                (Auto / Push / Smooth / Erase from end / Scissors)
Engine settings >     (rebuilds for the active engine)
Set brush radius...
Reset Polyline Wand preferences
```

Preferences live under **Polyline Wand** in QuPath's Preferences pane, with per-engine
sub-categories.

## Install

Via the **LOCI QuPath Extensions** catalog, or the `-all.jar` from
[Releases](https://github.com/uw-loci/qupath-extension-polyline-wand/releases). Restart.

---

## Hands-on exercise (~10 min)

**Data:** `DATA-01_HE_WSI`.

1. Draw a long polyline along a tissue boundary with QuPath's normal polyline tool. Deliberately
   overshoot the end.
2. Press **Shift+P**. Start a stroke *near the overshot endpoint* — the line erases backwards.
3. Find a section where your trace cuts a corner. Push it outward with the default engine.
4. Right-click → **Engine** → *Displacement field*. Push the same kind of section. Notice that
   dragging **along** the line now does nothing, and only perpendicular motion moves it.
5. Right-click → **Mode** → *Smooth*. Clean up a noisy stretch.
6. Right-click → **Mode** → *Scissors*. Click on the polyline to split it in two. Check that
   both halves kept the class and colour.
7. Press Ctrl+Z a few times and confirm each *stroke* is one undo step, not each frame.

### What to notice

- The two engines feel genuinely different. Pick by task, not by which is "better."
- Local region editing means you can work on a 10,000-vertex boundary without lag and without
  disturbing the parts you already got right.
- Scissors is the fastest way to turn one over-eager trace into two correct annotations.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-polyline-wand#readme).
