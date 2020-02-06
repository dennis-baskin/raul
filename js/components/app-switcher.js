import {
  addClass,
  append,
  css,
  elementFromTemplate,
  fadeOut,
  remove
} from '../dom-utils'
import { groupBy } from '../array-utils'

class AppSwitcher {
  /**
   * Creates the AppSwitcher instance and initialize options.
   * @param {Object} options - AppSwitcher initialization options.
   * @param {Object} options.switcherData - The dataset from JSON payload, representing products.
   * @param {string} options.trigger - The css selector for trigger that adds and removes switcher.
   */
  constructor({
    switcherData = {products: []},
    trigger = '.raul-header-app-switcher',
  } = {}) {
    AppSwitcher.switcherInstanceNumber = AppSwitcher.switcherInstanceNumber || 0
    AppSwitcher.switcherInstanceNumber++

    if (AppSwitcher.appSwitcherInstance) AppSwitcher.removeCurrentAppSwitcherInstance()

    try {
      this.products = switcherData.products
      this.switcher = this.getSwitcher()
      this.trigger = document.querySelector(trigger)
      this.bindEvents()

      this.switcherInstanceNumber = AppSwitcher.switcherInstanceNumber
      AppSwitcher.appSwitcherInstance = this
    } catch (error) {
      if (window.console) console.error(error)
    }
  }

  get [Symbol.toStringTag]() {
    return 'AppSwitcher'
  }

  toString() {
    return (`
      AppSwitcher[
        switcherData=${this.products.constructor.name},
        trigger=${this.trigger.constructor.name}
      ]
    `)
  }

  /**
   * Static method shorthand to instantiate the AppSwitcher with options.
   * @param {Object} options - AppSwitcher initialization options.
   */
  static fromOptions(options) {
    return new AppSwitcher(options)
  }

  /**
   * Returns HTML string representing the AppSwitcher content wrapper.
   * @param {Object} options
   * @param {string} options.familyProductsHTML - HTML string representing products by family.
   * @param {string} options.favoriteProductsHTML - HTML string representing favorite products.
   */
  static appSwitcherTemplate({familyProductsHTML, favoriteProductsHTML}) {
    return (`
      <div id="raul-switcher-context" class="raul-switcher-context fade">
        <ul class="raul-nav nav nav-tabs raul-nav-underline" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              href="#apps-all"
              aria-controls="apps-all"
              role="tab"
              data-toggle="tab"
              aria-expanded="true"
            >
              All Products
            </a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              href="#apps-favorites"
              aria-controls="apps-favorites"
              role="tab"
              data-toggle="tab"
              aria-expanded="false"
            >
              Favorites
            </a>
          </li>
        </ul>

        <div class="raul-tab-content tab-content">
          <div role="tabpanel" class="tab-pane active show" id="apps-all">
            ${familyProductsHTML}
          </div>

          <div role="tabpanel" class="tab-pane" id="apps-favorites">
            ${favoriteProductsHTML}
          </div>
        </div>
      </div>
    `)
  }

  /**
   * Returns HTML string representing a family of products.
   * @param {Object} options
   * @param {string} options.familyClass - css classname for this family.
   * @param {string} options.familyName - name of family .
   * @param {string} options.productsHTML - HTML string representing products for this family.
   */
  static familyTemplate({familyClass, familyName, productsHTML}) {
    return (`
      <div class="family">
        <h3 class="family-name ${familyClass}">
          <i class="family-icon"></i>
          <span class="family-text">${familyName}</span>
        </h3>

        <div class="products">
          ${productsHTML}
        </div>
      </div>
    `)
  }

  /**
   * Returns HTML string representing a single product.
   * @param {Object} options
   * @param {boolean} options.isNewTab - whether or not product should open in a new tab.
   * @param {string} options.label - static product identifier label.
   * @param {string} options.name - full product name.
   * @param {string} options.url - url for product.
   */
  static productTemplate({isNewTab, label, name, url}) {
    const newTab = isNewTab ? `target="${label}"` : ''
    const productName = name.length > 32 ? `${name.substring(0, 32)}...` : name

    return (`
      <a class="product-url" href="${url}" ${newTab}>
        <span class="product ${label}">
          <i class="product-icon fa fa-times"></i>
          <span class="product-name">${productName}</span>
        </span>
      </a>
    `)
  }

  /**
   * Static method that finds and fades out app switcher by id rather than an instance reference.
   */
  static remove() {
    const switcher = document.querySelector('#raul-switcher-context')
    if (switcher) fadeOut(switcher, () => remove(switcher))
  }

  /**
   * Static method that deletes the instance of app switcher that is currently active,
   * along with its switcher if possible
   */
  static removeCurrentAppSwitcherInstance() {
    if (!AppSwitcher.appSwitcherInstance) return
    remove(AppSwitcher.appSwitcherInstance.switcher)
    AppSwitcher.appSwitcherInstance = null
    delete AppSwitcher.appSwitcherInstance
  }

  /**
   * Returns generated DOM element built from app switcher template.
   */
  getSwitcher() {
    return elementFromTemplate(AppSwitcher.appSwitcherTemplate({
      familyProductsHTML: this.getFamilyProductsHTML(),
      favoriteProductsHTML: this.getFavoriteProductsHTML(),
    }))
  }

  /**
   * Returns HTML string representing favorite products built from templates.
   */
  getFavoriteProductsHTML() {
    const products = this.products
      .filter(({isFavorite}) => isFavorite)
      .map(product => AppSwitcher.productTemplate(product))
      .join('')

    return `<div class="products">${products}</div>`
  }

  /**
   * Returns HTML string representing products sorted by families, built from templates.
   */
  getFamilyProductsHTML() {
    const productsByFamily = groupBy(this.products, 'familyName')

    return Object
      .keys(productsByFamily)
      .map((familyName) => {
        const products = productsByFamily[familyName]
        const familyClass = familyName.toLowerCase().replace(/\s/g, '-').replace('&', 'and')
        const productsHTML = products.map(product => AppSwitcher.productTemplate(product)).join('')

        return AppSwitcher.familyTemplate({
          familyName: familyName,
          familyClass: familyClass,
          productsHTML: productsHTML,
        })
      })
      .join('')
  }

  /**
   * Fades in app switcher.
   */
  add() {
    const legacyIconContainer = this.trigger.closest('.icon-container')
    const unifiedNavbarItem = this.trigger.closest('.unified-navbar-item')
    const appendTarget = legacyIconContainer || unifiedNavbarItem

    if (!appendTarget) return false

    remove(this.switcher)
    addClass(this.switcher, 'show')
    append(this.switcher, appendTarget)
  }

  /**
   * Fades out app switcher.
   */
  remove() {
    fadeOut(this.switcher, () => remove(this.switcher))
  }

  /**
   * Adds event listeners for adding and removing app switcher.
   */
  bindEvents() {
    document.addEventListener('click', event => {
      if (!this.switcher.parentElement) return
      if (!this.switcher.parentElement.contains(event.target)) this.remove()
    })

    if (!this.trigger) return
    this.trigger.addEventListener('click', e => {
      e.preventDefault()
      RAUL.header.closeOtherContexts('switcher')

      if (this.switcherInstanceNumber !== AppSwitcher.switcherInstanceNumber) return
      this.switcher.style.top = css(document.querySelector('.raul-header')).height
      this.switcher.style.right = '-30px'

      this.switcher.classList.contains('show') ? this.remove() : this.add()
    })
  }
}

export { AppSwitcher }
