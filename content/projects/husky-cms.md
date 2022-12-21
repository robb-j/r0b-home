---
title: Husky CMS
subtitle: An experimental Trello-based website CMS
coverImage: /img/projects/husky.png
meta:
  image: /img/projects/husky.png
  summary: An experimental Trello-based website CMS
date: 2019-05-29
images:
  - src: ./src/img/husky-cms/01-home.png
    alt: A Husky CMS homepage
  - src: ./src/img/husky-cms/02-blog.png
    alt: The blog page
  - src: ./src/img/husky-cms/03-projects.png
    alt: The project grid
  - src: ./src/img/husky-cms/04-project.png
    alt: A project detail page
  - src: ./src/img/husky-cms/05-board.png
    alt: The Trello board powering the whole website
---

# Husky CMS

## Overview

Husky was an experiment for creating a website and managing it's content directly from a [Trello board](https://trello.com).
The cards on the Trello board are interpreted in different ways, depending on the list they are in, to generate a website.
Husky is packaged as a docker container and extensively uses environment variables to configure the site.

{% imagegrid images %}

## Features

Husky is built to allow different types of pages to be created from a single Trello board.
The pages type is decided by which list the corresponding card is on.
So there is one list for regular pages, one for projects and another for blog posts.
Each type can be turned on or off by setting (or not setting) the relevant environment variables.

### Basic pages

Basic pages are simple static pages.
Each card on this list is turned into a basic-looking page
where the card's title is the page title and the card's description is the page's body.
Trello supports markdown formatting, so that same markdown is processed into HTML onto the page.

To visit the page, the card's title is turned into a slug like `About us → /about-us`
Then there is a special case for the card named `Home`, which is made into the homepage.

### Project pages

Project pages are presented in as a nice grid where each card is a cell that shows the card's title and cover image.
It automatically creates filters based on the labels on the card and users assigned to it.
You can use the filters to find cards that only have certain labels set or associated people.

{% figure './src/img/husky-cms/03-projects.png', 'Viewing a project grid with filters down the side' %}

Clicking on a cell opens up that project in full and it renders like a basic page with a breadcrumb
to go back to the home page.

### Blog pages

Blog pages are an ordered set of things, all on one page. It works nicely for chronological posts
like a news feed or blog.
The posts keep the same order as the cards in the list and it renders them one after another,
with the title and card's markdown content.

### Custom workflows

Because everything is based in Trello, lots of the hard work for a CMS is already in place.
Access control can be provided by Trello and team-mates already familiar with it
already know how to use the app.

{% figure './src/img/husky-cms/05-board.png', 'The Trello board powering the whole website' %}

As Husky only pulls from certain lists, Kanban-like flows can be used around them to create workflows
for content. For instance, a "Draft" list can be used for content that is in-progress
and that content will not show up on the site by default.

## Technology

### Configuration

Hooking up Husky to Trello requires linking up page types to different Trello lists.
This is done by passing several environment variables to the container.

First, there are basic variables, that setup the actual site.
Like the site's name, credentials to access the Trello API
and the id of the list for the basic pages.

```
SITE_NAME=My fancy site
TRELLO_APP_KEY=top_secret
TRELLO_TOKEN=also_top_secret

PAGE_LIST=<trello_id>
```

Then you can turn on the blog and projects pages by setting the corresponding `_LIST` variables
to the id of the list in Trello.
The pages are further configured with variables to set a name, title and subtitle:

```
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

```
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

along with a template:

```pug
.hero.is-large.is-primary
.hero-body
  .container
    h1.title Page says: #{message}
```

Plugins get access to a Husky object that is used to register a page plugin.
It can require custom environment variables be set and setup routes to add to the http server.
There are also "content" plugins that are be rendered at the bottom of each page.

## Links

- [GitHub repository](https://github.com/unplatform/husky-cms)
