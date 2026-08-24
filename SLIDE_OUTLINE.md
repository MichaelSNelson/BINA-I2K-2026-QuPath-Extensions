# Hour-1 deck — outline

Not built yet. This is the plan, keyed to the [schedule](docs/schedule.md) running order.
Tuesday 29 September 2026, 10:30–11:30, Morgridge Hall WARF Seminar Hub Rm. 7560.

**Shape:** ~38 slides for 60 minutes, but four of those minutes-blocks are *live application*,
not slides. The deck's job is to frame each segment and then get out of the way. Target roughly
**20 talking slides + 4 demo holders + section dividers**.

**House rules for this deck**

- No filenames, ports, or file formats on slides. They belong in the docs, not on a wall.
- Nothing below 14 pt. If it does not fit, it is two slides.
- One idea per slide. Screenshots carry the detail; text carries the claim.
- Every segment ends on a slide showing the workshop URL, so a late arrival can always catch up.
- Demo slides are a static screenshot of the thing plus its menu path — so the segment survives
  the demo failing.

---

## 1 · Welcome and framing — 10:30 (5 min, 4 slides)

1. **Title.** Session title, presenter, LOCI/UW–Madison, the workshop URL and a QR code to it.
2. **Who this is for.** Anyone who uses QuPath and has hit its edges. No programming required.
3. **The claim.** QuPath is usually treated as post-acquisition analysis software. With
   extensions it spans acquisition → analysis → validation → publication. One environment,
   one project, one place your metadata lives.
4. **How the hour runs.** Simple → complex, matching the session title. Second hour optional
   and hands-on; four tracks; bring your own data. Three things are demo-only and we will say
   why each time.

## 2 · Extensions, catalogs, and how this was built — 10:35 (6 min, 5 slides)

5. **What an extension is.** A jar QuPath loads at startup. It adds menus, tools, dialogs.
6. **The three things that bite everyone.** You must restart. Extensions are per QuPath version.
   They are compiled against a specific API — hence 0.7+.
7. **Catalogs.** One URL, QuPath handles install and updates. One catalog covers the workshop, and adding it installs nothing until you pick. *This is
   the practical takeaway of the whole segment — if attendees remember one slide, this one.*
8. **Sixteen extensions, one person.** Honest framing: a large fraction was written by an LLM
   agent under close direction.
9. **What worked / what did not.** Two columns. Worked: compile as ground truth, docs as spec,
   persistent codebase notes, automated compatibility checking. Did not: scientific correctness,
   GUI behaviour, licensing. The bottleneck moved from "can I write this" to "can I tell when it
   is lying to me."

## 3 · Simple wins — 10:41 (8 min, 5 slides + live)

10. **Section divider: simple.**
11. **Dialog Position Manager.** The undocked-laptop problem. Before/after.
12. **Channel Names Viewer.** "Which one is the green one?" Live legend. *Five-minute extension,
    permanently useful.*
13. **Wizard Wand.** Auto-tuning from one example annotation is the headline — show the example,
    then the result.
14. **Polyline Wand.** Brush editing for lines. The scissors and erase-from-endpoint cases.
15. **▶ LIVE:** wand a region, then reshape a polyline. ~3 min.

## 4 · Image export — 10:49 (6 min, 4 slides)

16. **Section divider: getting things out.**
17. **QuIET, five categories.** Figures, masks, raw, ML tiles, object crops — plus panel montage.
18. **Every export writes a Groovy script.** The wizard is a script *generator*. This is the
    reproducibility slide.
19. **QUAREP-LiMi guidance in the dialog.** Catch "what magnification, and is there a scale bar?"
    before submission, not during review.

## 5 · Project-scale housekeeping — 10:55 (7 min, 5 slides)

20. **Section divider: at scale.**
21. **OCR for Labels.** The case ID is already in your file. Templates + vocabulary matching.
22. **Project Metadata Browser.** 467 rows, buffered editing, full undo. Sorting an OCR column
    is the fastest QC pass there is.
23. **Class Distribution.** Annotation count ≠ area ≠ implied training detections. Only the third
    predicts classifier behaviour.
24. **Classify Object Subset.** Stacked classifiers, and the live count that stops you
    overwriting 5,000 objects.

## 6 · Did it actually work? — 11:02 (5 min, 3 slides + demo)

25. **Section divider: validation.**
26. **The interval, not the point estimate.** "F1 = 0.87, 95% CI [0.82, 0.91]" versus "87%".
    95% from 40 cells and from 4000 cells are not the same claim.
27. **▶ DEMO:** click the biggest off-diagonal cell, land on the confused cells. Note that
    ground truth is wrong more often than people admit. Say plainly: private repo, demo only.

## 7 · DL cell and pixel classifiers — 11:07 (8 min, 6 slides)

28. **Section divider: complex.**
29. **DL Pixel Classifier: sparse annotations in, segmentation out.** You steer a sampler; you
    do not label exhaustively.
30. **What is under it.** Encoder choice, histology-pretrained and foundation-model weights.
    Keep this one slide — the audience is biologists.
31. **The two honest features.** Out-of-distribution warning and per-pixel probability maps.
    They tell you when *not* to trust the output.
32. **Domain shift is the real problem.** AdaBN recovers most of it in seconds, without retraining.
33. **QP-CAT.** Clustering, autoencoder cell classification, spatial statistics — and the round
    trip: brush the UMAP, cells highlight on the slide. Cluster 3D Navigator: click a point in
    cluster space, land on the cell.

## 8 · Collagen fibre and texture — 11:15 (5 min, 4 slides)

34. **Why fibre architecture.** TACS-3: straightened fibres perpendicular to the tumour boundary,
    HR 3.0–3.9 for disease-free survival, independent of grade, size, receptor status.
35. **Fiber Analysis.** Dilated border zone; straightness, morphometrics, texture. A dense uniform
    mat and a sparse clumped field can share mean alignment and differ completely.
36. **TME-Quant.** CT-FIRE tracing, supervised parameter tuning from a few traced fibres, TACS
    classification.
37. **Why demo only**, and the citations slide (CT-FIRE, CurveAlign, TACS, TWOMBLI).

## 9 · Microscope control — 11:20 (9 min, 4 slides + live)

38. **Section divider: most complex.**
39. **QPSC: draw a box, get an image.** The one-sentence version.
40. **Architecture.** QuPath → command server → Pycro-Manager → Micro-Manager → hardware.
    Keep it to one diagram; do not enumerate repositories.
41. **▶ LIVE:** draw a region, acquire, stitch, image appears in the project. ~5 min.
    *Have a recorded fallback.*

## 10 · Where to get everything — 11:29 (1 min, 1 slide)

42. **The URL and QR code.** Catalog URLs. What happens in the second hour, and that the four
    tracks are on the site. Bring your own data.

---

## Build notes

- Build with `pptxgenjs` (`build_deck.js`), `LAYOUT_WIDE` 13.3×7.5in, per the house convention.
- `sizing:{type:'cover'}` stretches images in PowerPoint — pre-crop with PIL and place with
  plain `w`/`h`.
- Screenshots do not exist yet. They are needed for the deck *and* for the docs (`images/` is
  still empty), so capture them once and use them in both.
- Two safety measures worth the effort: a **recorded fallback** for the QPSC demo, and a
  static screenshot behind every ▶ slide.
