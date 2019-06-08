const { PROJECTS_URL: projectsUrl = 'https://rob.andrsn.uk' } =
  window.CONFIG || {}

// ↑ ↑ ↓ ↓ ← → ← → B A
const konamiCodes = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

//
// The element to add glitches to
//
const glitched = document.querySelector('.glitched')

//
// Create a dom element
//
function h(tagName, attrs = {}, children = []) {
  let elem = document.createElement(tagName)

  for (let key in attrs) elem.setAttribute(key, attrs[key])

  for (let child of children) {
    elem.appendChild(
      typeof child === 'string' ? document.createTextNode(child) : child
    )
  }

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
  const section = document.querySelector('.portfolio-section')
  if (!section) return

  section.querySelectorAll('.project-card').forEach(elem => elem.remove())

  for (let i = 0; i < 3; i++) {
    let proj = projects[i]
    if (!proj) break

    let img = getProjectCover(proj)

    section.insertBefore(
      h('div', { class: 'project-card' }, [
        h('a', { class: 'card-cover-image', href: projectsUrl + proj.href }, [
          h('div', { style: `background-image: url(${img})` })
        ])
      ]),
      section.querySelector('.view-more-holder')
    )
  }
}

window
  .fetch(`${projectsUrl}/projects.json`)
  .then(r => r.json())
  .then(r => renderProjects(r.projects))
