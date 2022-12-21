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

document.addEventListener('DOMContentLoaded', () => {
  let flipZ = 1
  for (const card of document.querySelectorAll<HTMLElement>('.flipCard')) {
    const parsePos = (str: string) => parseInt(str.replace(/px$/, ''))

    let start: [number, number] | null = null

    card.onpointerdown = (event) => {
      event.preventDefault()
      card.setPointerCapture(event.pointerId)
      card.style.zIndex = `${flipZ++}`

      start = [event.screenX, event.screenY]

      card.onpointermove = (event) => {
        card.style.left = `${parsePos(card.style.left) + event.movementX}px`
        card.style.top = `${parsePos(card.style.top) + event.movementY}px`
      }
    }
    card.onpointerup = (event) => {
      if (start) {
        let dx = event.screenX - start[0]
        let dy = event.screenY - start[1]
        if (dx === 0 && dy === 0) {
          card.dataset.side = card.dataset.side === 'front' ? 'back' : 'front'
        }
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
})

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
