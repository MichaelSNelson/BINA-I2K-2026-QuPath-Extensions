# I2K Workshop — "Additional Details and Information for Participants" form

Paste-ready answers for the I2K organiser form. **Due no later than 1 September 2026.**

The boxes are plain-text, so these are written without markdown formatting. Keep this file
updated if the workshop changes — it is the canonical copy of what was submitted.

> **Before submitting:** the Google Drive links must exist, or replace them with the live site
> URL only (see the note at the bottom). Do not submit `%%DRIVE_*%%` placeholders.

---

## First Name

```
Michael
```

## Last name

```
Nelson
```

## Email Address

```
msnelson8@wisc.edu
```

## Title of Workshop

```
New Extensions for QuPath: From simple (dialog manager, wizard wand, image export) to complex (DL cell and pixel classifiers, microscope control)
```

## Pre-Workshop Instructions — "What do your attendees need to do to prepare?"

```
Everything you need is on the workshop page:

https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/

Please do the following BEFORE you travel. Conference wifi will not cope with thirty people downloading multi-gigabyte environments at 10:30 on the day.

1. Install QuPath 0.7.0 or later from https://qupath.github.io/ . Nothing in this workshop runs on QuPath 0.6. If you already use 0.6 for other work, installing 0.7 alongside it is safe — QuPath keeps a separate extensions folder per version, so your existing setup is untouched.

2. Add the two extension catalogs. In QuPath: Extensions > Manage extensions > Manage extension catalogs > Add catalog, then add both of these URLs:
   https://github.com/uw-loci/qupath-catalog-mikenelson
   https://github.com/uw-loci/qupath-catalog-qpsc

3. Install the extensions listed on the setup page and RESTART QuPath. Extensions are not loaded on the fly — the menu items do not appear until you restart. This is the single most common problem we see.

4. If you plan to do the multiplexed-imaging or deep-learning exercises, run their one-click environment setup at home. Each downloads roughly 1.5-2.5 GB of Python environment on first run. This is the step that will ruin your morning if you leave it until the day.

5. Download the workshop datasets for the track you plan to do. They are listed on the setup page.

Full step-by-step setup, including a checklist you can tick off and a troubleshooting section:
https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/docs/setup.html

If you only have time for one thing, do steps 1 and 2.

Note: the first hour is a presentation and requires no preparation at all. The second hour is optional hands-on exploration. You are very welcome to come to the first hour only, and equally welcome to spend the second hour on your own data rather than ours — if you bring your own images, tell us what you are trying to do and we will point you at the right tool.
```

## Are there any Prerequisites?

```
Software:
- QuPath 0.7.0 or later (free, open source): https://qupath.github.io/
- Java is bundled with QuPath; no separate install needed.
- All extensions used in the workshop are free and open source (Apache-2.0 or GPL-3.0) and install through QuPath's built-in extension manager from the two catalogs listed above.

Hardware:
- A laptop capable of running QuPath on whole-slide images. 16 GB RAM recommended.
- Roughly 10 GB free disk space if you install the optional Python-backed extensions and download all the datasets. Much less if you pick a single track.
- A dedicated NVIDIA GPU is NOT required. One optional exercise (training a deep-learning pixel classifier) is demonstrated rather than practised precisely because it needs a GPU; the inference exercise runs on a normal laptop.
- One hands-on track (data wrangling: slide-label OCR, project metadata, tile stitching) needs no large downloads and no GPU. It is the safest choice on a modest laptop or a slow connection.

Knowledge:
- Prior QuPath experience is helpful but not required. If you have opened a project, drawn an annotation, and run cell detection, you will be comfortable.
- No programming is required. Some exercises produce Groovy scripts for you, but you never have to write one.

Nothing is required to attend the first hour, which is presentation and live demos.
```

## Links & Instructions for any resources for participants

```
WORKSHOP PAGE (start here — everything links from it)
https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/

This page carries the full schedule, a setup guide, and one instructional page per extension we cover, including a step-by-step exercise for each. It is kept up to date; if anything changes before the session, it changes there first.

Direct links:
- Setup guide (do this before you travel): https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/docs/setup.html
- Schedule and the four hands-on tracks: https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/docs/schedule.html
- How QuPath extensions and catalogs work, and how this suite was built: https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/docs/00-extensions-catalogs-and-ai.html
- Source repository (corrections and issues welcome): https://github.com/MichaelSNelson/BINA-I2K-2026-QuPath-Extensions

SOFTWARE
- QuPath 0.7.0+: https://qupath.github.io/
- LOCI QuPath Extensions catalog: https://github.com/uw-loci/qupath-catalog-mikenelson
- QPSC Microscope Extensions catalog: https://github.com/uw-loci/qupath-catalog-qpsc
Add the two catalog URLs in QuPath under Extensions > Manage extensions > Manage extension catalogs > Add catalog, install the extensions listed on the setup page, then restart QuPath.

SLIDES AND SAMPLE DATA (Google Drive)
%%DRIVE_FOLDER_URL%%

The Drive folder contains the presentation slides and five sample datasets, each labelled for the exercises that use it. The setup page says which dataset each hands-on track needs, so you only have to download what you will actually use. You are also welcome to bring your own images instead.

WHAT WE COVER
Thirteen QuPath extensions with hands-on exercises — publication-quality image export with QUAREP-LiMi reporting guidance, retrainable deep-learning pixel classification, clustering and spatial statistics for multiplexed imaging, slide-label OCR into project metadata, enhanced annotation tools, tile stitching, and several small quality-of-life tools. Three further tools are demonstrated live but not practised, because they need a microscope, a Windows-only analysis server, or a repository that is not yet public: microscope control and automated acquisition (QPSC), classifier validation with bootstrap confidence intervals, and collagen fibre/texture analysis. Each page says plainly which category it is in and why.
```

---

## Notes before you submit

- **Confirm the presenter email.** I used `msnelson8@wisc.edu` (your git/Docs account). Change it
  if I2K should contact you elsewhere.
- **Co-presenters.** The form only asks for a primary presenter. If others are presenting, that
  may need to go in one of the free-text boxes.
- **The Drive placeholder is the one blocker.** `%%DRIVE_FOLDER_URL%%` in the resources box must
  be a real link before submitting.
- **Safer alternative:** if the Drive folder will not be ready by 1 September, delete the Drive
  paragraph and submit the workshop page URL only. That page is under our control and can be
  updated any time after the form is submitted — the form cannot. Add the Drive link to the site
  when it exists and attendees still get it.
- **Keep this file in sync** with whatever is actually submitted, so we know what participants
  were told.
