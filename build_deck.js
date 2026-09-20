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

// before/after figure: two image panels stacked, each with a label, plus a caption.
// Images are pre-rendered at a shared scale, so a narrower lower panel is meaningful.
function figurePair(title, labelA, imgA, labelB, imgB, caption) {
  const s = pptx.addSlide();
  s.background = bg;
  s.addText(title, {
    x: M, y: 0.42, w: W - 2 * M, h: 0.72,
    fontFace: HEAD, fontSize: 30, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addShape(pptx.ShapeType.rect, { x: M, y: 1.2, w: 2.1, h: 0.055, fill: { color: BLUE } });
  const fw = 11.0, fh = fw * imgA.h / imgA.w;
  s.addText(labelA, { x: M, y: 1.34, w: W - 2 * M, h: 0.42, fontFace: BODY, fontSize: 17, bold: true, color: BLUE_DK, valign: 'middle' });
  s.addImage({ path: imgA.path, x: M, y: 1.8, w: fw, h: fh });
  s.addText(labelB, { x: M, y: 1.8 + fh + 0.1, w: W - 2 * M, h: 0.42, fontFace: BODY, fontSize: 17, bold: true, color: BLUE_DK, valign: 'middle' });
  s.addImage({ path: imgB.path, x: M, y: 1.8 + fh + 0.56, w: fw * imgB.w / imgA.w, h: fh });
  s.addText(caption, { x: M, y: H - 0.94, w: W - 2 * M - 1.0, h: 0.56, fontFace: BODY, fontSize: 15, italic: true, color: MUT, valign: 'middle' });
  pageNum(s);
  return s;
}

// side-by-side figure: two panels of equal size, each labelled, plus a caption.
// For zoomed comparisons, where left/right reads better than stacked.
function figureDuo(title, labelA, imgA, labelB, imgB, caption) {
  const s = pptx.addSlide();
  s.background = bg;
  s.addText(title, {
    x: M, y: 0.42, w: W - 2 * M, h: 0.72,
    fontFace: HEAD, fontSize: 30, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addShape(pptx.ShapeType.rect, { x: M, y: 1.2, w: 2.1, h: 0.055, fill: { color: BLUE } });
  const pw = 5.6, gap = 0.45;
  const ph = pw * imgA.h / imgA.w;
  const x0 = (W - (2 * pw + gap)) / 2;
  const top = 1.95;
  [[labelA, imgA, x0], [labelB, imgB, x0 + pw + gap]].forEach(([lbl, img, x]) => {
    s.addText(lbl, {
      x, y: 1.44, w: pw, h: 0.44,
      fontFace: BODY, fontSize: 17, bold: true, color: BLUE_DK, valign: 'middle',
    });
    s.addImage({ path: img.path, x, y: top, w: pw, h: ph });
  });
  s.addText(caption, {
    x: M, y: top + ph + 0.12, w: W - 2 * M, h: 0.62,
    fontFace: BODY, fontSize: 15, italic: true, color: MUT, valign: 'top',
  });
  pageNum(s);
  return s;
}

// Tile-assembly build, designed for PowerPoint Morph.
// Each tile keeps the same objectName across slides, so Morph slides it into place.
// scale: the 2x2 grid is 2048 px tiles with 1843 px between origins (10.01% overlap).
function tileStep(title, shown, exploded, caption, shade) {
  const s = pptx.addSlide();
  s.background = bg;
  s.addText(title, {
    x: M, y: 0.42, w: W - 2 * M, h: 0.72,
    fontFace: HEAD, fontSize: 30, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addShape(pptx.ShapeType.rect, { x: M, y: 1.2, w: 2.1, h: 0.055, fill: { color: BLUE } });

  const TILE = 2.25;                     // tile edge on the slide, inches
  const step = exploded ? TILE + 0.30 : TILE * 1843 / 2048;
  const span = step + TILE;
  const x0 = (W - span) / 2, y0 = 1.62;
  const grid = [[0, 0, 0], [1, 1, 0], [2, 1, 1], [3, 0, 1]];   // name, col, row

  if (shade && !exploded) {
    // the strip the neighbouring tiles share
    s.addShape(pptx.ShapeType.rect, {
      x: x0 + step, y: y0, w: TILE - step, h: span,
      fill: { color: BLUE, transparency: 62 },
    });
    s.addShape(pptx.ShapeType.rect, {
      x: x0, y: y0 + step, w: span, h: TILE - step,
      fill: { color: BLUE, transparency: 62 },
    });
  }
  grid.forEach(([n, c, r]) => {
    if (n >= shown) return;
    s.addImage({
      path: 'images/tile_' + n + '.jpg',
      x: x0 + c * step, y: y0 + r * step, w: TILE, h: TILE,
      objectName: 'tile' + n,
    });
  });
  s.addText(caption, {
    x: M, y: H - 1.02, w: W - 2 * M, h: 0.62,
    fontFace: BODY, fontSize: 15, italic: true, color: MUT, valign: 'top',
  });
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
  s.addText('They provided the slide-label images behind the OCR and metadata exercises.\nOther data today: public images, a CC0 synthetic set, and tiles acquired at LOCI.', {
    x: M + 0.45, y: 3.34, w: W - 2 * M - 0.9, h: 0.8,
    fontFace: BODY, fontSize: 17, italic: true, color: MUT, lineSpacingMultiple: 1.1,
  });

  s.addText([
    { text: 'Sara McArdle also shaped the software directly: the channel legend packages a Groovy script of hers (originally Pete Bankhead’s, from the 2022 QuPath Hackathon), and the subset classifier follows a pattern from another. Her FS2K course was the model for how the workshop pages are written.\n', options: { fontSize: 17, color: INK, paraSpaceAfter: 10 } },
    { text: 'Kristin Gallik, whose concept and scripts the Confusion Matrix grew from.  ·  Pete Bankhead and the QuPath team.  ·  CT-FIRE, CurveAlign, TACS and TWOMBLI for the fibre work.  ·  CytoMAP and QuBaLab for bringing clustering into QuPath.  ·  QUAREP-LiMi for the reporting standards.  ·  The image.sc community, where several of these features were first requested.\n', options: { fontSize: 17, color: INK, paraSpaceAfter: 10 } },
    { text: 'Much of this code was written with Claude (Anthropic) under close direction. It changed what one person could build; it did not change what still had to be checked.\n', options: { fontSize: 17, color: INK, paraSpaceAfter: 10 } },
    { text: 'Full credits: ' + URL + '/docs/acknowledgements.html', options: { fontSize: 17, bold: true, color: BLUE_DK } },
  ], { x: M, y: 4.35, w: W - 2 * M, h: 2.3, fontFace: BODY, valign: 'top' });
  pageNum(s);
}

content('What this hour covers', [
  'Simple first, complex last: quality-of-life tools, export, project-scale work, deep learning, microscope control',
  'There is time for a handful done properly, not sixteen done badly',
  'So every tool has a full written walkthrough, and a video to follow',
  'Three are demonstrated but not practised \u2014 I will say why each time; two more were Sara McArdle\u2019s session yesterday',
  'The second hour is optional, hands-on and self-directed \u2014 four tracks, or bring your own data',
], { kicker: 'For anyone who already uses QuPath and has run into its edges.',
     note: 'Most of these are under active development, written in bursts as I have time. Useful, not stable \u2014 treat them accordingly.' });

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
    { text: 'Already fixed: QPSC, the Confusion Matrix and the fibre tools are shown regardless — and Channel Names Viewer and Classify Object Subset were covered in Sara McArdle’s session yesterday.\n', options: { fontSize: 18, italic: true, color: MUT, paraSpaceAfter: 12 } },
    { text: 'I will read it now and adjust the running order.\n', options: { fontSize: 20, color: INK, paraSpaceAfter: 12 } },
    { text: 'If your tool does not make the cut, its walkthrough and video are on the site — and I am happy to sit down with you in the second hour.', options: { fontSize: 20, color: INK } },
  ], { x: M, y: 4.1, w: W - 2 * M, h: 2.2, fontFace: BODY, valign: 'top' });
  pageNum(s);
}

/* ================= 2 · Extensions, catalogs, and how this was built ================= */

/* ================= 3 · Simple wins ================= */

content('If you are not set up yet', [
  'Everything below is on the site, and you can do it during this hour if you need to',
  'Add one catalog: Extensions > Manage extensions > Manage extension catalogs > Add catalog',
  { t: 'github.com/uw-loci/qupath-catalog-mikenelson — adding it installs nothing, it shows you a list' },
  'Pick what you want, then restart QuPath. Nothing appears until you restart',
  'Two entries are large first-use downloads: QP-CAT 1.5–2.5 GB, DL Pixel Classifier 2–4 GB',
], { kicker: 'I am not going to walk through setup — the site has it, and I am here in the second hour.',
     note: 'Bring QuPath 0.7.0 or later. Four of the thirteen require it, and everything here is built and tested on it.' });

section('01', 'Five small tools', 'Dialog Manager · Channel Names · Classify Subset · Wizard Wand · Polyline Wand');

content('Dialog Manager, Channel Names, Classify Subset', [
  'Dialog Position Manager — remembers where your titled dialogs were and puts them back next session',
  { t: 'Recovers windows stranded on a monitor you have since unplugged, and points several workstations at one shared file so a facility opens with the same layout' },
  'Channel Names Viewer — a floating, colour-coded legend of the selected channels, so you are not re-reading the brightness dialog to find out which is which',
  'Classify Object Subset — run a saved classifier on a chosen subset, with a live count before you commit',
], { kicker: 'The least glamorous tools here.',
     note: 'The last two grew out of Groovy scripts from Sara McArdle — the channel legend from one originally written by Pete Bankhead at the 2022 QuPath Hackathon. She demonstrated both on Monday.' });
content('The two wands', [
  'Wizard Wand — like the built-in wand, with small holes filled and the boundary smoothed by default; hold still and the selection grows on its own',
  { t: 'Four colour-space modes: grayscale, RGB, subtle stain differences, or selecting by hue' },
  'Tune from selection: draw one area annotation the way you want it, and the wand derives its own settings',
  'Polyline Wand — QuPath’s brush and wand work on areas; this brings the same editing to lines',
  { t: 'Push a traced boundary outward, erase backwards from an endpoint, or cut one polyline in two — both halves keep class, name and colour' },
], { kicker: 'QuPath’s own wand is untouched — both of these install as separate tools you can ignore.',
     note: 'One stroke is one undo step, however long the boundary.' });
demo('Both wands, live', '▶  LIVE  ·  10 MIN',
  [
    'Wizard Wand: wand a structure, then tune from a hand-drawn area annotation and do it again',
    'Watch a selection grow on its own instead of dragging to cover it',
    'Polyline Wand: push a traced boundary outward, erase back from an endpoint, then switch mode to smooth a noisy stretch',
    'Scissors mode — cut one polyline in two, both halves keeping class, name and colour',
    'Compare the result against the built-in tools',
  ],
  'The two wands in one sitting — ten minutes. Static screenshots follow if the live version misbehaves.');

/* ================= 4 · Image export ================= */

section('02', 'QuIET — Image Export Toolkit', 'Publication figures, review images, and machine-learning datasets');

content('Five export categories, one wizard', [
  'Five export categories, one three-step wizard',
  { t: 'Rendered figures  ·  label masks  ·  raw pixel data  ·  image and label tile pairs  ·  per-object crops' },
  'A separate wizard builds multi-panel montage figures from several project images',
  'Batch across a project, without writing an export script',
], { kicker: 'Exporting one image is easy. Exporting forty the same way, with a scale bar, at a stated resolution, is not.' });

content('Why it is a reproducibility tool, not a convenience', [
  'Whatever you clicked in the wizard comes back out as a Groovy script that uses only the QuPath API',
  'Save it, version it, re-run it next year, send it to a collaborator who does not have QuIET',
  'QUAREP-LiMi reporting guidance appears beside the settings, driven by your project’s actual images',
  'Publication advice is shown before you export, not after review',
], { kicker: 'Catch “what magnification was that, and is there a scale bar?” while you can still fix it.',
     note: 'Montage figures are the exception: they record their settings, but the figure is rebuilt through the wizard.' });
/* ================= 5 · Project-scale housekeeping ================= */

section('03', 'OCR, Metadata Browser, Class Distribution, Tiles to Pyramid', 'Working on four hundred slides rather than four');

content('OCR for Labels', [
  'The case ID, stain and block number are already in your slide file, on the label image',
  'Text recognition and barcode scanning, straight into project metadata',
  'Save a template of field positions, then run it across the whole project',
  'Match against a vocabulary of the IDs you actually use, and OCR slips like 0-for-O get corrected',
], { note: 'Review before applying. Recognition on a photographed label is good, not correct.' });

content('Project Metadata Browser', [
  'Every image a row, every metadata key a column — sortable and filterable',
  'Edits stay in memory until you save, and everything is undoable',
  'Paste a column from a spreadsheet; pull values out of structured filenames',
  'Rename or remove a key across every image in one operation',
], { kicker: 'If you just ran label recognition across a few hundred slides, this is where you find out whether it worked.',
     note: 'Sorting by a recognised column makes the bad reads stand out as outliers.' });

content('Class Distribution', [
  'Live charts of how your annotation classes are distributed across the project',
  'And, separately, the training balance those annotations actually imply',
  'Charts update while you annotate, so the feedback arrives while you can still act',
  'Classes badly over- or under-represented are flagged',
], { note: 'Annotation count, annotation area, and implied training detections are three different numbers. For an object classifier it is the third that drives training. Flagged at twice, or half, the median class share.' });

tileStep('Four captures, one field of view', 4, true,
  'Each tile is a separate exposure. The stage moved between them, and every neighbouring pair was told to share about 10% of its width so there is common tissue to match on.', false);

tileStep('Where the stage said they were', 1, false,
  'The first tile lands at the position the stage reported.', false);

tileStep('Where the stage said they were', 2, false,
  'The second overlaps the first. That shared strip is the only evidence available for whether the stage was right.', false);

tileStep('Where the stage said they were', 4, false,
  'All four, placed on the recorded coordinates alone. Every neighbouring pair now shares a strip.', true);

figureDuo('Measure on the clearest channel, reuse on the rest',
  'Placed where the stage said it was',
  { path: 'images/stitch_if_nominal.jpg', w: 1380, h: 1110 },
  'Placed where the image content says it is',
  { path: 'images/stitch_if_registered.jpg', w: 1380, h: 1110 },
  'The same join through the same cells; only the tile positions differ. Positions were measured on DAPI, the channel with the clearest, best separated structure in this sample, and reused unchanged for the other two channels \u2014 so every channel stays aligned with every other. Nuclei blue, actin green, mitochondria red; the correction here is 7 px, about 4.6 \u00b5m.');

figurePair('Tiles to Pyramid: stitching two tiles',
  'As acquired: neighbouring tiles share a strip of the same tissue (shaded)',
  { path: 'images/stitch_ppm_unstitched.jpg', w: 3000, h: 565 },
  'Stitched: the join is placed by matching the image content in that strip',
  { path: 'images/stitch_ppm_stitched.jpg', w: 2766, h: 565 },
  'Pancreatic cancer, polarised light. The stage recorded this tile about 5 px (0.9 µm) away from where it really was — the worst of 17 seams in this grid, which ran to a 2.2 px median. Registration measured that from the overlap and closed every seam to under a pixel. It is a tick-box: left off, tiles go where the stage said.');

content('Tiles to Pyramid — how the mosaic is assembled', [
  'Every overlapping pair is measured against the image content, then all tiles are placed at once by least squares',
  { t: 'A spanning tree would keep 99 of the 180 neighbour edges on a 10×10 grid and throw away 81, so nothing is ever asked to close a loop' },
  'Each tile is also pulled toward its recorded stage position, so a tile with no accepted edges stays exactly where the stage put it',
  'The output is written chunk by chunk, and only the one to four tiles overlapping the current chunk are ever in memory',
  'Measured: 144 tiles (125 MP) stitch in the same 227 MB as 64 tiles (56 MP)',
], { kicker: 'Memory stops tracking the size of the mosaic, which is what lets thousands of tiles stitch on an ordinary machine.',
     note: 'Measured with the extension\u2019s own benchmark: 1024 px 16-bit tiles, 10% overlap. The older load-everything path needed 2\u20134 GB and ran out of memory past about 1600 tiles.' });

/* ================= 6 · Validation ================= */

section('04', 'Confusion Matrix', 'Classifier validation you can put in a paper');

demo('Reading the matrix', '▶  DEMO ONLY  ·  5 MIN',
  [
    'Click the largest off-diagonal cell — those cells highlight on the slide',
    '"The classifier is 87% accurate" becomes "it confuses these two things, for this reason"',
    'Across a project: per-image breakdown, with divergent images flagged automatically',
    'A flagged image points at the ground truth, the staining, or the classifier\u2019s generalisation \u2014 the breakdown tells you which',
  ],
  'Originated by Kristin Gallik — concept and initial scripts; built out at LOCI.  ·  Demo only: the repository is currently private.');

/* ================= 7 · DL cell and pixel classifiers ================= */

section('05', 'DL Pixel Classifier and QP-CAT', 'Pixel classification, cell phenotyping, and knowing when not to trust them');

content('Deep learning pixel classification', [
  'Same interaction as the built-in classifier: draw a few sparse regions per class',
  'The extension samples training tiles from what you marked — you are steering a sampler',
  'Brightfield and multi-channel fluorescence, with channel selection and intensity normalisation',
  'Train across several project images at once for representative sampling',
], { kicker: 'For when the built-in classifier is not enough: subtle textures, classes that differ by architecture rather than colour.' });

content('The two features that tell you when not to trust it', [
  'Full per-pixel confidence, not just the winning class — the model’s certainty rendered pixel by pixel',
  { t: 'The honest uncertainty is at the boundaries between classes — go and look at it' },
  'An out-of-distribution warning before inference, when an image no longer resembles the training data',
  { t: 'Catches the stain, exposure and sensor changes that would quietly degrade predictions; it will not catch subtle texture drift' },
  'When it fires, recalibrating to the current image needs no retraining at all',
], { kicker: 'Domain shift — a new scanner, a new stain, a new batch — is the practical problem, far more often than model architecture.',
     note: 'Try recalibration before you commit to retraining. It is cheap, and it costs you nothing to find out.' });
content('QP-CAT — multiplexed cell analysis', [
  'The full scientific Python stack embedded in QuPath. No conda, no command line — one click, 1.5–2.5 GB, 5–15 minutes, once',
  'Clustering, marker gating with suggested thresholds, spatial statistics, batch correction',
  'Label a small subset by hand and have the rest of the project labelled for you — no object classifier involved',
  'Draw a polygon around a region of the embedding and those cells are selected in the viewer',
  'Configure independent areas and no spatial graph edge crosses two TMA cores, so separate tissue stays separate',
], { kicker: 'The usual workflow loses the link back to the tissue. This keeps it.',
     note: 'Author’s own README, first line: many of the features are lightly tested or entirely untested. Treat results as a starting point.' });

/* ================= 8 · Fibre and texture ================= */

section('06', 'Fiber Analysis and TME-Quant', 'Collagen architecture, not just presence');

content('Why fibre architecture', [
  'Collagen is not simply present or absent — the arrangement carries the biology',
  'Wavy versus straightened; aligned versus isotropic; and how that changes at a boundary',
  'In breast pathology, straightened fibres running perpendicular to the tumour boundary act as tracks for invading cells',
  'Hazard ratios of 3.0–3.9 for disease-specific and disease-free survival, independent of grade, size, receptor and node status',
], { kicker: 'Conklin et al. 2011, American Journal of Pathology 178:1221.',
     note: 'The same wavy-to-straight axis turns up wherever collagen bears load, which is why the measures travel beyond breast.' });

twoCol('Two complementary tools',
  'Fiber Analysis — measure a zone',
  [
    'A band of chosen width inside, outside, or across an annotation boundary',
    'Straightness: wavy versus straightened fibres, per window and per ROI',
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

content('Please cite the methods', [
  'Both tools implement other people\u2019s methods \u2014 cite the methods, not just the tools',
  'CT-FIRE — Bredfeldt et al. 2014, Journal of Biomedical Optics 19(1):016007',
  'CurveAlign — LOCI, University of Wisconsin–Madison',
  'TACS — Provenzano et al. 2006, BMC Medicine 4:38; Conklin et al. 2011',
  'TWOMBLI — Wershof et al. 2021, Life Science Alliance 4(3):e202000880',
], { note: 'Fiber Analysis re-implements TWOMBLI\u2019s cheap metrics natively rather than bundling its FIJI plugins, so its fractal dimension and lacunarity diverge from TWOMBLI\u2019s by roughly 20\u201340%. Do not compare them with published TWOMBLI numbers.' });

/* ================= 9 · Microscope control ================= */

section('07', 'QPSC — QuPath Scope Control', 'The most complex thing here, and the reason for the rest');

content('Draw a box, the microscope acquires it', [
  'Draw a box around a region in QuPath. The stage moves, the tiles are captured and stitched, and the image appears back in your project',
  'Target specific annotations on a slide you already scanned',
  'Live camera view, stage map, saved points, and a virtual joystick',
  'Brightfield, multi-channel fluorescence, and combined passes on a single-camera scope',
]);

content('Why this changes the rest', [
  'The region you analysed is the region you acquire at high resolution',
  'Acquisition metadata arrives in the project, not in a folder that gets separated from the images',
  'Stitching is a step in this pipeline, and it works on its own, which is why it is in your hands-on hour',
], { note: 'Once acquisition is driven from QuPath, "acquisition software" and "analysis software" stop being separate places your data lives.' });

demo('Acquisition, live', '▶  SHOWN  ·  NOT YOURS TO RUN',
  [
    'Draw a bounding box on a slide overview',
    'Watch the stage move and the tiles come in',
    'Stitched pyramidal image lands back in the project, with its metadata',
    'Then open it and annotate it — the loop closes',
    'The stitching half — Tiles to Pyramid — you can install and use today, no microscope needed',
  ],
  'You watch this one: it needs a microscope, so nobody in the room runs it. About five minutes, with a recorded fallback if the network or the hardware disagrees.');

/* ================= 9b · Acknowledgements ================= */

/* ================= Questions ================= */

{
  const s = pptx.addSlide();
  s.background = bg;
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.3, h: H, fill: { color: BLUE } });
  s.addText('Questions?', {
    x: 1.05, y: 2.4, w: W - 2.1, h: 1.4,
    fontFace: HEAD, fontSize: 54, bold: true, color: BLUE_DK, valign: 'middle',
  });
  s.addText(URL, {
    x: 1.05, y: 3.9, w: W - 2.1, h: 0.6,
    fontFace: BODY, fontSize: 22, bold: true, color: BLUE, valign: 'middle',
  });
  s.addText('Everything after this slide is backup, kept for the questions it answers.', {
    x: 1.05, y: 4.6, w: W - 2.6, h: 0.5,
    fontFace: BODY, fontSize: 17, italic: true, color: MUT,
  });
  pageNum(s);
}

/* ================= Backup: not presented unless asked ================= */

section('B', 'Backup', 'Cut for time. Here if a question needs them');

content('The claim', [
  'QuPath is usually treated as post-acquisition analysis software',
  'Its extension mechanism reaches much further than that',
  'Acquisition → analysis → validation → publication, in one environment',
  { t: 'One project. One place your metadata lives. One place your figures come from' },
  'Sixteen extensions built at LOCI — thirteen you can install this afternoon',
], { note: 'Most of these are under active development, written in bursts as I have time. Useful, not stable — treat them accordingly.' });

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

content('What is underneath', [
  'Your choice of encoder, from lightweight convolutional networks to vision transformers',
  'Start from weights pretrained on histology rather than on everyday photographs',
  'Or from pathology foundation models, downloaded on demand',
  'Normalisation statistics sampled across the image, or reused from training, so every tile is scaled the same way',
], { note: 'Training really wants a GPU \u2014 on CPU it is hours instead of minutes, and CPU is the default install. That is why training is a demonstration and inference is the exercise.' });

content('What we are not covering', [
  'QuPath already has object classification — train on measurements, or threshold a single one',
  'We are not re-teaching it. Sara’s Monday session was the hi-plex classification half',
  'What follows are alternative mechanisms for getting a class onto a cell:',
  'Unsupervised clustering · rule-based marker gating · propagation from a small hand-labelled subset · applying an existing classifier to a chosen subset instead of everything',
  'Then: what those classified cells are actually telling you — which sit next to which, and whether that differs between images',
], { kicker: 'Two halves of the same workflow, in the right order — hers first, then this.',
     note: 'If you missed hers, the two extensions she demonstrated are documented on our site too.' });

content('How it is put together', [
  'QuPath talks to a small command server, which drives Micro-Manager, which drives the hardware',
  'Each instrument is described by its own YAML — the QuPath side carries no per-instrument code, only per-modality handlers',
  'Micro-Manager remains the device layer. We did not reinvent it',
], { kicker: 'The easy part is the QuPath extension. Budget your time for the microscope side.' });

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
    { text: 'A written walkthrough for every tool, videos to follow  ·  setup instructions  ·  sample data  ·  these slides\n', options: { fontSize: 19, color: INK, paraSpaceAfter: 10 } },
    { text: 'Add one catalog in QuPath, install only what interests you, and restart:\n', options: { fontSize: 19, color: INK, paraSpaceAfter: 6 } },
    { text: 'github.com/uw-loci/qupath-catalog-mikenelson\n', options: { fontSize: 18, bold: true, color: BLUE_DK, paraSpaceAfter: 4 } },
    { text: 'Adding it installs nothing — you pick from the list. Two entries download 1.5–4 GB.\n', options: { fontSize: 17, italic: true, color: MUT, paraSpaceAfter: 14 } },
    { text: 'Whatever we did not reach today, the walkthrough and the video are waiting for you.', options: { fontSize: 19, bold: true, color: BLUE_DK } },
  ], { x: 1.05, y: 2.95, w: W - 2.6, h: 2.8, fontFace: BODY, valign: 'top' });
  s.addText('Slide-label images courtesy of Sara McArdle and Zbigniew Mikulski, La Jolla Institute for Immunology. Other data: public images, a CC0 synthetic set, and tiles acquired at LOCI.', {
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
