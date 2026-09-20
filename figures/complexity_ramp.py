#!/usr/bin/env python3
"""
Simple-to-complex ramp of the sixteen extensions, for the "what this hour covers" slide.

The axis is COMPLEXITY AS THE USER MEETS IT: how much you must set up, learn, or
prepare before the tool does anything useful -- not how complicated the code is.
Dialog Manager is small and sits at the far left because you never think about it.
QPSC sits at the far right because it needs a microscope.

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
    ("Open it,\nit works",         ["Dialog Manager", "Channel Names", "Class Distribution"]),
    ("A tool you\npick up",        ["Wizard Wand", "Polyline Wand", "Classify Subset"]),
    ("A workflow\nwith settings",  ["QuIET", "OCR for Labels", "Metadata Browser", "Tiles to Pyramid"]),
    ("Needs data you\nprepare",    ["Confusion Matrix", "Cluster 3D Nav", "Fiber Analysis", "TME-Quant"]),
    ("A system to\nset up",        ["DL Classifier", "QP-CAT", "QPSC"]),
]

W, H, DPI = 12.4, 3.9, 300
L, R = 0.020, 0.980                 # horizontal margins, axis units
RIB_Y, RIB_H = 0.150, 0.062         # gradient ribbon
CHIP_BOT, CHIP_H, CHIP_GAP = 0.320, 0.125, 0.032
FS_CHIP, FS_TIER, FS_END = 12, 11.5, 11.5

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
for i, (caption, names) in enumerate(TIERS):
    cx = L + col * (i + 0.5)
    face = RAMP[i]
    lum = sum(c * k for c, k in zip(matplotlib.colors.to_rgb(face), (0.2126, 0.7152, 0.0722)))
    txt = "#FFFFFF" if lum < 0.5 else BLUE_DK
    ax.text(cx, RIB_Y - 0.045, caption, ha="center", va="top",
            fontsize=FS_TIER, color=MUT, linespacing=1.4)
    for j, name in enumerate(names):
        y = CHIP_BOT + j * (CHIP_H + CHIP_GAP)
        ax.add_patch(FancyBboxPatch(
            (cx - chip_w / 2, y), chip_w, CHIP_H,
            boxstyle="round,pad=0,rounding_size=0.030",
            linewidth=0, facecolor=face, zorder=3))
        ax.text(cx, y + CHIP_H / 2, name, ha="center", va="center",
                fontsize=FS_CHIP, color=txt, zorder=4)

import os
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "images", "complexity_ramp.png")
fig.savefig(os.path.normpath(out), dpi=DPI, transparent=True)
print("wrote", os.path.normpath(out), "| chips:", sum(len(v) for _, v in TIERS))
