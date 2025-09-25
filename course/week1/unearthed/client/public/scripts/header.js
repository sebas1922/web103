document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header')
  if (!header) return

  const container = document.createElement('div')
  container.className = 'header-container'

  const logo = document.createElement('img')
  logo.src = '/public/logo.png'
  logo.alt = 'Unearthed logo'
  logo.className = 'logo'

  const title = document.createElement('h1')
  title.textContent = 'Unearthed'

  container.appendChild(logo)
  container.appendChild(title)
  header.appendChild(container)
})


