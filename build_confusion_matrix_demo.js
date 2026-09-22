/*
 * Confusion Matrix demo deck -- a short, focused set of slides for demonstrating the
 * QuPath Confusion Matrix extension. Standalone companion to build_deck.js; same
 * palette, fonts and layout, so slides can also be lifted into the main deck.
 *
 * Build (same as build_deck.js):
 *   NODE_PATH=/home/msnelson/MicroscopyEducation/LOCI/node_modules node build_confusion_matrix_demo.js
 * Output: I2K_2026_Confusion_Matrix_Demo.pptx
 *
 * Content is sourced from docs/presented/confusion-matrix.md. The matrix figure is a
 * real confusion matrix on the workshop demo data; the amber "DEMO" slides carry a
 * dashed box where you drop a live screenshot of the extension window, so the segment
 * survives the live demo failing. Nothing below 14 pt; one idea per slide.
 */
const pptxgen = require('pptxgenjs');

const BLUE = '3674C1', BLUE_DK = '1F4C86', BLUE_TINT = 'E8F0FA', BLUE_PALE = 'F4F8FD';
const INK = '1F2933', MUT = '5A6675', AMBER = 'B26A00', WHITE = 'FFFFFF';
const HEAD = 'Trebuchet MS', BODY = 'Calibri';
const URL = 'michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions';
const W = 13.33, H = 7.5, M = 0.62;

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Michael S. Nelson';
pptx.company = 'LOCI, University of Wisconsin-Madison';
pptx.title = 'Confusion Matrix -- demo';

let n = 0;
const bg = { color: WHITE };
function pageNum(s) { n += 1; s.addText(String(n), { x: W - 1.0, y: H - 0.62, w: 0.5, h: 0.34, fontFace: BODY, fontSize: 14, color: 'A8B2BF', align: 'right' }); }

function section(num, title, sub) {
  const s = pptx.addSlide(); s.background = bg;
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 1.55, w: W, h: 3.4, fill: { color: BLUE_TINT } });
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 1.55, w: 0.22, h: 3.4, fill: { color: BLUE } });
  s.addText(num, { x: M, y: 1.85, w: 3.2, h: 1.0, fontFace: HEAD, fontSize: 40, bold: true, color: BLUE, valign: 'middle' });
  s.addText(title, { x: M, y: 2.85, w: W - 2 * M, h: 0.95, fontFace: HEAD, fontSize: 40, bold: true, color: BLUE_DK, valign: 'middle' });
  if (sub) s.addText(sub, { x: M, y: 3.82, w: W - 2 * M - 1.0, h: 0.9, fontFace: BODY, fontSize: 19, color: MUT, valign: 'top' });
  s.addText(URL, { x: M, y: H - 0.72, w: 9, h: 0.4, fontFace: BODY, fontSize: 14, color: 'A8B2BF' });
  pageNum(s); return s;
}

function content(title, bullets, opts = {}) {
  const s = pptx.addSlide(); s.background = bg;
  s.addText(title, { x: M, y: 0.42, w: W - 2 * M, h: 0.72, fontFace: HEAD, fontSize: 30, bold: true, color: BLUE_DK, valign: 'middle' });
  s.addShape(pptx.ShapeType.rect, { x: M, y: 1.2, w: 2.1, h: 0.055, fill: { color: BLUE } });
  if (opts.kicker) s.addText(opts.kicker, { x: M, y: 1.36, w: W - 2 * M, h: 0.42, fontFace: BODY, fontSize: 17, italic: true, color: MUT });
  const top = opts.kicker ? 1.92 : 1.62;
  s.addText(
    bullets.map(b => typeof b === 'string'
      ? { text: b, options: { bullet: { code: '2022' }, fontSize: 20, color: INK, paraSpaceAfter: 12 } }
      : { text: b.t, options: { bullet: { code: '25AA' }, indentLevel: 1, fontSize: 17, color: MUT, paraSpaceAfter: 8 } }),
    { x: M + 0.08, y: top, w: W - 2 * M - 0.1, h: H - top - (opts.note ? 1.5 : 0.9), fontFace: BODY, valign: 'top', lineSpacingMultiple: 1.05 }
  );
  if (opts.note) {
    s.addShape(pptx.ShapeType.rect, { x: M, y: H - 1.32, w: W - 2 * M, h: 0.62, fill: { color: BLUE_PALE }, line: { color: BLUE, width: 0.75 } });
    s.addText(opts.note, { x: M + 0.22, y: H - 1.32, w: W - 2 * M - 0.44, h: 0.62, fontFace: BODY, fontSize: 16, bold: true, color: BLUE_DK, valign: 'middle' });
  }
  pageNum(s); return s;
}

// one large figure with a caption
function figureOne(title, img, caption) {
  const s = pptx.addSlide(); s.background = bg;
  s.addText(title, { x: M, y: 0.42, w: W - 2 * M, h: 0.72, fontFace: HEAD, fontSize: 30, bold: true, color: BLUE_DK, valign: 'middle' });
  s.addShape(pptx.ShapeType.rect, { x: M, y: 1.2, w: 2.1, h: 0.055, fill: { color: BLUE } });
  const fw = W - 2 * M, fh = fw * img.h / img.w, top = 1.7;
  s.addImage({ path: img.path, x: M, y: top, w: fw, h: fh });
  s.addText(caption, { x: M, y: top + fh + 0.14, w: W - 2 * M, h: 0.8, fontFace: BODY, fontSize: 15, italic: true, color: MUT, valign: 'top' });
  pageNum(s); return s;
}

// amber DEMO slide: tag, title, steps, a dashed box for a live screenshot, menu-path footer
function demo(title, steps, menuPath, opts = {}) {
  const s = pptx.addSlide(); s.background = bg;
  s.addShape(pptx.ShapeType.roundRect, { x: M, y: 0.45, w: 2.55, h: 0.5, rectRadius: 0.1, fill: { color: 'FBF1E0' }, line: { color: AMBER, width: 1 } });
  s.addText('LIVE DEMO', { x: M, y: 0.45, w: 2.55, h: 0.5, fontFace: HEAD, fontSize: 16, bold: true, color: AMBER, align: 'center', valign: 'middle' });
  s.addText(title, { x: M, y: 1.12, w: W - 2 * M, h: 0.75, fontFace: HEAD, fontSize: 30, bold: true, color: BLUE_DK, valign: 'middle' });
  s.addShape(pptx.ShapeType.rect, { x: M, y: 1.95, w: 2.1, h: 0.055, fill: { color: BLUE } });
  const colW = opts.shot === false ? (W - 2 * M) : 6.4;
  s.addText(steps.map(t => ({ text: t, options: { bullet: { code: '2022' }, fontSize: 18, color: INK, paraSpaceAfter: 12 } })),
    { x: M + 0.08, y: 2.3, w: colW - 0.1, h: 3.2, fontFace: BODY, valign: 'top', lineSpacingMultiple: 1.03 });
  if (opts.shot !== false) {
    const bx = M + colW + 0.3, bw = W - M - bx, by = 2.3, bh = 3.1;
    s.addShape(pptx.ShapeType.rect, { x: bx, y: by, w: bw, h: bh, fill: { color: BLUE_PALE }, line: { color: BLUE, width: 1, dashType: 'dash' } });
    s.addText(opts.shotLabel || 'drop a live screenshot of the\nConfusion Matrix window here', { x: bx, y: by, w: bw, h: bh, fontFace: BODY, fontSize: 13, italic: true, color: MUT, align: 'center', valign: 'middle' });
  }
  s.addShape(pptx.ShapeType.rect, { x: M, y: H - 1.32, w: W - 2 * M, h: 0.62, fill: { color: 'FBF1E0' }, line: { color: AMBER, width: 0.75 } });
  s.addText([{ text: 'Menu:  ', options: { bold: true, color: AMBER } }, { text: menuPath, options: { color: INK } }],
    { x: M + 0.22, y: H - 1.32, w: W - 2 * M - 0.44, h: 0.62, fontFace: BODY, fontSize: 16, valign: 'middle' });
  pageNum(s); return s;
}

const IMG_MATRIX = { path: 'images/confusion-matrix/matrix.png', w: 3000, h: 1280 };

/* ---------------- slides ---------------- */

section('Confusion Matrix', 'Accuracy you can cite',
  'A demo segment. The repository is currently private, so this is shown live rather than installed by attendees.');

content('You trained a classifier. How good, exactly?', [
  'It looks good in the viewer. That is an impression, not a result.',
  'How accurate -- and measured on how many cells? 95% from 40 cells and 95% from 4000 are not the same claim.',
  'Which classes get confused with which, and is it the classifier or the ground truth that is wrong?',
], { kicker: 'You mark a sample of cells with their correct class; the extension compares that to the classifier.',
     note: 'A classifier accuracy without a confidence interval, and without a look at what is being confused, is not yet a result.' });

content('What it gives you', [
  'Per-class precision, recall, specificity and F1, plus overall accuracy -- each with a bootstrap 95% confidence interval.',
  'An N x N confusion matrix for any number of classes, including composite classes like "Macrophage: FoxP3".',
  'Interactive: click any matrix cell to highlight exactly those cells in the QuPath viewer.',
  'CSV export of the matrix and every metric, for downstream figures.',
  'Probability metrics for OpenCV ML classifiers: log-loss, Brier, AUC-ROC, PR-AUC, and calibration.',
  { t: 'Ground truth from point annotations or classified area annotations -- point-clicking every cell is often impractical.' },
]);

figureOne('The matrix, on the workshop demo data',
  IMG_MATRIX,
  'Rows are the ground truth, columns the prediction; the diagonal is correct, off-diagonal is confusion. Here a deliberately crude single-marker gate reads some T cells as tumor (the cd8_t / helper_t -> tumor cells) because the 5 um cell expansion picks up PanCK from the neighbouring tumour nest. Right panel: errors only.');

demo('Analyze Current Image', [
  'The N x N matrix appears, with per-class precision, recall, specificity and F1 beside it.',
  'Pick a class with a wide confidence interval; count how many ground-truth cells it has. The CI is what makes "95%" honest.',
], 'Extensions > Confusion Matrix > Analyze Current Image...');

demo('Click the biggest off-diagonal cell', [
  'Those cells highlight in the viewer. This is the moment worth watching.',
  '"The classifier is 87% accurate" becomes "it confuses these two things, for this visible reason" -- the sentence that actually gets a classifier fixed.',
  'It is also where you find out how often the ground truth itself was wrong.',
], 'Click any cell of the matrix');

demo('Analyze Project, with outliers', [
  'Aggregate across images, with a per-image breakdown of each image\'s contribution.',
  'Images whose accuracy diverges are flagged as outliers automatically.',
  'Open a flagged image and look for the cause: the ground-truth labeling, the tissue or staining, or the classifier failing to generalise.',
], 'Extensions > Confusion Matrix > Analyze Project...');

content('Probability metrics (OpenCV ML classifiers)', [
  'Not just whether the top class is right, but whether the predicted probabilities are trustworthy.',
  'Log-loss, Brier score, AUC-ROC, PR-AUC, and a per-class calibration curve.',
  'A model that is 95% confident and 70% correct is a different problem from one that is simply inaccurate -- and it needs a different fix.',
], { note: 'Pairs with the DL Pixel Classifier (is the deep model really better?) and Class Distribution (the imbalance behind wide intervals).' });

content('Availability, and the one thing to take away', [
  'Repository is currently private, so there is no jar to install today -- this is why it is a demo, not a hands-on exercise. Ask us for access.',
  'No hardware or server requirement; it would otherwise sit in the hands-on hour.',
], { kicker: 'The extension itself is ready; only distribution is pending.',
     note: 'Report an interval. Accuracy with a confidence interval and a look at what is confused is a five-minute job, not a research project.' });

pptx.writeFile({ fileName: 'I2K_2026_Confusion_Matrix_Demo.pptx' }).then(f => console.log('WROTE', f));
