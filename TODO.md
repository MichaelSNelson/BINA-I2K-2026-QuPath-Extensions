# Workshop build TODO

Status of the materials for the I2K / BINA Congress 2026 QuPath extensions workshop.

## Done

- [x] Repo created — `MichaelSNelson/BINA-I2K-2026-QuPath-Extensions`, public
- [x] GitHub Pages site (Jekyll, root of `main`, LOCI dark house style)
- [x] Intro doc — how extensions, catalogs, and AI-assisted development work
- [x] One instructional doc per hands-on extension (14)
- [x] Presented-only pages for QPSC and PPM
- [x] Setup guide with per-track dataset list
- [x] Schedule with hour-1 running order and four hour-2 tracks
- [x] Cross-linking between README, landing page, and every doc

## Blocked on the Google Drive folder

Everything below is wired up with `%%DRIVE_*%%` placeholders. One `sed` fills them in — see
the maintainer section of the [README](README.md).

- [ ] Create the shared Drive folder and set sharing to "anyone with the link, viewer"
- [ ] `%%DRIVE_FOLDER_URL%%` — top-level workshop folder
- [ ] `%%DRIVE_SLIDES_URL%%` — the hour-1 PowerPoint deck
- [ ] `%%DRIVE_DATA_URL%%` — datasets folder

## Datasets to assemble

Referenced by ID throughout the exercises. Each should be a self-contained QuPath project or
directory, zipped.

- [ ] `DATA-01_HE_WSI` — annotated brightfield H&E project
- [ ] `DATA-02_multiplex_IF` — multiplex IF, cells detected, per-marker measurements, one saved
      object classifier, and UMAP components saved as measurements (for Cluster 3D Navigator)
- [ ] `DATA-03_labeled_slides` — WSIs with label images; include barcodes and at least one
      rotated label
- [ ] `DATA-04_tiles` — tile directory with `TileConfiguration.txt`, plus a drift-affected copy
      so content-based registration has something to fix
- [ ] `DATA-05_classified_project` — classified cells, ground-truth points, OpenCV ML classifier
      (needed for the probability-metrics tab)
- [ ] Pre-trained model for the DL Pixel Classifier inference exercise
- [ ] Check every dataset is redistributable (consent / licence) before it goes on a public link

## Slides

- [ ] Build the hour-1 deck against the [schedule](docs/schedule.md) running order
- [ ] Upload to Drive, add the link
- [ ] Add a slide pointing at the live site so attendees can follow along

## Before the workshop

- [ ] Add screenshots to `images/` and reference them from the docs (currently text-only)
- [ ] Dry-run every exercise on a clean QuPath 0.7 install, on Windows and macOS
- [ ] Confirm every catalog entry offers a release compatible with the QuPath version attendees
      will have by then
- [ ] Confusion Matrix is not in a catalog — either add it or confirm the manual-jar step works
- [ ] Time each track for real; the estimates in the docs are estimates

## Undecided

- [ ] Videos or interactive animations for the harder-to-explain tools, in the style of the
      [microscopy courseware](https://uw-loci.github.io/interactive-microscopy-courseware/).
      Best candidates: the two wand engines, content-based tile registration, and the
      hue-to-angle PPM calibration. Decide after the datasets and slides are done.
