require('dotenv/config')

const { eleventyAlembic } = require('@openlab/alembic/11ty')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const markdown = require('markdown-it')
const markdownAnchor = require('markdown-it-anchor')

const shortcodes = require('./11ty/shortcodes')
const filters = require('./11ty/filters')

const md = markdown({
  html: true,
  breaks: false,
  linkify: false,
})
md.use(markdownAnchor)

/** @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig */
module.exports = function (eleventyConfig) {
  // Watch for src changes to re-trigger esbuild
  eleventyConfig.addWatchTarget('./src/')

  eleventyConfig.setLibrary('md', md)

  eleventyConfig.addPassthroughCopy({
    'src/img': 'img',
    'src/font': 'font',
  })

  eleventyConfig.addPlugin(eleventyAlembic)
  eleventyConfig.addPlugin(filters)
  eleventyConfig.addPlugin(shortcodes)
  eleventyConfig.addPlugin(syntaxHighlight)

  return {
    dir: {
      input: 'content',
      includes: '_includes',
      layouts: '_layouts',
    },
    markdownTemplateEngine: 'njk',
  }
}
