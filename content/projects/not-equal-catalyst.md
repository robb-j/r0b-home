---
title: 'NotEqual: Catalyst'
subtitle: An experimental call-for-proposal system
coverImage: /img/projects/catalyst.png
meta:
  image: /img/projects/catalyst.png
  summary: An experimental call-for-proposal system using Trello, Google forms and a website to bring it all together
date: 2019-12-13
images:
  - src: '/img/catalyst/01-home.png'
    alt: The Catalyst homepage
  - src: '/img/catalyst/02-detail.png'
    alt: A page about one of the catalyst projects
  - src: '/img/catalyst/03-trello-board.png'
    alt: The Trello board powering the entire website
  - src: '/img/catalyst/04-trello-card.png'
    alt: What one of the Trello card looks like
  - src: '/img/catalyst/05-google-form.png'
    alt: The Google form used to submit a catalyst project
---

# NotEqual: Catalyst

## Overview

Catalyst is a novel technology repurposing existing platforms
to create a a project directory for [Not Equal](https://not-equal.tech).
Instead of building a bespoke system, Trello and Google Forms were combined
to create a website that is completely customisable by editing a Trello Board
with a Google Form automatically creating Trello cards in a structured way.

{% imagegrid images %}

## Features

### Filtering and Searching

The homepage takes you straight to the project directory and gives you options to filter projects by different tags and themes or perform a text-based query. Being built in Vue.js, the filtering is applied immediately so results appear straight away.

{% figure '/img/catalyst/01-home.png', 'The Catalyst home page with searching and filtering' %}

Each of the projects is a card on Trello, so the themes and categories are actually Trello labels and the text-based search matches the card's title and description. To achieve different types of label, a structuring system was used, e.g. `theme:algorithms` or `category:accountabilty-and-care`. With some string functions they are grouped and turned into human readable messages for the website.

### Detail pages

Clicking on a project takes you to it's dedicated page. Here you can read the project description and contact the author if you'd like to collaborate.

{% figure '/img/catalyst/02-detail.png', 'A project detail page with rendered markdown' %}

The main content of the page is generated based on the Trello card's description. The descriptions are written in markdown and Catalyst turns that into nicely formatted HTML for easy reading. The result is a nice page with easy to read information.

Because it is a website, viewers don't need a Trello account to use the service, they just need a web browser. And users don't need to understand Trello or boards or cards, its all just a website.

Projects fell into 3 categories and each category was given a unique theme on the website. This is used to pick the colour of the project card on the homepage and also when styling the project detail page.

### Deployments

Because of the way catalyst was packed up for deployment, it was easily redeployed for multiple projects. An example of this was a "Supervisor Finder" for Computing students at Newcastle University. Supervisors submitted their information into a Google Form, which automatically generated the cards in Trello. The cards were manually approved and moved to the "public" list, which tells Catalyst to put it on the website. Students then use the website to find a relevant supervisor and email them to request a chat.

For the supervisor deployment, the taxonomy included technologies the supervisor could support
and research areas they were interested in. The supervisor picked them in the Google Form and the students filter by them on the website.

## Technology

### Google Form to Trello

The first part of Catalyst is a bridge between a Google Form and Trello. When the form is submitted, it triggered a webhook that took the submission and converted it into a Trello card. This part is really customisable so deployments can configure exactly how responses are processed and how Trello labels are used.

[google/clasp](https://github.com/google/clasp) was used to write and deploy the logic that triggered the webhook. It lets you write TypeScript in your editor and deploy it directly as a Google Form script. Really easy.

A mapping was needed to understand the Google Form submission and to give response values well-known names. This mapped Google Form question ids to human-readable handles like `supervisor.email` which are used below. You also set the `titleKey` which determines what to name the Trello card. It looked something like this:

```yaml
fields:
  1234567890:
    path: person.name
  6789012345:
    path: person.email
  6789012345:
    path: person.job

titleKey: response.title
```

Once the mapping was in place, a [Nunjucks template](https://mozilla.github.io/nunjucks/) is used to set the card's description. It generates markdown which is later turned into HTML.
A benefit of storing markdown is that the Trello card itself is still human readable,
it even formats the markdown. A template could look like:

```md
{% raw %}> by {{ data.person.name }} working at {{ data.person.job }} responding to {{ data.response.call }}

## My motivation is

{{ data.response.motivation }}

## Themes

{% for item in data.response.themes %}

- {{ item }}{% endfor %}

## Contact

[{{ data.personal.email }}](mailto:{{ data.personal.email }}){% endraw %}
```

> You can even use Nunjuck's `for` to loop through, or `if` to make conditionals.

The last part of creating a Trello Card is to label it. This powers the website's filtering interface, and also helped filtering within the Trello board too. This was configured at the end of the YAML file:

```yaml
labels:
  research.theme:
    prefix: theme
    color: green

  research.domain:
    prefix: domain
    color: blue

  technologies:
    prefix: tech
    color: pink
```

These make a specific answer generate labels using a prefix, if you answered `javascript, html and css` to the "technology" question it would link the `tech:javascript`, `tech:html` and `tech:css` labels to the card in Trello. If the label didn't exist in Trello, it would create it and event set the colour. The colours helped a lot when viewing the board, having one colour per taxonomy meant labels weren't an unreadable mess.

### Trello to website

The second part of catalyst is generating a website based on the contents of a Trello board. Using' Trello's APIs this was relatively straight forward. One consideration was the APIs slow speed and rate-limiting, it was build so every request to the platform didn't have to talk to directly Trello.

A [CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) was setup to periodically fetch data from the Trello board, process the response and put the result into a [Redis](https://redis.io) cache.

This was externalised from the website process to enable horizontal scaling. If the data was stored in-memory, then each process would need to run a scrape, using up CPU and requests, and there could be discrepancies if some instances had scraped and other's hadn't. Using a separate CronJob meant that Redis was the single source of truth and all instance of the website only had to read it from it.

{% figure '/img/catalyst/03-trello-board.png', 'The Trello board powering the entire website' %}

A human process was needed to ensure the cards looked alright and the questions were answered correctly. To arrange this, the list that the cards were created at was different from the list the the scraper used to render the website. Card from the Google Form were created on the "inbox" list and the website only rendered cards on the "public" list. This meant that an administrator could open up Trello, look at the inbox, inspect and/or edit the card then drag it to the "public" list to publish it.

### Strings

An extra feature that was added let administrators directly edit content on the website from within Trello. A "content" list was setup and each card was used as a key-value pair that the website received and could render in different places. For example the card named `[about.long]` was pulled through and rendered as the about page.

The square-bracket notation wasn't functionally needed, but was added to make these cards look technical, along with a big warning card at the top of the list, to ward of admins from editing them accidentally.

This was also useful for overriding the Trello label to human text function.
A card could be created called `[category:accountabilty-and-care]`
and the description set to `Accountabilty & Care`, to override the calculated version.

## Links

- [The website](https://catalyst.not-equal.tech)
- [GitHub homepage](https://github.com/digitalinteraction/catalyst-about)
- [Open Lab post about Not Equal](https://openlab.ncl.ac.uk/posts/2020/not-equal-democratising-access-to-digital-technology-and-services/)
