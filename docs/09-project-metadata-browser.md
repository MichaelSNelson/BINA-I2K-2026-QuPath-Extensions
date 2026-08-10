---
layout: default
title: Project Metadata Browser
---

# Project Metadata Browser

> Every image in your project as a row, every metadata key as a sortable, filterable column —
> with buffered editing, full undo, Excel-style copy/paste, template import/export, and regex
> extraction from filenames.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-project-metadata-browser](https://github.com/uw-loci/qupath-extension-project-metadata-browser) |
| **Version at workshop** | 1.0.0 |
| **License** | GPL-3.0 |
| **Requires** | QuPath 0.7.0+ |
| **Where to find it** | `Extensions > Project Metadata Browser > Browse Metadata...` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> **Walkthrough video:** %%VIDEO_PROJECT_METADATA_BROWSER%%
> The walkthrough below is self-contained. You can work through it during the workshop, or on your own afterwards.

---

## What it does

Modelled on QuPath's built-in TMA Results Viewer, but for whole projects. One row per project
image; built-in columns (Name, ID, URI, Description, Tags) plus **one column per user-metadata
key used anywhere in the project**.

If you have just run [OCR for Labels](08-ocr4labels.md) across 467 slides, this is where you
find out whether it worked.

**Viewing**

- Global case-insensitive **Filter rows** search, plus per-column sort.
- **Fit Columns** auto-sizes each visible column to its widest content, capped by a **Max
  column width** preference; longer cells wrap rather than truncate. The cap persists across
  sessions.
- **Columns** menu lists every column as a checkbox with Select All / Select None — necessary
  once a project has thirty metadata keys.
- Multi-row selection with **Ctrl+C** (TSV), and export to CSV or TSV.
- Double-click or right-click → **Open image**.

**Editing — buffered, and undoable**

This is the part that matters. Edits accumulate in a **working copy** and commit to disk only
when you click **Save**. Everything — inline cell edits, per-image edits, rename, delete,
paste, import, regex extraction — is **undoable with Ctrl+Z** (and redoable with
Ctrl+Shift+Z). Discard reverts to the last save, and closing with unsaved work prompts you.
**The on-disk project is untouched until Save.**

Given that the alternative is a script that rewrites metadata across 467 images with no undo,
this is the difference between a tool you will use and one you will be afraid of.

**Bulk workflows**

- **Excel-style copy/paste** — paste a column of values from a spreadsheet straight into the
  table.
- **Template export + reimport** — export a metadata template, send it to the collaborator who
  actually knows the case IDs, reimport what they fill in.
- **Regex extraction from filenames** — pull the block number, stain, or case ID out of a
  structured filename into its own metadata column.
- **Metadata Keys tab** — every distinct key in the project with a usage count, and one
  operation to **rename** a key across every image or **remove** it from every image. (This
  one originates from a request by `sebg` on [image.sc](https://forum.image.sc/), building on
  Pete Bankhead's per-project rename script.)

## Install

Via the **LOCI QuPath Extensions** catalog, or the release jar. Restart QuPath.

---

## Hands-on exercise (~12 min)

**Data:** `DATA-03_labeled_slides` after you have run the
[OCR exercise](08-ocr4labels.md), or the pre-populated version from the Drive folder.

1. `Extensions > Project Metadata Browser > Browse Metadata...`
2. Click **Fit Columns**. Use the **Columns** menu to hide everything except Name and your
   OCR fields.
3. **Filter rows** for a value you expect. Sort by an OCR column and look at the extremes —
   OCR failures cluster at the ends of a sort.
4. Fix three wrong values by editing cells inline. Press **Ctrl+Z** and watch them revert.
   Redo. **Do not save yet.**
5. Try **regex extraction from filenames** to populate a new column (e.g. block number).
6. Open the **Metadata Keys** tab. **Rename** one key across the whole project. Note the usage
   count.
7. Press **Ctrl+Z**. Confirm the project-wide rename undid cleanly.
8. Now **Save**, and confirm the changes are on disk.
9. Export to CSV.

### What to notice

- The buffered editor changes how you work: you can be aggressive, because nothing is real
  until Save.
- A project-wide key rename as a single undoable operation is not something you would attempt
  with a script.
- Sorting by an OCR column is the fastest QC pass available — bad reads are almost always
  outliers.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-project-metadata-browser#readme)
and the [user guide](https://github.com/uw-loci/qupath-extension-project-metadata-browser/blob/main/docs/user-guide.md).
