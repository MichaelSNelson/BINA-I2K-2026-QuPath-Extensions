---
layout: default
title: Extensions and catalogs in five minutes
---

# Extensions and catalogs in five minutes

Everything in this workshop is a QuPath **extension**: a separate piece of software that
QuPath loads when it starts. This page is the whole background you need. Each tool then has
its own page and video.

## Installing an extension

An extension is one `.jar` file in a folder. You can add one three ways:

- **From a catalog** (what we will do, see below). Updates arrive automatically.
- **Drag and drop** the `.jar` onto a running QuPath window, and accept the offer to copy it.
- **By hand**, into the extensions folder shown at `Extensions > Installed extensions`.

Three things worth knowing before you install:

- **Restart QuPath afterwards.** Some extensions work the moment they are installed; others
  register menus, toolbar buttons or shortcuts only at startup, and an update almost always
  needs a restart. If something you just installed is not there, restart before anything else.
- **Take the jar with `-all` in the name.** That one bundles the dependencies. Without it you
  get a `ClassNotFoundException` the first time you use the tool.
- **Extensions are per QuPath version.** `0.7` has its own extensions folder, so installing
  today will not disturb a 0.6 you already use. Everything here needs **QuPath 0.7.0+**.

## What a catalog is

A catalog is a list of extensions that QuPath can install and update for you, so you never hunt
for jars again. One catalog covers every hands-on tool in this workshop, and adding it installs
**nothing** by itself; it only shows you a list.

**[The setup guide](setup.md) has the catalog URL and the four steps.** Do that before you travel.

> ⚠️ **Do not install everything in the catalog.** Two entries download a Python environment on
> first use: **QP-CAT, 1.5–2.5 GB**, and the **DL Pixel Classifier, 2–4 GB**. Installing those by
> accident on conference wifi will cost you a long wait.

## Where to go next

- **[Setup guide](setup.md)**: do this before the workshop.
- **[Extension index](extensions.md)**: every tool, with its guide and video.
- **[Schedule](schedule.md)**: what happens when.
- [How this suite was built](how-this-was-built.md), including where AI-assisted development
  helped and where it did not. Background to the talk; not needed to use the tools.
