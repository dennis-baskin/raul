import '@webcomponents/custom-elements'
import 'whatwg-fetch'

const objectNeedsPolyfill = (object, polyfill) => {
  return window[object] && !window[object].prototype[polyfill]
}

// Element.closest

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
                              Element.prototype.webkitMatchesSelector
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    let el = this
    if (!document.documentElement.contains(el)) return null

    do {
      if (el.matches(s)) return el
      el = el.parentElement || el.parentNode
    } while (el !== null && el.nodeType === 1)

    return null
  }
}

//  Nodelist.prototype.forEach

const objectsToPolyfill = [
  'NodeList',
  'HTMLCollection',
]

const forEachPolyfill = function(callback, thisArg) {
  if (!callback) return this
  const arg = thisArg || window
  for (let i = 0, length = this.length; i < length; i++) callback.call(arg, this[i], i, this)
}

objectsToPolyfill.forEach((object) => {
  if (objectNeedsPolyfill(object, 'forEach')) window[object].prototype.forEach = forEachPolyfill
})

// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
;(function(arr) {
  arr.forEach((item) => {
    if (item.hasOwnProperty('remove')) return

    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,

      value() {
        if (this.parentNode !== null) this.parentNode.removeChild(this)
      },
    })
  })
})([window.Element.prototype, window.CharacterData.prototype, window.DocumentType.prototype])

// 'prepend' function polyfill

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
;(function(arr) {
  arr.forEach(function(item) {
    if (item.hasOwnProperty('prepend')) {
      return
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        const argArr = Array.prototype.slice.call(arguments)
        const docFrag = document.createDocumentFragment()

        argArr.forEach(function(argItem) {
          const isNode = argItem instanceof Node
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)))
        })

        this.insertBefore(docFrag, this.firstChild)
      },
    })
  })
})([Element.prototype, Document.prototype, DocumentFragment.prototype])

// CustomEvent polyfill

// Source: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
;(function() {
  if (typeof window.CustomEvent === 'function') return false

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined }
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
})()
