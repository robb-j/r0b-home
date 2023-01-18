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
  'mac apps',
  'blog posts',
  'nova extensions',
  'things',
  'tools',
  'easter eggs',
  'lego',
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

function inRange(a: [number, number], b: [number, number], r: number) {
  return Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) < Math.pow(r, 2)
}

document.addEventListener('DOMContentLoaded', () => main())

async function shuffleCards() {
  const deck = document.querySelector('.projectDeck') as HTMLElement
  const wrapper = document.querySelector(
    '.projectDeck reel-layout'
  ) as HTMLElement
  const cards = document.querySelectorAll<HTMLElement>('.flipCard')
  deck.classList.add('isAnimating')

  await new Promise((resolve) => setTimeout(resolve, 10))

  for (const card of cards) {
    delete card.dataset.hidden
    const x = Math.round(
      Math.random() * (wrapper.clientWidth - card.clientWidth)
    )
    const y = Math.round(
      Math.random() * (wrapper.clientHeight - card.clientHeight)
    )

    card.style.left = `${x}px`
    card.style.top = `${y}px`
  }

  setTimeout(() => deck.classList.remove('isAnimating'), 500)
}

function organiseDeck(onlyTags?: string[]) {
  const deck = document.querySelector('.projectDeck') as HTMLElement
  const wrapper = document.querySelector('.projectDeck-cards') as HTMLElement
  const cards = document.querySelectorAll<HTMLElement>('.flipCard')
  deck.classList.add('isAnimating')

  const gap = 40
  const padding = 10
  let lastYear: string | undefined = undefined

  let y = padding
  let x = padding
  for (const card of cards) {
    const { year, tags } = card.dataset

    const hideCard = Boolean(
      onlyTags && tags && !onlyTags.some((t) => tags.includes(t))
    )
    console.log(onlyTags && tags && !onlyTags.some((t) => tags.includes(t)))
    if (hideCard) {
      card.dataset.hidden = 'true'
      continue
    }

    delete card.dataset.hidden

    if (lastYear && lastYear !== year) {
      y = padding
      x += card.clientWidth + padding + gap
    } else if (y > wrapper.clientHeight - card.clientHeight) {
      y = padding
      x += card.clientWidth + padding
    }

    lastYear = year

    card.style.left = `${x}px`
    card.style.top = `${y}px`

    y += card.clientHeight + padding
  }

  // ...

  setTimeout(() => deck.classList.remove('isAnimating'), 500)
}

function main() {
  let flipZ = 1
  for (const card of document.querySelectorAll<HTMLElement>('.flipCard')) {
    let start: [number, number] | null = null

    card.onpointerdown = (event) => {
      // Ignore this event if it is not a left-click or touch or if an anchor
      if (
        event.button !== 0 ||
        event.composedPath().some((e) => e instanceof HTMLAnchorElement)
      ) {
        return
      }

      event.preventDefault()
      card.setPointerCapture(event.pointerId)
      card.style.zIndex = `${flipZ++}`

      start = [event.screenX, event.screenY]

      card.onpointermove = (event) => {
        card.style.left = `${card.offsetLeft + event.movementX}px`
        card.style.top = `${card.offsetTop + event.movementY}px`
      }
    }
    card.onpointerup = (event) => {
      if (start && inRange([event.screenX, event.screenY], start, 5)) {
        card.dataset.side = card.dataset.side === 'front' ? 'back' : 'front'
      }

      card.onpointermove = null
      card.releasePointerCapture(event.pointerId)
    }
  }

  document
    .getElementById('shuffleDeck')
    ?.addEventListener('click', () => shuffleCards())

  document
    .getElementById('organiseDeck')
    ?.addEventListener('click', () => organiseDeck())

  for (const button of document.querySelectorAll<HTMLButtonElement>(
    'button.taggedDeck'
  )) {
    const { tag } = button.dataset
    if (!tag) continue
    button.onclick = () => organiseDeck([tag])
  }

  shuffleCards()
}
