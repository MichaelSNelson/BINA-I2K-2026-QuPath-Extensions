---
layout: default
title: Channel Names Viewer
---

# Channel Names Viewer

> A small always-visible legend listing the currently-selected fluorescence channels,
> colour-coded, updating live as you toggle channels. Resizes freely, and the text scales
> with the window — shrink it out of the way on a laptop, or blow it up for a projector.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-channel-names-viewer](https://github.com/uw-loci/qupath-extension-channel-names-viewer) |
| **Version at workshop** | 1.0.9 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+ |
| **Where to find it** | Toolbar button beside brightness/contrast · `Extensions > Channel Names Viewer...` · **Ctrl+Shift+C** (**Cmd+Shift+C** on macOS) |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

---

## What it does

Anyone who has presented a multiplex image has been asked "which one is the green one?" and
had to go open brightness/contrast to find out. This is the fix.

The window mirrors what brightness/contrast calls *selected* — toggle a channel there and the
legend updates immediately. Each channel name is drawn in its display colour, with a
perceived-brightness (BT.601) luminance check that switches very dark channels to white so
they stay readable against the dark background.

- **Move:** drag the body. **Resize:** drag any edge or corner. **Close:** double-click the
  body, press the shortcut again, or Esc.
- **Resize-with-text.** No font-size control by default — drag the window and the text scales
  with it. If you want a fixed size (e.g. matched screenshots across different channel
  counts), use **Lock font size** in the right-click menu.
- **Right-click for settings** — on the window body or the toolbar button: background opacity,
  lock font size, reset opacity.
- **Image switching** rebinds automatically; RGB/brightfield images show an empty-state
  placeholder rather than crashing.
- Position, size, opacity, and lock state persist across sessions.

## Provenance

This packages [Sara McArdle's `FluorescentChannelNames.groovy`](https://github.com/saramcardle/Image-Analysis-Scripts/blob/master/QuPath%20Groovy%20Scripts/FluorescentChannelNames.groovy)
(originally written by Pete Bankhead at the 2022 QuPath Hackathon) as a real extension, with a
toolbar button, menu item and keyboard accelerator, plus handling for image switching, RGB
images, and listener cleanup.

**It does not replace the script.** Both can be installed at once — they create independent
JavaFX windows and do not conflict. Keep using the script if you have customised it or wired
it into automation. The extension adds discoverability, resize-with-text scaling, clean
rebinding, an RGB empty state, persisted state, and a right-click settings menu. The
`Ctrl/Cmd+Shift+C` accelerator is exclusive to the extension — the script registers no global
shortcut.

## Install

Via the **LOCI QuPath Extensions** catalog, or drag
`qupath-extension-channel-names-viewer-{version}-all.jar` from
[Releases](https://github.com/uw-loci/qupath-extension-channel-names-viewer/releases) onto
QuPath. **Restart** — the toolbar button, menu entry, and shortcut do not appear until you do.

---

## Hands-on exercise (~5 min)

**Data:** `DATA-02_multiplex_IF`.

1. Open the multiplex image. Press **Ctrl+Shift+C** (or click the channel-bars toolbar button
   next to brightness/contrast).
2. Toggle channels on and off in brightness/contrast. Watch the legend track live.
3. Drag a corner to resize — note that the text scales with the window.
4. Right-click the body: reduce **background opacity** so the legend floats over the image.
5. Turn on **Lock font size** and resize again. Decide which behaviour you prefer.
6. Open an RGB/brightfield image and confirm the empty-state placeholder rather than an error.
7. Switch back and confirm the legend rebinds to the new image's channels.

### What to notice

- This is a five-minute extension that solves a problem you have every time you present. Not
  every useful tool needs to be large.
- Lock font size exists specifically so a series of screenshots can be visually consistent
  across images with different channel counts.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-channel-names-viewer#readme)
and its [user guide](https://github.com/uw-loci/qupath-extension-channel-names-viewer/blob/main/docs/user-guide.md).
