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

- [x] **`DATA-01_HE_WSI` + `DATA-02_multiplex_IF`** — both already exist in the public
      [QuPath intro project](https://drive.google.com/drive/folders/1waxGfZt3Ua_EKcC86fOn8Qr89lZXnrIX?usp=sharing), the demo project from
      imagescientist.com/qupath-intro. CMU-1 (H&E) and LuCa-7color (8-channel IF), cells detected,
      with ten saved object classifiers including `LUCA composite` and `LUCA without PDL1` — which
      are exactly the classifier-stacking scenario Classify Object Subset teaches. ~500 MB.
      Individual images are linked at source from that page (OpenSlide test data; OME repository)
- [x] **`TME-SYNTH`** — CC0, ~20 MB, straight from GitHub. All of track B
- [x] **`DATA-03_labeled_slides`** — [LabelImageExamples_from_LJI.zip](https://drive.google.com/file/d/1xm99nEa0okF7USeip0PTDv6PT4Ut5eWX/view?usp=sharing), **536 MB**, six CZI
      whole-slide images from **Sara McArdle and Zbigniew Mikulski (LJI)**. Every one carries an
      embedded `Label` attachment (verified). One label reads `histology@lji.org` / `610 TOMO` /
      `2020-11-14` / `H&E` plus a 2D barcode — text, date and barcode on a single label, and the
      slide behind the documented `@` / Enhance finding
- [ ] `DATA-04_tiles`, **must be a real acquisition** (decided 2026-09-14): the point of the
      exercise is showing that overlap resolution works on a real stage, so no synthetic tiles
      and no fake "drift-affected copy". The exercise becomes nominal vs registered on the same
      tiles. **Nothing on disk qualifies** (checked 2026-09-14, seam error measured by NCC):
      - `OtherDocuments/JN209_amyloid2/...` has configs and metadata but **no tile images**
      - PPM sets on F:\ (`PonikCollagen/...`, `ExampleForYuming/...`): real stage error
        (15-21 px at some seams) but acquired at **0% nominal overlap**, which registration
        treats as degenerate. PPM is also out of scope, and redistribution is unconfirmed
      - `stitchtest/` (= `helencollagen/`): `tile0ovlp` is 3x3 at 0% overlap; `2mgml_06zoom`
        is a single position
      - `PDAC142_1`: 5x5 at 5% overlap, but 256 px tiles leave a 13 px band; only 6/40 seams
        match, and inconsistently. The name suggests human PDAC tissue (unverified)

      **Acquisition spec.** Brightfield H&E or another textured sample that can be published.
      **10-15% overlap** (in QPSC: Preferences > **Tile Overlap Percent**, default 10; the PPM
      runs above had it set to 0), tiles 1024 px or larger, a grid of about 5x4 or more. Long rows help,
      because drift accumulates along them. Registration only corrects up to 2% of tile width per
      seam (24 px floor) and rejects matches below NCC 0.30, so the error must be visible but
      not huge. Before publishing, stitch once at nominal and confirm the seams are visibly
      wrong. If it has several channels or angles, the "solve once, reuse" feature can be shown
      too. Then rewrite steps 4-5 of `docs/13-tiles-to-pyramid.md`, which still describe the
      drift-affected copy. **Michael to acquire**
- [ ] `DATA-05_classified_project` — classified cells, ground-truth points, OpenCV ML classifier.
      **Presenter-only** (Confusion Matrix is demo-only), so attendees never download it. Nothing
      on disk has ground-truth point sets yet
- [ ] Pre-trained model for the DL Pixel Classifier inference exercise — step 2 says "load the
      provided pre-trained model" and there is no saved model anywhere. Foundation encoders pull
      from HuggingFace on demand, but a *trained classifier* for CMU-1 has to be made and saved
- [x] Redistribution checked for what is published: CMU-1 is OpenSlide/Aperio public test data,
      LuCa-7color is a public Akoya sample, TME-SYNTH is CC0, and the LJI slides are shared by
      their owners. **Do not publish the loose label PNGs in `OtherDocuments/labelimages/`** —
      they carry real accession numbers and were only ever working material

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
- [ ] Lowest video priority: Channel Names Viewer and Classify Object Subset. Sara McArdle is
      presenting both, so her session covers them live; ours are for people working alone

- [x] Sara's session title received: *Tips and tricks for maintaining sanity during hi-plex
      classification in QuPath*, and it runs **before** ours. Every reference across the site and
      the deck now points backwards to it rather than forwards
- [ ] Get the URL and exact time for Sara's session so the schedule can link it, not just name it
- [ ] Confirm whether she demonstrates these as *Channel Name Display* and *Gated Object
      Classifier* (her names) or as the LOCI extension names, so our callback matches what the
      room actually heard an hour earlier
- [ ] Compare notes with Sara before the day. Note the division is cleaner than it first looks:
      **we do not cover QuPath object classifiers at all** — that is core QuPath, and Sara's
      ground. What this workshop adds are *alternative mechanisms for getting a class onto a
      cell*: unsupervised clustering, rule-based marker gating, autoencoder propagation from a
      hand-labelled subset, and targeted application of a classifier to a chosen subset. Confirm
      with Sara that nothing falls between the two sessions

## Blocking before the workshop (found in the 2026-08-24 audit)

- [x] **Classify Object Subset 0.2.0 released** (2026-08-25) — first release since the rename,
      first jar named `qupath-extension-classify-object-subset-*`, and the first carrying the
      multi-threshold and class-checkbox work. The catalog auto-bumped; its compatibility floor
      was hand-corrected to v0.7.0, which the auto-bump had carried forward as v0.6.0
- [ ] **Catalog dispatch is broken on two repos** — `class-distribution` (failing since v0.1.6 in
      May) and `polyline-wand`. Their entries are current only because someone hand-bumped. The
      token works elsewhere, so it is per-repo. **Any release from those two needs a hand-bump**
      until the secret is fixed
- [ ] **Decide on DL Pixel Classifier 0.8.6.** The repo is on a 0.8.6-dev cycle; the newest
      release is 0.8.5, which is now what the guide claims. Bump the guide if 0.8.6 ships
- [x] **Catalog:** OCR for Labels and Tiles to Pyramid added to the LOCI catalog, so the QPSC
      catalog is no longer needed for anything hands-on. Every setup instruction now names one
      catalog and says plainly that adding it installs nothing
- [x] **OCR extension README** no longer recommends Enhance for faded labels (0.4.2 measured it
      making text worse). Fixed in `uw-loci/qupath-extension-ocr4labels`

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
