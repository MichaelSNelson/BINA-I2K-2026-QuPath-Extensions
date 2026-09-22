#!/usr/bin/env python3
"""
Where this extension sits among the tools people actually reach for. 16:9.

PRIMARY GROUPING is where you do the work: a separate program you leave QuPath
for, versus something that runs inside it. That is the axis the user asked to be
explicit about, so it is the grouping rather than a row.

LINEAGE, NOT SCOREBOARD. This extension grew out of Pete Bankhead's QuPath
stitching script, which the README already credits. Verified against the gist
source (gist.github.com/petebankhead/b5a86caa333de1fdcff6bdee72a20abe): it
builds a SparseImageServer.Builder(), adds every tile, and writes with
OMEPyramidWriter.Builder(server).writePyramid(), taking positions from baseline
TIFF tags (TAG_X_POSITION / TAG_Y_POSITION / TAG_*_RESOLUTION). That is exactly
the architecture this extension replaced -- so "the script was memory hungry"
and "our old path was memory hungry" are the same sentence. The slide says so.

WHAT IS MEASURED AND WHAT IS NOT. Only the "Tiles to Pyramid" memory cell is a
measurement (96 MB at 32 MP, 128 MB at 169 MP; smallest heap in which the stitch
completes; see memory_footprint.py). Every other cell describes how a tool is
designed. Do not turn those into numbers without running them.

BIGSTITCHER IS NOT THE MEMORY VILLAIN. It is built for TB-scale multi-view
light-sheet with lazy loading; its cost is steps to a first result, not RAM.
Putting it on the losing side of a memory axis would be wrong and an expert in
the room would say so. Its row says what it is actually good at.

    python3 figures/stitch_landscape.py
"""
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch

BLUE_DK, MUT = "#1F4C86", "#5A6675"
BLUE_MID, BLUE_PALE = "#5E97D4", "#D8E6F6"
WARM = "#B5651D"
RULE = "#CBD5DC"
CARD = "#FBFCFE"
OURS = "#EAF3FC"

W, H, DPI = 13.333, 7.5, 300
fig = plt.figure(figsize=(W, H), dpi=DPI)
fig.patch.set_facecolor("white")
ax = fig.add_axes([0, 0, 1, 1])
ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")

NAME_FS, ROWLAB_FS, VAL_FS, BAND_FS = 15.5, 9.5, 12, 14

LEFT, RIGHT = 0.026, 0.974
NC, CGAP = 4, 0.016
CW = (RIGHT - LEFT - (NC - 1) * CGAP) / NC
CY, CH = 0.085, 0.655


def cx(k):
    return LEFT + k * (CW + CGAP)


# name, attribution, (output, memory, setup), memory-dot colour, ours?
CARDS = [
    ("Fiji\nGrid/Collection", "Preibisch 2009",
     ("fuses to one ImageJ image;\nno pyramidal OME-TIFF",
      "holds the fused mosaic",
      "simplest to run;\nregular grids"), WARM, False),
    ("BigStitcher", "Preibisch 2019",
     ("N5/HDF5 project;\nOME-TIFF is a later export",
      "built for TB light-sheet;\nlazy loading, not RAM-bound",
      "multi-view, multi-angle,\ndeskew -- many steps"), BLUE_MID, False),
    ("Pete Bankhead's\nQuPath script", "the origin of this extension",
     ("pyramidal OME-TIFF",
      "SparseImageServer:\nevery tile open at once",
      "a script;\npositions from TIFF tags"), WARM, False),
    ("Tiles to Pyramid", "this extension",
     ("pyramidal OME-TIFF\nor OME-Zarr",
      "169 MP in 128 MB\n(measured, flat with size)",
      "a dialog;\nfour position sources"), BLUE_MID, True),
]

ROWS = ["OUTPUT", "MEMORY", "SETUP"]

# --- the grouping bands, which are the real headline -------------------------
BAND_Y, BAND_H = 0.762, 0.098
for x0, x1, text, sub, colour in (
    (cx(0), cx(1) + CW, "A separate program", "leave QuPath, come back", MUT),
    (cx(2), cx(3) + CW, "Inside QuPath",
     "the extension grew out of the script: same output, different read path", BLUE_DK),
):
    ax.add_patch(FancyBboxPatch(
        (x0, BAND_Y), x1 - x0, BAND_H,
        boxstyle="round,pad=0.004,rounding_size=0.012",
        facecolor="#F2F5F9" if colour is MUT else BLUE_PALE,
        edgecolor=RULE, linewidth=1.0, zorder=2))
    ax.text((x0 + x1) / 2, BAND_Y + BAND_H * 0.62, text, fontsize=BAND_FS,
            color=colour, fontweight="bold", ha="center", va="center", zorder=4)
    ax.text((x0 + x1) / 2, BAND_Y + BAND_H * 0.24, sub, fontsize=ROWLAB_FS + 0.5,
            color=colour, ha="center", va="center", zorder=4)

# --- cards -------------------------------------------------------------------
for k, (name, attrib, values, dot, ours) in enumerate(CARDS):
    x0 = cx(k)
    ax.add_patch(FancyBboxPatch(
        (x0, CY), CW, CH, boxstyle="round,pad=0.005,rounding_size=0.013",
        facecolor=OURS if ours else CARD,
        edgecolor=BLUE_MID if ours else RULE,
        linewidth=2.0 if ours else 1.2, zorder=2))

    mid = x0 + CW / 2
    ax.text(mid, CY + CH - 0.030, name, fontsize=NAME_FS,
            color=BLUE_DK if ours else "#2C3E52", fontweight="bold",
            ha="center", va="top", linespacing=1.3, zorder=4)
    ax.text(mid, CY + CH - 0.128, attrib, fontsize=ROWLAB_FS, color=MUT,
            ha="center", va="top", style="italic", zorder=4)

    ry = CY + CH - 0.185
    for r, (label, value) in enumerate(zip(ROWS, values)):
        ax.plot([x0 + 0.016, x0 + CW - 0.016], [ry, ry], color=RULE, lw=1.0,
                zorder=3)
        ax.text(x0 + 0.020, ry - 0.030, label, fontsize=ROWLAB_FS, color=MUT,
                ha="left", va="top", fontweight="bold", zorder=4)
        if label == "MEMORY":
            ax.plot([x0 + CW - 0.024], [ry - 0.022], marker="o", ms=8,
                    color=dot, mec="white", mew=1.4, zorder=5)
        ax.text(mid, ry - 0.062, value, fontsize=VAL_FS,
                color="#2C3E52" if ours else MUT, ha="center", va="top",
                linespacing=1.4, zorder=4)
        ry -= 0.168

# --- the lineage: card 3 feeds card 4 ----------------------------------------
ax_from = cx(2) + CW
ax_to = cx(3)
ay = CY + CH * 0.52
ax.add_patch(FancyArrowPatch((ax_from + 0.002, ay), (ax_to - 0.002, ay),
                             arrowstyle="-|>", mutation_scale=30,
                             color=BLUE_DK, lw=3.4, zorder=8))
# --- what is measured, stated plainly ----------------------------------------
ax.text(0.5, 0.040,
        "Only the Tiles to Pyramid memory cell is measured here. "
        "The other cells describe how each tool is designed.",
        fontsize=ROWLAB_FS + 0.5, color=MUT, ha="center", va="center",
        style="italic")

out = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                    "..", "images", "tiles-to-pyramid", "stitch_landscape.png"))
fig.savefig(out, dpi=DPI, facecolor="white")
print("wrote", out)
