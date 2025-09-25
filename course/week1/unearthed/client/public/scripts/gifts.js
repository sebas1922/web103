document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')
  if (!main) return

  const section = document.createElement('section')
  section.className = 'gifts-section'

  const header = document.createElement('h2')
  header.textContent = 'Featured Gifts'
  section.appendChild(header)

  const list = document.createElement('div')
  list.className = 'gift-list'

  // Placeholder: replace with fetch to your API later
  const sampleGifts = [
    {
      id: 1,
      name: 'Disco Ball Candle',
      pricePoint: '$',
      audience: 'Candle Lovers',
      image: 'https://tinyurl.com/39xc9h6y',
      description: 'A party in a candle',
      submittedBy: 'Sasha',
      submittedOn: '2022-09-04T14:48:00',
    },
  ]

  for (const gift of sampleGifts) {
    const card = document.createElement('article')
    card.className = 'gift-card'

    const img = document.createElement('img')
    img.src = gift.image
    img.alt = gift.name

    const name = document.createElement('h3')
    name.textContent = gift.name

    const meta = document.createElement('p')
    meta.textContent = `${gift.pricePoint} • ${gift.audience}`

    const desc = document.createElement('p')
    desc.textContent = gift.description

    card.appendChild(img)
    card.appendChild(name)
    card.appendChild(meta)
    card.appendChild(desc)
    list.appendChild(card)
  }

  section.appendChild(list)
  main.appendChild(section)
})


