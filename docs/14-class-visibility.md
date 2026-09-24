---
layout: default
title: Class Visibility
---

# Class Visibility

> Show or hide objects by class — or by **one marker inside a class name**, combined with
> `Any` or `All`. On a panel of combinatorial classes like `CD3: CD8: PD1`, "CD3 **and** CD8
> together" is one rule here and no rule at all in QuPath's built-in class list.

| | |
|---|---|
| **Repository** | [uw-loci/qupath-extension-class-visibility](https://github.com/uw-loci/qupath-extension-class-visibility) |
| **Extension version** | 0.3.0 |
| **License** | Apache-2.0 |
| **Requires** | QuPath 0.7.0+ |
| **Where to find it** | `Extensions > Class Visibility > Show panel` · toolbar button |
| **Catalog** | LOCI QuPath Extensions |
| **Session** | Hands-on |

> **Walkthrough video:** %%VIDEO_CLASS_VISIBILITY%%
> The walkthrough below is self-contained. You can work through it in the hands-on hour, or on your own afterwards.

---

## What it does

A *class* is the whole label on an object: `CD3: CD8: PD1`. A **component** is one
colon-separated part of it: `CD3`. This panel filters the viewer by either one.

Class names built by combining markers are the case it exists for. Twenty or forty such names
are overlapping groups rather than a list of categories, and two jobs become awkward: finding
every name that carries a given marker, and asking for the cells that carry *several* markers
at once.

- **A component list.** One row per marker, however many class names contain it.
- **An `Any` / `All` switch** over the checked components. `CD3` **and** `CD8` **and** `PD1`
  together is one rule.
- **A `Spread` column** — a ratio such as `9/20` beside a component — saying how many of the
  image's classes contain it. Some naming schemes append `positive` or `Cell` to every class
  name, and those components look exactly like markers until you count. Off by default.
- **A blue ring** round the check box of every class row the checked components reach, so you
  can see what a component rule is acting on.
- **`Find`** over both lists, with the matched text in **bold**.
- **Named presets, saved in the project**, so a filter worth building gets built once.

It writes to the same QuPath setting the built-in class list writes to, so the two stay in
agreement.

## When the built-in class list is the better tool

With five or ten classes, use the built-in one. Open the **Annotations** tab of the analysis
pane: the **Class list** on the right gives per-class show and hide, a color picker on every
row, a `Show by default` / `Hide by default` dropdown, and a filter field that accepts regular
expressions — which this panel's does not.

It is also worth knowing that QuPath's class matching is not exact by default. Ticking a class
named `CD3: CD8` matches every class containing **both** parts, because the panel and the
built-in pane share one matching rule. So a single-marker class row, where one exists, already
does what a single checked component does. The component list earns its place when **no class
of that name exists** — the normal case in a real panel — and the `All` combination has no
equivalent anywhere in QuPath.

## Provenance

A port of the community Groovy script *"Show specific classes of objects v3"*
([image.sc topic 31828](https://forum.image.sc/t/31828)), which stopped working when
`OverlayOptions.hiddenClassesProperty()` was removed from QuPath.

<details markdown="1">
<summary><b>Install</b> — from the LOCI catalog, then restart QuPath</summary>

Install from the **LOCI QuPath Extensions** catalog, then restart QuPath. Full steps, including
the catalog URL, are in the [setup guide](setup.md).

</details>

---

## Try it yourself

**The cells in this project ship unclassified.** The six type names you may have met in other
walkthroughs — `tumor`, `fibroblast`, `cd8_t`, `helper_t`, `b_cell`, `macrophage` — belong to the
ground-truth *point annotations*, not to the cells. So if you open the panel right now you get a
single `Unclassified` row and an empty components list, which looks like a broken extension.

Either way there is nothing for a component list to do: six names that never overlap is a job
for the built-in class list. The walkthrough therefore starts by **changing the shape of the
data** — one script labels every cell by the markers it is actually positive for.

Every number below is from **`tme_00.tif`** and was produced by the run this guide describes.
On another image they differ, and step 8 is about why.

### 1. Get the data

**Download:** `multiplex-synthetic-data-demo-project-v1.2.zip` —
**[direct download](https://github.com/uw-loci/multiplex-synthetic-data/releases/download/v1.2/multiplex-synthetic-data-demo-project-v1.2.zip)**
(20 MB). The same project used by Classify Object Subset and Class Distribution, so if you
already have it, you are done here.

**You will also need:** QuPath **0.7.0 or later**, and this extension installed from the LOCI
catalog (see the **Install** box above, or the [setup guide](setup.md)).

> **One step needs a connection.** The script in step 3 lives on this site rather than inside
> the project. Fetch it before the session if the room's wifi is unreliable.

### 2. Load it into QuPath

1. **Drag `project.qpproj` onto an open QuPath window** — or the unzipped folder itself, either
   works. (Menu route: `File > Project... > Open project`.)
2. QuPath pops up an **Update URIs** dialog with the images listed in red. This is expected.
   The project ships with *relative* image paths so the zip is portable, and QuPath cannot
   resolve those until you show it the folder once. Click **Search...** (bottom-right), choose
   the folder you unzipped, then **Apply changes**.
3. Double-click **`tme_00.tif`** to open it.

> **Use `tme_00`, not whichever image opens first.** The eight images differ on purpose. `tme_07`
> is the immune-poor variant and produces **twelve** classes rather than nineteen, with `CD20`
> positive in no cells at all. Nothing will have gone wrong; the numbers just will not match.

### 3. Re-label the cells by marker

Open `Automate > Script editor`, then paste in
**[`composite_marker_classes.groovy`](https://raw.githubusercontent.com/MichaelSNelson/BINA-I2K-2026-QuPath-Extensions/main/scripts/composite_marker_classes.groovy)**
— click the link, select all, copy, paste — and press **Run** (`Run > Run`, or **Ctrl+R** /
**Cmd+R** on macOS).

It gates each of seven markers independently and names every cell after all the markers it is
positive for: `CD3: CD8`, `PanCK: Ki67`, `Ki67: CD3`. The gate is the Otsu routine copied from
`08_apply_otsu_gate.groovy` — which ships in the dataset's `analytical_logs/scripts/`, not in
this project, so there is nothing to go and find. That script gates six markers; this one adds
Ki67, which 08 leaves out as nuclear-only and which this script reads as `Nucleus: Ki67 mean`
rather than a whole-cell mean that would dilute it. The other six are read as
`Cell: <marker> mean`.

> **This overwrites cell classifications.** If you have already run a classifier on these cells
> — from the Classify Object Subset or Class Distribution walkthroughs — this replaces it. It does
> **not** touch the ground-truth point annotations, because those are annotations rather than
> detections, so nothing the other walkthroughs need is lost.
>
> **To get the six type classes back:** `Automate > Project scripts > apply_trained_classifier`,
> then **Run**. For the deliberately imperfect version used by Classify Object Subset, run
> `classify_with_marker_gate` instead. To discard the change entirely, close the image and answer
> **No** when QuPath asks whether to save changes to `tme_00.tif` — but see the warning in step 8
> first, because `Run for project` saves as it goes and that escape route is then gone.

**What you should see.** On `tme_00`, 1,530 cells become **19 classes**, with 17 cells negative
for every marker and left unclassified:

```
cells: 1530   classified: 1513   negative for every marker: 17
distinct classes: 19 (13 with two or more markers)
  the Class Visibility panel counts Unclassified too, so its Spread denominator will read 20

  PanCK  (Cell)    thr=   34.20   positive in   439 cells ( 28.7%)
  Ki67   (Nucleus) thr=    0.73   positive in   126 cells (  8.2%)
  aSMA   (Cell)    thr=   46.09   positive in   416 cells ( 27.2%)
  CD3    (Cell)    thr=   30.78   positive in   386 cells ( 25.2%)
  CD8    (Cell)    thr=   20.24   positive in   189 cells ( 12.4%)
  CD20   (Cell)    thr=   34.25   positive in   103 cells (  6.7%)
  CD68   (Cell)    thr=   42.00   positive in   221 cells ( 14.4%)

    396  aSMA                (1 marker)        14  PanCK: CD3: CD8   (3 markers)
    286  PanCK               (1 marker)         9  aSMA: CD3         (2 markers)
    199  CD68                (1 marker)         9  PanCK: CD68       (2 markers)
    184  CD3                 (1 marker)         6  aSMA: CD68        (2 markers)
    167  CD3: CD8            (2 markers)        4  CD3: CD8: CD68    (3 markers)
    126  PanCK: Ki67         (2 markers)      ... and six rarer combinations
    100  CD20                (1 marker)
```

**The lattice is thinner than the class count suggests, and that is worth seeing.** Six of the
nineteen classes carry a single marker, and they hold 1,167 of the 1,513 classified cells — 77%.
Thirteen classes combine two or more markers, and eleven of those hold fewer than ten cells each.
That long tail of near-empty combinations is what a real hi-plex panel looks like, and it is what
a flat class list handles worst.

**Copy that block out of the log before you move on.** The thresholds and counts are the only
record of how this lattice was built, and they change with the image.

<details markdown="1">
<summary><b>What this lattice is, and is not</b> — four things worth knowing before you trust it</summary>

1. **These are not phenotype calls.** Each marker is gated on its own, so nothing forbids
   `CD3: CD20` (a T cell and a B cell at once). The dataset's ground truth is clean by
   construction — one lineage marker per cell type — so **every multi-lineage combination here
   is an artifact** of the 5 µm cell expansion picking up signal from a neighbor, not biology.
2. **Thresholds are per image**, computed over the cells of the open image only. See step 8.
3. **Cells negative for everything are dropped** and become Unclassified. No component rule can
   ever reach them. Set `NEGATIVE_CLASS = "Negative"` in the script to give them a class instead.
4. **The data are synthetic and background-free.** `INSTRUCTIONS.md` notes that markers other
   than DAPI have no background, so each is cleanly bimodal — which is exactly what makes a
   plain Otsu cut work. Real hi-plex data with autofluorescence is not this well behaved; gate
   against controls, not against a per-image Otsu cut.

**About the threshold.** "Otsu" here is the between-class variance threshold computed on a
256-bin histogram of that marker's per-cell mean, after clipping the top 0.5% of values. The
printed number is in raw channel-intensity units and is comparable only within one marker and
one compartment. The script is fully deterministic — no sampling, no seed — so re-running on
the same image gives identical classes.

**Script parameters** (in the `USER-EDITABLE PARAMETERS` block at the top):

| Parameter | Default | Effect |
|---|---|---|
| `MARKERS` | the seven markers | Also the order inside a class name, so one combination is always one class |
| `COMPARTMENT` | `Cell`, with `Ki67` → `Nucleus` | **Changes results** — see step 7 |
| `NEGATIVE_CLASS` | `null` | **Changes results** — names the all-negative cells instead of dropping them |
| `SUMMARY_ROWS` | `40` | Print-only; caps how many classes the summary lists |

</details>

### 4. Open the panel

`Extensions > Class Visibility > Show panel`, or the Class Visibility button in QuPath's
toolbar — the blue eye, two along from the brightness/contrast half-circle.

<img src="../images/class-visibility/toolbar-button.png" alt="Two QuPath toolbar buttons side by side: on the left the Channel Names Viewer button, three stacked stripes in red, green and blue, and on the right the Class Visibility button, an open blue eye with a small grey triangle at its lower right" width="125">

The eye reports whether class rules are in force: open while nothing is hidden, slashed once a
rule is hiding objects. Right-clicking it reaches the same recovery actions as the Extensions
menu.

**Your objects will disappear, and that is the intended starting state.** The `Visibility rule:`
radios sit on **`Show only checked classes`** with nothing checked, so the status strip reads:

```
[!] Every object is hidden. "Show only checked classes" is on and nothing is checked.
```

The check box at the top of the classes list is haloed in blue: clicking it checks **every**
class, which puts every object back on screen. Leave it alone for now — step 5 starts from the
empty state.

> **The panel opens as a floating window.** If it covers the viewer, use the **Dock as tab**
> button in the panel's own header to park it in the analysis pane. **Undock to window** puts
> it back.

### 5. One component, many classes

In the components list — its header reads **Anything containing these components (7)** — check
**`CD3`**.

Every class containing `CD3` is now the only thing on screen: `CD3`, `CD3: CD8`,
`PanCK: CD3: CD8`, `aSMA: CD3` and five others. Nine classes, 386 cells, from one click.
`Active rules` reads `Active rules (1)` — one checked component is **one rule**, however many
class names it covers.

> **`Active rules` shows a bigger number?** The classes list still has rules in it. Click
> **Clear all rules** in the `Active rules` expander and check `CD3` again.

> **Nothing happened at all?** Look for `[!] "Exact matches only" is on` in the status strip.
> That setting is QuPath-wide, so it may be on from earlier work, and while it is on **no
> component rule can match**. Click **Turn off** beside the warning.

**Now look at the classes list.** Nine rows have a **blue ring** round their check box, and they
pulsed briefly when you checked `CD3`. Those are the classes the component rule reaches. A row
with a *tick* is on because you checked it; a row with a *ring* is on because a component reaches
it — and the ring disappears the moment you uncheck `CD3`, where a tick would stay.

Switch on the `Count` column and find the `CD3` row: it reads 184, but its `Affects` figure reads
386 — the same 386 the component just selected. So on this dataset, ticking that one class row
does the same job, because QuPath matches supersets by default. (`Affects` is shown in bold
wherever it exceeds the row's own count, which is exactly the case that makes the two differ.)

That is worth seeing rather than glossing: on a *real* panel there is usually no plain `CD3`
class to tick, and then the component row is the only way to say it. Here there is one, so the
component list saves you nothing yet. The next step is where it stops being optional.

### 6. `Any` vs `All` — the part with no equivalent

Check a second component, **`CD8`**. Two radios below the list now read:

- `Any -- CD3, or CD8, or both` — **10 classes, 388 cells**
- `All -- CD3 and CD8 together` — **4 classes, 187 cells** (`CD3: CD8`, `PanCK: CD3: CD8`,
  `CD3: CD8: CD68`, `aSMA: CD3: CD8`)

`Any` is the default, and on this image it barely does anything: you go from 386 cells to 388.
**That is a finding, not a dead click** — 187 of the 189 CD8-positive cells are also CD3-positive,
so CD8 sits almost entirely inside CD3.

Now switch to `All`. 201 cells leave the screen, you are looking at the CD8 T cells, and **the
rings in the classes list narrow from 10 rows to 4** — under `All`, only classes carrying every
checked component are ringed.

> **Two things pulse here, and they are different.** The `Any` / `All` control itself pulses the
> first time you check a second component in a session, once only, to point out a control that was
> inert until that moment (`Highlight the Any / All choice when it first applies`). The ringed
> class rows pulse on *every* component change, as ongoing feedback
> (`Pulse the classes a component change covers`). Both are on by default and both have their own
> switch under `Extensions > Class Visibility`. Turning the second one off stops the motion only —
> the steady rings stay.

**There is no class row that does this.** QuPath evaluates its selected-class set as an OR, so
the built-in pane can express "CD3 or CD8" but never "CD3 and CD8" across separate names. The
panel builds a single composite rule to get the AND — and it survives onto the next image,
where the class names may be different.

### 7. `Spread`, and what it is really for

Switch on the **`Spread`** column: click the small **+** button at the right end of the
component list's **column-header row** (the row reading `Component` and `Count`, not the caption
above it), then tick `Spread`.

> That menu's first entry is blank and does nothing. It is the check-box column, which has no
> name to show and is not allowed to hide. Ignore it.

Compare what the panel shows against the spread table the script printed:

| Component | Panel | Script |
|---|---|---|
| CD3 | `9/20` | in 9 of 19 classes |
| PanCK | `7/20` | in 7 of 19 classes |
| aSMA | `6/20` | in 6 of 19 classes |
| CD8 | `5/20` | in 5 of 19 classes |
| CD68 | `5/20` | in 5 of 19 classes |
| CD20 | `3/20` | in 3 of 19 classes |
| Ki67 | `1/20` | in 1 of 19 classes |

The two denominators differ by one: the panel counts `Unclassified` among the image's classes
and the script does not.

**`CD3` is the widest-spreading component here, and `Ki67` the narrowest.** Ki67 is the only
marker read in the nucleus, so a neighboring cell's cytoplasm cannot leak into it, and it lands in
exactly one class (`PanCK: Ki67`). The six read as whole-cell means all pick up some signal from
whatever they are touching.

**Nothing here will be shown in bold, and that is worth understanding.** The panel emphasises a
`Spread` figure only when a component covers at least 80% of the classes, and only once there are
five or more of them. CD3 tops out at 9 of 20, which is 45%. A real hi-plex panel that appends
`positive` or `Cell` to every class name produces a component sitting in 19 of 20 classes — that
one bolds, and the status strip names it. This dataset has no such component, because the script
builds names from marker names alone. What you are seeing is the column behaving correctly on
well-formed names.

**Test that, rather than taking it on trust.** Change `COMPARTMENT` in the script to
`["Ki67": "Nucleus"].withDefault { "Cytoplasm" }` and re-run. Cytoplasm excludes the nuclear
hole and is documented as the cleaner of the two, and the lattice should thin out.

### 8. Why a preset does not travel between images

> **`Run for project` saves each image as it goes.** After this step the new classes are written
> to all eight images, and closing without saving will not undo them. To put the project back, run
> `Automate > Project scripts > apply_trained_classifier` with `Run for project` as well. If you
> would rather not touch the other seven images, read the table below instead of running it.

Run the script over the whole project (`Run > Run for project`) and compare the PanCK threshold:

| Image | PanCK threshold | Classes |
|---|---|---|
| tme_02 | 27.41 | 19 |
| tme_05 | 28.40 | 19 |
| **tme_00** | **34.20** | **19** |
| tme_04 | 42.18 | 19 |
| tme_07 | 32.68 | 12 |

Those differences are not noise. The dataset deliberately carries per-image intensity offsets of
roughly ×0.80 on `tme_02`, ×0.85 on `tme_05` and ×1.20 on `tme_04` — and a per-image Otsu cut
recovers almost exactly those factors. A class name here means "above **this image's** Otsu
cut", so **the same name does not mean the same thing on two images.**

`tme_07` is the extreme case: it is the immune-poor variant with no B cells at all, so `CD20` is
positive in **0** cells and its `Spread` reads `0`. A component can exist in the list and select
nothing.

### 9. Save a preset

Build a filter worth keeping — `CD3` and `CD8` on `All` — then use **`Preset`** in the panel
header and **Save** it under a name. Presets are stored in the project, so the filter is there
next week and for whoever else opens it.

### 10. Get your view back

| You want | Do this |
|---|---|
| Every listed class visible again | The check box in the **classes list's header** |
| The view you had *before* you opened the panel | **Close the panel.** That state is recorded automatically |
| QuPath's own defaults — no rules, `Hide checked classes`, `Exact matches only` off | **`Reset all`**, on the status strip |

`Extensions > Class Visibility > Restore the state from when the panel opened` does the middle
one from the menu, whether or not the panel is still open. It is greyed out and reads *(nothing
recorded yet)* until the panel has changed something. The menu's own version of the last row is
spelled **`Reset all visibility`**.

## If something looks wrong

| What you see | Why | What to do |
|---|---|---|
| `No cells in this image -- open an image from the synth multiplex project first.` | No image open, or one with no detections | Double-click `tme_00.tif` in the project list, then Run again |
| The script printed nothing | The Script Editor's output pane is below the code and often collapsed to a sliver | Drag the divider up, or use `View > Show log` |
| You check a component and nothing happens | `Exact matches only` is on. It is a QuPath-wide, persistent setting, so it can arrive on from an earlier session | The status strip says so and offers a **`Turn off`** button beside the warning |
| The classes list shows `tumor`, `fibroblast`, `cd8_t`… | The **`List:`** selector is on `Annotations`, so you are looking at the ground-truth points | Set `List:` back to `Detections` |
| `Active rules` shows a number you did not expect | The classes-list header check box adds every listed class as a rule | **Clear all rules** in the `Active rules` expander |
| Everything is hidden and you cannot get back | `Show only checked classes` with the wrong rules | **`Reset all`** on the status strip, or `Extensions > Class Visibility > Reset all visibility` |

## What to notice

- The component list and the class list overlap more than they look like they do, because
  QuPath matches supersets by default. `All` is the operation that has no equivalent.
- Naming schemes that append `positive` or `Cell` to every class name produce components that
  match everything, and they look exactly like real markers until you count — which is what
  `Spread` counts.
- This same script gives **[Class Distribution](10-class-distribution.md)** a second, richer
  view: nineteen combinatorial classes instead of six flat ones, on data you already have.

---

**Full documentation:** the
[repository README](https://github.com/uw-loci/qupath-extension-class-visibility#readme), the
[user guide](https://github.com/uw-loci/qupath-extension-class-visibility/blob/main/docs/user-guide.md),
and [migrating from the script](https://github.com/uw-loci/qupath-extension-class-visibility/blob/main/docs/migration-from-the-script.md).
