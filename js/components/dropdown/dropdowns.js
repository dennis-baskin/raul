import { BaseDropdownClass } from './base-classes'
import { SingleSelectDropdownGroup, MultiSelectTypeAheadDropdownGroup, MultiSelectCheckMarkDropdownGroup } from './dropdown-groups'

const SINGLE_SELECT_CLASS_STRING = 'SingleSelectDropdownGroup'
const CHECK_MARK_MULTIPLESELECT_CLASS_STRING = 'MultiSelectCheckMarkDropdown'
const TYPE_AHEAD_MULTIPLESELECT_CLASS_STRING = 'MultiSelectTypeAheadDropdown'

const initializeGroupsByType = Object.freeze({
  [SINGLE_SELECT_CLASS_STRING](dropdownInstance) {
    dropdownInstance.dropdownGroups.forEach(dropdownGroup => {
      dropdownInstance.groups.push(new SingleSelectDropdownGroup(dropdownGroup, dropdownInstance))
    })
  },
  [CHECK_MARK_MULTIPLESELECT_CLASS_STRING](dropdownInstance) {
    dropdownInstance.dropdownGroups.forEach(dropdownGroup => {
      dropdownInstance.groups.push(new MultiSelectCheckMarkDropdownGroup(dropdownGroup, dropdownInstance))
    })
  },
  [TYPE_AHEAD_MULTIPLESELECT_CLASS_STRING](dropdownInstance) {
    dropdownInstance.dropdownGroups.forEach(dropdownGroup => {
      dropdownInstance.groups.push(new MultiSelectTypeAheadDropdownGroup(dropdownGroup, dropdownInstance))
    })
  },
})

export const initializeGroups = dropdownInstance => {
  if (dropdownInstance.isSingle) initializeGroupsByType[SINGLE_SELECT_CLASS_STRING](dropdownInstance)
  else if (dropdownInstance.isCheckMarkMultiselect) initializeGroupsByType[CHECK_MARK_MULTIPLESELECT_CLASS_STRING](dropdownInstance)
  else if (dropdownInstance.isTypeAheadMultiselect) initializeGroupsByType[TYPE_AHEAD_MULTIPLESELECT_CLASS_STRING](dropdownInstance)
}

export class MultiSelectTypeAheadDropdown extends BaseDropdownClass {
  /**
   * @param dropdown should be a HTML object
   */
  constructor(dropdown) {
    super(dropdown)
    initializeGroups(this)
  }

  get isTypeAheadMultiselect() {
    return true
  }

  toggleChips(show) {
    // If show is not passed then it is determined based on content visibility
    if (typeof show === 'undefined') {
      show = window.getComputedStyle(this.dropdownChips.style.display) === 'none'
    }

    this.dropdownTitleContent.style.display = show ? 'none' : 'flex'
    this.dropdownChips.style.display = show ? 'block' : 'none'
  }
}

export class SingleSelectDropdown extends BaseDropdownClass {
  /**
   * @param dropdown should be a HTML object
   */
  constructor(dropdown) {
    super(dropdown)
    initializeGroups(this)
  }

  get isSingle() {
    return true
  }
}

export class MultiSelectCheckMarkDropdown extends BaseDropdownClass {
  /**
   * @param dropdown should be a HTML object
   */
  constructor(dropdown) {
    super(dropdown)
    initializeGroups(this)
  }

  get isCheckMarkMultiselect() {
    return true
  }
}
