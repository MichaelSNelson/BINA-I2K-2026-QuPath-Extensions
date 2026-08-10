# I2K Workshop — "Additional Details and Information for Participants" form

Paste-ready answers for the I2K organiser form. **Due no later than 1 September 2026.**

The boxes are plain-text, so these are written without markdown formatting. Keep this file
updated if the workshop changes — it is the canonical copy of what was submitted.

> **Decision (2026-08-09):** the form points at the workshop page URL only — no Drive links.
> The page can be updated after 1 September; the form cannot. Sample data and slides are
> announced as "will be posted there", and attendees are told to install only the extensions
> they actually care about.

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
Everything you need is on the workshop page, and it is the only link you have to keep:

https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/

Sample datasets, the slides, and any last-minute changes will be posted there. Please check it again in the week before the workshop.

Please do the following BEFORE you travel. Conference wifi will not cope with thirty people downloading multi-gigabyte environments at 10:30 on the day.

1. Install QuPath 0.7.0 or later from https://qupath.github.io/ . Nothing in this workshop runs on QuPath 0.6. If you already use 0.6 for other work, installing 0.7 alongside it is safe - QuPath keeps a separate extensions folder per version, so your existing setup is untouched.

2. Add the two extension catalogs. In QuPath: Extensions > Manage extensions > Manage extension catalogs > Add catalog, then add both of these URLs:
   https://github.com/uw-loci/qupath-catalog-mikenelson
   https://github.com/uw-loci/qupath-catalog-qpsc

3. Install the extensions you actually want, and RESTART QuPath. You do NOT have to install all of them. If one or two extensions are the reason you are coming, install just those - every one of them works on its own. The extension index lists all of them with a one-line description, where to install each from, and a full guide:
   https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/docs/extensions.html
   Please do not skip the restart. QuPath copies a new extension into place but does not load it until you restart, so the menu item will not appear until you do. This is the single most common problem we see.

4. If you want the multiplexed-imaging (QP-CAT) or deep-learning pixel classifier exercises, run their one-click environment setup AT HOME. Each downloads roughly 1.5-2.5 GB of embedded Python on first use. This is the step that will ruin your morning if you leave it until the day. Everything else installs in seconds.

5. Download the sample data for whatever you plan to try. The files will be posted on the workshop page, labelled by which exercise uses them, so you only need the ones you will actually use.

If you only have time for one thing, do steps 1 and 2.

Note: we will not demonstrate all sixteen tools live — there is time to do a handful properly rather than all of them badly. Every tool has a written walkthrough and a recorded video on the site, so you can work through anything we do not reach, at your own pace. There will be a vote at the start on which ones to prioritise.

Note: the first hour is a presentation and requires no preparation at all. The second hour is optional hands-on exploration. You are very welcome to come to the first hour only, and equally welcome to spend the second hour on your own data rather than ours - if you bring your own images, tell us what you are trying to do and we will point you at the right tool.
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
WORKSHOP PAGE - this is the only link you need to keep. Everything else is linked from it, and it is kept up to date, so please check it again in the week before the workshop.

https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/

The page carries the schedule, a setup guide, an index of every extension we cover, and a full instructional page with a step-by-step exercise for each one.

Direct links:

- Extension index - every extension with a one-line description, where to install it from, and its guide. Use this if you only care about one or two of them; you do not need to install everything.
  https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/docs/extensions.html

- Setup guide - do this before you travel. Includes a checklist and a troubleshooting section.
  https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/docs/setup.html

- Schedule, and the four optional hands-on tracks for the second hour.
  https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/docs/schedule.html

- Background: how QuPath extensions and catalogs work, and how this suite was built.
  https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/docs/00-extensions-catalogs-and-ai.html

- Source repository, if you would like to correct something or raise an issue.
  https://github.com/MichaelSNelson/BINA-I2K-2026-QuPath-Extensions

SOFTWARE TO INSTALL
- QuPath 0.7.0 or later: https://qupath.github.io/
- LOCI QuPath Extensions catalog: https://github.com/uw-loci/qupath-catalog-mikenelson
- QPSC Microscope Extensions catalog: https://github.com/uw-loci/qupath-catalog-qpsc
Add the two catalog URLs in QuPath under Extensions > Manage extensions > Manage extension catalogs > Add catalog, install the extensions you want, then restart QuPath. The extension index above tells you which catalog each one is in.

FILES TO DOWNLOAD
There will be sample datasets and the presentation slides to download. They will be posted on the workshop page above, labelled by which exercise uses them, so you only need to take the ones relevant to you. None of them are needed for the first hour. You are also very welcome to bring your own images instead and work on those in the second hour.

WALKTHROUGHS AND VIDEOS
We will not get through all sixteen tools in two hours, and we would rather say so now than rush at the end. Every tool has a complete written walkthrough on the site, and a video of it being carried out, so nothing depends on being in the room when a particular tool comes up. During the session there will be a quick vote on which tools you would most like to see demonstrated live, and we will follow it.
  https://michaelsnelson.github.io/BINA-I2K-2026-QuPath-Extensions/docs/walkthroughs.html

WHAT WE COVER
Thirteen QuPath extensions with hands-on exercises - publication-quality image export with QUAREP-LiMi reporting guidance, retrainable deep-learning pixel classification, clustering and spatial statistics for multiplexed imaging, slide-label OCR into project metadata, enhanced annotation tools, tile stitching, and several small quality-of-life tools. Three further tools are demonstrated live but not practised, because they need a microscope, a Windows-only analysis server, or a repository that is not yet public: microscope control and automated acquisition (QPSC), classifier validation with bootstrap confidence intervals, and collagen fibre/texture analysis. Each page says plainly which category it is in and why.
```

---

## Notes before you submit

- **Confirm the presenter email.** I used `msnelson8@wisc.edu` (your git/Docs account). Change it
  if I2K should contact you elsewhere.
- **Co-presenters.** The form only asks for a primary presenter. If others are presenting, that
  may need to go in one of the free-text boxes.
- **No Drive links in the form, by design.** The workshop page can be updated after the deadline;
  the form cannot. Post the slides and datasets on the page when they exist and attendees still
  get them.
- **Before 1 September**, make sure the workshop page reads well to a stranger — it is the only
  thing attendees will see. In particular the datasets should at least be *named* on the setup
  page, even if the files land later.
- **Keep this file in sync** with whatever is actually submitted, so we know what participants
  were told.
