---
title: WhatFutures
subtitle: A global future forcasting game run through WhatsApp
coverImage: /img/projects/what-futures.png
date: 2017-09-14
images:
  - src: '/img/what-futures/01-home.png'
    alt: The WhatFutures homepage
  - src: '/img/what-futures/02-leaderboard.png'
    alt: The leaderboard of submissions from the game
  - src: '/img/what-futures/03-response.png'
    alt: A response to a WhatFutures challenge
  - src: '/img/what-futures/04-fg-overview.png'
    alt: The Future Guide dashboard
  - src: '/img/what-futures/05-fg-team.png'
    alt: Future Guide team management interface
  - src: '/img/what-futures/06-game-admin.png'
    alt: A Game Administrator's dashboard
  - src: '/img/what-futures/07-super-admin.png'
    alt: The Super Admin's overview interface
---

# WhatFutures

## Overview

WhatFutures is a web application that was used to sign up for and manage a global future-forecasting engagement
for the [IFRC Solferino Academy](https://solferinoacademy.com).
The game was designed to engage youth volunteers around the world using low-tech solutions.
It was run almost entirely through WhatsApp, with help from the web app
for sign-ups, leaderboards and behind the scenes administration.

{% imagegrid images %}

## Features

### Game Registration

The front-facing part of web app let people sign up and create and join teams.
There was novelty in the form where players chose a role that they would like to play as:
**Technologist**, **Environmental Scientist**, **Cultural Expert** or **Economist**.
Once signed up, players could then invite fellow volunteers into their team.

Roles were used during the engagement to create cross-cutting conference chats in WhatsApp.
These created extra engagement around a topic to help teams work toward their responses.

### Dashboards

There were three different dashboards for different people to manage different levels of the game.

**1. Super Admin**

The top-level dashboard let the overall super-admin view the different running games
and advance their state.
For example, moving a game from _signup_ to _running_.

{% figure '/img/what-futures/07-super-admin.png', 'Super admin dashboard' %}

**2. Game Admin**

This dashboard was for someone is responsible for a game,
there were game admin's per-region to align with local timezones.
This dashboard let them see all the tasks to be completed
and a portal to look up a specific player.

**3. Future Guide**

This ground-level dashboard was for _Future Guide_'s, who were volunteers responsible for managing WhatsApp chats.
At the time there was no public API for WhatsApp, so a human-powered approach was used instead.
After a game went live, players were distributed between the Future Guide's,
who were responsible for manually interacting with WhatsApp to create and manage those conversations.

{% figure '/img/what-futures/04-fg-overview.png', 'Future Guide dashboard' %}

This dashboard showed the tasks a Future Guide needed to do and helped guide them through their work,
that included:

- Creating lots of WhatsApp chats and inviting players in
- Updating the team name and profile image on the website
- Posting challenges to their managed chats
- Uploading responses to challenges on the website
- Closing the chat after the game finished

### The Leaderboard

Players were encouraged to submit media files as responses to the challenges,
like news articles or advertisements from the future.
These responses were uploaded to the web app by Future Guides which made them visible to all.
A [Disqus](https://disqus.com) embed was added to each submission for feedback, comments and likes.

## Technology

### 3rd Party APIs

Despite WhatsApp not having a public API to use, the WhatFutures web app still made use of
several different APIs to make it work.
The pilot initially used the **Google Drive** API to create structured folders
for Future Guide's to upload the media responses into.
The live game used **AWS S3** instead so Future Guide could upload media through their dashboard
and those files were pulled straight through when viewing a leaderboard.

To create a WhatsApp chat, you need to have the phone number in your contacts.
To do this at scale, the **Google Contacts** API was used to automatically add phone numbers into a Future Guide's contacts.

### State Machines

The WhatFutures games were designed as state machines so that their transitions could
easily be defined and tested.
This enabled the Super Admins to easily advance the state of a game
and relevant transitions would be performed, this included:

- Turning off game registrations
- Allocating teams and players to Future Guides
- Enabling the leaderboard after a game
- Hiding a leaderboard when a game is fully over
- Putting phone numbers into Future Guide's contacts

### SMS Message Queue

WhatsApp join links were sent to players via SMS using Twilio,
to invite them to their team and to conferences.
To avoid rate limits a queue used so that a maximum number of messages were sent per-minute.
It was also used for ad-hoc messages, for instance sending a WhatsApp join link
if a player wanted/needed to change teams.

## Links

- [The website](https://whatfutures.org)
- [Open Lab blog post](https://openlab.ncl.ac.uk/research/whatfutures-using-whatsapp-to-engage-youth-volunteers-in-change/)
