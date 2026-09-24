/*
 * composite_marker_classes.groovy -- turn six flat cell types into a multiplex class lattice.
 *
 * The cells in the synth multiplex project ship UNCLASSIFIED -- the six type names
 * (tumor, fibroblast, cd8_t, helper_t, b_cell, macrophage) are on the ground-truth point
 * annotations, and the walkthroughs that put them on cells use a classifier to do it.
 * Either way, six mutually exclusive names are not the shape highly multiplexed data has.
 *
 * This script gates every marker independently, using the Otsu routine copied from
 * 08_apply_otsu_gate.groovy (which gates six markers; this adds Ki67, read from the
 * nucleus). It then names each cell after ALL the markers it is positive for: "CD3: CD8",
 * "PanCK: Ki67", "Ki67: CD3" and so on. On tme_00 that gives 19 classes, 13 of them
 * combining two or more markers.
 *
 * Open the synth multiplex project, open one image, and Run. Run > Run for project does
 * all eight.
 *
 * ---------------------------------------------------------------------------
 * THIS OVERWRITES CELL CLASSIFICATIONS. It replaces whatever a classifier has put on the
 * cells. It does NOT touch the ground-truth point annotations, which are annotations, not
 * detections, so nothing you need for the other walkthroughs is lost.
 *
 * To put the six type classes back: Automate > Project scripts > apply_trained_classifier.
 * To discard the change instead, close the image and answer No when QuPath asks to save --
 * but note that Run > Run for project SAVES each image as it goes, so after a project run
 * that escape route is gone and you need apply_trained_classifier (also for the project).
 * ---------------------------------------------------------------------------
 *
 * ==== USER-EDITABLE PARAMETERS ==========================================
 */
// Markers to gate, in the order they appear in a composite class name.
MARKERS = ["PanCK", "Ki67", "aSMA", "CD3", "CD8", "CD20", "CD68"]

// Which measurement compartment each marker is read from. Ki67 is nuclear, so reading it
// in the Cell compartment dilutes it with cytoplasm that has no signal; the rest are
// surface or cytoplasmic. "Cell", "Cytoplasm" and "Nucleus" all exist in this project.
COMPARTMENT = ["Ki67": "Nucleus"].withDefault { "Cell" }

// Cells positive for nothing are left unclassified, as in 08_apply_otsu_gate.groovy.
// Set this to a name (e.g. "Negative") to give them a class of their own instead.
NEGATIVE_CLASS = null

// Combinations rarer than this are still created; this only controls how many rows the
// summary prints at the end. The eight bundled images top out at 20 classes, so raise or
// lower this only if you point the script at richer data.
SUMMARY_ROWS = 40
// ========================================================================

import qupath.lib.objects.classes.PathClass
import static qupath.lib.gui.scripting.QPEx.*

// Otsu threshold on a 256-bin histogram, clipped at the 99.5th percentile. Copied
// unchanged from 08_apply_otsu_gate.groovy so the gates agree with the scored numbers.
double otsuThreshold(double[] vals) {
    if (vals.length == 0) return 0.0
    double[] sorted = vals.clone(); Arrays.sort(sorted)
    double hi = sorted[(int) Math.min(sorted.length - 1, Math.round(0.995 * (sorted.length - 1)))]
    if (hi <= 0) hi = 1.0
    int B = 256
    double[] p = new double[B]
    double tot = vals.length
    for (double v : vals) {
        double c = Math.max(0.0, Math.min(hi, v))
        int b = (int) Math.min(B - 1, Math.floor(c / hi * B))
        p[b] += 1.0 / tot
    }
    double mt = 0.0
    for (int i = 0; i < B; i++) mt += (i + 0.5) * p[i]
    double w = 0.0, mu = 0.0, best = -1.0
    int k = 0
    for (int i = 0; i < B; i++) {
        w += p[i]; mu += (i + 0.5) * p[i]
        double denom = w * (1.0 - w)
        if (denom <= 0) continue
        double sb = Math.pow(mt * w - mu, 2) / denom
        if (sb > best) { best = sb; k = i }
    }
    return (k + 1.0) / B * hi
}

def cells = new ArrayList<>(getCellObjects())
if (cells.isEmpty()) {
    println "No cells in this image -- open an image from the synth multiplex project first."
    return
}

// One Otsu threshold per marker, over this image only.
def thr = [:]
for (m in MARKERS) {
    def key = "${COMPARTMENT[m]}: ${m} mean"
    def vals = cells.collect { c ->
        def v = c.getMeasurementList().get(key)
        (v == null || Double.isNaN(v)) ? 0.0 : v
    } as double[]
    thr[m] = otsuThreshold(vals)
}

// Name each cell after every marker it is positive for, in MARKERS order so that one
// combination is always one class.
def counts = [:].withDefault { 0 }
def markerPositive = [:].withDefault { 0 }
int nNegative = 0
for (cell in cells) {
    def ml = cell.getMeasurementList()
    def positives = []
    for (m in MARKERS) {
        def v = ml.get("${COMPARTMENT[m]}: ${m} mean")
        if (v != null && !Double.isNaN(v) && v >= thr[m]) {
            positives << m
            markerPositive[m]++
        }
    }
    if (positives.isEmpty()) {
        nNegative++
        cell.setPathClass(NEGATIVE_CLASS == null ? null : PathClass.fromString(NEGATIVE_CLASS))
        if (NEGATIVE_CLASS != null) counts[NEGATIVE_CLASS]++
    } else {
        // fromCollection keeps the order it is given, so MARKERS order is the canonical one.
        def pc = PathClass.fromCollection(positives)
        cell.setPathClass(pc)
        counts[pc.toString()]++
    }
}
fireHierarchyUpdate()

// ---- summary -------------------------------------------------------------
// Paste this block into the guide discussion; it is everything needed to describe
// the result without guessing at it.
def imageName = getCurrentServer().getMetadata().getName()
println "=".multiply(70)
println "composite_marker_classes.groovy -- ${imageName}"
println "=".multiply(70)
println "cells: ${cells.size()}   classified: ${cells.size() - nNegative}   negative for every marker: ${nNegative}"
def multi = counts.keySet().count { it.contains(":") }
println "distinct classes: ${counts.size()} (${multi} with two or more markers)"
println "  the Class Visibility panel counts Unclassified too, so its Spread denominator "+
        "will read ${counts.size() + (nNegative > 0 ? 1 : 0)}"
println ""
println "Otsu thresholds and marker prevalence:"
for (m in MARKERS) {
    def pct = 100.0 * markerPositive[m] / cells.size()
    println String.format("  %-6s %-9s thr=%8.2f   positive in %5d cells (%5.1f%%)",
            m, "(${COMPARTMENT[m]})", thr[m], markerPositive[m], pct)
}
println ""
println "Classes, commonest first:"
def sorted = counts.entrySet().sort { -it.value }
sorted.take(SUMMARY_ROWS).each { e ->
    def nComp = e.key.split(":").length
    println String.format("  %5d  %-40s (%d marker%s)", e.value, e.key, nComp, nComp == 1 ? "" : "s")
}
if (sorted.size() > SUMMARY_ROWS) {
    println "  ... and ${sorted.size() - SUMMARY_ROWS} rarer combinations"
}
println ""
println "Component spread -- how many of the ${counts.size()} classes each marker appears in:"
for (m in MARKERS) {
    def inClasses = counts.keySet().count { it.split(":")*.trim().contains(m) }
    println String.format("  %-6s in %2d of %2d classes", m, inClasses, counts.size())
}
println ""
println "Next: Extensions > Class Visibility > Show panel"
