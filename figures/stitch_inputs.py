#!/usr/bin/env python3
"""
The four ways tile positions can arrive, and the one thing that comes out. 16:9.

Labels are the EXACT strings in the extension's "stitching method" dropdown, as
the user sees them -- note that "Coordinates in TileConfiguration.txt file" is
the internal identifier (StitchingStrategyFactory switches on it, QPSC passes
it, the preference stores it) and the dropdown's StringConverter shows it as
"TileConfiguration.txt file". The shown label is what belongs on a slide.

Each card answers one question: where does the position of a tile come from?

    Vectra          inside each TIFF
    Filename[x,y]   in the file name, as [x,y]
    TileConfig      one text file listing every tile
    MicroManager    a metadata.txt sidecar

Output is the same whichever way in: one pyramidal image.

    python3 figures/stitch_inputs.py
"""
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Polygon, Rectangle

BLUE_DK, MUT = "#1F4C86", "#5A6675"
BLUE_MID, BLUE_PALE = "#5E97D4", "#D8E6F6"
WARM, WARM_PALE = "#B5651D", "#F3E3D0"
RULE = "#CBD5DC"
CARD_FILL = "#FAFCFE"
TILE_FILL, TILE_EDGE = "#EAF2FB", "#B9CDE4"

W, H, DPI = 13.333, 7.5, 300
fig = plt.figure(figsize=(W, H), dpi=DPI)
fig.patch.set_facecolor("white")
ax = fig.add_axes([0, 0, 1, 1])
ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
XY = H / W                                   # y-size * XY = equal x-size

LABEL_FS, SRC_FS, GLYPH_FS = 15, 13, 11

# --- card geometry -----------------------------------------------------------
LEFT, RIGHT = 0.028, 0.972
NCARD = 4
CGAP = 0.020
CW = (RIGHT - LEFT - (NCARD - 1) * CGAP) / NCARD
CY, CH = 0.398, 0.472


def card_x(k):
    return LEFT + k * (CW + CGAP)


def mini_grid(cx, cy, cell=0.042, gap=0.010, tag=False):
    """A 2x2 of tiles. tag=True marks position data living INSIDE each tile."""
    cw = cell * XY
    gw = gap * XY
    for j in range(2):
        for i in range(2):
            x = cx + i * (cw + gw)
            y = cy - j * (cell + gap)
            ax.add_patch(Rectangle((x, y), cw, cell, facecolor=TILE_FILL,
                                   edgecolor=TILE_EDGE, linewidth=1.1, zorder=4))
            if tag:
                ax.add_patch(Rectangle((x + cw * 0.56, y + cell * 0.58),
                                       cw * 0.34, cell * 0.30,
                                       facecolor=WARM, edgecolor="none", zorder=5))
    return 2 * cw + gw, 2 * cell + gap


def doc(cx, cy, w=0.052, h=0.085, colour=WARM, fill=WARM_PALE, lines=4):
    """A little document, for position data that lives in its own file."""
    wx = w * XY * 1.9
    fold = wx * 0.26
    ax.add_patch(Polygon([(cx, cy), (cx, cy + h), (cx + wx - fold, cy + h),
                          (cx + wx, cy + h - fold), (cx + wx, cy)],
                         closed=True, facecolor=fill, edgecolor=colour,
                         linewidth=1.6, zorder=5))
    for n in range(lines):
        y = cy + h * (0.72 - n * 0.155)
        ax.plot([cx + wx * 0.16, cx + wx * 0.78], [y, y], color=colour,
                lw=1.3, alpha=0.75, zorder=6)
    return wx, h


# (shown dropdown label, where the position lives, glyph kind)
CARDS = [
    ("Vectra tiles\nwith metadata", "inside each TIFF", "tag"),
    ("Filename[x,y] with\ncoordinates in microns", "in the file name", "name"),
    ("TileConfiguration.txt\nfile", "one text file, every tile", "doc"),
    ("MicroManager metadata\n(MMStack or TIFF series)", "a metadata.txt sidecar", "folder"),
]

for k, (label, source, kind) in enumerate(CARDS):
    x0 = card_x(k)
    ax.add_patch(FancyBboxPatch(
        (x0, CY), CW, CH, boxstyle="round,pad=0.006,rounding_size=0.014",
        facecolor=CARD_FILL, edgecolor=RULE, linewidth=1.3, zorder=2))

    mid = x0 + CW / 2
    gy = CY + CH - 0.070                      # top of the glyph band
    cap_y = gy - 0.140                        # every glyph caption on one line

    if kind == "tag":
        mini_grid(mid - 0.031, gy, tag=True)
        ax.text(mid, cap_y, "position tag", fontsize=GLYPH_FS, color=WARM,
                ha="center", fontweight="bold")

    elif kind == "name":
        mini_grid(mid - 0.031, gy)
        ax.text(mid, cap_y, "tile[1200,800].tif", fontsize=GLYPH_FS,
                color=WARM, ha="center", fontweight="bold", family="monospace")

    elif kind == "doc":
        mini_grid(mid - 0.080, gy)
        doc(mid + 0.020, gy - 0.090)
        ax.text(mid, cap_y, "TileConfiguration.txt",
                fontsize=GLYPH_FS - 1.0, color=WARM, ha="center", fontweight="bold")

    else:                                      # a folder holding tiles AND a sidecar
        ax.add_patch(FancyBboxPatch(
            (mid - 0.098, gy - 0.112), 0.196, 0.142,
            boxstyle="round,pad=0.004,rounding_size=0.008",
            facecolor="none", edgecolor=MUT, linewidth=1.4,
            linestyle=(0, (4, 3)), zorder=3))
        mini_grid(mid - 0.084, gy - 0.008)
        doc(mid + 0.020, gy - 0.098, h=0.078, lines=3)
        ax.text(mid, cap_y, "metadata.txt", fontsize=GLYPH_FS - 1.0,
                color=WARM, ha="center", fontweight="bold")

    ax.text(mid, cap_y - 0.062, label, fontsize=LABEL_FS, color=BLUE_DK,
            fontweight="bold", ha="center", va="top", linespacing=1.4)
    ax.text(mid, cap_y - 0.190, source, fontsize=SRC_FS, color=MUT,
            ha="center", va="top")

    # down into the rail
    ax.add_patch(FancyArrowPatch((mid, CY - 0.012), (mid, 0.258),
                                 arrowstyle="-|>", mutation_scale=22,
                                 color=BLUE_MID, lw=2.4, zorder=6))

# --- the single output -------------------------------------------------------
ax.add_patch(FancyBboxPatch(
    (LEFT, 0.075), RIGHT - LEFT, 0.170,
    boxstyle="round,pad=0.006,rounding_size=0.016",
    facecolor=BLUE_PALE, edgecolor=BLUE_MID, linewidth=1.8, zorder=3))

ax.text(0.5, 0.188, "one pyramidal image", fontsize=25, color=BLUE_DK,
        fontweight="bold", ha="center", va="center", zorder=6)
ax.text(0.5, 0.122, ".ome.tif  or  .ome.zarr", fontsize=17, color=MUT,
        ha="center", va="center", zorder=6, family="monospace")

out = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                    "..", "images", "tiles-to-pyramid", "stitch_inputs.png"))
fig.savefig(out, dpi=DPI, facecolor="white")
print("wrote", out)
