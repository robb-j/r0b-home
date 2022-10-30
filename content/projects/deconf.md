---
title: Deconf
subtitle: A virtual conference framework and platform
coverImage: /img/projects/deconf.png
meta:
  image: /img/projects/deconf.png
  summary: A virtual conference framework and platform
date: 2022-10-01
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

Deconf is a codename for work towards improving virtual conferences.
It started off as a global climate conference with the [IFRC](https://solferinoacademy.com),
was made into libraries that were used to run the virtual [MozFest](https://www.mozillafestival.org/) schedule
and has been continously improved from running more and more conferences.
Most recently, it's been used to host the [Participatory Design Conference](https://pdc2022.org).

{% imagegrid images %}

## The conferences

### Climate:Red

Climate:Red was the prototypical conference for the project.
It was a virtual conference concieved in 2019 to connect [IFRC](https://www.ifrc.org)
volunteers around the world around the climate crisis.
It was designed to be cross-cutting to break down the usual barriers between different parts of the organisation.

{% figure images[1].src, 'The Climate:Red schedule, the home of the conference.' %}

The conference featured was a 36 hour continuous conference with official sessions
interspersed with crowd-sourced volunteer-ran workshops to share their experiences.
It was run in the languages the hosts wanted to run their sessions in
and the official sessions were live-interpreted into English, French, Spanish and Arabic.

There was also a real-time coffee chat, where atendees could pick the themes they were interested in
and languages they speak and they would be paired with another volunteer to have a video chat right away.

### MozFest

MozFest 2021 was the next deconf conference that ran virtually and in Amsterdam from March 8th to March 19th 2021.

{% figure images[5].src, 'The MozFest \'22 Plaza, reimagined from the Climate:Red atrium with more widgets.' %}

After Climate:Red, the conference app was converted into two libraries, one for the frontend and one for the backend.
It took the experiences of the conference and logic to host it
and packaged it up for more conferences to be created with them.
The frontend library, [@openlab/deconf-ui-toolkit](https://www.npmjs.com/package/@openlab/deconf-ui-toolkit),
provides Vue.js components and logic to create a web app.
The backend library, [@openlab/deconf-api-toolkit](https://www.npmjs.com/package/@openlab/deconf-api-toolkit),
bundles up the Node.js logic for registration, attendance and conference information.

MozFest 2021 was then written using these libraries. This took the learnings from Climate:Red and
allowed them to be used for Mozilla's first virtual conference.

### More

**Planet:Red** — After MozFest, Climate:Red was rebuilt using the very frameworks that were made from it.
It was a virtual conference for the IFRC to connect volunteers and form an agenda
that the organisation took to [Cop26](https://ukcop26.org).

**MozFest 22** — Deconf was used to run MozFest again, gaining the upgrades developed for Planet:Red and adding back its own.

**PDC2022** — The Participatory Design Conference used deconf for their Newcastle and global conferences
and contributed back usability and fixes to the libraries.

## Features

### The schedule

The first feature of the UI framework is the schedule which lets attendees browse
the sessions in a conference in chronological order.
During the conference, the interface adapts to the current time and timezone.
Sessions that are live are brought right to the top, sessions that have passed are tucked away
and upcoming sessions are easily accessible.

{% figure images[7].src, 'The schedule interface, showing live and upcoming sessions and the secret dev control.' %}

There is also a secret development control which acts as a time-machine to make it easy to develop on the interface.
It acts like a TV remote control to explore the schedule at different times.
The time the control sets is used everywhere else on the website which needs a time,
so any temporal component can be controlled.

### The atrium

The atrium is the homepage for a conference, like at a physical conference it is the first stop and provides the information you need to attend.

{% figure images[8].src, 'The PDC atrium, with introductory information and quick links to external resources.' %}

The atrium is a hub for all things related to the conference.
There is the main content front-and-center with the option for custom blocks in there too.
Down the right there are widgets depending on if the user is signed in or not.
If not registered yet there are extra actions to log in or register.
There is a "live visitors" widget which shows the exact number of visitors currently on the website,
which brings a nice liveness to the experience.

### A session

A session is an event that happens at a conference, its the page with all the information and timings to attend.

{% figure images[6].src, 'The live Opening Circle at MozFest 2022 with video and embedded in the page.' %}

This is a time based interface too, so it changes based on when you view it and you can control it with the dev control.

Before the session it advertises the session and desribes how it will work.
Leading up to the session there is a countdown to get people excited.
During the session the links to attend appear, as long as the user is signed in.
It intellligently embeds links like YouTube or Vimeo videos or creates actions to things like Zoom or Teams rooms.
After the session the page shows archive links to document the session and what happened.

## The libraries

### deconf-shared

[deconf-shared](https://github.com/digitalinteraction/deconf-shared)
is a shared set of TypeScript types that both the UI and API frameworks share.
It allows the front and back-end to share a common set of types and interfaces
and makes sure everything lines up.

### deconf-ui

[deconf-ui](https://github.com/digitalinteraction/deconf-ui-toolkit)
encapsulates the key front-end logic required to create your own virtual conference.

{% figure images[3].src, 'The UI storybook. Used to showcase, discover and develop the Vue.js components.' %}

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

{% figure images[4].src, 'The API documentation, generated using typedoc. Used to explore the API.' %}

This documentation is directly generated using [typedoc](https://typedoc.org), so you know it is up-to-date.
The types are shipped alongside the UI and API libraries so there's help inside IDEs too.

## Links

- [The homepage](https://github.com/digitalinteraction/deconf)
- [Climate:Red](https://climate-red.openlab.dev)
- [MozFest](https://schedule.mozillafestival.org)
- [PDC](https://schedule.pdc2022.org)
