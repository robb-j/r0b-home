const shortcodes = require('./11ty/shortcodes')
const filters = require('./11ty/filters')
const { PATH_PREFIX } = require('./11ty/env')

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/js/')

  eleventyConfig.addPassthroughCopy({
    'node_modules/@robb_j/r0b-design/dist': 'css/r0b',
    'src/css': 'css',
    'src/img': 'img',
  })

  eleventyConfig.addPlugin(filters)
  eleventyConfig.addPlugin(shortcodes)

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
