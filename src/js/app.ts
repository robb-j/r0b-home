// ↑ ↑ ↓ ↓ ← → ← → B A
const konamiCodes = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

// Things for the strap-line
const randomThings = [
  'stuff',
  'games',
  'websites',
  'frameworks',
  'libraries',
  'apps',
  'code',
  'tech',
  'things',
  'tools',
  'easter eggs',
]

// The element to add glitches to
const glitched = document.querySelector('.glitched') as HTMLElement

//
// Create a dom element
//
function h(
  tagName: string,
  attrs: Record<string, unknown> = {},
  children: HTMLElement[] = []
): HTMLElement {
  const elem = Object.assign(document.createElement(tagName), attrs)
  for (const child of children) elem.append(child)
  return elem
}

//
// Listen for the Konami code and execute a block of code
//
function konamify(block: () => void) {
  let nextKey = 0

  window.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key === konamiCodes[nextKey]) {
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
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    window.document.body.classList.remove('isGlitched')
    glitched.innerHTML = ''
  }
})

//
// Do something magical when they enter the Konami code
//
konamify(() => {
  window.document.body.classList.add('isGlitched')
  window.fathom.trackGoal('UTUCKJMG', 0)

  setTimeout(() => {
    glitched.innerHTML = ''
    glitched.appendChild(
      h('iframe', {
        width: window.screen.width,
        height: window.screen.height,
        src: 'https://www.youtube-nocookie.com/embed/5CdoyqsNdaE?controls=0&autoplay=1',
        title: "Now it's Skyrim",
        frameborder: '0',
        allow: 'autoplay; encrypted-media; picture-in-picture',
        allowfullscreen: true,
      })
    )
  }, 5000)
})

//
// Animate text of an element between two values
//
function animateText(elem: Element, toText: string, duration: number) {
  const start = Date.now()
  const stages: string[] = []

  for (let i = 0; i < elem.textContent!.length; i++) {
    stages.push(elem.textContent!.slice(0, -i - 1))
  }

  for (let i = 0; i < toText.length; i++) {
    stages.push(toText.slice(0, i + 1))
  }

  elem.classList.add('isTyping')

  const tick = () => {
    const currentDuration = Date.now() - start
    const index = Math.floor(
      Math.min(1, currentDuration / duration) * (stages.length - 1)
    )

    elem.innerHTML = stages[index] || '&nbsp'

    if (index < stages.length - 1) window.requestAnimationFrame(tick)
    else elem.classList.remove('isTyping')
  }

  window.requestAnimationFrame(tick)
}

window.setInterval(() => {
  const elem = document.getElementById('miscSkill')
  if (!elem) return

  const toPickFrom = randomThings.filter((skill) => skill !== elem.textContent)

  animateText(
    elem,
    toPickFrom[Math.floor(Math.random() * toPickFrom.length)],
    1200
  )
}, 5000)
