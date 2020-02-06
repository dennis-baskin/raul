import { throttle } from 'lodash/fp'
import { CheckAll } from '../../check-all'
import {
  findOne,
  Q,
  toggleClass
} from '../../dom-utils'

const SELECTOR = '.table-with-bulk-action'
const BULK_ACTION_MENU_SELECTOR = '.bulk-action-menu'

const ACTION_CHECKBOX_SELECTOR = 'input.action-checkbox'
const CHECK_ALL_SELECTOR = 'input.check-all'
const DESELECT_CHECKBOXES_SELECTOR = '.deselect-all-checkboxes'
const SELECTED_CHECKBOXES_SELECTOR = '.checkboxes-selected'
const HIGHLIGHTED_ROW_CLASS = 'highlighted-row'
const DATA_TOP_DISTANCE = 'data-top-distance'
const ACTION_MOBILE_TOGGLE_SELECTOR = '.list-right-item:first-child'
const ACTION_MOBILE_DRAWER_SELECTOR = '.list-left-side'

const VISIBLE_CLASS = 'visible'

const updateBulkMenusPosition = bulkActionObject => {
  const boundingRect = bulkActionObject.bulkAction.getBoundingClientRect()
  const actionMenuHeight = bulkActionObject.bulkActionMenu.offsetHeight
  const topDistance = boundingRect.top - bulkActionObject.topDistance
  const bottomDistance = boundingRect.bottom - bulkActionObject.topDistance - actionMenuHeight

  const menuTopDistance = (() => {
    if (bottomDistance < 0) return bulkActionObject.bulkAction.offsetHeight - actionMenuHeight
    return topDistance < 0 ? -topDistance : 0
  })()

  bulkActionObject.bulkActionMenu.style.top = `${menuTopDistance}px`

  if (menuTopDistance === 0) {
    bulkActionObject.bulkActionMenu.style.position = `static`
  } else {
    bulkActionObject.bulkActionMenu.style.position = `absolute`
  }
}

const keepActionMenuInView = bulkActionObject => {
  const throttleUpdateOnScroll = throttle(10, () => updateBulkMenusPosition(bulkActionObject))
  const throttleUpdateOnResize = throttle(100, () => updateBulkMenusPosition(bulkActionObject))

  window.addEventListener('scroll', throttleUpdateOnScroll)
  window.addEventListener('resize', throttleUpdateOnResize)

  updateBulkMenusPosition(bulkActionObject)
}

const addEventListenersOnCheckboxesChanged = bulkActionObject => {
  [...bulkActionObject.checkAll.secondaryCheckboxes].forEach(checkbox => {
    checkbox.addEventListener('change', event => onCheckboxesChanged(bulkActionObject, checkbox))
  })
}

const addEventListenerOnDeselectButton = bulkActionObject => {
  if (bulkActionObject.deselectCheckboxes) {
    bulkActionObject.deselectCheckboxes.addEventListener('click', event => {
      deselectCheckboxesOnClickEvent(bulkActionObject, event)
    })
  }
}

const onCheckboxesChanged = (bulkActionObject, checkbox) => {
  bulkActionObject.highlightRow(checkbox.closest('tr'), checkbox.checked)
  toggleBulkActionMenu(bulkActionObject)
}

const deselectCheckboxesOnClickEvent = (bulkActionObject, event) => {
  event.preventDefault()
  bulkActionObject.checkAll.markCheckboxesAs(false)
}

const addEventListenerOnMobileActionToggle = (bulkActionObject) => {
  bulkActionObject.mobileActionToggle.addEventListener('click', event => {
    bulkActionObject.toggleActionDrawer()
  })
}

const toggleBulkActionMenu = (bulkActionObject) => {
  const isAnyCheckboxChecked = bulkActionObject.isAnyCheckboxChecked()

  toggleClass(bulkActionObject.bulkActionMenu, VISIBLE_CLASS, isAnyCheckboxChecked)
  bulkActionObject.selectedCheckboxes.innerHTML = bulkActionObject.numberOfCheckboxesChecked()
}

class BulkAction {
  /**
   * @param {HTMLElement} bulkAction
   */
  constructor(bulkAction) {
    this.bulkAction = bulkAction
    this.bulkActionMenu = findOne(this.bulkAction, BULK_ACTION_MENU_SELECTOR)
    this.deselectCheckboxes = findOne(this.bulkAction, DESELECT_CHECKBOXES_SELECTOR)
    this.selectedCheckboxes = findOne(this.bulkAction, SELECTED_CHECKBOXES_SELECTOR)
    this.mobileActionToggle = findOne(this.bulkActionMenu, ACTION_MOBILE_TOGGLE_SELECTOR)
    this.mobileActionDrawer = findOne(this.bulkActionMenu, ACTION_MOBILE_DRAWER_SELECTOR)
    this.topDistance = this.bulkAction.hasAttribute(DATA_TOP_DISTANCE)
      ? parseInt(this.bulkAction.getAttribute(DATA_TOP_DISTANCE)) : 0

    this.checkAll = new CheckAll(ACTION_CHECKBOX_SELECTOR, CHECK_ALL_SELECTOR, this.bulkAction)
    this.initialize()
  }

  initialize() {
    addEventListenersOnCheckboxesChanged(this)
    addEventListenerOnDeselectButton(this)
    addEventListenerOnMobileActionToggle(this)
    toggleBulkActionMenu(this)
    keepActionMenuInView(this)
    this.updateHighlightedRows()
  }

  isAnyCheckboxChecked() {
    return [...this.checkAll.secondaryCheckboxes].some(checkbox => checkbox.checked)
  }

  numberOfCheckboxesChecked() {
    return [...this.checkAll.secondaryCheckboxes].filter(checkbox => checkbox.checked).length
  }

  highlightRow(row, highlightedState) {
    toggleClass(row, HIGHLIGHTED_ROW_CLASS, highlightedState)
  }

  toggleActionDrawer() {
    toggleClass(this.mobileActionDrawer, 'open')
  }

  updateHighlightedRows() {
    [...this.checkAll.secondaryCheckboxes].forEach(checkbox => {
      this.highlightRow(checkbox.closest('tr'), checkbox.checked)
    })
  }
}

export default () => {
  const elements = Q(SELECTOR)

  elements.forEach(element => {
    if (element.RAUL && element.RAUL.bulkAction) return
    element.RAUL = element.RAUL || {}
    element.RAUL.bulkAction = new BulkAction(element)
  })
}

export { BulkAction }
