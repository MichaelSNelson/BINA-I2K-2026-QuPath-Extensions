# QP-CAT figures: where each one comes from, and which can be regenerated

Audited 2026-10-04 against `docs/03-qp-cat-cell-analysis-tools.md` and
`tools/qp-harness`.

**26 figures are referenced by the guide. 54 image files sit in this folder**, so
28 are leftovers from earlier versions of the walkthrough. Nothing references
them; nothing has deleted them either.

---

## 1. Hand-authored concept diagrams -- 12, not regenerable by design

`concepts/*.svg`: `autoencoder`, `brush-link`, `clustering`, `composition`,
`harmony`, `independent-areas`, `lasso`, `marker-ranking`, `neighborhoods`,
`phenotyping`, `smoothing`, `spatial-stats`.

These are drawings of an idea, not pictures of the software, which is why they
are SVG and why they do not go stale when a dialog moves. Edit the SVG.

## 2. Reproducible from `tools/qp-harness` -- the dialog screenshots

A QP-CAT dialog is JavaFX, so a hidden `QuPathGUI` can open it against the real
synthetic project and snapshot it. `harness/QpcatDialogShotScenario.java` in the
QP-CAT repo does exactly that:

```bash
cd ~/QPSC_Project
tools/qp-harness/bin/qp-dataset synthetic-tme /tmp/qph/project 3
tools/qp-harness/bin/qp-gui \
    qupath-extension-cell-analysis-tools/harness/QpcatDialogShotScenario.java \
    qupath-extension-cell-analysis-tools /tmp/qph/project /tmp/qph/shots
```

| Figure | Status |
|---|---|
| `crop-table-export-dialog.png` | **regenerated this way, 2026-10-04** |
| `analyze-current.png` | reachable -- `ClusteringDialog.forExistingClassifications` |
| `HDBSCAN_interface.png` | reachable -- it is a crop of the clustering dialog |
| `qpcat_5-1_settings_top.png`, `qpcat_5-1_settings_low.png` | reachable -- `SpatialStatsDialog` |
| `menu.png`, `menu-savedresults.png` | reachable in principle, awkward: a cascading menu has to be shown and posted before it has a layout to snapshot |

Each needs a `case` added to the scenario's dispatch, plus whatever project
state that dialog reads. The two already in the guide were captured by hand and
have not been re-checked against the current build.

## 3. Needs a real analysis run first -- the results-tab screenshots

`fingerprints-kmeans6.png`, `qpcat_4-2_fingerprints.png`, `qpcat_4-2_cells.png`,
`qpcat_4-4_fingerprints.png`, `qpcat_5-1_summary.png`, `qpcat_5-4_ripleyL.png`.

The dialog is reachable, but it is empty without a completed run. The Appose
environment is installed (`~/.local/share/appose/qupath-qpcat`) and
`tools/cell-phantom-creation/qp_smoke_qpcat.sh` already runs a full clustering
batch headlessly, so the path exists: run the batch, then open the results
window on the saved result and snapshot the tab.

**The blocker is not technical, it is the alt text.** Each of these figures is
described in the guide down to individual cell counts -- "Cluster 0, 3306 cells,
is led by Cytoplasm aSMA mean". Regenerating the image means re-running the
analysis and then rewriting every number in the alt text to match. Do the two
together or not at all; a new picture under the old description is worse than a
stale picture.

## 4. Not reachable here -- 1

`qpcat_4-2_3D.png` -- the 3D View tab is a GL point cloud from `cluster3d-core`.
Snapshotting it would need the GL surface to render under WSLg, which has not
been tried.

## 5. Captured on Windows -- 7

These carry a `:Zone.Identifier` alternate-data-stream file beside them, which
is how Windows marks a downloaded or transferred file:

`qpcat_4-2_3D.png`, `qpcat_4-2_cells.png`, `qpcat_4-2_fingerprints.png`,
`qpcat_4-3_settings_low.png`, `qpcat_4-4_fingerprints.png`,
`qpcat_5-1_summary.png`, `qpcat_5-4_ripleyL.png`.

Nothing is wrong with them. It records that they came from a Windows QuPath, so
a Linux-rendered replacement will differ in window chrome, fonts and
scrollbars. Mixing the two in one guide looks like a mistake even when the
content is right, so replace a whole section at a time rather than one figure.

The `:Zone.Identifier` files themselves are junk and can be deleted.

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
| tme_03 .. tme_07 | 1269, 1487, 1470, 1722, 945 | not re-run (3-image project) |

**If a harness run ever disagrees, the guide is stale, not the harness.**
