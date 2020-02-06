import { DROPDOWN } from './dropdown-utils'
import {
  addClass,
  elementFromTemplate,
  find,
  findOne,
  hasClass,
  removeClass,
  toggleCheckbox,
  toggleClass
} from '../../dom-utils'
import {
  BaseDropdownGroupClass,
  updateTitle
} from './base-classes'
import {
  CheckAll
} from '../../check-all'

const resetSearch = dropdownInstance => {
  if (dropdownInstance.hasSearchFunctionality) {
    dropdownInstance.dropdownSearchInput.value = ''
    dropdownInstance.search(dropdownInstance.dropdownSearchInput)
  }
}

// Type Ahead Dropdown
/**
 * Chip template
 *
 * @param chipName
 * @param chipContent
 * @returns {string}
 */
const dropdownChipTemplate = (chipName, chipContent) => {
  return `
    <div class="${DROPDOWN.chip.class.chip}" data-name="${chipName}">
      ${chipContent}
      <i class="fa fa-times ${DROPDOWN.chip.class.removeChip}" aria-hidden="true"></i>
    </div>
  `
}

const createChip = chipInstance => {
  // add the chip after all of the others within the group
  const chipTemplate = dropdownChipTemplate(chipInstance.chipName, chipInstance.chipContent)
  chipInstance.chip = elementFromTemplate(chipTemplate)

  chipInstance.dropdownChips.insertBefore(chipInstance.chip, findOne(chipInstance.dropdownChips, DROPDOWN.default.selector.searchInput))
}

const closeButtonOnClickChipEvent = chipInstance => {
  findOne(chipInstance.chip, `.${DROPDOWN.chip.class.removeChip}`).addEventListener('click', event => {
    event.stopPropagation()
    toggleCheckbox(chipInstance.dropdownCheckbox)
  })
}

/**
 * Chips are mandatory for multiple selects
 */
class DropdownChip {
  constructor(dropdownChips, dropdownCheckbox) {
    this.dropdownChips = dropdownChips
    this.dropdownCheckbox = dropdownCheckbox
    this.chip = null

    // chip's name and text are extracted from the specific checkbox
    this.chipName = this.dropdownCheckbox.getAttribute('name')
    this.chipContent = this.dropdownCheckbox.getAttribute(DROPDOWN.default.class.dataText)

    createChip(this)
    closeButtonOnClickChipEvent(this)
  }
}

const onCheckboxChangeEventTAD = (tagInstance, checkbox) => {
  const checkState = checkbox.input.checked

  if (checkState) tagInstance.markCheckboxUnchecked(checkbox)
  else tagInstance.markCheckboxChecked(checkbox)

  resetSearch(tagInstance.dropdownObject)
  updateTitle(tagInstance.dropdownObject)
}

const initializeGroupTAD = tagInstance => {
  find(tagInstance.dropdownGroup, DROPDOWN.checkbox.selector.selectableCheckboxes).forEach(checkbox => {
    tagInstance.inputs.push({
      input: checkbox,
      chip: null,
    })

    if (checkbox.checked) {
      tagInstance.inputs[tagInstance.inputs.length - 1].chip = new DropdownChip(tagInstance.dropdownChips, checkbox)
      addClass(checkbox.closest(DROPDOWN.default.selector.item), DROPDOWN.checkbox.selector.checked)
    }
  })
}

const addEventListenersToInputsTAD = tagInstance => {
  tagInstance.inputs.forEach(checkbox => checkbox.input.addEventListener('change', () => onCheckboxChangeEventTAD(tagInstance, checkbox)))
}

export class MultiSelectTypeAheadDropdownGroup extends BaseDropdownGroupClass {
  /**
   * @param dropdownGroup should be a HTML object
   * @param dropdownObject should be a MultiSelectTypeAheadDropdown instance
   */
  constructor(dropdownGroup, dropdownObject) {
    super(dropdownGroup, dropdownObject)
    this.dropdownChips = dropdownObject.dropdownChips

    initializeGroupTAD(this)
    addEventListenersToInputsTAD(this)
  }

  markCheckboxChecked(checkbox) {
    const item = checkbox.input.closest(DROPDOWN.default.selector.item)
    checkbox.chip.chip.remove()
    delete checkbox.chip
    removeClass(item, DROPDOWN.checkbox.selector.checked)
  }

  markCheckboxUnchecked(checkbox) {
    const item = checkbox.input.closest(DROPDOWN.default.selector.item)
    checkbox.chip = new DropdownChip(this.dropdownChips, checkbox.input)
    addClass(item, DROPDOWN.checkbox.selector.checked)
  }
}

// Single Select Dropdown
const populateInputsSSD = dropdownGroupInstance => {
  find(dropdownGroupInstance.dropdownGroup, DROPDOWN.checkbox.selector.namedInputs).forEach(input => {
    dropdownGroupInstance.inputs.push(input)
  })
}

const markInputAsUncheckedIfChecked = input => {
  const item = input.closest(DROPDOWN.default.selector.item)
  const isChecked = hasClass(item, DROPDOWN.checkbox.selector.checked) &&
    !hasClass(item, DROPDOWN.checkbox.class.justChecked)
  if (isChecked) toggleCheckbox(input)
}

const onInputChangeEventSSD = (dropdownGroupInstance, input) => {
  const item = input.closest(DROPDOWN.default.selector.item)
  if (input.checked) {
    const activeItem = findOne(dropdownGroupInstance.dropdownObject.dropdown, `${DROPDOWN.default.selector.item}.${DROPDOWN.checkbox.selector.checked}`)
    if (activeItem) removeClass(activeItem, DROPDOWN.checkbox.selector.checked)
    addClass(item, DROPDOWN.checkbox.class.justChecked)
    setTimeout(() => { removeClass(item, DROPDOWN.checkbox.class.justChecked) }, 100)
  }
  toggleClass(item, DROPDOWN.checkbox.selector.checked, input.checked)
  resetSearch(dropdownGroupInstance.dropdownObject)
}

const addEventListenersToInputsSSD = dropdownGroupInstance => {
  dropdownGroupInstance.inputs.forEach(input => {
    input.addEventListener('click', () => markInputAsUncheckedIfChecked(input))
    input.addEventListener('change', () => onInputChangeEventSSD(dropdownGroupInstance, input))
  })
}

export class SingleSelectDropdownGroup extends BaseDropdownGroupClass {
  /**
   * @param dropdownGroup should be a HTML object
   * @param dropdownObject should be a SingleSelectDropdown instance
   */
  constructor(dropdownGroup, dropdownObject) {
    super(dropdownGroup, dropdownObject)

    populateInputsSSD(this)
    addEventListenersToInputsSSD(this)
  }
}

// Check Mark Dropdown
const initializeCMD = dropdownGroupInstance => {
  find(dropdownGroupInstance.dropdownGroup, DROPDOWN.checkbox.selector.selectableCheckboxes).forEach(checkbox => {
    dropdownGroupInstance.inputs.push(checkbox)

    if (checkbox.checked) addClass(checkbox.closest(DROPDOWN.default.selector.item), DROPDOWN.checkbox.selector.checked)
  })
}

const markCheckboxAsCMD = (dropdownGroupInstance, checkbox, checkedValue) => {
  if (typeof checkedValue !== 'boolean') return
  const item = checkbox.closest(DROPDOWN.default.selector.item)
  toggleClass(item, DROPDOWN.checkbox.selector.checked, checkedValue)
}

const onCheckboxChangeEventCMD = (dropdownGroupInstance, checkbox) => {
  const checkState = checkbox.checked
  markCheckboxAsCMD(dropdownGroupInstance, checkbox, checkState)

  resetSearch(dropdownGroupInstance.dropdownObject)
  updateTitle(dropdownGroupInstance.dropdownObject)
}

const addEventListenersToInputsCMD = dropdownGroupInstance => {
  dropdownGroupInstance.inputs.forEach(checkbox => checkbox.addEventListener('change', () => onCheckboxChangeEventCMD(dropdownGroupInstance, checkbox)))
}

export class MultiSelectCheckMarkDropdownGroup extends BaseDropdownGroupClass {
  /**
   * @param dropdownGroup should be a HTML object
   * @param dropdownObject should be a MultiSelectCheckMarkDropdown instance
   */
  constructor(dropdownGroup, dropdownObject) {
    super(dropdownGroup, dropdownObject)
    this.checkAll = new CheckAll(DROPDOWN.checkbox.selector.selectableCheckboxes, DROPDOWN.checkbox.selector.checkAll, dropdownGroup)

    initializeCMD(this)
    addEventListenersToInputsCMD(this)
  }
}
