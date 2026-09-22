#!/usr/bin/env python3
"""
What tile registration does, shown rather than described. 16:9, drops onto a slide.

Real microscopy content is cut into a 3x2 grid of overlapping tiles, each one
displaced by a known amount, and then placed twice:

    left   where the stage said the tile was    -> structures break at the seam
    right  where the pixel content says it is   -> structures continue

A DEMONSTRATION with known ground truth, not a measurement. The displacement is
injected, so the right-hand panel reconstructs the source image exactly. It is
the same trick the repo's own SyntheticGridFixture uses: cut the tiles at true
positions, hand the solver the nominal ones, and the answer is known in advance.

Injected shifts are 0-30 px. Real per-EDGE shifts measured on a 360-tile
acquisition were 6-16 px, and cumulative per-TILE corrections reached 30-38 px,
so this is the honest end of the range -- large enough to see from the back of
a room, not larger than the thing it depicts.

Tiles are composited last-wins with NO blending, so a seam reads as the hard
discontinuity it is. The real stitcher blends, which softens a small seam; this
slide is about where the tile goes, not how its edge is feathered.

    python3 figures/seam_demo.py
"""
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Rectangle
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
IMAGES = os.path.normpath(os.path.join(HERE, "..", "images"))

BLUE_DK, MUT, WARM = "#1F4C86", "#5A6675", "#B5651D"

COLS, ROWS = 3, 2
TILE, STEP = 450, 405                    # 10% overlap
MOSAIC_W = STEP * (COLS - 1) + TILE
MOSAIC_H = STEP * (ROWS - 1) + TILE
OVERLAP = TILE - STEP                    # 45 px; a shift must stay under this
                                         # or the tiles stop overlapping at all

# Per-tile true displacement. Tile (0,0) is the reference and sits at the
# origin; the rest drift away from it, which is what a sub-percent stage-step
# error does in practice. Kept non-negative so both composites are fully
# covered and neither shows a black edge.
RNG = np.random.default_rng(11)
OFF = {}
for _j in range(ROWS):
    for _i in range(COLS):
        _dx = 0 if _i == 0 else 13.0 * _i + RNG.normal(0, 2.5)
        _dy = 0 if _j == 0 else 15.0 * _j + RNG.normal(0, 2.5)
        OFF[(_i, _j)] = (int(np.clip(round(_dx), 0, OVERLAP - 6)),
                         int(np.clip(round(_dy), 0, OVERLAP - 6)))

MAXX = max(d[0] for d in OFF.values())
MAXY = max(d[1] for d in OFF.values())


def composite(source, use_true):
    """Lay the tiles down.

    The pixels ALWAYS come from where the tile really was; only where it gets
    placed differs. That is the whole experiment.
    """
    out = np.zeros((MOSAIC_H + MAXY, MOSAIC_W + MAXX, 3), dtype=np.uint8)
    for j in range(ROWS):
        for i in range(COLS):
            dx, dy = OFF[(i, j)]
            tile = source[j * STEP + dy:j * STEP + dy + TILE,
                          i * STEP + dx:i * STEP + dx + TILE]
            px = i * STEP + (dx if use_true else 0)
            py = j * STEP + (dy if use_true else 0)
            out[py:py + TILE, px:px + TILE] = tile
    return out[:MOSAIC_H, :MOSAIC_W]


# The seam the audience will be asked to look at: the left edge of column 1,
# which is where the last-wins composite puts the visible discontinuity.
SEAM_X = STEP


# The magnifier is a WIDE strip across the seam, not a square: it then fills
# the column instead of shrinking to a stamp, and a strip is the right shape
# for looking along a seam anyway.
ZW, ZH = 235, 118


def pick_zoom(nom, sol):
    """Centre the magnifier where the two placements differ most.

    That is, by construction, where the break is most visible -- rather than
    wherever the grid happens to cross flat background, which would prove
    nothing to a room. Weighted by local brightness so it lands on structure
    the audience can see continuing, not on a bright edge in the dark.
    """
    d = np.abs(nom.astype(float) - sol.astype(float)).mean(axis=2)
    lum = nom.astype(float).mean(axis=2)
    best, best_y = -1.0, ZH + 55
    for y in range(ZH + 55, MOSAIC_H - ZH, 6):
        sl = (slice(y - ZH, y + ZH), slice(SEAM_X - ZW, SEAM_X + ZW))
        score = d[sl].mean() * (lum[sl].mean() ** 0.5)
        if score > best:
            best, best_y = score, y
    return best_y


src = np.asarray(Image.open(os.path.join(IMAGES, "stitch_if_registered.jpg")).convert("RGB"))
assert src.shape[0] >= MOSAIC_H + MAXY and src.shape[1] >= MOSAIC_W + MAXX, src.shape

nominal = composite(src, use_true=False)
solved = composite(src, use_true=True)
ZY = pick_zoom(nominal, solved)

# =============================================================================
W, H, DPI = 13.333, 7.5, 300
fig = plt.figure(figsize=(W, H), dpi=DPI)
fig.patch.set_facecolor("white")

# Row heights follow the two images' own aspect ratios, so neither axes pads
# itself with white to satisfy imshow's equal aspect.
gs = fig.add_gridspec(
    2, 2, height_ratios=[MOSAIC_H / MOSAIC_W, (2 * ZH) / (2 * ZW)],
    left=0.030, right=0.970, top=0.905, bottom=0.085, wspace=0.040, hspace=0.135,
)

PANELS = [
    (nominal, "Placed where the stage said", "structures break at the seam", WARM),
    (solved, "Placed where the pixels agree", "structures continue", BLUE_DK),
]

for k, (img, title, verdict, colour) in enumerate(PANELS):
    ax = fig.add_subplot(gs[0, k])
    ax.imshow(img, interpolation="nearest")
    ax.set_box_aspect(MOSAIC_H / MOSAIC_W)
    ax.set_xticks([]); ax.set_yticks([])
    for sp in ax.spines.values():
        sp.set_visible(False)
    ax.set_title(title, fontsize=20, color=colour, fontweight="bold", pad=13)

    # Mark the seam, and box the piece of it shown magnified below.
    ax.plot([SEAM_X, SEAM_X], [0, MOSAIC_H], color=colour, lw=1.0, alpha=0.55,
            linestyle=(0, (7, 5)), zorder=4)
    ax.add_patch(Rectangle((SEAM_X - ZW, ZY - ZH), 2 * ZW, 2 * ZH,
                           fill=False, edgecolor=colour, linewidth=2.6, zorder=5))

    axz = fig.add_subplot(gs[1, k])
    axz.imshow(img[ZY - ZH:ZY + ZH, SEAM_X - ZW:SEAM_X + ZW], interpolation="nearest")
    axz.plot([ZW, ZW], [0, 2 * ZH - 1], color=colour, lw=1.1, alpha=0.65,
             linestyle=(0, (7, 5)), zorder=4)
    axz.set_xlim(0, 2 * ZW - 1); axz.set_ylim(2 * ZH - 1, 0)
    axz.set_box_aspect((2 * ZH) / (2 * ZW))
    axz.set_xticks([]); axz.set_yticks([])
    for sp in axz.spines.values():
        sp.set_edgecolor(colour); sp.set_linewidth(2.6)
    axz.set_xlabel(verdict, fontsize=17, color=colour, fontweight="bold", labelpad=9)

out = os.path.join(IMAGES, "seam_demo.png")
fig.savefig(out, dpi=DPI, facecolor="white")
print("wrote", out)
print("  injected shifts px:", dict(sorted(OFF.items())))
print(f"  seam at x={SEAM_X}, magnifier centred at y={ZY}")
