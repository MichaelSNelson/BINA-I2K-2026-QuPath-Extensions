---
layout: default
title: Project Metadata Browser
---

# Project Metadata Browser

> Every image in your project as a row, every metadata key as a sortable, filterable column.
> with buffered editing, full undo, Excel-style copy/paste, template import/export, and regex
> extraction from filenames.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-project-metadata-browser](https://github.com/uw-loci/qupath-extension-project-metadata-browser) |
| **Extension version** | 1.0.1. Installed it before September 26, 2026? Update from the catalog: 1.0.0 hides new columns until you save and refresh. |
| **License** | GPL-3.0 |
| **Requires** | QuPath 0.7.0+ |
| **Where to find it** | `Extensions > Project Metadata Browser > Browse Metadata...` |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> **Walkthrough video:** %%VIDEO_PROJECT_METADATA_BROWSER%%
> The walkthrough below is self-contained. You can work through it during the workshop, or on your own afterwards.

> **New to QuPath?** Words like *project*, *annotation*, *detection*, *class* and
> *measurement* are explained in the [glossary](glossary.md). For QuPath itself, the
> [official documentation](https://qupath.readthedocs.io/en/stable/) is the place to go.

---

## What it does

One window for all the metadata in a project: one row per image, one column per metadata key.
You can **view** it (filter, sort, hide columns), **edit** it (type into cells, with undo, and
nothing written to disk until you save), and run **bulk workflows** that add, fill or remove
metadata on many images at once, from a spreadsheet, a filename pattern or a fill-in template.

<img src="../images/project-metadata-browser/window.png" alt="The Project Metadata Browser window: a Filter rows box and Refresh and Fit Columns buttons above a table with Name, ID, URI, Description, Tags and OCR metadata columns, one row per image, with an entry count, Max column width, Export and Close controls along the bottom" width="820">

<details markdown="1">
<summary><b>Install</b> — from the LOCI catalog, then restart QuPath</summary>

Install from the **LOCI QuPath Extensions** catalog, then restart QuPath. Full steps, including the catalog URL, are in the [setup guide](setup.md).

</details>

---

## Hands-on exercise

> ⚠️ **Do the [OCR for Labels exercise](08-ocr4labels.md) first.** This tool displays and edits
> metadata that is already on your images; it does not create any. A project built straight
> from the `.czi` files has nothing in it but image names, so every column here would be empty
> and there would be nothing to sort, filter or export.
>
> Parts A and B of that exercise are enough: they leave you with a project carrying real
> OCR fields.

| | |
|---|---|
| **Data** | The project you built in the [OCR exercise](08-ocr4labels.md) from [`OCR_Test_Images_LJI.zip`](https://drive.google.com/uc?export=download&id=1HIAm8hbVkVQHNqJziyfBf3r1hYDjUaRS) (244 MB). Nothing extra to download. |
| **Starting point** | That project open in QuPath, its four slides listed in the project pane. |
| **OCR columns** | The keys you typed into the OCR dialog: `specimen` and `barcode` if you followed its Part C. Substitute your own names below if you chose others. |

### Part A: look around

1. Open `Extensions > Project Metadata Browser > Browse Metadata...`. The **Entries** tab shows
   one row per image: Name, ID, URI, Description, Tags, then one column per metadata key.
2. Click **Fit Columns**, then trim the table to the columns you care about. The **Columns**
   menu closes after each click, so reopen it for each row:

   | | Field | Set to |
   |---|---|---|
   | 1 | **Columns > Select None** | click it. Every column disappears. |
   | 2 | **Columns > Name** | tick |
   | 3 | **Columns > `specimen`**, then **Columns > `barcode`** | tick each |

3. Find the two brightfield slides:

   | | Field | Set to |
   |---|---|---|
   | 1 | **Filter rows** | `TOMO` |

   Only the two `histology@lji_org_610 TOMO…` rows remain. The filter searches every visible
   column, so `TOMO` matches their filenames and the case ID that OCR read off their labels.
   Clear the box and all four rows come back.
4. Click the **`specimen`** column header to sort by it. With four images there is little to
   see. On a project of hundreds this is the quickest check there is, because a misread value
   sorts to the top or bottom, away from the real ones.

### Part B: edit, undo, redo

1. Change one value:

   | | Field | Set to |
   |---|---|---|
   | 1 | The **`specimen`** cell of `histology@lji_org_610 TOMO___H&E_20201119-1-mip.czi` | double-click it, type `TEST`, press Enter |

   The window title gains a `*` and **1 unsaved change** appears at the bottom of the window.
2. Press **Ctrl+Z**. The cell reads `610 TOMO` again. Press **Ctrl+Shift+Z** and `TEST`
   returns. Leave it there, and **do not save yet**.

### Part C: two new columns pulled out of the filenames

Every filename in this project carries a stain and a scan date, written two different ways:

| Filename | Stain | Date |
|---|---|---|
| `histology@lji_org_610 TOMO___H&E_20201119-1-mip.czi` | H&E | 20201119 |
| `histology@lji_org_610 TOMO___MT3B_20201119-mipcomp.czi` | MT3B | 20201119 |
| `8443_51000000_02_IF_2022-11-18-mip.czi` | IF | 2022-11-18 |
| `8443_51000000_12_IF_2022-11-18-mipcomp.czi` | IF | 2022-11-18 |

The extension can copy those into their own columns using a regular expression (a "regex"): a
pattern that describes the shape of the text you want. You do not need to write one. Paste
the pattern below, which was written for these four filenames.

1. Open `Edit > Extract columns from filenames (regex)...`.
2. Set these, top to bottom:

   | | Field | Set to |
   |---|---|---|
   | 1 | **Source column** | `Name` (already selected) |
   | 2 | **Regex pattern** | `_(?<stain>[^_]+)_(?<date>\d{4}-?\d{2}-?\d{2})-` |
   | 3 | **Detected groups** | leave `stain` and `date` as they are |
   | 4 | **If a group's column name already exists on entries** | *Skip -- keep current values, leave non-collisions alone* |
   | 5 | **Skip non-matching entries** | leave ticked |

   What the pattern says: `(?<stain>[^_]+)` is "the text between two underscores, into a
   column called `stain`", and `(?<date>\d{4}-?\d{2}-?\d{2})` is "four digits, two digits, two
   digits, with or without dashes between them, into a column called `date`". The `_` and `-`
   around them pin it to the one place in each filename where a stain sits just before a date.

3. Check the preview before you apply. Under the pattern box it says **Valid regex. 2 named
   groups detected.** The preview table lists each filename with its `stain` and `date` filled
   in as in the table above, and the line under it reads **Matched 4 of 4; 0 unmatched.** If a
   row shows *(no match)*, the pattern was not pasted exactly.
4. Click **Apply**. Two new columns, `stain` and `date`, appear at the right of the table,
   filled in for all four images, and the status line at the bottom of the window reads
   **Regex extracted 8 cell values, 2 new columns. Save to commit.**
5. Press **Ctrl+Z**: both columns disappear, because the extraction was one action. Press
   **Ctrl+Shift+Z** to bring them back.

> **For your own filenames.** Change the names inside `(?<...>)` and the text around them to
> match how your files are named. [regex101.com](https://regex101.com/) with the *Java*
> flavor selected lets you paste a filename and see what a pattern captures before you bring
> it here, and the dialog's preview shows the same thing on your real project.

### Part D: rename a key across the project

1. On the **Metadata Keys** tab, rename the `date` key on every image at once:

   | | Field | Set to |
   |---|---|---|
   | 1 | Key list | select `date` (**Used by** 4) |
   | 2 | **Rename...** | click it. The dialog is headed **Rename "date" (used by 4 entries)** |
   | 3 | **New key** | `scan_date` |
   | 4 | **Rename** | click it |

   The key list now shows `scan_date` and no `date`, and the status line reads **Renamed 'date'
   to 'scan_date' across 4 entries. Save to commit.** On the **Entries** tab the column header
   reads `scan_date`.
2. Press **Ctrl+Z**: the key, and the column header, read `date` again. Press **Ctrl+Shift+Z**
   to put the rename back.

### Part E: save, refresh, export

1. `File > Save` (**Ctrl+S**). The `*` and the unsaved-changes marker disappear, and the status
   line reports how many changes were saved.
2. Click **Refresh**. The table is reloaded from the project on disk: `stain` and `scan_date`
   are still there, filled in for all four images, and the `specimen` cell you changed in
   Part B still reads `TEST`. The columns you hid in Part A stay hidden.
3. Export what you see:

   | | Field | Set to |
   |---|---|---|
   | 1 | **Export...** (bottom right of the window) | click it |
   | 2 | File type | *Comma-separated values (\*.csv)* |
   | 3 | File name | `metadata.csv` |

   Open the file in a spreadsheet: one row per image, one column per column you left visible.

### Why this matters for finding images again

QuPath's own project pane has a **Sort by...** menu that takes a metadata key: pick one and the
image list groups under it, with a heading row per value. The pane's filter box searches name and
type only, so metadata is what gives you an axis worth sorting on. A project of four hundred files
named by scanner ID becomes a list grouped by stain, by case, or by block.

That is the payoff for filling metadata in at all, and it is why label recognition, this browser
and the project pane form a chain: recover the fields, check them here, then navigate the project
by what is written on the slide.

### What to notice

- The buffered editor changes how you work: you can be aggressive, because nothing is real
  until Save.
- A project-wide key rename as a single undoable operation is not something you would attempt
  with a script.
- Sorting by an OCR column is the fastest QC pass available, because bad reads are almost always
  outliers.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-project-metadata-browser#readme)
and the [user guide](https://github.com/uw-loci/qupath-extension-project-metadata-browser/blob/main/docs/user-guide.md).
