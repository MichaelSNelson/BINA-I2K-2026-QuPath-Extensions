#!/usr/bin/env python3
"""
Companion slide to seam_demo.py: HOW the tiles get placed. 16:9, minimal text.

Two steps, both drawn rather than written:

    1. every overlapping pair is measured against the image content
    2. every tile is placed at once -- each seam pulls its two tiles together,
       each tile is held near where the stage put it

The point of the second panel is that nothing is placed before anything else.
There is no first tile, no chain, no tree: the whole grid settles together, so
the leftover disagreement spreads thinly across every seam instead of piling up
at the end of a path.

Pure schematic -- no measurements on this slide.

    python3 figures/seam_method.py
"""
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import FancyArrowPatch, Rectangle

BLUE_DK, MUT = "#1F4C86", "#5A6675"
BLUE_MID, BLUE_PALE = "#5E97D4", "#D8E6F6"
WARM = "#B5651D"
RULE = "#CBD5DC"
TILE_FILL, TILE_EDGE = "#F1F6FC", "#BCCFE4"

W, H, DPI = 13.333, 7.5, 300
fig = plt.figure(figsize=(W, H), dpi=DPI)
fig.patch.set_facecolor("white")

gs = fig.add_gridspec(1, 2, width_ratios=[1.0, 1.22],
                      left=0.035, right=0.968, top=0.86, bottom=0.115, wspace=0.10)

TITLE_FS, NOTE_FS = 21, 14


def aspect(ax):
    p = ax.get_position()
    return (p.height * H) / (p.width * W)      # y-size * this = equal x-size


def spring(ax, x0, y0, x1, y1, xy, coils=6, amp=0.013, lw=2.0, color=BLUE_DK, z=6):
    t = np.linspace(0, 1, coils * 2 + 3)
    dx, dy = x1 - x0, y1 - y0
    length = np.hypot(dx / xy, dy)
    if length == 0:
        return
    nx, ny = -dy / length * amp, dx / length * amp / xy
    off = np.zeros_like(t)
    off[1:-1] = np.where(np.arange(1, len(t) - 1) % 2 == 0, 1.0, -1.0)
    ax.plot(x0 + dx * t + nx * off, y0 + dy * t + ny * off,
            color=color, lw=lw, solid_capstyle="round", zorder=z)


# =============================================================================
# 1. Measure every overlap
# =============================================================================
ax1 = fig.add_subplot(gs[0, 0])
ax1.set_xlim(0, 1); ax1.set_ylim(0, 1); ax1.axis("off")
ax1.set_title("1.  Measure every overlap", fontsize=TITLE_FS, color=BLUE_DK,
              fontweight="bold", pad=18, loc="left")
XY1 = aspect(ax1)

TH1 = 0.40
TW1 = TH1 / XY1
OVER = TW1 * 0.26                  # the shared strip
ax_ = 0.055
ay_ = 0.335

SHX, SHY = 0.038, 0.055          # where the stage put B vs where it belongs
BX = ax_ + TW1 - OVER

ax1.add_patch(Rectangle((ax_, ay_), TW1, TH1, facecolor=TILE_FILL,
                        edgecolor=TILE_EDGE, linewidth=1.4, zorder=3))
# B as the stage reported it ...
ax1.add_patch(Rectangle((BX + SHX, ay_ - SHY), TW1, TH1, facecolor="none",
                        edgecolor=MUT, linewidth=1.5, linestyle=(0, (4, 3)), zorder=5))
# ... and B where its pixels say it belongs
ax1.add_patch(Rectangle((BX, ay_), TW1, TH1, facecolor=TILE_FILL,
                        edgecolor=BLUE_MID, linewidth=1.8, zorder=4))
# the overlap band is the only place the two tiles can be compared at all
ax1.add_patch(Rectangle((BX, ay_), OVER, TH1, facecolor=BLUE_PALE,
                        edgecolor=BLUE_MID, linewidth=1.6, zorder=6))
ax1.text(BX + OVER / 2, ay_ + TH1 + 0.040, "shared strip",
         fontsize=NOTE_FS, color=BLUE_DK, fontweight="bold", ha="center")

ax1.text(ax_ + TW1 * 0.36, ay_ - 0.052, "tile A", fontsize=NOTE_FS, color=MUT, ha="center")
ax1.text(BX + TW1 * 0.80, ay_ + TH1 * 0.5, "tile B", fontsize=NOTE_FS, color=BLUE_DK,
         ha="center", va="center", fontweight="bold")

# the measurement itself: from where the stage said, to where the pixels agree
ax1.add_patch(FancyArrowPatch(
    (BX + SHX + TW1 * 0.5, ay_ - SHY + TH1 * 0.5), (BX + TW1 * 0.5, ay_ + TH1 * 0.5),
    arrowstyle="-|>", mutation_scale=28, color=WARM, lw=3.0, zorder=8))
ax1.text(BX + TW1 * 0.5 + 0.045, ay_ - SHY + TH1 * 0.30,
         "the measured shift",
         fontsize=NOTE_FS, color=WARM, va="top", ha="left", fontweight="bold")

ax1.text(0.02, 0.175, "Done for every overlapping pair in the grid,\n"
                      "on the image content -- not on the stage numbers.",
         fontsize=NOTE_FS, color=MUT, va="top", ha="left", linespacing=1.5)

# =============================================================================
# 2. Place them all at once
# =============================================================================
ax2 = fig.add_subplot(gs[0, 1])
ax2.set_xlim(0, 1); ax2.set_ylim(0, 1); ax2.axis("off")
ax2.set_title("2.  Place them all at once", fontsize=TITLE_FS, color=BLUE_DK,
              fontweight="bold", pad=18, loc="left")
XY2 = aspect(ax2)

GC, GR = 4, 3
pad2 = 0.045
gapx = 0.085
cellx = (1 - 2 * pad2 - (GC - 1) * gapx) / GC
celly = cellx * XY2
gapy = gapx * XY2
top2 = 0.865


def cell_xy(i, j):
    return pad2 + i * (cellx + gapx), top2 - celly - j * (celly + gapy)


for j in range(GR):
    for i in range(GC):
        x, y = cell_xy(i, j)
        ax2.add_patch(Rectangle((x, y), cellx, celly, facecolor=TILE_FILL,
                                edgecolor=TILE_EDGE, linewidth=1.2, zorder=3))
        # The weak pull toward the stage position. Drawn from the tile's corner
        # OUTWARD and on top, or the tile fill swallows it.
        ax2.plot([x + cellx * 0.22, x - 0.020],
                 [y + celly * 0.22, y - 0.034 * XY2],
                 color=MUT, lw=1.5, alpha=0.75, zorder=7)
        ax2.plot([x - 0.020], [y - 0.034 * XY2], marker="o", ms=5.5,
                 color="white", mec=MUT, mew=1.5, zorder=7)

for j in range(GR):
    for i in range(GC - 1):
        x, y = cell_xy(i, j)
        spring(ax2, x + cellx, y + celly / 2, x + cellx + gapx, y + celly / 2, XY2)
for j in range(GR - 1):
    for i in range(GC):
        x, y = cell_xy(i, j)
        spring(ax2, x + cellx / 2, y, x + cellx / 2, y - gapy, XY2)

ax2.text(0.02, 0.135,
         "Every seam pulls its two tiles together;\n"
         "every tile is held near its stage position.\n"
         "No tile is placed before any other.",
         fontsize=NOTE_FS, color=MUT, va="top", ha="left", linespacing=1.5)

# one small key, bottom right
kx, ky = 0.66, 0.115
spring(ax2, kx, ky, kx + 0.075, ky, XY2, coils=5, amp=0.010, lw=1.8)
ax2.text(kx + 0.090, ky, "measured seam", fontsize=NOTE_FS - 1.5, color=BLUE_DK,
         va="center", ha="left")
ax2.plot([kx, kx + 0.055], [ky - 0.058, ky - 0.058], color=MUT, lw=1.5, alpha=0.75)
ax2.plot([kx + 0.055], [ky - 0.058], marker="o", ms=5.5, color="white",
         mec=MUT, mew=1.5)
ax2.text(kx + 0.090, ky - 0.058, "stage position", fontsize=NOTE_FS - 1.5,
         color=MUT, va="center", ha="left")

out = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                    "..", "images", "seam_method.png"))
fig.savefig(out, dpi=DPI, facecolor="white")
print("wrote", out)
