module.exports = function (eleventyConfig) {
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

  eleventyConfig.addFilter('notDraft', (collection) => {
    return collection.filter((item) => !item.data.draft)
  })
}
