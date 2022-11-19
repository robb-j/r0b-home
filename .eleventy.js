require('@openlab/alembic/fake-dom-env')
const { injectLayoutStyles } = require('@openlab/alembic')

const shortcodes = require('./11ty/shortcodes')
const filters = require('./11ty/filters')
const { PATH_PREFIX } = require('./11ty/env')

/** @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig */
module.exports = function (eleventyConfig) {
  // Watch for src changes to re-trigger esbuild
  eleventyConfig.addWatchTarget('./src/')

  eleventyConfig.addPassthroughCopy({
    'node_modules/@robb_j/r0b-design/dist': 'r0b',
    // 'src/css': 'css',
    'src/img': 'img',
  })

  eleventyConfig.addPlugin(filters)
  eleventyConfig.addPlugin(shortcodes)

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
