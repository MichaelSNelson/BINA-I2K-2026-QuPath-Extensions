# Workshop build TODO

Status of the materials for the I2K / BINA Congress 2026 QuPath extensions workshop.

## Done

- [x] Repo created — `MichaelSNelson/BINA-I2K-2026-QuPath-Extensions`, public
- [x] GitHub Pages site (Jekyll, root of `main`, LOCI dark house style)
- [x] Intro doc — how extensions, catalogs, and AI-assisted development work
- [x] One instructional doc per hands-on extension (13)
- [x] Presented-only pages for QPSC, Confusion Matrix, and collagen fibre/texture analysis
- [x] PPM dropped from workshop scope (2026-08-09)
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

## Acknowledgements — LJI

- [x] Confirmed (2026-08-10): Sara McArdle and Zbigniew Mikulski know how the data is being used
      and are content with it. They are running their own I2K course at the same event, so no
      separate permission conversation is needed
- [x] Name spellings confirmed — **Sara McArdle**, **Zbigniew Mikulski**, La Jolla Institute for
      Immunology
- [ ] Get the title and link for their I2K session and cross-link it from the acknowledgements
      page — attendees at one will plausibly want the other
- [x] Confusion Matrix attribution corrected: **Kristin Gallick** originated it (concept +
      half the initial scripts); developed into the extension at LOCI. Repo sits under her account
- [ ] Label each dataset on Drive with its LJI provenance, so credit travels with the files

## Datasets to assemble

Referenced by ID throughout the exercises. Each should be a self-contained QuPath project or
directory, zipped.

- [ ] `DATA-01_HE_WSI` — annotated brightfield H&E project
- [x] Multiplexed data solved by the **TME-QUANT synthetic dataset** (CC0, ~20 MB, public on
      GitHub). No hosting, no consent question, and fully ground-truthed. Covers QP-CAT,
      Cluster 3D Navigator and Channel Names Viewer
- [ ] `DATA-02_multiplex_IF` — now only needed for Classify Object Subset, which wants a saved
      object classifier. Building one on the synthetic data instead would remove the last
      multiplex dependency on Drive
- [ ] `DATA-03_labeled_slides` — WSIs with label images; include barcodes and at least one
      rotated label
- [ ] `DATA-04_tiles` — tile directory with `TileConfiguration.txt`, plus a drift-affected copy
      so content-based registration has something to fix. **Michael to source real tiles**
- [ ] `DATA-05_classified_project` — classified cells, ground-truth points, OpenCV ML classifier.
      **Presenter-only** now that Confusion Matrix is demo-only; still needed to run the demo,
      but attendees do not download it
- [ ] Pre-trained model for the DL Pixel Classifier inference exercise
- [ ] Check every dataset is redistributable (consent / licence) before it goes on a public link

## I2K organiser form — DUE 1 SEPTEMBER 2026

Draft answers ready to paste: [I2K_FORM_RESPONSES.md](I2K_FORM_RESPONSES.md)

- [ ] Confirm presenter email (`msnelson8@wisc.edu` assumed) and whether co-presenters need listing
- [ ] Resolve the Drive link before submitting, OR drop the Drive paragraph and submit the
      workshop page URL only (that page can be updated after the form cannot)
- [ ] Submit the form
- [ ] Copy the final submitted text back into `I2K_FORM_RESPONSES.md` so we know what
      participants were told

## Walkthrough videos and Padlet

- [ ] Create the Padlet and replace `%%PADLET_URL%%` (appears on the walkthroughs page and on
      slide 6 of the deck). Set it to allow multiple votes plus comments
- [ ] Record one video per tool, following the written walkthrough step for step so viewers can
      switch between them without losing their place. 16 videos, 5–20 min each
- [ ] Upload to YouTube (unlisted is fine) and replace the `%%VIDEO_*%%` tokens — each appears
      twice, once in the tool's own page and once in the walkthroughs table
- [ ] Record the QPSC acquisition demo as the live-demo fallback while you are at it
- [ ] Priority order if time runs short: record the tools most likely to win the vote first —
      the wands, image export, and the DL pixel classifier

## Slides

- [x] Build the hour-1 deck — `I2K_2026_QuPath_Extensions.pptx`, 49 slides, rebuild with
      `build_deck.js` (see `SLIDE_OUTLINE.md`)
- [ ] Open it and check the layout — no LibreOffice here, so it has never been rendered
- [ ] Add screenshots. The deck is currently text-only and needs them more than the docs do
- [ ] Upload to Drive, add the link
- [ ] Add a slide pointing at the live site so attendees can follow along

## Before the workshop

- [ ] Add screenshots to `images/` and reference them from the docs (currently text-only)
- [ ] Dry-run every exercise on a clean QuPath 0.7 install, on Windows and macOS
- [ ] Confirm every catalog entry offers a release compatible with the QuPath version attendees
      will have by then
- [ ] **Confusion Matrix repo is private** — it lives under Kristin Gallick's account, so agree with her whether it can go public before the
      workshop. If it does, promote it back to hands-on (Tracks A and C had room for it) and
      restore `DATA-05` to the attendee dataset list
- [ ] Time each track for real; the estimates in the docs are estimates

## Undecided

- [ ] Videos or interactive animations for the harder-to-explain tools, in the style of the
      [microscopy courseware](https://uw-loci.github.io/interactive-microscopy-courseware/).
      Best candidates: the two wand engines, content-based tile registration, and the TACS
      wavy-versus-straightened fibre distinction. Decide after the datasets and slides are done.

## Fibre analysis follow-ups

- [ ] Decide whether the fibre segment demos Fiber Analysis, TME-Quant, or both live — the page
      covers both, but six minutes is tight for two tools
- [ ] TME-Quant lives outside this project folder (`~/TestInstall/qupath-extension-tme-quant`,
      repo `MichaelSNelson/qupath-extension-TME-Quant`). Confirm the demo machine has a working
      FIRE server before travelling — first build is 5–15 min
- [ ] Fiber Analysis README still says "no GitHub release in v1"; releases now exist (v0.1.1).
      Worth fixing upstream since the workshop page links there
- [ ] Pre-record the fibre demos as a fallback — both have startup paths that can fail on a
      strange network
