const path = require('path')

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('r0bAsset', (value) => {
    if (!value) throw new Error('Invalid r0bAsset')
    return path.join('/css/r0b', value)
  })

  eleventyConfig.addFilter('newestFirst', (collection) => {
    const output = Array.from(collection)
    output.sort((a, b) => {
      return b.date.getTime() - a.date.getTime()
    })
    return output
  })

  eleventyConfig.addFilter('slice', (collection, start, end) => {
    return collection.slice(start, end)
  })
}
