let { PROJECTS_URL: projectsUrl = 'https://rob.andrsn.uk' } =
  window.CONFIG || {}

// ↑ ↑ ↓ ↓ ← → ← → B A
let konamiCodes = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

// Things for the strapline
let randomThings = [
  'stuff',
  'games',
  'websites',
  'frameworks',
  'apps',
  'code',
  'tech',
  'things',
  'experiences',
  'tools',
  'easter eggs',
  'brownies',
  'open source',
  'trello boards'
]

// The element to add glitches to
let glitched = document.querySelector('.glitched')

//
// Create a dom element
//
function h(tagName, attrs = {}, children = []) {
  let elem = Object.assign(document.createElement(tagName), attrs)
  for (let child of children) elem.append(child)
  return elem
}

//
// Listen for the konami code and execute a block of code
//
function konamify(block) {
  let nextKey = 0

  window.addEventListener('keydown', e => {
    if (e.keyCode === konamiCodes[nextKey]) {
      nextKey++
      if (nextKey >= konamiCodes.length) {
        block()
        nextKey = 0
      }
    } else {
      nextKey = 0
    }
  })
}

//
// Reset the glitch if they press ESCAPE
//
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    window.document.body.classList.remove('is-glitched')
    glitched.innerHTML = ''
  }
})

//
// Do something magical when they enter the konami code
//
konamify(() => {
  window.document.body.classList.add('is-glitched')

  setTimeout(() => {
    glitched.innerHTML = ''
    glitched.appendChild(
      h('iframe', {
        width: window.screen.width,
        height: window.screen.height,
        src:
          'https://www.youtube-nocookie.com/embed/5CdoyqsNdaE?controls=0&autoplay=1',
        frameborder: '0',
        allow: 'autoplay; encrypted-media; picture-in-picture',
        allowfullscreen: true
      })
    )
  }, 5000)
})

function getProjectCover(project) {
  let found = project.attachments.find(
    img => img.id === project.idAttachmentCover
  )

  return found && found.url
}

function renderProjects(projects) {
  let section = document.querySelector('.portfolio-section')
  if (!section) return

  section.querySelectorAll('.project-card').forEach(elem => elem.remove())

  for (let i = 0; i < 3; i++) {
    let proj = projects[i]
    if (!proj) break

    let img = getProjectCover(proj)

    section.insertBefore(
      h('div', { className: 'project-card' }, [
        h(
          'a',
          { className: 'card-cover-image', href: projectsUrl + proj.href },
          [h('div', { style: `background-image: url(${img})` })]
        )
      ]),
      section.querySelector('.view-more-holder')
    )
  }
}

//
// Animate text of an element between two values
//
function animateText(elem, toText, duration) {
  let start = Date.now()
  let stages = []

  for (let i = 0; i < elem.textContent.length; i++) {
    stages.push(elem.textContent.slice(0, -i - 1))
  }

  for (let i = 0; i < toText.length; i++) {
    stages.push(toText.slice(0, i + 1))
  }

  let tick = () => {
    let currentDuration = Date.now() - start
    let index = Math.floor(
      Math.min(1, currentDuration / duration) * (stages.length - 1)
    )

    elem.textContent = stages[index]

    if (index < stages.length - 1) window.requestAnimationFrame(tick)
  }

  window.requestAnimationFrame(tick)
}

window
  .fetch(`${projectsUrl}/projects.json`)
  .then(r => r.json())
  .then(r => renderProjects(r.projects))

window.setInterval(() => {
  let elem = document.querySelector('.strapline .skill')
  if (!elem) return

  let toPickFrom = randomThings.filter(skill => skill !== elem.textContent)

  animateText(
    elem,
    toPickFrom[Math.floor(Math.random() * toPickFrom.length)],
    1200
  )
}, 5000)
