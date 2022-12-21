require('@openlab/alembic/fake-dom-env')
require('dotenv/config')

const { injectLayoutStyles } = require('@openlab/alembic')
const markdown = require('markdown-it')
const markdownAnchor = require('markdown-it-anchor')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const shortcodes = require('./11ty/shortcodes')
const filters = require('./11ty/filters')
const { PATH_PREFIX } = require('./11ty/env')

/** @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig */
module.exports = function (eleventyConfig) {
  // Watch for src changes to re-trigger esbuild
  eleventyConfig.addWatchTarget('./src/')

  const md = markdown({
    html: true,
    breaks: false,
    linkify: false,
  })
  md.disable('code')
  md.use(markdownAnchor)
  eleventyConfig.setLibrary('md', md)

  eleventyConfig.addPassthroughCopy({
    'src/img': 'img',
    'src/font': 'font',
  })

  eleventyConfig.addPlugin(filters)
  eleventyConfig.addPlugin(shortcodes)
  eleventyConfig.addPlugin(syntaxHighlight)

  // if (NODE_ENV === 'production') {
  eleventyConfig.addTransform('html', (content) => {
    if (typeof content !== 'string') return content
    return injectLayoutStyles(content)
  })
  // }

  return {
    dir: {
      input: 'content',
      includes: '_includes',
      layouts: '_layouts',
    },
    pathPrefix: PATH_PREFIX,
    templateFormats: ['11ty.js', 'njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
