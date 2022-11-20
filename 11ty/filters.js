/** @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig */
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

  eleventyConfig.addFilter('fullUrl', function (path) {
    const url = new URL(path.replace(/^\/+/, '/'), this.ctx.site.url)
    return url.toString()
  })

  eleventyConfig.addFilter('inert', (flag) => (flag ? 'inert' : ''))
  eleventyConfig.addFilter('disabled', (flag) => (flag ? 'disabled' : ''))
}
