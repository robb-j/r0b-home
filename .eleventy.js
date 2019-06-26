const { join } = require('path')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('node_modules/@robb_j/r0b-design/dist')
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/css')

  eleventyConfig.addFilter('r0bAsset', function(value) {
    if (!value) throw new Error('Invalid r0bAsset')
    return join('node_modules/@robb_j/r0b-design/dist', value)
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes'
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
