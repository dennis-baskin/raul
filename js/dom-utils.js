export const addClass = (element, classString) => element.classList.add(classString)

export const append = (element, appendTo) => appendTo.appendChild(element)

export const clickedWithin = (element, clickedTarget) => {
  const isElement = this.content === clickedTarget
  const withinElement = this.content.contains(clickedTarget)
  return isElement || withinElement
}

export const css = (element, styles) => {
  if (!styles) return window.getComputedStyle(element)

  for (const prop in styles) {
    element.style[`${prop}`] = `${styles[prop]}`
  }
}

export const elementFromTemplate = string => {
  return new window.DOMParser().parseFromString(string, 'text/html').body.firstChild
}

export const fadeOut = (element, callback) => {
  addClass(element, 'fade')
  removeClass(element, 'show')
  setTimeout(callback, getTotalTransitionTime(element))
}

export const fadeInAnimation = (element, transitionTime = 400) => {
  if (hasClass(element, 'js-is-animating')) return

  addClass(element, 'js-is-animating')

  element.style.display = 'block'
  element.style.opacity = 0
  element.style.transition = `opacity ${transitionTime / 1000}s`

  setTimeout(() => {
    element.style.opacity = 1
  }, 1)

  setTimeout(() => {
    element.style.transition = ''
    element.style.opacity = ''

    removeClass(element, 'js-is-animating')
  }, transitionTime)
}

export const fadeOutAnimation = (element, transitionTime = 400) => {
  if (hasClass(element, 'js-is-animating')) return

  addClass(element, 'js-is-animating')

  element.style.transition = `opacity ${transitionTime / 1000}s`
  element.style.opacity = 1

  setTimeout(() => {
    element.style.opacity = 0
  }, 1)

  setTimeout(() => {
    element.style.transition = ''
    element.style.opacity = ''
    element.style.display = 'none'

    removeClass(element, 'js-is-animating')
  }, transitionTime)
}

export const find = (parent, childrenSelector) => parent.querySelectorAll(childrenSelector)

export const findElementWithin = (parentElement, childSelector) => parentElement ? findOne(parentElement, childSelector) : undefined

export const findOne = (parent, childrenSelector) => parent.querySelector(childrenSelector)

export const getTotalTransitionTime = element => {
  const timesAndUnits = /([\d.]+)/g
  const transitionDuration = css(element).transitionDuration

  const excludeEmptyStrings = item => item !== ''

  const convertToTotalMs = (accumulator, currentValue) => {
    const [time, unit] = currentValue.split(timesAndUnits).filter(excludeEmptyStrings)

    const timeVal = Number.parseFloat(time)

    if (unit === 'ms') return accumulator + timeVal
    if (unit === 's') return accumulator + (timeVal * 1000)
  }

  return transitionDuration.replace(/\s/, '').split(',').reduce(convertToTotalMs, 0)
}

export const hasClass = (element, classString) => element.classList.contains(classString)

export const insertAfter = (referenceNode, newNode) => referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)

export const isHidden = element => !isVisible(element)

export const isVisible = element => !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)

export const nextSibling = (element, siblingSelector = null) => {
  const nextSibling = element.nextElementSibling
  if (!nextSibling) return null
  if (siblingSelector === null) return nextSibling
  return nextSibling.matches(siblingSelector) ? nextSibling : null
}

export const remove = element => {
  if (element.parentNode) element.parentNode.removeChild(element)
}

export const removeClass = (element, classString) => element.classList.remove(classString)

export const toggleCheckbox = (checkbox, force = null) => {
  if (force !== null && checkbox.checked === force) return
  checkbox.checked = !checkbox.checked
  const changeEvent = new CustomEvent('change')
  checkbox.dispatchEvent(changeEvent)
}

export const toggleClass = (element, className, force = null) => {
  if (force !== null) return force ? addClass(element, className) : removeClass(element, className)
  hasClass(element, className) ? removeClass(element, className) : addClass(element, className)
}

export const Q = target => document.querySelectorAll(target)

export const getHeight = (element) => {
  element.style.display = 'block'
  const height = `${element.scrollHeight}px`
  element.style.display = ''

  return height
}

export const msToS = (value) => {
  return value / 1000
}

const NOOP = () => {}

export const slideDown = (element, {
  transitionTime = 400,
  onSlideStart = NOOP,
  onSlideEnd = NOOP,
} = {}) => {
  if (hasClass(element, 'js-is-animating')) return

  addClass(element, 'js-is-animating')

  onSlideStart()

  const height = getHeight(element)
  css(element, {
    'transition': `height ${msToS(transitionTime)}s`,
    'display': 'block',
    'overflow': 'hidden',
    'height': 0,
  })

  setTimeout(() => {
    css(element, {'height': height})
  }, 1)

  setTimeout(() => {
    css(element, {
      'transition': '',
      'height': '',
      'overflow': '',
    })

    onSlideEnd()

    removeClass(element, 'js-is-animating')
  }, transitionTime)
}

export const slideUp = (element, {
  transitionTime = 400,
  onSlideStart = NOOP,
  onSlideEnd = NOOP,
} = {}) => {
  if (hasClass(element, 'js-is-animating')) return

  addClass(element, 'js-is-animating')

  onSlideStart()

  const height = getHeight(element)
  css(element, {
    'transition': `height ${msToS(transitionTime)}s`,
    'height': height,
    'display': 'block',
    'overflow': 'hidden',
  })

  setTimeout(() => {
    css(element, {'height': 0})
  }, 1)

  setTimeout(() => {
    css(element, {
      'transition': '',
      'height': '',
      'overflow': '',
      'display': 'none',
    })

    onSlideEnd()

    removeClass(element, 'js-is-animating')
  }, transitionTime)
}

export const slideToggle = (element, {
  transitionTime = 400,
  onSlideStart = NOOP,
  onSlideEnd = NOOP,
} = {}) => {
  if (element.scrollHeight) {
    slideUp(element, {
      transitionTime,
      onSlideStart,
      onSlideEnd,
    })
    return
  }

  slideDown(element, {
    transitionTime,
    onSlideStart,
    onSlideEnd,
  })
}
