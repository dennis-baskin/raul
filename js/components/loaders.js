import {
  addClass,
  append,
  elementFromTemplate,
  remove,
  removeClass,
  Q
} from '../dom-utils'

class Loader {
  // @options: object
  //    @target: various (selector | element | HTMLCollection) - default: null
  //    @type: string ('page' | 'content') - default: 'page'
  constructor({target = '', type = 'page'} = {}) {
    this.type = type
    this.target = target

    this.loader = elementFromTemplate(Loader.template({
      type: this.type,
    }))
  }

  // @target: various (selector | element | HTMLCollection) - default: null
  add(target = null) {
    const appendTarget = (() => {
      if (this.type === 'page') return [...Q('body')]
      if (typeof target === 'string') return [...Q(target)]
      if (target instanceof HTMLElement) return [target]
      if (target instanceof NodeList || target instanceof Array) return [...target]
      if (!this.target) throw new Error('Target container not provided for loader instance')
      return [...Q(this.target)]
    })()

    remove(this.loader)

    if (this.type === 'page') addClass(document.body, 'page-loading')
    append(this.loader, appendTarget[0])
  }

  remove() {
    if (this.type === 'page') removeClass(document.body, 'page-loading')
    remove(this.loader)
  }

  // @options: object
  //    @type: string ('page' | 'content') - default: 'page'
  static template({type = 'page'} = {}) {
    return (`
      <div class="raul-${type}-loader-wrapper">
        <div class="raul-${type}-loader"></div>
      </div>
    `)
  }

  // @target: various (selector | element | HTMLCollection) - default: null
  static addContentLoader(target) {
    const targets = (() => {
      if (typeof target === 'string') return [...Q(target)]
      if (target instanceof HTMLElement) return [target]
      if (target instanceof NodeList || target instanceof Array) return [...target]
    })()

    Loader.removeContentLoader(targets)
    targets.forEach(container => new Loader({type: 'content'}).add(container))
  }

  // @target: various (selector | element | HTMLCollection) - default: null
  static removeContentLoader(target) {
    const selector = ' > .raul-content-loader-wrapper'

    const targets = (() => {
      if (typeof target === 'string') return [...Q(`${target}${selector}`)]

      if (target instanceof HTMLElement) {
        return [...target.querySelectorAll('.raul-content-loader-wrapper')]
      }

      if (target instanceof NodeList || target instanceof Array) {
        return [].concat(...[...target].map(element => {
          return [...element.querySelectorAll('.raul-content-loader-wrapper')]
        }))
      }
    })()

    targets.forEach(loader => remove(loader))
  }

  static removeAllContentLoaders() {
    [...Q('.raul-content-loader-wrapper')].forEach(loader => remove(loader))
  }

  static addPageLoader() {
    Loader.removePageLoader()
    new Loader({type: 'page'}).add('body')
  }

  static removePageLoader() {
    removeClass(document.body, 'page-loading')

    ;[...Q('.raul-page-loader-wrapper')].forEach(loader => remove(loader))
  }
}

export { Loader }
