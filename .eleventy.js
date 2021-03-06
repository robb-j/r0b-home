const { join } = require('path')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('node_modules/@robb_j/r0b-design/dist')
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/css')
  eleventyConfig.addPassthroughCopy('src/js')

  eleventyConfig.addFilter('r0bAsset', function(value) {
    if (!value) throw new Error('Invalid r0bAsset')
    return join('node_modules/@robb_j/r0b-design/dist', value)
  })

  return {
    dir: {
      input: 'src',
      includes: '_includes'
    },
    templateFormats: ['html', 'njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
