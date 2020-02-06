import {
  addClass,
  hasClass,
  removeClass,
  Q,
  find,
  findOne
} from '../dom-utils'

const ACCORDION_SELECTOR = '.raul-accordion-container'
const ACCORDION_ITEM_SELECTOR = '.raul-accordion-item'
const ACCORDION_ITEM_CONTENT_SELECTOR = '.raul-accordion-item-content'
const LABEL_SELECTOR = 'label'
const SINGLE_ACCORDION_CLASS = 'raul-accordion-single'
const ACCORDION_ITEM_OPEN_CLASS = 'raul-accordion-item-open'
const BOTTOM_PADDING_VALUE = '1.5rem'

const addEventListenersToItems = accordionInstance => {
  accordionInstance.accordionItems.forEach(item => {
    item.elementHeader.addEventListener('click', e => {
      e.preventDefault()
      accordionInstance.toggleItem(item)
    })
  })
}

const getAccordionItems = accordionInstance => {
  const items = []
  find(accordionInstance.accordion, ACCORDION_ITEM_SELECTOR).forEach(item => {
    items.push({
      element: item,
      elementHeader: findOne(item, LABEL_SELECTOR),
      elementContent: findOne(item, ACCORDION_ITEM_CONTENT_SELECTOR),
    })
  })
  return items
}

class Accordion {
  /**
   * @param accordion should be a HTML object
   */
  constructor(accordion) {
    this.accordion = accordion
    this.accordionItems = getAccordionItems(this)
    this.isSingleAccordion = hasClass(this.accordion, SINGLE_ACCORDION_CLASS)
    addEventListenersToItems(this)
  }

  openItem(accordionItem) {
    addClass(accordionItem.element, ACCORDION_ITEM_OPEN_CLASS)
    accordionItem.elementContent.style.height = `calc(${accordionItem.elementContent.scrollHeight}px + ${BOTTOM_PADDING_VALUE})`
    if (!this.isSingleAccordion) return

    this.accordionItems.forEach(item => {
      if (item !== accordionItem) this.closeItem(item)
    })
  }

  closeItem(accordionItem) {
    removeClass(accordionItem.element, ACCORDION_ITEM_OPEN_CLASS)
    accordionItem.elementContent.style.height = 0
  }

  toggleItem(accordionItem) {
    const isOpen = hasClass(accordionItem.element, ACCORDION_ITEM_OPEN_CLASS)
    isOpen ? this.closeItem(accordionItem) : this.openItem(accordionItem)
  }
}

export default () => {
  const accordions = Q(ACCORDION_SELECTOR)

  accordions.forEach(accordion => {
    if (accordion.RAUL && accordion.RAUL.accordion) return
    accordion.RAUL = accordion.RAUL || {}
    accordion.RAUL.accordion = new Accordion(accordion)
  })
}

export { Accordion }
