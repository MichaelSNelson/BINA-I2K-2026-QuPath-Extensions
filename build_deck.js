/*
 * Hour-1 deck for the I2K / BINA 2026 QuPath extensions workshop.
 * Build:  NODE_PATH=/home/msnelson/MicroscopyEducation/LOCI/node_modules node build_deck.js
 *
 * Palette is keyed to the QuPath logo blue (#3674C1, sampled from the QuPath icon).
 * Light background throughout. Nothing below 14 pt. No filenames or formats on slides.
 */
const pptxgen = require('pptxgenjs');

const BLUE      = '3674C1';   // QuPath logo blue
const BLUE_DK   = '1F4C86';   // headings
const BLUE_TINT = 'E8F0FA';   // section fills / panels
const BLUE_PALE = 'F4F8FD';   // subtle panels
const INK       = '1F2933';
const MUT       = '5A6675';
const AMBER     = 'B26A00';   // demo markers only
const WHITE     = 'FFFFFF';

const HEAD = 'Trebuchet MS';
const BODY = 'Calibri';
const URL  = 'michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions';
const PADLET = '%%PADLET_URL%%';   // replace before presenting

const W = 13.33, H = 7.5, M = 0.62;

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Michael S. Nelson';
pptx.company = 'LOCI, University of Wisconsin-Madison';
pptx.title = 'New Extensions for QuPath';

let n = 0;
const bg = { color: WHITE };

/* ---------- helpers ---------- */

function pageNum(s) {
  n += 1;
  s.addText(String(n), {
    x: W - 1.0, y: H - 0.62, w: 0.5, h: 0.34,
    fontFace: BODY, fontSize: 14, color: 'A8B2BF', align: 'right',
  });
}

// standard content slide: title, blue rule, bullet list
function content(title, bullets, opts = {}) {
  const s = pptx.addSlide();
  s.background = bg;
  s.addText(title, {
    x: M, y: 0.42, w: W - 2 * M, h: 0.72,
    fontFace: HEAD, fontSize: 30, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addShape(pptx.ShapeType.rect, {
    x: M, y: 1.2, w: 2.1, h: 0.055, fill: { color: BLUE },
  });
  if (opts.kicker) {
    s.addText(opts.kicker, {
      x: M, y: 1.36, w: W - 2 * M, h: 0.42,
      fontFace: BODY, fontSize: 17, italic: true, color: MUT,
    });
  }
  const top = opts.kicker ? 1.92 : 1.62;
  s.addText(
    bullets.map(b =>
      typeof b === 'string'
        ? { text: b, options: { bullet: { code: '2022' }, fontSize: 20, color: INK, paraSpaceAfter: 12 } }
        : { text: b.t, options: { bullet: { code: '25AA' }, indentLevel: 1, fontSize: 17, color: MUT, paraSpaceAfter: 8 } }
    ),
    { x: M + 0.08, y: top, w: W - 2 * M - 0.1, h: H - top - 0.9, fontFace: BODY, valign: 'top', lineSpacingMultiple: 1.05 }
  );
  if (opts.note) {
    s.addShape(pptx.ShapeType.rect, { x: M, y: H - 1.32, w: W - 2 * M, h: 0.62, fill: { color: BLUE_PALE }, line: { color: BLUE, width: 0.75 } });
    s.addText(opts.note, {
      x: M + 0.22, y: H - 1.32, w: W - 2 * M - 0.44, h: 0.62,
      fontFace: BODY, fontSize: 16, bold: true, color: BLUE_DK, valign: 'middle',
    });
  }
  pageNum(s);
  return s;
}

// section divider: tinted panel, big number
function section(num, title, sub) {
  const s = pptx.addSlide();
  s.background = bg;
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 1.55, w: W, h: 3.4, fill: { color: BLUE_TINT } });
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 1.55, w: 0.22, h: 3.4, fill: { color: BLUE } });
  s.addText(num, {
    x: M, y: 1.85, w: 2.0, h: 1.0,
    fontFace: HEAD, fontSize: 54, bold: true, color: BLUE, valign: 'middle',
  });
  s.addText(title, {
    x: M, y: 2.85, w: W - 2 * M, h: 0.95,
    fontFace: HEAD, fontSize: 40, bold: true, color: BLUE_DK, valign: 'middle',
  });
  if (sub) {
    s.addText(sub, {
      x: M, y: 3.78, w: W - 2 * M - 1.0, h: 0.8,
      fontFace: BODY, fontSize: 19, color: MUT, valign: 'top',
    });
  }
  s.addText(URL, {
    x: M, y: H - 0.72, w: 9, h: 0.4,
    fontFace: BODY, fontSize: 14, color: 'A8B2BF',
  });
  pageNum(s);
  return s;
}

// demo slide: tag, what we are doing, menu path, fallback reminder
function demo(title, tag, steps, footer) {
  const s = pptx.addSlide();
  s.background = bg;
  s.addShape(pptx.ShapeType.roundRect, {
    x: M, y: 0.45, w: 2.55, h: 0.5, rectRadius: 0.1,
    fill: { color: 'FBF1E0' }, line: { color: AMBER, width: 1 },
  });
  s.addText(tag, {
    x: M, y: 0.45, w: 2.55, h: 0.5,
    fontFace: HEAD, fontSize: 16, bold: true, color: AMBER, align: 'center', valign: 'middle',
  });
  s.addText(title, {
    x: M, y: 1.12, w: W - 2 * M, h: 0.75,
    fontFace: HEAD, fontSize: 32, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addShape(pptx.ShapeType.rect, { x: M, y: 1.95, w: 2.1, h: 0.055, fill: { color: BLUE } });
  s.addText(
    steps.map(t => ({ text: t, options: { bullet: { code: '2022' }, fontSize: 20, color: INK, paraSpaceAfter: 14 } })),
    { x: M + 0.08, y: 2.3, w: W - 2 * M - 0.1, h: 3.3, fontFace: BODY, valign: 'top' }
  );
  if (footer) {
    s.addShape(pptx.ShapeType.rect, { x: M, y: H - 1.32, w: W - 2 * M, h: 0.62, fill: { color: BLUE_PALE }, line: { color: BLUE, width: 0.75 } });
    s.addText(footer, {
      x: M + 0.22, y: H - 1.32, w: W - 2 * M - 0.44, h: 0.62,
      fontFace: BODY, fontSize: 16, bold: true, color: BLUE_DK, valign: 'middle',
    });
  }
  pageNum(s);
  return s;
}

// two-column comparison
function twoCol(title, leftHead, left, rightHead, right) {
  const s = pptx.addSlide();
  s.background = bg;
  s.addText(title, {
    x: M, y: 0.42, w: W - 2 * M, h: 0.72,
    fontFace: HEAD, fontSize: 30, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addShape(pptx.ShapeType.rect, { x: M, y: 1.2, w: 2.1, h: 0.055, fill: { color: BLUE } });
  const cw = (W - 2 * M - 0.5) / 2;
  [[leftHead, left, M, BLUE_DK], [rightHead, right, M + cw + 0.5, AMBER]].forEach(([hd, items, x, col]) => {
    s.addShape(pptx.ShapeType.rect, { x, y: 1.7, w: cw, h: 0.58, fill: { color: BLUE_TINT } });
    s.addText(hd, {
      x: x + 0.18, y: 1.7, w: cw - 0.36, h: 0.58,
      fontFace: HEAD, fontSize: 20, bold: true, color: col, valign: 'middle',
    });
    s.addText(
      items.map(t => ({ text: t, options: { bullet: { code: '2022' }, fontSize: 18, color: INK, paraSpaceAfter: 11 } })),
      { x: x + 0.1, y: 2.45, w: cw - 0.2, h: 3.9, fontFace: BODY, valign: 'top' }
    );
  });
  pageNum(s);
  return s;
}

/* ================= 1 · Welcome and framing ================= */

{
  const s = pptx.addSlide();
  s.background = bg;
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.3, h: H, fill: { color: BLUE } });
  s.addText('I2K  ·  BioImaging North America Congress 2026', {
    x: 1.05, y: 1.15, w: W - 2.1, h: 0.42,
    fontFace: BODY, fontSize: 17, bold: true, color: BLUE, charSpacing: 1.5,
  });
  s.addText('New Extensions for QuPath', {
    x: 1.05, y: 1.62, w: W - 2.1, h: 1.15,
    fontFace: HEAD, fontSize: 46, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addText('From simple (dialog manager, wizard wand, image export)\nto complex (DL cell and pixel classifiers, microscope control)', {
    x: 1.05, y: 2.82, w: W - 3.0, h: 1.0,
    fontFace: BODY, fontSize: 21, color: MUT, lineSpacingMultiple: 1.15,
  });
  s.addShape(pptx.ShapeType.rect, { x: 1.05, y: 4.0, w: 2.6, h: 0.06, fill: { color: BLUE } });
  s.addText('Michael S. Nelson', {
    x: 1.05, y: 4.25, w: 8, h: 0.42, fontFace: HEAD, fontSize: 22, bold: true, color: INK,
  });
  s.addText('Laboratory for Optical and Computational Instrumentation (LOCI)\nUniversity of Wisconsin–Madison', {
    x: 1.05, y: 4.68, w: 8, h: 0.8, fontFace: BODY, fontSize: 17, color: MUT, lineSpacingMultiple: 1.1,
  });
  s.addShape(pptx.ShapeType.rect, { x: 1.05, y: 5.75, w: 7.6, h: 0.62, fill: { color: BLUE_TINT } });
  s.addText(URL, {
    x: 1.25, y: 5.75, w: 7.3, h: 0.62,
    fontFace: BODY, fontSize: 18, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addText('Tuesday 29 September 2026  ·  10:30–12:30\nMorgridge Hall, WARF Seminar Hub — Rm. 7560', {
    x: W - 5.1, y: 5.75, w: 4.4, h: 0.8,
    fontFace: BODY, fontSize: 15, color: MUT, align: 'right', lineSpacingMultiple: 1.1,
  });
  pageNum(s);
}

content('Who this is for', [
  'Anyone who already uses QuPath and has run into its edges',
  'Biologists, pathologists, core facility staff, graduate students',
  'No programming required — nothing today asks you to write a script',
  { t: 'A few tools generate scripts for you; you never have to write one' },
  'Helpful if you have opened a project, drawn an annotation, run cell detection',
], { note: 'Everything shown today is free, open source, and installable from inside QuPath.' });

content('The claim', [
  'QuPath is usually treated as post-acquisition analysis software',
  'Its extension mechanism reaches much further than that',
  'Acquisition → analysis → validation → publication, in one environment',
  { t: 'One project. One place your metadata lives. One place your figures come from' },
  'Sixteen extensions built at LOCI — thirteen you can install this afternoon',
]);

content('How the hour runs', [
  'Simple first, complex last — exactly as the session title promises',
  'Small quality-of-life tools → export → project-scale work → deep learning → microscope control',
  'Three things are demonstrated but not practised. I will say why each time',
  'Second hour is optional, hands-on, and self-directed — four tracks, or bring your own data',
], { note: 'Slides, guides, exercises and sample data all live at the address above.' });

content('Sixteen tools, two hours', [
  'There is time for a handful of tools done properly, not sixteen done badly',
  'So: every tool has a full written walkthrough, and a video of me doing it',
  'Nothing depends on being in the room when your tool comes up',
  'Which ones we demo live is up to you — vote on the next slide',
], { kicker: 'Being up front about this now, rather than rushing at 11:20.',
     note: 'Walkthroughs and videos for all sixteen: ' + URL + '/docs/walkthroughs.html' });

{
  const s = pptx.addSlide();
  s.background = bg;
  s.addText('Vote for what you want to see', {
    x: M, y: 0.9, w: W - 2 * M, h: 0.9,
    fontFace: HEAD, fontSize: 36, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addShape(pptx.ShapeType.rect, { x: M, y: 1.85, w: 2.1, h: 0.055, fill: { color: BLUE } });
  s.addShape(pptx.ShapeType.rect, { x: M, y: 2.35, w: W - 2 * M, h: 1.5, fill: { color: BLUE_TINT } });
  s.addText(PADLET, {
    x: M + 0.3, y: 2.35, w: W - 2 * M - 0.6, h: 1.5,
    fontFace: BODY, fontSize: 30, bold: true, color: BLUE_DK, align: 'center', valign: 'middle',
  });
  s.addText([
    { text: 'Vote for as many as you like. Add a comment if you have a specific question, or a dataset you are stuck on.\n', options: { fontSize: 20, color: INK, paraSpaceAfter: 12 } },
    { text: 'I will read it now and adjust the running order.\n', options: { fontSize: 20, color: INK, paraSpaceAfter: 12 } },
    { text: 'If your tool does not make the cut, its walkthrough and video are on the site — and I am happy to sit down with you in the second hour.', options: { fontSize: 20, color: INK } },
  ], { x: M, y: 4.1, w: W - 2 * M, h: 2.2, fontFace: BODY, valign: 'top' });
  pageNum(s);
}

/* ================= 2 · Extensions, catalogs, and how this was built ================= */

section('01', 'Extensions and catalogs', 'What they are, how you install them, and how this suite got built');

content('What an extension actually is', [
  'A single Java component that QuPath loads when it starts',
  'It can add menu items, toolbar buttons, dialogs, viewers, whole pipelines',
  'Everything you see today was registered by an extension during startup',
  'You install one by dropping it in, or — much better — from a catalog',
]);

content('Three things that bite everyone', [
  'You must restart QuPath. It copies the extension into place but will not load it until you do',
  { t: 'This is roughly half of all "the menu item is not there" reports' },
  'Extensions live per QuPath version — installing 0.7 will not disturb your 0.6 setup',
  'They are compiled against a specific QuPath API, which is why today needs 0.7 or later',
], { note: 'Workshop requirement: QuPath 0.7.0 or later. Nothing here runs on 0.6.' });

content('Catalogs', [
  'One URL. QuPath then handles installing, listing, and updating for you',
  'Extensions > Manage extensions > Manage extension catalogs > Add catalog',
  'LOCI catalog  —  github.com/uw-loci/qupath-catalog-mikenelson',
  'QPSC catalog  —  github.com/uw-loci/qupath-catalog-qpsc',
  'You pick what you want from the list. You do not have to install everything',
], { kicker: 'If you remember one slide from this section, make it this one.',
     note: 'Publishing your own catalog takes about twenty minutes and removes a support burden.' });

content('Sixteen extensions, one person', [
  'That is not a normal output, and it is fair to ask how',
  'A large fraction of the code was written by an LLM coding agent under close direction',
  'Several of you will go home and try this, so here is the honest version',
], { kicker: 'The part of this talk most likely to be useful outside QuPath.' });

twoCol('What worked, and what did not',
  'Worked',
  [
    'Give the model the real API, and require it to compile — a failing build is a free, correct signal',
    'Write the documentation first and treat it as the specification',
    'Keep a persistent map of the codebase so each session does not re-derive it badly',
    'Automate the tedious checks — API compatibility across sixteen repositories',
  ],
  'Did not',
  [
    '"Build me an extension that does X" — compiles, and is wrong in ways you find in front of an audience',
    'Scientific correctness — a bootstrap that runs, looks plausible, and resamples the wrong axis',
    'GUI behaviour — nothing catches a dialog opening off-screen except a human',
    'Licensing — get it wrong and you cannot distribute your work',
  ]);

content('The honest summary', [
  'AI assistance changed the cost of building an extension by about an order of magnitude',
  'It changed the correctness of one not at all',
  'The bottleneck moved from "can I write this Java" to "do I know what this should do, and can I tell when it is lying to me"',
], { note: 'A better bottleneck to have. Still a bottleneck, and still yours.' });

/* ================= 3 · Simple wins ================= */

section('02', 'Simple wins', 'Small extensions that pay for themselves on the first day');

content('Dialog Position Manager', [
  'Remembers where every dialog was, and puts it back next session',
  'Recovers windows stranded on a monitor you have since unplugged',
  'Handles mixed-DPI and display scaling changes',
  'A core facility can share one layout across every workstation',
], { kicker: 'The least glamorous tool here, and the one that saves the most support time.',
     note: 'It also exists because this class of bug is invisible to automated testing.' });

content('Channel Names Viewer', [
  '"Which one is the green one?" — answered, permanently',
  'A floating legend of the selected channels, each drawn in its display colour',
  'Updates live as you toggle channels; text scales as you resize the window',
  'Shrink it away on a laptop, or make it large enough to read from the back of a room',
], { note: 'Five minutes to install. Useful every time you present a multiplex image.' });

content('Wizard Wand', [
  'Works like the built-in wand, with holes filled and edges smoothed by default',
  'Hold still and the selection grows on its own, instead of dragging to cover',
  'Colour-space modes for grayscale, subtle stain differences, or selecting by hue',
  'Auto-tuning: draw one annotation the way you want it, and it derives its own settings',
], { kicker: 'The built-in wand is untouched — this installs as a separate tool you can ignore.',
     note: 'Auto-tuning is the headline: settings taken from your example beat settings you guessed.' });

content('Polyline Wand and Brush', [
  'QuPath’s brush and wand work on areas. This brings the same editing to lines',
  'Push a section of a traced boundary outward without redrawing it',
  'Overshot the end of a vessel trace? Erase backwards from the endpoint',
  'Scissors mode splits one polyline into two, both keeping class, name and colour',
], { note: 'One stroke is one undo step, even on a ten-thousand-vertex boundary.' });

demo('Annotation, live', '▶  LIVE',
  [
    'Wand a structure, then auto-tune from a hand-drawn example and do it again',
    'Reshape a polyline: push a section out, smooth a noisy stretch, cut it in two',
    'Compare the boundary against the built-in tools',
  ],
  'About three minutes. Static screenshots follow if the live version misbehaves.');

/* ================= 4 · Image export ================= */

section('03', 'Getting things out', 'Publication figures, review images, and machine-learning datasets');

content('QuIET — Image Export Toolkit', [
  'Five export categories, one three-step wizard',
  { t: 'Rendered figures  ·  label masks  ·  raw pixel data  ·  image and label tile pairs  ·  per-object crops' },
  'A separate wizard builds multi-panel montage figures from several project images',
  'Batch across a project, without writing an export script',
], { kicker: 'Exporting one image is easy. Exporting forty the same way, with a scale bar, at a stated resolution, is not.' });

content('Every export writes a script', [
  'Whatever you clicked in the wizard comes back out as a self-contained script',
  'Save it, version it, re-run it next year, send it to a collaborator without the extension',
  'The wizard is a script generator, not a black box',
], { note: 'That is the difference between a convenience and a reproducibility tool.' });

content('Reporting guidance, in the dialog', [
  'QUAREP-LiMi is the community effort on minimum reporting standards for light microscopy',
  'Guidance appears beside the settings, driven by your project’s actual images',
  'Publication advice is shown before you export, not after review',
], { kicker: 'Catch "what magnification was that, and is there a scale bar?" while you can still fix it.' });

/* ================= 5 · Project-scale housekeeping ================= */

section('04', 'At scale', 'When it is four hundred slides rather than four');

content('OCR for Labels', [
  'The case ID, stain and block number are already in your slide file, on the label image',
  'Text recognition and barcode scanning, straight into project metadata',
  'Save a template of field positions, then run it across the whole project',
  'Vocabulary matching turns "usually right" into "right, or obviously wrong"',
], { note: 'Review before applying. Recognition on a photographed label is good, not correct.' });

content('Project Metadata Browser', [
  'Every image a row, every metadata key a column — sortable and filterable',
  'Edits stay in memory until you save, and everything is undoable',
  'Paste a column from a spreadsheet; pull values out of structured filenames',
  'Rename or remove a key across every image in one operation',
], { kicker: 'If you just ran label recognition across 467 slides, this is where you find out whether it worked.',
     note: 'Sorting by a recognised column is the fastest quality check available — bad reads are outliers.' });

content('Class Distribution', [
  'Live charts of how your annotation classes are distributed across the project',
  'And, separately, the training balance those annotations actually imply',
  'Charts update while you annotate, so the feedback arrives while you can still act',
  'Classes badly over- or under-represented are flagged',
], { note: 'Annotation count, annotation area, and implied training detections are three different numbers. Only the third predicts classifier behaviour.' });

content('Classify Object Subset', [
  'Run a saved classifier on a chosen subset instead of every object in the image',
  'Pick by class, by measurement value, by what you have selected — or all three',
  'Stack classifiers: run the second one only on what the first left unclassified',
  'Every apply is recorded, so the session converts into a batch script',
], { kicker: 'A live count tells you how many objects you are about to change.',
     note: 'That count is the guard against silently reclassifying work you already did.' });

/* ================= 6 · Validation ================= */

section('05', 'Did it actually work?', 'Classifier validation you can put in a paper');

content('The interval, not the estimate', [
  '"F1 = 0.87, 95% CI [0.82, 0.91]" instead of "87% accurate"',
  '95% from forty cells and 95% from four thousand cells are not the same claim',
  'Bootstrap confidence intervals on every per-class metric',
  'For probability-producing classifiers: is the confidence itself trustworthy, or just the top class?',
], { note: 'A model that is 95% confident and 70% correct is a different problem, needing a different fix.' });

demo('Confusion Matrix', '▶  DEMO ONLY',
  [
    'Click the largest off-diagonal cell — those cells highlight on the slide',
    '"The classifier is 87% accurate" becomes "it confuses these two things, for this reason"',
    'Across a project: per-image breakdown, with divergent images flagged automatically',
    'Flagged images usually mean a staining or scanning problem, not a classifier problem',
  ],
  'Demo only: the repository is currently private, so there is no version for you to install.');

/* ================= 7 · DL cell and pixel classifiers ================= */

section('06', 'Deep learning', 'Pixel classifiers, cell classifiers, and knowing when not to trust them');

content('Deep learning pixel classification', [
  'Same interaction as the built-in classifier: draw a few sparse regions per class',
  'The extension samples training tiles from what you marked — you are steering a sampler',
  'Brightfield and multi-channel fluorescence, with per-channel normalisation',
  'Train across several project images at once for representative sampling',
], { kicker: 'For when the built-in classifier is not enough: subtle textures, classes that differ by architecture rather than colour.' });

content('What is underneath', [
  'Your choice of encoder, from lightweight convolutional networks to vision transformers',
  'Start from weights pretrained on histology rather than on everyday photographs',
  'Or from pathology foundation models, downloaded on demand',
  'Normalisation computed over the whole image, which removes tile-boundary artefacts',
], { note: 'Training needs a dedicated GPU. That is why training is a demonstration and inference is the exercise.' });

content('The two most important features', [
  'Full per-pixel probability maps, not just the winning class',
  { t: 'The honest uncertainty is at the boundaries between classes — go and look at it' },
  'An out-of-distribution warning before inference, when an image no longer resembles the training data',
  { t: 'Catches stain, exposure and sensor changes that would quietly degrade predictions' },
], { note: 'These are the features that tell you when not to trust the output, and the easiest to ignore.' });

content('When the model stops working', [
  'A new scanner, a new stain, a new batch — and last month’s model degrades',
  'Recalibrating to the current image takes seconds and no retraining at all',
  'Or adapt the model to your own unlabelled data before committing to a full retrain',
], { kicker: 'Domain shift is the practical problem, far more often than model architecture.',
     note: 'Try recalibration before you consider retraining. It usually recovers most of the loss.' });

content('QP-CAT — multiplexed cell analysis', [
  'The full scientific Python stack embedded in QuPath. No environments to manage',
  'Clustering, marker gating with suggested thresholds, spatial statistics, batch correction',
  'Label a small subset by hand and have the rest of the project labelled for you',
  'Brush a region of the embedding and those cells highlight on the slide',
], { kicker: 'The usual workflow loses the link back to the tissue. This keeps it.',
     note: 'Author’s own warning: many features are lightly tested. Treat results as a starting point.' });

content('Cluster 3D Navigator', [
  'A rotatable point cloud of your cells, one point per detection, coloured by class',
  'Click a point and land on that cell in the viewer',
  'Structure that two dimensions hide is often obvious the moment you rotate',
  'Works with any clustering tool’s output, not just ours. It only reads — it writes nothing',
], { note: 'Boundary cells are where classification errors live. This makes them one click away.' });

/* ================= 8 · Fibre and texture ================= */

section('07', 'Collagen fibre and texture', 'Architecture, not just presence');

content('Why fibre architecture', [
  'Collagen is not simply present or absent — the arrangement carries the biology',
  'Wavy versus straightened; aligned versus isotropic; and how that changes at a boundary',
  'In breast pathology, straightened fibres running perpendicular to the tumour boundary act as tracks for invading cells',
  'Hazard ratio 3.0–3.9 for disease-free survival, independent of grade, size and receptor status',
], { kicker: 'Conklin et al. 2011, American Journal of Pathology 178:1221.',
     note: 'The same wavy-to-straight axis recurs in arterial adventitia, sclera, alveolar wall, and cardiac fibrosis.' });

twoCol('Two complementary tools',
  'Fiber Analysis — measure a zone',
  [
    'A band of chosen width inside, outside, or across an annotation boundary',
    'Straightness and persistence: wavy versus straightened fibres',
    'Morphometrics: coverage, length, branching, fractal dimension, gaps',
    'Texture: the information fibre-tracing misses entirely',
  ],
  'TME-Quant — trace the fibres',
  [
    'Individual fibres extracted and committed back as objects',
    'Set the threshold by eye, with the mask shown before you commit',
    'Trace a few real fibres yourself, and it tunes its own parameters to match',
    'Fibres classified by orientation relative to a tumour boundary',
  ]);

content('A dense mat and a sparse clump', [
  'Two fields can share the same mean fibre alignment and be completely different tissue',
  'Texture measures the spatial heterogeneity that alignment averages away',
  'Which is why both tools are worth running, on the same region',
], { note: 'Demo only today: one needs a long environment build, the other a dedicated analysis server.' });

content('Please cite the methods', [
  'Both tools are thin wrappers over other people’s science',
  'CT-FIRE — Bredfeldt et al. 2014, Journal of Biomedical Optics 19(1):016007',
  'CurveAlign — LOCI, University of Wisconsin–Madison',
  'TACS — Conklin et al. 2011; Provenzano et al. 2008, BMC Medicine 6:11',
  'TWOMBLI — Wershof et al. 2021, Life Science Alliance 4(3)',
]);

/* ================= 9 · Microscope control ================= */

section('08', 'Microscope control', 'The most complex thing here, and the reason for the rest');

content('QPSC — QuPath Scope Control', [
  'Draw a box around a region in QuPath. The stage moves, the tiles are captured and stitched, and the image appears back in your project',
  'Target specific annotations on a slide you already scanned',
  'Live camera view, stage map, saved positions, and a virtual joystick',
  'Brightfield, multi-channel fluorescence, and combined passes on a single-camera scope',
]);

content('Why this changes the rest', [
  'The region you analysed is the region you acquire at high resolution',
  'Acquisition metadata arrives in the project, not in a folder that gets separated from the images',
  'Stitching is a step in this pipeline — and it works perfectly well on its own, which is why it is in your hands-on hour',
], { note: 'Once acquisition is driven from QuPath, "acquisition software" and "analysis software" stop being separate places your data lives.' });

content('How it is put together', [
  'QuPath talks to a small command server, which drives Micro-Manager, which drives the hardware',
  'Each instrument is described by its own configuration — the QuPath side does not know what kind of microscope it is',
  'Micro-Manager remains the device layer. We did not reinvent it',
], { kicker: 'The easy part is the QuPath extension. Budget your time for the microscope side.' });

demo('Acquisition, live', '▶  LIVE',
  [
    'Draw a bounding box on a slide overview',
    'Watch the stage move and the tiles come in',
    'Stitched pyramidal image lands back in the project, with its metadata',
    'Then open it and annotate it — the loop closes',
  ],
  'About five minutes. Recorded fallback ready if the network or the hardware disagrees.');

/* ================= 9b · Acknowledgements ================= */

{
  const s = pptx.addSlide();
  s.background = bg;
  s.addText('Acknowledgements', {
    x: M, y: 0.45, w: W - 2 * M, h: 0.75,
    fontFace: HEAD, fontSize: 32, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addShape(pptx.ShapeType.rect, { x: M, y: 1.26, w: 2.1, h: 0.055, fill: { color: BLUE } });

  s.addShape(pptx.ShapeType.rect, { x: M, y: 1.72, w: W - 2 * M, h: 2.45, fill: { color: BLUE_TINT } });
  s.addShape(pptx.ShapeType.rect, { x: M, y: 1.72, w: 0.16, h: 2.45, fill: { color: BLUE } });
  s.addText('Sample data', {
    x: M + 0.45, y: 1.9, w: W - 2 * M - 0.9, h: 0.4,
    fontFace: BODY, fontSize: 16, bold: true, color: BLUE, charSpacing: 1.5,
  });
  s.addText('Sara McArdle  ·  Zbigniew Mikulski', {
    x: M + 0.45, y: 2.3, w: W - 2 * M - 0.9, h: 0.62,
    fontFace: HEAD, fontSize: 32, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addText('La Jolla Institute for Immunology', {
    x: M + 0.45, y: 2.92, w: W - 2 * M - 0.9, h: 0.42,
    fontFace: BODY, fontSize: 21, color: INK,
  });
  s.addText('They provided the majority of the test and demonstration data behind almost every exercise you will see today.\nThese tools could not have been built, tested, or taught without it.', {
    x: M + 0.45, y: 3.34, w: W - 2 * M - 0.9, h: 0.8,
    fontFace: BODY, fontSize: 17, italic: true, color: MUT, lineSpacingMultiple: 1.1,
  });

  s.addText([
    { text: 'Sara McArdle also shaped the software directly — two of these extensions began as her Groovy scripts, and her FS2K course was the model for how the workshop pages are written.\n', options: { fontSize: 17, color: INK, paraSpaceAfter: 10 } },
    { text: 'Pete Bankhead and the QuPath team.  ·  CT-FIRE, CurveAlign, TACS and TWOMBLI for the fibre work.  ·  CytoMAP and QuBaLab for bringing clustering into QuPath.  ·  QUAREP-LiMi for the reporting standards.  ·  The image.sc community, where several of these features were first requested.\n', options: { fontSize: 17, color: INK, paraSpaceAfter: 10 } },
    { text: 'Full credits: ' + URL + '/docs/acknowledgements.html', options: { fontSize: 17, bold: true, color: BLUE_DK } },
  ], { x: M, y: 4.35, w: W - 2 * M, h: 2.3, fontFace: BODY, valign: 'top' });
  pageNum(s);
}

/* ================= 10 · Close ================= */

{
  const s = pptx.addSlide();
  s.background = bg;
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.3, h: H, fill: { color: BLUE } });
  s.addText('Everything is here', {
    x: 1.05, y: 0.85, w: W - 2.1, h: 0.9,
    fontFace: HEAD, fontSize: 40, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addShape(pptx.ShapeType.rect, { x: 1.05, y: 1.85, w: 9.5, h: 0.78, fill: { color: BLUE_TINT } });
  s.addText(URL, {
    x: 1.3, y: 1.85, w: 9.2, h: 0.78,
    fontFace: BODY, fontSize: 22, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addText([
    { text: 'A written walkthrough and a video for every tool  ·  setup instructions  ·  sample data  ·  these slides\n', options: { fontSize: 19, color: INK, paraSpaceAfter: 10 } },
    { text: 'Add the two catalogs in QuPath, install only what interests you, and restart:\n', options: { fontSize: 19, color: INK, paraSpaceAfter: 6 } },
    { text: 'github.com/uw-loci/qupath-catalog-mikenelson\n', options: { fontSize: 18, bold: true, color: BLUE_DK, paraSpaceAfter: 4 } },
    { text: 'github.com/uw-loci/qupath-catalog-qpsc\n', options: { fontSize: 18, bold: true, color: BLUE_DK, paraSpaceAfter: 14 } },
    { text: 'Whatever we did not reach today, the walkthrough and the video are waiting for you.', options: { fontSize: 19, bold: true, color: BLUE_DK } },
  ], { x: 1.05, y: 2.95, w: W - 2.6, h: 2.8, fontFace: BODY, valign: 'top' });
  s.addText('Sample data courtesy of Sara McArdle and Zbigniew Mikulski, La Jolla Institute for Immunology.', {
    x: 1.05, y: 5.72, w: W - 2.6, h: 0.4,
    fontFace: BODY, fontSize: 16, bold: true, color: BLUE_DK,
  });
  s.addText('Questions welcome now, during the hands-on hour, or by email afterwards.', {
    x: 1.05, y: 6.05, w: W - 2.6, h: 0.5,
    fontFace: BODY, fontSize: 18, italic: true, color: MUT,
  });
  pageNum(s);
}

pptx.writeFile({ fileName: 'I2K_2026_QuPath_Extensions.pptx' })
  .then(f => console.log('WROTE', f, '| slides:', n));
