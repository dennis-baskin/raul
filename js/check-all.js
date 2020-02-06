import {
  find,
  findOne,
  Q,
  toggleCheckbox,
  toggleClass
} from './dom-utils'

const DEFAULT_MAIN_CHECKBOX_DATA = 'check-all-main'
const DEFAULT_SECONDARY_CHECKBOX_DATA = 'check-all-secondary'
const CHECKED_INDETERMINATE_CLASS = 'custom-control-input-indeterminate'
const DISABLED_ATTRIBUTE = 'disabled'

const markMainCheckboxAsIndeterminate = (checkAllInstance, indeterminateValue) => {
  toggleClass(checkAllInstance.mainCheckbox, CHECKED_INDETERMINATE_CLASS, indeterminateValue)
}

const updateMainCheckbox = checkAllInstance => {
  const isAnyCheckboxChecked = checkAllInstance.isAnyCheckboxChecked()
  const areAllCheckboxChecked = checkAllInstance.areAllCheckboxChecked()
  toggleCheckbox(checkAllInstance.mainCheckbox, isAnyCheckboxChecked)
  markMainCheckboxAsIndeterminate(checkAllInstance, !areAllCheckboxChecked)
}

const updateStatuses = checkAllInstance => {
  if (checkAllInstance.mainCheckbox.checked && checkAllInstance.mainCheckbox.classList.contains(CHECKED_INDETERMINATE_CLASS)) return checkAllInstance.markCheckboxesAs(true)
  updateMainCheckbox(checkAllInstance)
}

const addEventListenersOnCheckboxes = checkAllInstance => {
  // Checking main checkbox will auto check the others
  checkAllInstance.mainCheckbox.addEventListener('click', () => {
    checkAllInstance.markCheckboxesAs(checkAllInstance.mainCheckbox.checked)
    markMainCheckboxAsIndeterminate(checkAllInstance, false)
  })

  // Checking secondary checkboxes will auto check main checkbox
  checkAllInstance.secondaryCheckboxes.forEach(clickedCheckbox => {
    clickedCheckbox.addEventListener('change', () => { updateMainCheckbox(checkAllInstance) })
  })
}

export class CheckAll {
  /**
   * @param CHECKBOXES_SELECTOR must be a selector
   * @param MAIN_CHECKBOX_SELECTOR must be a selector
   * @param searchWithinElement must be a HTML object
   */
  constructor(CHECKBOXES_SELECTOR, MAIN_CHECKBOX_SELECTOR, searchWithinElement = null) {
    if (searchWithinElement === null) {
      this.mainCheckbox = MAIN_CHECKBOX_SELECTOR === null ? MAIN_CHECKBOX_SELECTOR : Q(MAIN_CHECKBOX_SELECTOR)[0]
      this.secondaryCheckboxes = Q(CHECKBOXES_SELECTOR)
    } else {
      this.mainCheckbox = MAIN_CHECKBOX_SELECTOR === null ? MAIN_CHECKBOX_SELECTOR : findOne(searchWithinElement, MAIN_CHECKBOX_SELECTOR)
      this.secondaryCheckboxes = find(searchWithinElement, CHECKBOXES_SELECTOR)
    }
    if (!this.mainCheckbox) return
    addEventListenersOnCheckboxes(this)
    updateStatuses(this)
  }

  isAnyCheckboxChecked() {
    return [...this.secondaryCheckboxes].some(checkbox => checkbox.checked === true)
  }

  areAllCheckboxChecked() {
    return [...this.secondaryCheckboxes].every(checkbox => {
      if (checkbox.hasAttribute(DISABLED_ATTRIBUTE)) return true
      return checkbox.checked === true
    })
  }

  markCheckboxesAs(checkedValue) {
    checkedValue = !!checkedValue
    this.secondaryCheckboxes.forEach(checkbox => {
      if (!checkbox.hasAttribute(DISABLED_ATTRIBUTE)) toggleCheckbox(checkbox, checkedValue)
    })
  }
}

export default () => {
  const checkAllMainAttribute = `data-${DEFAULT_MAIN_CHECKBOX_DATA}`
  const mainCheckboxes = Q(`[${checkAllMainAttribute}]`)

  mainCheckboxes.forEach(mainCheckbox => {
    if (mainCheckbox.RAUL && mainCheckbox.RAUL.checkAll) return
    mainCheckbox.RAUL = mainCheckbox.RAUL || {}
    const attributeValue = mainCheckbox.getAttribute(checkAllMainAttribute)
    mainCheckbox.RAUL.checkAll = new CheckAll(
      `[data-${DEFAULT_SECONDARY_CHECKBOX_DATA}="${attributeValue}"]`,
      `[${checkAllMainAttribute}="${attributeValue}"]`
    )
  })
}
