# QP-CAT figures: where each one comes from, and which can be regenerated

Audited 2026-10-04 against `docs/03-qp-cat-cell-analysis-tools.md` and
`tools/qp-harness`. **Eight figures were regenerated from a real QuPath on
2026-10-04** and are no longer hand captures.

**Updated 2026-10-20 for the QP-CAT development build after 0.22.0** (origin/main
`4aea559`, jar built from a detached worktree). Eight figures were re-rendered,
because that build changed what they show: marker names in bold, a guide bar on
the 3D View tab, the Markers per cluster spinner capped at what the run ranked,
a Validation section in the dialogs, and a new banner in the Clustering
Algorithm section. Three of them (`analyze-current.png`,
`qpcat_4-3_settings_low.png`, `HDBSCAN_interface.png`) were hand captures until
then. See [the 2026-10-20 renders](#2026-10-20-renders) below.

**26 figures are referenced by the guide. 43 PNGs sit in this folder** alongside
12 concept SVGs, so some are leftovers from earlier versions of the walkthrough.
Nothing references them; nothing has deleted them either.

---

## The project these figures come from

`F:\BINA2026\multiplex-synthetic-data-demo-project-clustered` -- the 8-image
synthetic TME demo project, with **four saved clustering results and one spatial
run already in it**. That is what makes the results-tab figures reproducible: a
saved result reopens without recomputing, so the figure and the numbers in the
text come from the same run rather than from a fresh one that would cluster
differently.

A QuPath project stores absolute image URIs, so working on it from WSL needs one
step first:

```bash
cp -r /mnt/f/BINA2026/multiplex-synthetic-data-demo-project-clustered \
      ~/QPSC_Project/qupath-work/bina-clustered
tools/qp-harness/bin/qp-script tools/qp-harness/groovy/fix_image_paths.groovy \
    qupath-work/bina-clustered
```

The 2026-10-20 renders used a fresh copy at `qupath-work/bina-guide-update`, made
the same way, so nothing another run had written to `bina-clustered` could leak
into them.

Work on the copy. The project's **live classifications have drifted** -- four
images carry `Cluster N` labels from a later run and four still carry the
ground-truth cell types -- so only the saved results are trustworthy, and any
figure whose tab reads the project rather than the result has to apply a result
first.

## 1. Hand-authored concept diagrams -- 12, not regenerable by design

`concepts/*.svg`: `autoencoder`, `brush-link`, `clustering`, `composition`,
`harmony`, `independent-areas`, `lasso`, `marker-ranking`, `neighborhoods`,
`phenotyping`, `smoothing`, `spatial-stats`.

These are drawings of an idea, not pictures of the software, which is why they
are SVG and why they do not go stale when a dialog moves. Edit the SVG.

## 2. Regenerated from `tools/qp-harness` -- 8

```bash
cd ~/QPSC_Project
tools/qp-harness/bin/qp-gui \
    qupath-extension-cell-analysis-tools/harness/QpcatDialogShotScenario.java \
    qupath-extension-cell-analysis-tools \
    qupath-work/bina-clustered qupath-work/shots \
    "apply:auto_20260927_015057_hdbscan" \
    "fingerprints-kmeans6=auto_20260924_135415_kmeans=Marker Fingerprints=1600x790" \
    "qpcat_4-2_fingerprints=auto_20260927_015057_hdbscan=Marker Fingerprints=1600x790" \
    "qpcat_4-2_cells=auto_20260927_015057_hdbscan=Representative cells=1600x1560" \
    "qpcat_4-2_3D=auto_20260927_015057_hdbscan=3D View=1400x1000" \
    "qpcat_4-4_fingerprints=auto_20260927_015958_existingclassifications=Marker Fingerprints=1600x960"

tools/qp-harness/bin/qp-gui \
    qupath-extension-cell-analysis-tools/harness/QpcatSpatialShotScenario.java \
    qupath-extension-cell-analysis-tools \
    qupath-work/bina-clustered qupath-work/shots \
    auto_20260927_015057_hdbscan "Cluster 1,Cluster 6" tme_00.tif \
    qpcat_5-1_summary qpcat_5-4_ripleyL
```

| Figure | Run behind it |
|---|---|
| `crop-table-export-dialog.png` | no run; the dialog on the synthetic project (re-rendered 2026-10-20) |
| `fingerprints-kmeans6.png` | `auto_20260924_135415_kmeans` -- 6 clusters |
| `qpcat_4-2_fingerprints.png`, `qpcat_4-2_cells.png`, `qpcat_4-2_3D.png` | `auto_20260927_015057_hdbscan` -- 7 clusters over 3 UMAP columns |
| `qpcat_4-4_fingerprints.png` | `auto_20260927_015958_existingclassifications` |
| `qpcat_5-1_summary.png`, `qpcat_5-4_ripleyL.png` | a fresh post-hoc spatial run over all 8 images, labelled from the HDBSCAN result |

**The alt text was rewritten with them, and most of it had been wrong.** The
cluster NUMBERS in sections 4.2, 4.4 and 5 did not match the saved results --
the counts were right and the numbers against them were permuted, which is what
happens when a guide is written against one run and the figures come from
another. The guide already warned that HDBSCAN renumbers between runs; it just
had not been applied to its own text. Section 3.3's table needed no change.

**The spatial figures cannot be reopened, only re-run.**
`qpcat/spatial_stats/` records what was run, not a session, so those two are
only ever as current as a real run. The re-run reproduced the original exactly:
8 areas, 1530 / 1568 / 1430 / 1269 / 1487 / 1470 / 1722 / 945 cells, 7 classes
each except 6 for `tme_07`.

## 3. Still hand-captured -- reachable, not yet done

| Figure | Status |
|---|---|
| `qpcat_5-1_settings_top.png`, `qpcat_5-1_settings_low.png` | reachable -- `SpatialStatsDialog`. Not stale on 2026-10-20: that dialog changed only a saved-result label |
| `menu.png`, `menu-savedresults.png` | reachable in principle, awkward: a cascading menu has to be shown and posted before it has a layout to snapshot. Not stale on 2026-10-20: no menu label changed after 0.22.0 |

Each needs a `case` in `QpcatDialogShotScenario`'s dispatch, plus whatever
project state that dialog reads. `analyze-current.png`, `qpcat_4-3_settings_low.png`
and `HDBSCAN_interface.png` left this list on 2026-10-20 (below); their scenario
is the obvious template for those cases.

## 4. A correction

An earlier version of this file said the 3D View tab was "a GL point cloud" and
that snapshotting it would need a GL surface to render under WSLg. **That was
wrong.** `cluster3d-core` projects the points in software and draws them on a
JavaFX `Canvas` -- there is no OpenGL anywhere in it -- so `scene.snapshot()`
captures it like any other node, and `qpcat_4-2_3D.png` is now rendered that
way.

## 5. Captured on Windows -- 1 left, unreferenced

`qpcat_5-1_settings.png` still carries a `:Zone.Identifier` alternate-data-stream
file, which is how Windows marks a transferred file; the guide no longer uses it.
`qpcat_4-3_settings_low.png` was the other one, and was replaced on 2026-10-20
together with `analyze-current.png`, the other figure in that section, so the two
still match each other. The `:Zone.Identifier` files themselves are junk and can
be deleted.

## 2026-10-20 renders

QP-CAT jar from `origin/main` `4aea559` (md5 `821a313e...`, byte-identical to
the jar then installed in `~/QuPath/v0.7/extensions/`), project
`qupath-work/bina-guide-update`.

**Saved-result tabs**, with the scenario in section 2:

```bash
tools/qp-harness/bin/qp-gui \
    <qpcat-worktree>/harness/QpcatDialogShotScenario.java <qpcat-worktree> \
    qupath-work/bina-guide-update qupath-work/bina-guide-update-shots \
    "apply:auto_20260927_015057_hdbscan" \
    "qpcat_4-2_3D=auto_20260927_015057_hdbscan=3D View=1400x1000" \
    crop-table
tools/qp-harness/bin/qp-gui ... \
    "fingerprints-kmeans6=auto_20260924_135415_kmeans=Marker Fingerprints=1600x900" \
    "qpcat_4-2_fingerprints=auto_20260927_015057_hdbscan=Marker Fingerprints=1600x700" \
    "qpcat_4-4_fingerprints=auto_20260927_015958_existingclassifications=Marker Fingerprints=1600x850"
```

The heights changed so each tab shows every card with no empty band.
`crop-table.png` is saved as `crop-table-export-dialog.png`. Its Scope row now
reads **All project images (8)**; the old figure and its alt text said (3), from
another project.

**Dialogs**, with a scratch scenario kept outside the QP-CAT repo at
`/mnt/f/claude/bina-guide-update/scenarios/BinaAnalyzeDialogScenario.java`
(2x scene snapshots):

```bash
tools/qp-harness/bin/qp-gui .../BinaAnalyzeDialogScenario.java <qpcat-worktree> \
    qupath-work/bina-guide-update qupath-work/bina-guide-update-shots analyze analyze 800 1000
tools/qp-harness/bin/qp-gui .../BinaAnalyzeDialogScenario.java <qpcat-worktree> \
    qupath-work/bina-guide-update qupath-work/bina-guide-update-shots cluster cluster 900 1000
```

- `analyze`: no image open, so Scope opens on **All project images (8)** with
  *Current image* grayed, as in the guide. It clicks **Select 'Mean' only** then
  **Deselect QPCAT**, unticks every statistic under the collapsed **Spatial
  statistics**, sets **Method** to **None**, and scrolls the measurement list to
  `Nucleus: DAPI mean`. The top shot is cropped to rows 0-1412 for
  `analyze-current.png`; the bottom shot to rows 352-2000 for
  `qpcat_4-3_settings_low.png`. The class list reads the HDBSCAN result's
  labels, applied above: Cluster 0 to 6 = 825, 3306, 1088, 1868, 1554, 1388, 1392.
  It starts the Python service first, or **Batch correction (Harmony)** renders
  grayed (the dialog reads harmonypy's availability from the running service).
- `cluster`: the Run Clustering dialog with HDBSCAN, min_cluster_size 500,
  min_samples 0, Leaf, at 900 px wide so the *Random seed (clustering +
  embedding)* label is not cut short; the **Clustering Algorithm** pane is
  snapshotted on its own as `HDBSCAN_interface.png`.

Scenario order matters for the run-cost line under the settings: unticking a
spatial statistic does not refresh it, so the scenario sets Method afterwards,
which does. A user who unticks the statistics last sees the stale line
("Spatial statistics are usually the slowest part of a run ...") until they
change anything else.

**Kept, checked against the build:** `qpcat_4-2_cells.png` (the Representative
cells tab rendered with the same crops and controls), `qpcat_5-1_summary.png` and
`qpcat_5-4_ripleyL.png` (no change to the summary window or the Ripley L chart), `menu.png`,
`menu-savedresults.png`, `qpcat_5-1_settings_top.png`,
`qpcat_5-1_settings_low.png`.

**What a per-image spatial window shows now.** A scratch run
(`BinaSpatialProbeScenario.java`, same folder) with Co-occurrence (pairwise) and
Neighborhood enrichment over all eight images took 4 s and gave `tme_00.tif` the
tabs *3D View, Co-occurrence (pairwise), Neighborhood Enrichment, Neighborhood
Enrichment (plot)*. On 0.22.0 that window had no enrichment tab, which is what
the guide's step 5.1 box used to say.

---

## The numbers in the guide are checkable

The walkthrough runs on the synthetic TME dataset, and the harness builds a
project from the same images with the same detection parameters
(`tools/qp-harness/datasets/synthetic-tme.json`). A run reproduces the per-image
cell counts the guide quotes:

| image | guide | harness, 2026-10-04 |
|---|---|---|
| tme_00 | 1530 | 1530 |
| tme_01 | 1568 | 1568 |
| tme_02 | 1430 | 1430 |
| tme_03 .. tme_07 | 1269, 1487, 1470, 1722, 945 | all eight confirmed from the demo project |

**If a harness run ever disagrees, the guide is stale, not the harness.**
