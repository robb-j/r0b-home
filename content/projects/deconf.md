---
title: Deconf
subtitle: A virtual conference framework and platform
coverImage: /img/projects/deconf.png
meta:
  image: /img/projects/deconf.png
  summary: A virtual conference framework and platform
date: 2022-10-01
draft: true
images:
  - src: ./src/img/deconf/cr-01.png
    alt: The original virtual conference, Climate:Red
  - src: ./src/img/deconf/cr-02.png
    alt: The schedule for Climate:Red, a global virtual conference about climate change
  - src: ./src/img/deconf/cr-03.png
    alt: Prince Charles adressing conference attendees at Climate:Red
  - src: ./src/img/deconf/deconf-01.png
    alt: The deconf UI component library in storybook.js
  - src: ./src/img/deconf/deconf-02.png
    alt: The deconf API library documentation
  - src: ./src/img/deconf/moz-01.png
    alt: The MozFest Schedule homepage
  - src: ./src/img/deconf/moz-02.png
    alt: The live Opening Circle at MozFest 2022
  - src: ./src/img/deconf/moz-03.png
    alt: The hidden time-machine development tool built for MozFest
  - src: ./src/img/deconf/pdc-01.png
    alt: The Participatory Design Conference 2022 schedule
  - src: ./src/img/deconf/pdc-02.png
    alt: The PDC Places schedule, with sessions all around the world
---

# Deconf

## Overview

Deconf is a codename for work towards improving global virtual conferences.
It started off as a climate conference with the [IFRC](https://solferinoacademy.com),
was made into libraries that were used to run the virtual [MozFest](https://www.mozillafestival.org/) schedule
and has been continously improved from running more and more conferences.
More recently it's been used to host the [Participatory Design Conference](https://pdc2022.org).

{% imagegrid images %}

## The conferences

### Climate:Red

Climate:Red was the prototypical conference for the project.
It was a virtual conference concieved in 2019to connect [IFRC](https://www.ifrc.org)
volunteers around the world around the climate crisis.
It was designed to be cross-cutting to break down the usual barriers between different parts of the organisation.

{% figure images[1].src, 'The Climate:Red schedule, the home of the conference' %}

The conference featured was a 36 hour continuous conference with official sessions
interspersed with crowd-sourced volunteer-ran workshops to share their experiences.
It was run in the languages the hosts wanted to run their sessions in
and the official sessions were live-interpreted into English, French, Spanish and Arabic.

There was also a real-time coffee chat, where atendees could pick the themes they were interested in
and languages they speak and they would be paired with another volunteer to have a video chat right away.

### MozFest

MozFest 2021 was the next deconf conference that ran virtually and in Amsterdam from March 8th to March 19th 2021.

After Climate:Red, the conference app was converted into two libraries, one for the frontend and one for the backend.
It took the experiences of the conference and logic to host it
and packaged it up for more conferences to be created with them.
The frontend library, [@openlab/deconf-ui-toolkit](https://www.npmjs.com/package/@openlab/deconf-ui-toolkit),
provides Vue.js components and logic to create a web app.
The backend library, [@openlab/deconf-api-toolkit](https://www.npmjs.com/package/@openlab/deconf-api-toolkit),
bundles up the Node.js logic for registration, attendance and conference information.

{% figure images[5].src, 'The MozFest Plaza, reimagined from the Climate:Red atrium with more widgets' %}

MozFest 2021 was then written using these deconf libraries. This took the learnings from Climate:Red and
allowed them to be used for Mozilla's first virtual conference.

### Planet:Red

After MozFest, Climate:Red was rebuilt using the very frameworks that were made from it.
It was a virtual conference for the IFRC to connect volunteers and form an agenda
that the organisation took to [Cop26](https://ukcop26.org).

## The libraries

### deconf-shared

[deconf-shared](https://github.com/digitalinteraction/deconf-shared)
is a shared set of TypeScript types that both the UI and API frameworks share.
It allows the front and back-end to share a common set of types and interfaces
and makes sure everything lines up.

### deconf-ui

[deconf-ui](https://github.com/digitalinteraction/deconf-ui-toolkit)
encapsulates the key front-end logic required to create your own virtual conference.

{% figure images[3].src, 'The UI storybook. Used to showcase, discover and develop the Vue.js components' %}

To explore the components, they are split up into stories.
A story describes the component and provide tools to run it in an isolated environment.
Each component has a story which lets it be developed in isolation.
The storybook is then deployed as a static website which lets component-users
find the components they want to use and how to find them.

### deconf-api

[deconf-api](https://github.com/digitalinteraction/deconf-api-toolkit)
wraps up the backend logic needed to host a virtual conference.
This includes the logic for the http routes and sockets needed
and helpers to pull information from git repos and [pretalx](https://pretalx.com/).

{% figure images[4].src, 'The API documentation, generated using typedoc. Used to explore the API' %}

This documentation is directly generated using [typedoc](https://typedoc.org), so you know it is up-to-date.
The types are shipped alongside the UI and API libraries so there's help inside IDEs too.

## Links

- [The homepage](https://github.com/digitalinteraction/deconf)
- [Climate:Red](https://climate-red.openlab.dev)
- [MozFest](https://schedule.mozillafestival.org)
- [PDC](https://schedule.pdc2022.org)
