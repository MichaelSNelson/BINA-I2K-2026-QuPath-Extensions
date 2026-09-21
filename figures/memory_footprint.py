#!/usr/bin/env python3
"""
Why Tiles to Pyramid holds a flat amount of RAM while the mosaic grows.

THE CLAIM THIS FIGURE MAKES: peak memory is set by the CHUNK, not by the mosaic.
Fusion-style stitchers (BigStitcher, Grid/Collection stitching, Ashlar, and the
SparseImageServer path this extension replaced) must hold the tiles and the fused
canvas at once, so their footprint is O(mosaic). Writing chunk by chunk makes it
O(1) -- only the 1-4 tiles overlapping the current chunk are ever open.

HONESTY BOUNDARY -- the three panels are not the same kind of evidence, and the
panel titles say so:
  A  schematic. What is resident in RAM under each strategy.
  B  schematic. The SHAPE of the memory curve as the output file is written.
     Nobody measured a time series here; the shapes follow from panel A.
  C  MEASURED for the chunked path -- the smallest -Xmx at which the stitch
     completes, bracketed by the largest -Xmx at which it dies. See MEASURED
     below for why that metric and not sampled heap. MODELLED for the fusion
     path, from the arithmetic in fusion_mb() -- a lower bound, since it counts
     only the tile pixels plus one fused canvas and ignores every working copy
     a real fusion step makes.

Do not relabel panel C's modelled line as measured. We have never run BigStitcher
or Ashlar on this data; the line is what their documented strategy costs, and the
one anchor point we do own is our own old path (2-4 GB, OOM past ~1600 tiles).

    python3 figures/memory_footprint.py
"""
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import FancyBboxPatch, Rectangle

# --- palette (shared with complexity_ramp.py) --------------------------------
BLUE_DK, MUT = "#1F4C86", "#5A6675"
BLUE_MID, BLUE_PALE = "#5E97D4", "#D8E6F6"
WARM, WARM_PALE = "#B5651D", "#F0DCC6"   # the one warm accent: the costly path
RULE = "#CBD5DC"

# --- the acquisition this is all about ---------------------------------------
TILE_PX = 1024          # tile edge, pixels
BYTES_PER_PX = 2        # 16-bit
OVERLAP = 0.10          # 10%, typical of real acquisitions

# --- measured, chunked path --------------------------------------------------
# THE METRIC IS THE HEAP FLOOR: the smallest -Xmx at which the stitch completes.
# Sampled heap was tried first and thrown out. Two reasons it cannot answer this:
#
#  1. "Peak live heap" moves with the heap you grant. The SAME 36-tile Zarr stitch
#     reported 28.6 MB at -Xmx384m and 84.9 MB at -Xmx2g, because live heap is
#     sampled after collections and a roomy heap collects lazily. It measures GC
#     policy as much as footprint.
#  2. StitchBenchmarkTest cannot host this experiment at all: SyntheticGridFixture
#     .texture() allocates double[h][w] AND float[h][w] for the whole mosaic before
#     stitching (~2 GB at 196 tiles), so every -Xmx floor measured through it is
#     the fixture's floor. Under it, 196 tiles "failed" at 1024m; isolated, the
#     same stitch runs in 192m.
#
# So these come from a standalone probe that writes tiles one at a time (O(one
# tile) of heap) and then stitches in a fresh JVM under a hard cap. A cap that
# completes is a genuine upper bound on what the stitcher needs.
# OME-TIFF, 1024 px 16-bit tiles, 10% overlap, LZW, JDK 21 / WSL2.
MEASURED = [
    # (tiles, megapixels, heap floor MB, largest cap that still FAILED MB)
    # The pair brackets the floor: it runs at the first, dies at the second.
    (36, 31.7, 96, 80),
    (100, 86.9, 128, 96),
    (196, 169.3, 128, 112),
]

# Typical JVM heap a QuPath user actually runs with. A band, not a line: it
# depends on the machine and on -Xmx, and the figure should not pretend to a
# precision it does not have.
HEAP_BAND = (2048, 8192)


def mosaic_px(tiles):
    """Mosaic edge in pixels for a square grid of `tiles` tiles at OVERLAP."""
    g = np.sqrt(tiles)
    return TILE_PX * (1 - OVERLAP) * (g - 1) + TILE_PX


def fusion_mb(tiles):
    """Lower bound on the fusion strategy: every tile open, plus one fused canvas.

    This is deliberately generous to the other approach -- it ignores pyramid
    levels, per-tile working copies, and the blend buffers real fusion code keeps.
    """
    tile_bytes = tiles * TILE_PX * TILE_PX * BYTES_PER_PX
    canvas_bytes = mosaic_px(tiles) ** 2 * BYTES_PER_PX
    return (tile_bytes + canvas_bytes) / 1024**2


# =============================================================================
W, H, DPI = 13.0, 4.5, 300
fig = plt.figure(figsize=(W, H), dpi=DPI)
fig.patch.set_facecolor("white")

gs = fig.add_gridspec(
    1, 3, width_ratios=[1.02, 1.0, 1.12],
    left=0.035, right=0.985, top=0.80, bottom=0.115, wspace=0.30,
)

TITLE_FS, LAB_FS, TICK_FS, NOTE_FS = 12.5, 10.0, 9.5, 9.0


def panel_title(ax, text, kind):
    """Title plus the evidence tag, so no panel can be read as more than it is."""
    ax.set_title(text, fontsize=TITLE_FS, color=BLUE_DK, fontweight="bold",
                 pad=17, loc="left")
    ax.text(0, 1.015, kind, transform=ax.transAxes, fontsize=NOTE_FS,
            color=MUT, style="italic", va="bottom", ha="left")


# =============================================================================
# Panel A -- what is resident in RAM
# =============================================================================
axA = fig.add_subplot(gs[0, 0])
axA.set_xlim(0, 1); axA.set_ylim(0, 1); axA.axis("off")
panel_title(axA, "What sits in RAM", "schematic")

# Cells must be SQUARE, and this panel is wider than it is tall, so an x-unit is
# not a y-unit. Derive the correction from the axes' real size rather than
# eyeballing it -- otherwise every layout tweak silently re-stretches the grid.
_bb = axA.get_position()
XY = (_bb.height * H) / (_bb.width * W)     # multiply y-sizes by this to get x

N = 6                                        # grid drawn as N x N
CY, GY = 0.0405, 0.0075                      # cell + gap, in y-units
CX, GX_ = CY * XY, GY * XY
GRID_H = N * CY + (N - 1) * GY
GRID_W = N * CX + (N - 1) * GX_

XG = 0.045                                   # grid's left edge
XT = XG + GRID_W + 0.075                     # text column, to the right of it


def draw_grid(y0, shade):
    """shade(i, j) -> (facecolor, edgecolor). Row j=0 is the TOP row."""
    for j in range(N):
        for i in range(N):
            fc, ec = shade(i, j)
            axA.add_patch(Rectangle(
                (XG + i * (CX + GX_), y0 + (N - 1 - j) * (CY + GY)),
                CX, CY, facecolor=fc, edgecolor=ec, linewidth=0.6, zorder=3))


def ram_box(x0, y0, w, h, color):
    axA.add_patch(FancyBboxPatch(
        (x0, y0), w, h, boxstyle="round,pad=0.014,rounding_size=0.018",
        facecolor="none", edgecolor=color, linewidth=1.9,
        linestyle=(0, (4, 2.4)), zorder=5))


def block_text(y_top, color, heading, body):
    axA.text(XT, y_top, heading, fontsize=LAB_FS + 0.5, color=color,
             fontweight="bold", va="top", ha="left")
    axA.text(XT, y_top - 0.085, body, fontsize=NOTE_FS, color=MUT,
             va="top", ha="left", linespacing=1.45)


# --- upper: load everything, then fuse ---
TOP_Y = 0.545
draw_grid(TOP_Y, lambda i, j: (WARM_PALE, WARM))
ram_box(XG, TOP_Y, GRID_W, GRID_H, WARM)
block_text(TOP_Y + GRID_H, WARM, "Load everything, then fuse",
           "Every tile, plus the whole fused\ncanvas, resident at once.\nRAM grows with the mosaic.")

# --- lower: write one chunk at a time ---
BOT_Y = 0.075
HOT = {(2, 2), (3, 2), (2, 3), (3, 3)}       # the 1-4 tiles one chunk can touch


def chunk_shade(i, j):
    if (i, j) in HOT:
        return BLUE_PALE, BLUE_MID
    return "#FFFFFF", RULE


draw_grid(BOT_Y, chunk_shade)
hx = XG + 2 * (CX + GX_)
hy = BOT_Y + (N - 1 - 3) * (CY + GY)
ram_box(hx, hy, 2 * CX + GX_, 2 * CY + GY, BLUE_DK)
block_text(BOT_Y + GRID_H, BLUE_DK, "Write one chunk at a time",
           "Only the chunk and the 1-4 tiles\nbeneath it. Each is released as\nsoon as it is written.")

# =============================================================================
# Panel B -- memory as the output file is written
# =============================================================================
axB = fig.add_subplot(gs[0, 1])
# The plateau height is only meaningful against a stated mosaic size, so say
# which one: ~1600 tiles is where our own pre-chunking path used to die.
panel_title(axB, "As the file is written", "schematic, for a ~1600-tile mosaic")

t = np.linspace(0, 100, 900)

# Fusion: a steep load ramp to the plateau, held until the write finishes.
load_end = 34.0
fuse = np.where(
    t < load_end,
    100 + (2600 - 100) * (t / load_end) ** 0.78,
    2600 + 190 * (1 - np.exp(-(t - load_end) / 26)),
)

# Chunked: flat from the first chunk, with per-chunk sawtooth as tiles are
# opened, composited and released.
base = 112 + 16 * (1 - np.exp(-t / 5))
saw = 30 * (0.5 + 0.5 * np.sin(t * 2.4)) * (t > 1.5)
chunk = base + saw

axB.fill_between(t, 1, fuse, color=WARM_PALE, alpha=0.40, zorder=1)
axB.plot(t, fuse, color=WARM, lw=2.3, zorder=3)
axB.plot(t, chunk, color=BLUE_DK, lw=2.3, zorder=4)

axB.set_yscale("log")
axB.set_ylim(60, 9000)
axB.set_xlim(0, 100)
axB.set_xlabel("output file written (%)", fontsize=LAB_FS, color=MUT)
axB.set_ylabel("RAM held (MB)", fontsize=LAB_FS, color=MUT)
axB.set_yticks([100, 300, 1000, 3000])
axB.set_yticklabels(["100", "300", "1 GB", "3 GB"])
axB.tick_params(labelsize=TICK_FS, colors=MUT)
for s in ("top", "right"):
    axB.spines[s].set_visible(False)
for s in ("left", "bottom"):
    axB.spines[s].set_color(RULE)
axB.grid(axis="y", color=RULE, lw=0.6, alpha=0.65, zorder=0)
axB.set_axisbelow(True)

# Curves are labelled where they run, not in a legend box: on a slide the eye
# should not have to travel to a key and back.
axB.text(52, 640, "load everything,\nthen fuse", fontsize=LAB_FS, color=WARM,
         fontweight="bold", ha="center", va="center", linespacing=1.35)
axB.text(3, 80, "Tiles to Pyramid (chunked)", fontsize=LAB_FS, color=BLUE_DK,
         fontweight="bold", ha="left", va="center")
axB.annotate("nothing can be released until\nthe last chunk is written",
             xy=(84, 2790), xytext=(56, 6300), fontsize=NOTE_FS, color=WARM,
             ha="center", linespacing=1.4,
             arrowprops=dict(arrowstyle="-|>", color=WARM, lw=1.2,
                             shrinkA=2, shrinkB=3))

# =============================================================================
# Panel C -- peak memory against mosaic size
# =============================================================================
axC = fig.add_subplot(gs[0, 2])
panel_title(axC, "Heap needed vs. mosaic size",
            "measured floor (open marker = failed); fusion modelled")

tiles = np.logspace(np.log10(16), np.log10(6000), 300)
axC.plot(tiles, fusion_mb(tiles), color=WARM, lw=2.3, zorder=4)
axC.text(21, 780, "load everything,\nthen fuse (modelled)", fontsize=LAB_FS,
         color=WARM, fontweight="bold", ha="left", va="center",
         linespacing=1.35)

axC.axhspan(HEAP_BAND[0], HEAP_BAND[1], color=RULE, alpha=0.42, zorder=1)
axC.text(19, np.sqrt(HEAP_BAND[0] * HEAP_BAND[1]), "typical QuPath heap",
         fontsize=NOTE_FS, color=MUT, va="center", ha="left", style="italic")

# Where the modelled curve leaves the heap band -- our own old path OOM'd here.
oom_tiles = 1600
axC.plot([oom_tiles], [fusion_mb(oom_tiles)], marker="X", ms=11,
         color=WARM, mec="white", mew=1.3, zorder=6)
axC.annotate("out of memory\npast ~1600 tiles",
             xy=(oom_tiles, fusion_mb(oom_tiles)), xytext=(330, 15500),
             fontsize=NOTE_FS, color=WARM, ha="center",
             arrowprops=dict(arrowstyle="-|>", color=WARM, lw=1.2,
                             shrinkA=0, shrinkB=5))

if MEASURED:
    mt = np.array([m[0] for m in MEASURED], dtype=float)
    ml = np.array([m[2] for m in MEASURED], dtype=float)
    mf = np.array([m[3] for m in MEASURED], dtype=float)

    # Solid through the measured range; dashed beyond it. We have not run 1600
    # tiles, and the figure must not imply we did.
    axC.plot(mt, ml, color=BLUE_DK, lw=2.3, zorder=5)
    axC.plot([mt[-1], 6000], [ml[-1]] * 2, color=BLUE_DK, lw=2.0,
             linestyle=(0, (5, 3)), zorder=5)
    axC.plot(mt, ml, "o", ms=7.5, color=BLUE_DK, mec="white", mew=1.4, zorder=7,
             label="completes")
    # Open markers show the largest cap that still died, so the reader can see
    # the floor is bracketed rather than asserted.
    axC.plot(mt, mf, "v", ms=6.5, color="white", mec=BLUE_MID, mew=1.5, zorder=7)
    axC.vlines(mt, mf, ml, color=BLUE_MID, lw=1.1, zorder=4)

    # Label above the dashed run, where the panel is empty; the summary sits
    # under the solid run. Both clear of the modelled line's diagonal.
    axC.text(148, 215, "Tiles to Pyramid\nsmallest heap that completes",
             fontsize=LAB_FS, color=BLUE_DK, fontweight="bold", ha="left",
             va="bottom", linespacing=1.4)
    axC.text(
        148, 44,
        f"{MEASURED[-1][1]:.0f} MP in {ml[-1]:.0f} MB; {MEASURED[0][1]:.0f} MP in {ml[0]:.0f} MB\n"
        f"{MEASURED[-1][1] / MEASURED[0][1]:.1f}x the mosaic, {ml[-1] / ml[0]:.2f}x the heap",
        fontsize=NOTE_FS, color=MUT, ha="left", va="bottom", linespacing=1.45)

axC.set_xscale("log"); axC.set_yscale("log")
axC.set_xlim(16, 6000)
axC.set_ylim(36, 40000)
axC.set_xlabel("tiles in the mosaic", fontsize=LAB_FS, color=MUT)
axC.set_ylabel("heap needed (MB)", fontsize=LAB_FS, color=MUT)
axC.set_xticks([25, 100, 400, 1600, 5000])
axC.set_xticklabels(["25", "100", "400", "1600", "5000"])
axC.set_yticks([100, 1000, 10000])
axC.set_yticklabels(["100", "1 GB", "10 GB"])
axC.tick_params(labelsize=TICK_FS, colors=MUT)
for s in ("top", "right"):
    axC.spines[s].set_visible(False)
for s in ("left", "bottom"):
    axC.spines[s].set_color(RULE)
axC.grid(color=RULE, lw=0.6, alpha=0.65, zorder=0)
axC.set_axisbelow(True)

# =============================================================================
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "images",
                   "memory_footprint.png")
fig.savefig(os.path.normpath(out), dpi=DPI, facecolor="white")
print("wrote", os.path.normpath(out))
if MEASURED:
    for n, mp, floor, failed in MEASURED:
        print(f"  measured {n:4d} tiles ({mp:5.1f} MP): completes at {floor} MB, fails at {failed} MB")
else:
    print("  NOTE: MEASURED is empty -- panel C shows no measured trace.")
