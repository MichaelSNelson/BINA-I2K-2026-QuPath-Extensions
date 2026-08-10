---
layout: default
title: Dialog Position Manager
---

# Dialog Position Manager

> Remembers and restores dialog window positions across QuPath sessions, and recovers windows
> that have become unreachable — the classic "I unplugged the second monitor and now the
> dialog is gone" problem.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-dialog-manager](https://github.com/uw-loci/qupath-extension-dialog-manager) |
| **Version at workshop** | 0.4.1 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+ |
| **Where to find it** | `Window > Dialog Position Manager...` and `Window > Recover Off-Screen Dialogs` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> Note the menu: this one lives under **Window**, not **Extensions**.

---

## What it does

- **Automatic position persistence.** Dialog positions and sizes are saved when closed and
  restored when reopened.
- **Off-screen recovery.** Detects dialogs positioned on a disconnected monitor and brings
  them back.
- **HiDPI awareness.** Handles display scaling changes and mixed-DPI multi-monitor setups —
  the case where a window is technically on-screen but drawn at the wrong scale or position.
- **Tracks all dialogs by default.** Works out of the box with any QuPath dialog, including
  ones from other extensions.
- **Shared storage (0.4.0+).** Point several workstations at one JSON file on a network drive
  and share dialog layouts across a core facility — everyone sits down to the same arrangement.

## Why it exists

This is the least glamorous extension in the suite and the one that saves the most support
time. Undock a laptop, present on a projector, come back, and QuPath dutifully reopens a
dialog at coordinates that no longer exist on any attached display. Without a recovery path,
the fix is editing preferences by hand or reinstalling.

It is also, honestly, an example from the [intro doc](00-extensions-catalogs-and-ai.md): this
class of bug is invisible to automated testing and to an AI agent. It only shows up when a
human unplugs a monitor.

## Recovering a lost dialog

**All at once:** `Window > Recover Off-Screen Dialogs` — every off-screen dialog is instantly
centred on your primary monitor.

**One specific dialog:** `Window > Dialog Position Manager...`, find it in the list
(off-screen entries are marked `[OFF-SCREEN]` in orange), select, click **Center**.

**Reset a dialog that keeps opening somewhere annoying:** same dialog, select it, click
**Reset Position**. Next time it opens QuPath uses its default positioning.

**Start completely fresh:** clear all saved positions from the management UI.

## Install

Via the **LOCI QuPath Extensions** catalog, or the release jar. Restart QuPath.

---

## Hands-on exercise (~5 min)

**Data:** none needed.

1. Open two or three QuPath dialogs (brightness/contrast, the script editor, and one of
   today's extension dialogs). Arrange them where you like.
2. Close and reopen them. Confirm they came back where you put them.
3. `Window > Dialog Position Manager...` and look at the tracked list.
4. Drag a dialog mostly off the edge of the screen, then use **Recover Off-Screen Dialogs**.
5. Pick a dialog and **Reset Position**; reopen it and see QuPath's default placement.
6. If you have a second display: move a dialog to it, disconnect, and recover.

### For core facilities

Point the extension's storage at a shared JSON file on a network drive, and every workstation
opens with the same layout. Worth ten minutes of setup if you support more than about three
machines.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-dialog-manager#readme).
