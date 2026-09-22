#!/usr/bin/env python3
"""
Where the unavoidable seam error goes -- the three placements we shipped, in order.

THE IDEA THE FIGURE CARRIES: walk a loop of four tiles, adding up the shift each
seam measured, and you do not get back to zero. The measurements disagree by a
few pixels and no placement can satisfy them all. The error cannot be removed.
It can only be PUT somewhere -- and every version of this code differed only in
where it put it.

  1. Spanning tree      -> into the seams the tree never used.
  2. Cut the outliers   -> into the seams that were cut, all in one line.
  3. Keep every edge    -> spread thinly across every seam. This is what ships.

Each fix was the same lesson: stop discarding a measurement you already have.
Full narrative, with the per-edge instrumentation that found each one:
claude-reports/2026-08-04_registration-seam-tears-and-stitch-consolidation.md

HONESTY BOUNDARY.
  * The SEAM STATISTICS in panels 2 and 3 are measured, on one 360-tile PPM
    acquisition (ppm_20x_9/53426_46338), and are quoted in the panel subtitles.
  * The 6x6 GRIDS are schematic. Which individual seam tears is drawn, not
    measured -- only the distribution and the spatial PATTERN (clustered in a
    row vs. spread) come from the data. Panels say "schematic layout".
  * Panel 1 was never shipped by us; the 81-of-180 count is arithmetic on a
    10x10 grid, and the approach is ASHLAR's (maximum spanning tree over the
    neighbour graph, discarding low-quality edges). It is a real published
    method, not a straw man.

    python3 figures/seam_tension.py
"""
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import LinearSegmentedColormap, Normalize
from matplotlib.patches import FancyBboxPatch, Rectangle

# --- palette (shared with complexity_ramp.py / memory_footprint.py) ----------
BLUE_DK, MUT = "#1F4C86", "#5A6675"
BLUE_MID, BLUE_PALE = "#5E97D4", "#D8E6F6"
WARM = "#B5651D"
RULE = "#CBD5DC"
TILE_FILL, TILE_EDGE = "#F4F7FB", "#C3D2E4"

# Seam gap in output pixels -> colour. Anchored on the measured range: kept
# seams sat at 5-14 px, cut ones at 19-55 px, so the blue/warm handover is put
# where the eye should read "this one tore".
GAP_MAX = 55.0
SEAM_CMAP = LinearSegmentedColormap.from_list(
    "seam", ["#CFE2F5", "#5E97D4", "#2C63A8", "#C98A3C", "#B5651D", "#8A3B12"]
)
NORM = Normalize(vmin=0, vmax=GAP_MAX)

N = 6                       # tiles per side in the schematic grids
RNG = np.random.default_rng(20260804)   # fixed: the figure must not change per run


# =============================================================================
W, H, DPI = 13.0, 5.9, 300
fig = plt.figure(figsize=(W, H), dpi=DPI)
fig.patch.set_facecolor("white")

gs = fig.add_gridspec(
    1, 4, width_ratios=[1.20, 1.0, 1.0, 1.0],
    left=0.028, right=0.988, top=0.80, bottom=0.300, wspace=0.16,
)

TITLE_FS, LAB_FS, TICK_FS, NOTE_FS = 12.0, 9.8, 9.0, 8.6


def panel_title(ax, text, kind, color=BLUE_DK):
    ax.set_title(text, fontsize=TITLE_FS, color=color, fontweight="bold",
                 pad=16, loc="left")
    ax.text(0, 1.012, kind, transform=ax.transAxes, fontsize=NOTE_FS,
            color=MUT, style="italic", va="bottom", ha="left")


# =============================================================================
# Panel 0 -- the model: two kinds of pull, and why they cannot all be satisfied
# =============================================================================
ax0 = fig.add_subplot(gs[0, 0])
ax0.set_xlim(0, 1); ax0.set_ylim(0, 1); ax0.axis("off")
panel_title(ax0, "Why there is tension", "the model")

_bb = ax0.get_position()
XY = (_bb.height * H) / (_bb.width * W)      # y-size * XY = equal x-size


def spring(x0, y0, x1, y1, coils=7, amp=0.016, lw=1.8, color=BLUE_DK, zorder=6):
    """Zigzag between two points -- the constraint drawn as something that pulls."""
    t = np.linspace(0, 1, coils * 2 + 3)
    dx, dy = x1 - x0, y1 - y0
    length = np.hypot(dx / XY, dy)
    if length == 0:
        return
    nx, ny = -dy / length * amp, dx / length * amp / XY
    off = np.zeros_like(t)
    off[1:-1] = np.where(np.arange(1, len(t) - 1) % 2 == 0, 1.0, -1.0)
    ax0.plot(x0 + dx * t + nx * off, y0 + dy * t + ny * off,
             color=color, lw=lw, solid_capstyle="round", zorder=zorder)


def tile_box(x, y, w, h, fill=TILE_FILL, edge=TILE_EDGE, lw=1.0, ls="solid", z=4):
    ax0.add_patch(Rectangle((x, y), w, h, facecolor=fill, edgecolor=edge,
                            linewidth=lw, linestyle=ls, zorder=z))


# Square, like the tiles in the grids to the right and like a real tile.
TH = 0.175                  # tile height in y-units
TW = TH / XY                # ... and the x-size that makes it square on paper

# --- (a) the seam pull ---
ay = 0.715
ax0.text(0.035, ay + TH + 0.040, "Each seam pulls its tiles together",
         fontsize=LAB_FS, color=BLUE_DK, fontweight="bold", va="bottom")
tile_box(0.045, ay, TW, TH)
tile_box(0.045 + TW + 0.115, ay, TW, TH)
spring(0.045 + TW, ay + TH / 2, 0.045 + TW + 0.115, ay + TH / 2, lw=2.2)
ax0.text(0.045 + TW + 0.0575, ay - 0.043,
         "strength = ncc$^2$", fontsize=NOTE_FS, color=MUT, ha="center")

# --- (b) the stage pull ---
by = 0.385
ax0.text(0.035, by + TH + 0.040, "Each tile is held near its stage position",
         fontsize=LAB_FS, color=BLUE_DK, fontweight="bold", va="bottom")
tile_box(0.045, by, TW, TH, fill="none", edge=RULE, ls=(0, (3, 2)), z=3)
tile_box(0.045 + 0.075, by + 0.022, TW, TH)
spring(0.045 + TW / 2, by + TH / 2, 0.045 + 0.075 + TW / 2, by + 0.022 + TH / 2,
       coils=5, amp=0.011, lw=1.3, color=MUT, zorder=3)
ax0.text(0.045 + TW + 0.130, by + TH / 2,
         "weak pull (lambda).\nA tile with no accepted\nseam stays at nominal.",
         fontsize=NOTE_FS, color=MUT, va="center", ha="left", linespacing=1.45)

# --- (c) the punchline ---
ax0.add_patch(FancyBboxPatch(
    (0.030, 0.020), 0.940, 0.330,
    boxstyle="round,pad=0.018,rounding_size=0.022",
    facecolor="#F6F8FB", edgecolor=RULE, linewidth=1.0, zorder=2))
ax0.text(0.055, 0.310, "The seams disagree.", fontsize=LAB_FS, color=WARM,
         fontweight="bold", va="top", zorder=5)
ax0.text(0.055, 0.258,
         "Add up the measured shifts around a\n"
         "loop of four tiles and you do not get\n"
         "back to zero. No placement satisfies\n"
         "every seam. The error cannot be\n"
         "removed -- only put somewhere.",
         fontsize=NOTE_FS, color=MUT, va="top", linespacing=1.5, zorder=5)


# =============================================================================
# The three grids
# =============================================================================
def seam_grid(ax, h_gap, v_gap, dropped=frozenset(), title="", kind="", sub=""):
    """Draw an N x N tile grid, colouring every physical seam by its gap.

    h_gap[(i, j)] is the seam between tile (i, j) and (i + 1, j); v_gap[(i, j)]
    the one between (i, j) and (i, j + 1). `dropped` names seams whose
    measurement the strategy threw away -- marked, because that is the point.
    """
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
    panel_title(ax, title, kind)

    pad, gap = 0.045, 0.012
    cell = (1 - 2 * pad - (N - 1) * gap) / N
    top = 0.905
    # Square tiles: scale the y-sizes by the panel's own width/height ratio,
    # taken from the axes rather than guessed, so a layout tweak cannot stretch
    # the grid without anyone noticing.
    _p = ax.get_position()
    ratio = (_p.width * W) / (_p.height * H)
    cell_y, gap_y = cell * ratio, gap * ratio

    def xy(i, j):
        return pad + i * (cell + gap), top - cell_y - j * (cell_y + gap_y)

    for j in range(N):
        for i in range(N):
            x, y = xy(i, j)
            ax.add_patch(Rectangle((x, y), cell, cell_y, facecolor=TILE_FILL,
                                   edgecolor=TILE_EDGE, linewidth=0.7, zorder=3))

    def draw_seam(x, y, dx, dy, value, is_dropped):
        lw = 2.0 + 4.6 * (value / GAP_MAX)
        ax.plot([x, x + dx], [y, y + dy], color=SEAM_CMAP(NORM(value)), lw=lw,
                zorder=6, solid_capstyle="butt" if is_dropped else "round",
                linestyle=(0, (1.15, 0.85)) if is_dropped else "solid")

    for (i, j), value in h_gap.items():
        x, y = xy(i, j)
        draw_seam(x + cell + gap / 2, y + cell_y * 0.12, 0, cell_y * 0.76,
                  value, (("h", i, j) in dropped))
    for (i, j), value in v_gap.items():
        x, y = xy(i, j)
        draw_seam(x + cell * 0.12, y - gap_y / 2, cell * 0.76, 0,
                  value, (("v", i, j) in dropped))

    ax.text(0.5, -0.045, sub, transform=ax.transAxes, fontsize=NOTE_FS,
            color=MUT, ha="center", va="top", linespacing=1.5)


def small(scale=1.0):
    """A seam that is behaving: the 5-14 px band the kept edges measured."""
    return float(np.clip(RNG.normal(5.5, 2.0), 1.5, 14.0)) * scale


# --- Panel 1: spanning tree -------------------------------------------------
# Tree = every vertical edge in every column, plus the top row horizontally.
# The seams the tree never used are unconstrained, so their gap is whatever the
# accumulated drift left: it grows with distance from the root.
h1, v1, dropped1 = {}, {}, set()
for j in range(N):
    for i in range(N - 1):
        if j == 0:
            h1[(i, j)] = small()
        else:
            dropped1.add(("h", i, j))
            h1[(i, j)] = float(np.clip(6 + 7.0 * j + RNG.normal(0, 3.5), 5, GAP_MAX))
for j in range(N - 1):
    for i in range(N):
        v1[(i, j)] = small()

# --- Panel 2: cut the disagreeing edges -------------------------------------
# The cut edges clustered: row -36 lost 11 of its 35 vertical edges, and that
# whole line gapped open to the accumulated drift.
h2, v2, dropped2 = {}, {}, set()
TORN_ROW = 3
for j in range(N):
    for i in range(N - 1):
        h2[(i, j)] = small()
for j in range(N - 1):
    for i in range(N):
        if j == TORN_ROW and i not in (1,):
            dropped2.add(("v", i, j))
            v2[(i, j)] = float(np.clip(RNG.normal(38, 11), 19, GAP_MAX))
        else:
            v2[(i, j)] = small()

# --- Panel 3: keep every edge, weight by confidence --------------------------
h3 = {(i, j): small() for j in range(N) for i in range(N - 1)}
v3 = {(i, j): small() for j in range(N - 1) for i in range(N)}

ax1 = fig.add_subplot(gs[0, 1])
seam_grid(
    ax1, h1, v1, dropped1,
    "1. Walk a spanning tree",
    "schematic layout; not shipped by us",
    "Keeps 99 of the 180 seams on a 10x10 grid,\n"
    "discards 81. Error accumulates along tree\n"
    "paths and lands on the seams it never used.",
)

ax2 = fig.add_subplot(gs[0, 2])
seam_grid(
    ax2, h2, v2, dropped2,
    "2. Cut the seams that disagree",
    "schematic layout; statistics measured",
    "Cut seams had measured a good 6 px shift.\n"
    "Cutting one frees it to drift: 19 / 50 / 55 px\n"
    "(med/p90/max) against 5 / 10 / 14 px kept.",
)

ax3 = fig.add_subplot(gs[0, 3])
seam_grid(
    ax3, h3, v3, frozenset(),
    "3. Weight, never cut",
    "schematic layout; statistics measured",
    "Down-weight, never cut. 671 of 682 edges used\n"
    "(was 605); every seam 5 / 10 / 49 px. The error\n"
    "spreads thinly instead of tearing one line.",
)

# --- shared colourbar --------------------------------------------------------
cax = fig.add_axes([0.415, 0.072, 0.26, 0.022])
cb = fig.colorbar(plt.cm.ScalarMappable(norm=NORM, cmap=SEAM_CMAP),
                  cax=cax, orientation="horizontal")
cb.set_label("seam gap in the stitched image (px)", fontsize=NOTE_FS, color=MUT)
cb.ax.tick_params(labelsize=TICK_FS, colors=MUT, length=2.5)
cb.outline.set_edgecolor(RULE)
fig.text(0.545, 0.118, "dashed seam = the measurement this strategy threw away",
         fontsize=NOTE_FS, color=MUT, ha="center", va="center", style="italic")

# The three-panel arc is the headline, but it is not the whole repair. These
# three landed in 0.6.4-0.6.5 and are the same lesson each time: a measurement
# was being suppressed somewhere. Numbers are measured, same acquisition.
fig.text(0.035, 0.255, "Three more fixes, all the same lesson",
         fontsize=LAB_FS, color=BLUE_DK, fontweight="bold", va="top", ha="left")
fig.text(0.035, 0.212,
         "Weight by ncc$^2$, not (ncc - threshold)$^2$: at the gate the old\n"
         "weight collapsed, so a weak-but-correct seam was worth 1/56th\n"
         "of a strong one and was overruled by 37 px.\n"
         "Bound each EDGE, not the running total: the per-tile clamp capped\n"
         "cumulative drift at one overlap width, truncating the long runs.\n"
         "Pin each component's MEAN, not every tile: the nominal pull was\n"
         "shrinking the whole solved field by 8.5%.",
         fontsize=NOTE_FS, color=MUT, va="top", ha="left", linespacing=1.55)

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "images",
                   "seam_tension.png")
fig.savefig(os.path.normpath(out), dpi=DPI, facecolor="white")
print("wrote", os.path.normpath(out))
