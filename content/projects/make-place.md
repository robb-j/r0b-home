---
title: Make Place
subtitle: A map-based feedback platform
coverImage: /img/projects/make-place.png
meta:
  image: /img/projects/make-place.png
  summary: A web platform for geographical place-making activities and consultation
date: 2017-07-01
images:
  - src: '/img/make-place/01-map.png'
    alt: The Make Place map
  - src: '/img/make-place/02-pin.png'
    alt: A pin popup
  - src: '/img/make-place/03-filters.png'
    alt: Map filters
  - src: '/img/make-place/04-pick.png'
    alt: Pick a location for a new pin
  - src: '/img/make-place/05-form.png'
    alt: Fill out information about a new pin
---

# Make Place

## Overview

Make Place is a place-making platform to run digital engagements on geographical maps.
It was designed to be deployed for many different use cases with customisable forms and pages.
Each deployment is powered by a [SilverStripe CMS](https://www.silverstripe.org),
which allows each page, map, survey and question to be completely customisable.
Users can sign up to respond to surveys and browse other people's responses on the map.

{% imagegrid images %}

## Features

### Customisation

Make Place was designed to be redeployed for lots of different use cases.
Basing the platform on a CMS means that every page on the website could be edited and configured completely.
Working with the CMS, Make Place adds custom data types and pages that can be edited
which itself can be completely customised.

For instance, you create a _Map_ page and link it to a _Survey_ model which
adds a "respond to survey" action to the map.
You can further link up filters on the map to filter for specific questions in the survey
so viewers can filter the responses that are show.
There are lots of question types too to try to make engaging responses.

The platform is bundled up as a docker container which exposes deployment-level
configuration to administrators to easily configure deployments and create a bespoke theme.

### Geography

Geographical questions are a first class citizen and are actually a special type of question on a survey.
One of the answers that is submitted is the latitude and longitude of where on the map was clicked.
Because Silverstripe didn't handle geographical data, a custom micro-service was used to handle and query that data.
This was nicknamed geography and it handled special geographic-sql queries to efficiently lookup and store geometries for the map.

### API

Both the PHP platform and geography micro-service provide restful APIs to allow 3rd-party integrations
to authenticate, retrieve and create data.
These endpoints were also used on the map page with vue.js to enhance the pages with dynamic content and interactions.

## Technology

### Stack

Make Place is made up of a PHP backend (based on [SilverStripe](https://www.silverstripe.org)),
a node.js geography micro-service and some vue.js frontend components.
They talk to a MySQL database and were deployed behind an Nginx reverse-proxy
that encrypted traffic with LetsEncrypt certificates.

### TDD & CI

The entire PHP backend was written following _Test Driven Development_
which ensured code stability with lots of concurrent deployments.
The tests were also run on-push using GitLab pipelines to look for integration errors.

The pipelines also built and published a docker container for each release,
based on git tags.
A separate "configuration" repo was used as the source of truth for all deployments
and pushes to that main branch would automatically deploy or update production instances.

## Links

- [The website and demo instance](https://make.place)
- [Open Lab blog post](https://openlab.ncl.ac.uk/research/make-place-an-open-source-mapping-and-survey-tool/)
- [The Platform repo](https://github.com/digitalinteraction/make-place-platform)
- [Geography micro-service](https://github.com/digitalinteraction/make-place-geography)
- [Static pages micro-service](https://github.com/digitalinteraction/make-place-static)
- [An example deployment stack](https://github.com/digitalinteraction/make-place-example-stack)
