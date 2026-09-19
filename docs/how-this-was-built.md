---
layout: default
title: How this suite was built
---

# How this suite was built

Fourteen extensions is not a normal output for one person. It is fair to ask how, and the
honest answer is that a large fraction of the code was written by an LLM coding agent
(Claude Code) under close human direction. Since several of you will go home and try this,
this section covers what worked and what did not.

### What works

**Give the model the API, not your memory of the API.** The single biggest failure mode is
a confidently hallucinated QuPath method that does not exist. The fix is mechanical: point
the agent at the actual QuPath source, and require it to compile. A build that fails is a
cheap, correct, automatic signal. An agent that cannot run `./gradlew build` is an agent
guessing.

**Write the documentation first, and treat it as the specification.** Several of these
extensions began as a README describing a tool that did not exist yet. That README then
constrained the implementation, and disagreements between doc and code were treated as
bugs in whichever was wrong. It is far easier to notice "this workflow makes no sense for
a pathologist" in prose than in a 900-line dialog class.

**Keep a persistent map of the codebase.** Most of these repos contain a `CLAUDE.md` (project
conventions, gotchas, build commands) and several contain a `codemap/` directory. These
exist because a fresh agent session otherwise re-derives the same architecture every time,
badly. Writing down "the dialog layer must never touch the hierarchy directly" once saves
you from re-litigating it weekly.

**Automate the compatibility check.** When QuPath 0.7 landed, checking fourteen extensions
by hand against a changed API was not realistic. The
[`qupath-update-extension-validator`](https://github.com/MichaelSNelson/qupath-update-extension-validator)
points at N extension repos and two QuPath versions and produces a per-repo
BROKEN / DEPRECATED / OPPORTUNITY worklist by inspecting bytecode with `javap`. This is
the kind of tedious, mechanical, high-value work that agents are genuinely good at, and
it is checkable, because the compiler agrees or does not.

**Small, reviewable, releasable increments.** Every extension here ships as versioned
GitHub releases with a changelog. Anything that cannot be released cannot be validated by
a user, and anything unvalidated is not finished.

### What does not work

**"Build me an extension that does X."** You get something that compiles and is wrong in
ways you will discover in front of an audience. Scope has to be decomposed by a person who
understands the science.

**Trusting the model on scientific correctness.** An agent will implement a bootstrap
confidence interval that runs, produces plausible numbers, and resamples the wrong axis.
Statistical and image-analysis correctness needs a human who knows the method, plus tests
with known answers. Several tools here carry explicit "lightly tested" warnings for
exactly this reason, and you should read those warnings as sincere.

**Trusting it on GUI behaviour.** Nothing catches a dialog that opens off-screen, a
progress bar that never finishes, or a control that is unreachable at 4K scaling except a
human opening the application. Notably, the Dialog Position Manager extension exists
*because* of this class of bug.

**Licensing by vibes.** QuPath's core is GPL-3.0. Linking it generally makes your extension
GPL-3.0 too, which is why some tools here are GPL and others, which avoid that linkage,
are Apache-2.0. Get this wrong and you cannot legally distribute your work. It is worth
twenty minutes of a human's attention per project.

### The honest summary

AI assistance changed the *cost* of building a QuPath extension by roughly an order of
magnitude, and changed the *correctness* of one not at all. The bottleneck moved from
"can I write this Java" to "do I know what this tool should do, and can I tell when it is
lying to me." That is a better bottleneck to have, but it is still a bottleneck, and it is
still yours.

---

---

This is the background to the talk, not something you need in order to use any of the tools.
Back to the [extension index](extensions.md) or the [setup guide](setup.md).
