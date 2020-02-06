import { hasClass } from '../../js/dom-utils'

window.Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true,
  'indent': 2,
  'remove-initial-line-feed': true,
  'tabs-to-spaces': 2,
})

window.Prism.hooks.add('before-highlight', (env) => {
  env.element.parentElement.prepend($(`
    <div class="code-snippet-heading">
      ${env.language}
    </div>
  `).get(0))
})

const ClipboardJS = window.ClipboardJS
const callbacks = []

window.Prism.plugins.toolbar.registerButton('copy-to-clipboard', (env) => {
  const linkCopy = $('<a>Copy</a>').get(0)

  const registerClipboard = () => {
    const clip = new ClipboardJS(linkCopy, {text: () => env.code})

    clip.on('success', () => {
      linkCopy.textContent = 'Copied!'
      resetText()
    })

    clip.on('error', () => {
      linkCopy.textContent = 'Press Ctrl+C to copy'
      resetText()
    })
  }

  const resetText = () => setTimeout(() => { linkCopy.textContent = 'Copy' }, 5000)

  ClipboardJS ? registerClipboard() : callbacks.push(registerClipboard)

  return linkCopy
})

jQuery(function($) {
  // notifications
  //
  // Consider rewriting initializers to be whitelist / blacklist components
  // initialization for all of RAUL. Mainly to avoid users needing to use
  // additional APIs. Basically just have a default to load unless specified
  // in a user config object

  var contentYOffset = (function() {
    var headerHeight = $('#raul-header').outerHeight()
    var pageHeaderHeight = $('#raul-page-header').outerHeight()

    return headerHeight + pageHeaderHeight
  })()

  var scrollToContent = function(contentIdString) {
    var element = $(contentIdString)

    if (element.length === 0) return

    var elementYPosition = element.offset().top
    var scrollX = 0
    var scrollY = elementYPosition - contentYOffset

    window.scroll({
      top: scrollY,
      left: scrollX,
      behavior: 'smooth',
    })
  }

  $('.raul-left-navigation-items a[href^="#"]').on('click', function(e) {
    e.preventDefault()

    const hrefValue = this.attributes.href.value

    if (hrefValue === '#') return

    scrollToContent(hrefValue)
  })

  if (window.location.hash) scrollToContent(window.location.hash)

  var secondaryGuest = document.querySelector('.secondary-guest')

  if (secondaryGuest) {
    var secondaryGuestToggle = document.querySelector('#secondary-guest-switch')
    var secondaryGuestTitle = secondaryGuestToggle.nextElementSibling

    secondaryGuestToggle.addEventListener('change', function(ev) {
      var isChecked = secondaryGuestToggle.checked
      secondaryGuest.style.display = isChecked ? '' : 'none'
      secondaryGuestTitle.classList[isChecked ? 'remove' : 'add']('text-charcoal-30')
    })
  }

  const CUSTOM_ELEMENT_TAB_SELECTOR = '#custom-element-version'
  const CUSTOM_ELEMENT_TAB = document.querySelector(CUSTOM_ELEMENT_TAB_SELECTOR)
  const CAROUSEL_SELECTOR = '.raul-carousel'
  const CAROUSEL_CARDS_SELECTOR = 'raul-carousel-cards'

  let initialized = false

  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    if (initialized === true) return

    const tabId = e.target.getAttribute('href')

    if (tabId !== CUSTOM_ELEMENT_TAB_SELECTOR) return

    const customElementCarousels = CUSTOM_ELEMENT_TAB.querySelectorAll(CAROUSEL_SELECTOR)

    customElementCarousels.forEach(customElementCarousel => {
      const isCardCarousel = hasClass(customElementCarousel, CAROUSEL_CARDS_SELECTOR)
      const createCardCarousel = () => new RAUL.CardCarousel(customElementCarousel)
      const createBasicCarousel = () => new RAUL.BasicCarousel(customElementCarousel)

      return isCardCarousel ? createCardCarousel() : createBasicCarousel()
    })

    initialized = true
  })
})
