const { join } = require('path')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('node_modules/@robb_j/r0b-design/dist')
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/css')
  eleventyConfig.addPassthroughCopy('src/js')

  eleventyConfig.addFilter('r0bAsset', function(value) {
    if (!value) throw new Error('Invalid r0bAsset')
    return join('/node_modules/@robb_j/r0b-design/dist', value)
  })

  eleventyConfig.addFilter('newestFirst', function(collection) {
    const output = Array.from(collection)
    output.sort((a, b) => {
      return b.date.getTime() - a.date.getTime()
    })
    return output
  })

  eleventyConfig.addFilter('slice', function(collection, start, end) {
    return collection.slice(start, end)
  })

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    },
    templateFormats: ['html', 'njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
