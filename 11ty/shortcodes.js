module.exports = function (eleventyConfig) {
  //
  // imagegrid
  //
  eleventyConfig.addShortcode('imagegrid', (images) => {
    const contents = images
      .map(
        (img) =>
          `<img class="imageGrid-image" src="${img.src}" alt="${img.alt}" title="${img.alt}" />`
      )
      .join('')
    return `<div class="imageGrid">${contents}</div>`
  })

  //
  // ...
  //
}
