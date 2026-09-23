---
layout: default
title: QPSC - QuPath Scope Control (presented only)
---

# QPSC — QuPath Scope Control

> **Shown, not run.** QPSC drives real microscope hardware, so there is nothing to install and
> nothing to follow along with. Watch the demo; these links are for afterwards.

QPSC lets you control a microscope from QuPath: pick a region on a slide overview, and it
acquires that region at high resolution and brings the result back into the project.

> **Walkthrough video:** %%VIDEO_QPSC%%

---

## Where to read more

**QPSC is not one repository, because it is not one program.** QuPath talks to a Python command
server, the server talks to Micro-Manager, and Micro-Manager drives the hardware. Each layer is
developed and documented separately, which is why there are several links rather than one. Start
at the system overview — it says which of the others you actually need.

| Repository | What it covers |
|---|---|
| **[uw-loci/QPSC](https://github.com/uw-loci/QPSC)** | **Start here.** System overview and installation across all the parts |
| [qupath-extension-qpsc](https://github.com/uw-loci/qupath-extension-qpsc#readme) | The QuPath end: menus, workflows, settings |
| [microscope_command_server](https://github.com/uw-loci/microscope_command_server) | The Python server QuPath sends commands to |
| [microscope_control](https://github.com/uw-loci/microscope_control) | Hardware control beneath the server |
| [microscope_configurations](https://github.com/uw-loci/microscope_configurations) | Per-instrument configuration files |
| [Micro-Manager](https://micro-manager.org/) and [Pycro-Manager](https://pycro-manager.readthedocs.io/) | The acquisition stack it builds on. Not ours, and worth knowing first |

**Requires** QuPath 0.7.0+, Micro-Manager, Pycro-Manager, a Python command server, and a
microscope. Distributed through the **QPSC Microscope Extensions** catalog.
