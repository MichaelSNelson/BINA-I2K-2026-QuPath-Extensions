#!/usr/bin/env python3
"""
Simple-to-complex ramp of the sixteen extensions, for the "what this hour covers" slide.

ORDERING AXIS: how much has to already be true before the tool is any use to you.
Not UI surface area, and not code complexity. Dialog Manager needs nothing but
QuPath; QPSC needs a microscope, a server and a config. Classify Subset has one
small dialog but is useless until you have trained and saved a classifier, so it
sits well to the right of tools with far busier windows.

There are deliberately NO tier captions. A single short phrase per column kept
claiming a taxonomy that does not survive contact with the list -- the tools vary
on setup cost, prerequisites, interaction and interpretation independently, and a
column caption flattens those into one wrong sentence. The gradient carries the
ordering; the speaker carries the nuance.

Edit TIERS and re-run; everything else sizes itself.

    python3 figures/complexity_ramp.py
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import FancyBboxPatch

BLUE_DK, MUT = "#1F4C86", "#5A6675"
RAMP = ["#E4EEFA", "#A8C8EA", "#5E97D4", "#2C63A8", "#17406F"]   # one per tier

# (caption under the ribbon, [short names])  -- left to right, simple to complex
TIERS = [
    # nothing but QuPath running
    ["Dialog Manager", "Channel Names"],
    # an image or a project open
    ["Wizard Wand", "Polyline Wand", "Metadata Browser", "QuIET"],
    # objects, annotations or tiles you have already made
    ["Class Distribution", "OCR for Labels", "Tiles to Pyramid"],
    # a trained model, ground truth, or an embedding
    ["Classify Subset", "Confusion Matrix", "Cluster 3D Nav"],
    # an environment, a server, or hardware
    ["DL Classifier", "QP-CAT", "Fiber Analysis", "TME-Quant", "QPSC"],
]

W, H, DPI = 12.4, 4.0, 300
L, R = 0.020, 0.980                 # horizontal margins, axis units
RIB_Y, RIB_H = 0.055, 0.070         # gradient ribbon
CHIP_BOT, CHIP_H, CHIP_GAP = 0.200, 0.122, 0.028
FS_CHIP, FS_TIER, FS_END = 12, 11.5, 11.5

_tall = max(len(v) for v in TIERS)
_block = _tall * CHIP_H + (_tall - 1) * CHIP_GAP
MID_Y = CHIP_BOT + _block / 2
assert MID_Y + _block / 2 <= 0.985, f"tallest column reaches {MID_Y + _block/2:.3f}; raise H"

fig = plt.figure(figsize=(W, H), dpi=DPI)
ax = fig.add_axes([0, 0, 1, 1]); ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")

# --- gradient ribbon ---------------------------------------------------------
cmap = matplotlib.colors.LinearSegmentedColormap.from_list("ramp", RAMP)
ax.imshow(np.linspace(0, 1, 512).reshape(1, -1),
          extent=[L, R - 0.014, RIB_Y, RIB_Y + RIB_H],
          aspect="auto", cmap=cmap, zorder=1)
ax.annotate("", xy=(R, RIB_Y + RIB_H / 2), xytext=(R - 0.016, RIB_Y + RIB_H / 2),
            arrowprops=dict(arrowstyle="-|>", color=RAMP[-1], lw=2.4), zorder=2)
ax.text(L, RIB_Y + RIB_H + 0.030, "simple", ha="left", va="bottom",
        fontsize=FS_END, color=MUT, style="italic")
ax.text(R, RIB_Y + RIB_H + 0.030, "complex", ha="right", va="bottom",
        fontsize=FS_END, color=BLUE_DK, style="italic", fontweight="bold")

# --- chips -------------------------------------------------------------------
n = len(TIERS)
col = (R - L) / n
chip_w = col - 0.018
for i, names in enumerate(TIERS):
    cx = L + col * (i + 0.5)
    face = RAMP[i]
    lum = sum(c * k for c, k in zip(matplotlib.colors.to_rgb(face), (0.2126, 0.7152, 0.0722)))
    txt = "#FFFFFF" if lum < 0.5 else BLUE_DK
    block = len(names) * CHIP_H + (len(names) - 1) * CHIP_GAP
    base = MID_Y - block / 2
    for j, name in enumerate(names):
        y = base + j * (CHIP_H + CHIP_GAP)
        ax.add_patch(FancyBboxPatch(
            (cx - chip_w / 2, y), chip_w, CHIP_H,
            boxstyle="round,pad=0,rounding_size=0.030",
            linewidth=0, facecolor=face, zorder=3))
        ax.text(cx, y + CHIP_H / 2, name, ha="center", va="center",
                fontsize=FS_CHIP, color=txt, zorder=4)

import os
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "images", "complexity_ramp.png")
# TRANSPARENT=False by default. Set it True only if you are pasting onto a
# coloured slide background and have checked the dark chips still read.
TRANSPARENT = False
if not TRANSPARENT:
    fig.patch.set_facecolor("white"); fig.patch.set_alpha(1.0)
fig.savefig(os.path.normpath(out), dpi=DPI, transparent=TRANSPARENT,
            facecolor=("none" if TRANSPARENT else "white"))
print("wrote", os.path.normpath(out), "| chips:", sum(len(v) for v in TIERS))
