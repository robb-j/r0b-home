const Image = require('@11ty/eleventy-img')

// https://github.com/11ty/eleventy-img/issues/107

/** @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig */
module.exports = function (eleventyConfig) {
  //
  // imagegrid
  //
  eleventyConfig.addNunjucksAsyncShortcode('imagegrid', async (images) => {
    const contents = await Promise.all(
      images.map(async ({ src, alt }) => {
        const stats = await Image(src, {
          widths: [1200, 1200],
          formats: ['webp', 'auto'],
          outputDir: './_site/img/',
        })
        return Image.generateHTML(stats, { alt, loading: 'lazy' })
      })
    )

    return `<div class="imageGrid">${contents.join('')}</div>`
  })

  eleventyConfig.addNunjucksAsyncShortcode('figure', async (src, text) => {
    const stats = await Image(src, {
      widths: [1200, 1200],
      formats: ['webp', 'auto'],
      outputDir: './_site/img/',
    })
    const img = Image.generateHTML(stats, { alt: text, loading: 'lazy' })
    const caption = `<figcaption>${text}</figcaption>`
    return `<figure class="figureImage">${img}${caption}</figure>`
  })

  eleventyConfig.addShortcode('icon', (name) => {
    const url = eleventyConfig.getFilter('url')('/img/brands.svg')
    return `<svg><use xlink:href="${url}#${name}"></use></svg>`
  })

  eleventyConfig.addShortcode('cleanAnchor', () => {
    return `rel="noopener"`
  })

  //
  // ...
  //
}
