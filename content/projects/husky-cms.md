---
title: Husky CMS
subtitle: An experimental Trello-based website CMS
coverImage: /img/projects/husky.png
meta:
  image: /img/projects/husky.png
  summary: TODO
date: 2019-05-29
draft: true
---

# Husky CMS

## Overview

Husky was an experiment for creating a website and managing it's content directly from a [Trello board](https://trello.com).
The cards on the Trello board are interpreted in different ways, depending on the list they are in, to generate a website.
Husky is packaged as a docker container and extensively uses environment variables to configure the site.

## Features

### Page types

Husky is built to allow different types of pages to be created in Trello.
Page types are defined using different lists in Trello.
So there is one list for regular pages, one for projects and another for blog posts.
Each type can be turned on or of by setting the relevant environment variables.

**Basic pages**

Basic pages are simple static pages.
Each card on the list is turned into a page under a slug that is generated using the card's title.
So `About us` would be available at `/about-us`.
There's a special case for the card named `Home`, which is made into the homepage at `/`.

**Project pages**

Project pages are presented in a grid that's filterable by the tags that are on the cards.
Each project also uses the card's cover image when shown in the grid, pulling through the asset from Trello.

**Blog pages**

Blog pages are an ordered set of posts, all on one page. And work nicely for chronological posts
like a news feed or blog.

### Configuration

Hooking up Husky to Trello requires linking up page types to different Trello lists.
This is done by passing environment variables to the container.

There are basic variables, that setup the basic site.
Like the site's name, credentials to access Trello
and the id of the list for the basic pages.

```env
SITE_NAME=My fancy site
TRELLO_APP_KEY=top_secret
TRELLO_TOKEN=also_top_secret

PAGE_LIST=<trello_id>
```

Then you can turn on the blog and list pages by setting the various `_LIST` variables
and further configure the pages themselves with a name, title and subtitle:

```env
BLOG_LIST=<trello_id>
BLOG_SLUG=my-blog
BLOG_NAME=Rob's Blog
BLOG_TITLE=Rob's Blog
BLOG_SUBTITLE=Really really interesting stuff...

PROJECT_LIST=<trello_id>
PROJECT_SLUG=portfolio
PROJECT_NAME=My portfolio
PROJECT_TITLE=Portfolio
PROJECT_SUBTITLE=All the cool stuff
```

For further customisation you can set these extra variables,
which allow you to load custom CSS or JavaScript onto the page.
This works especially well with volume-mounting files into the container,
any files inside of `/app/static` are automatically served over http.

```env
CUSTOM_CSS_URL=/extra-styles.css
CUSTOM_JS_URL=/my-script.js
CUSTOM_BRAND_URL=/brand.img
```

### Plugins

Plugins are used internally to register the different page types and they can be overridden
or added to by mounting a plugin into `/app/plugins` into the container.
A plugin looks something like this:

```js
function route(ctx) {
  const message = process.env.MESSAGE
  ctx.renderPug('my_template', 'My Page', { message })
}

module.exports = function (husky, utils) {
  husky.registerPage('my_page', {
    name: 'My Page',
    templates: ['my_template'],
    variables: ['MESSAGE'],
    routes: {
      './': route,
    },
  })
}
```

Plugins get access to a Husky object that is used to register a page plugin.
It can require custom environment variables be set and setup relative routes to add to the http server.
There are also "content" plugins that are be rendered at the bottom of each page.

## Technology

### Tech A

...

### Tech B

...

### Tech C

...

## Links

- [Link A](...)
- [Link B](...)
- [Link C](...)
