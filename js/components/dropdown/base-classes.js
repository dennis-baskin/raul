import {
  addClass,
  find,
  findOne,
  hasClass,
  removeClass,
  toggleCheckbox
} from '../../dom-utils'

import {
  DROPDOWN,
  SEARCH_LOWER_LIMIT,
  LETTER_WIDTH,
  KEY_CODES
} from './dropdown-utils'

const SINGLE_SELECT_CLASS_STRING = 'SingleSelectDropdownGroup'
const CHECK_MARK_MULTIPLESELECT_CLASS_STRING = 'MultiSelectCheckMarkDropdown'
const TYPE_AHEAD_MULTIPLESELECT_CLASS_STRING = 'MultiSelectTypeAheadDropdown'

// Protected methods
const updateTitleByType = Object.freeze({
  [SINGLE_SELECT_CLASS_STRING](dropdownInstance) {
    const checkedInput = findOne(dropdownInstance.dropdown, DROPDOWN.checkbox.selector.checkedInput)
    dropdownInstance.dropdownTitle.innerHTML = checkedInput ? checkedInput.getAttribute(DROPDOWN.default.class.dataText) : dropdownInstance.defaultTitle
  },
  [CHECK_MARK_MULTIPLESELECT_CLASS_STRING](dropdownInstance) {
    const checkedInput = find(dropdownInstance.dropdown, DROPDOWN.checkbox.selector.checkedInput)

    let titleText = dropdownInstance.defaultTitle
    if (checkedInput.length > 0) {
      titleText = checkedInput.length === 1 ? checkedInput[0].getAttribute(DROPDOWN.default.class.dataText) : `${checkedInput.length} items selected`
      const selectedCheckAll = find(dropdownInstance.dropdown, `${DROPDOWN.default.selector.headerRow} ${DROPDOWN.checkbox.selector.checkAll}:${DROPDOWN.checkbox.selector.checked}`)
      if (selectedCheckAll.length === 1) {
        const group = selectedCheckAll[0].closest(DROPDOWN.default.selector.group)
        if (find(group, DROPDOWN.checkbox.selector.selectableCheckboxes).length === checkedInput.length) titleText = findOne(group, DROPDOWN.default.selector.sectionTitle).innerHTML
      }
    }

    dropdownInstance.dropdownTitle.innerHTML = titleText
    dropdownInstance.removeHighlightedRow()
  },
  [TYPE_AHEAD_MULTIPLESELECT_CLASS_STRING](dropdownInstance) {
    const chips = findOne(dropdownInstance.dropdownChips, `.${DROPDOWN.chip.class.chip}`)

    dropdownInstance.toggleChips(chips || dropdownInstance.isMenuShown())
    if (dropdownInstance.dropdownSearchInput && dropdownInstance.isMenuShown()) dropdownInstance.dropdownSearchInput.focus()
    dropdownInstance.removeHighlightedRow()
  },
})

export const updateTitle = dropdownInstance => {
  if (dropdownInstance.isSingle) updateTitleByType[SINGLE_SELECT_CLASS_STRING](dropdownInstance)
  else if (dropdownInstance.isCheckMarkMultiselect) updateTitleByType[CHECK_MARK_MULTIPLESELECT_CLASS_STRING](dropdownInstance)
  else if (dropdownInstance.isTypeAheadMultiselect) updateTitleByType[TYPE_AHEAD_MULTIPLESELECT_CLASS_STRING](dropdownInstance)
}

// Private methods
const initializeSearchBar = dropdownInstance => {
  const items = find(dropdownInstance.dropdown, DROPDOWN.default.selector.item)
  if (!items || !dropdownInstance.dropdownSearchInput) {
    dropdownInstance.hasSearchFunctionality = false
    return
  }

  if (items.length > SEARCH_LOWER_LIMIT) {
    addEventListenersOnSearch(dropdownInstance)
  } else {
    dropdownInstance.hasSearchFunctionality = false
    const hideElement = dropdownInstance.isTypeAheadMultiselect
      ? dropdownInstance.dropdownSearchInput
      : dropdownInstance.dropdownSearchInput.closest(DROPDOWN.default.selector.search)
    hideElement.style.display = 'none'
  }
}

const toggleSearchNotFoundElement = (dropdownInstance, toggleValue) => {
  dropdownInstance.dropdownSearchNotFound.style.display = toggleValue ? 'block' : 'none'
}

const toggleSearchNotFound = dropdownInstance => {
  if (!dropdownInstance.dropdownSearchNotFound) return

  const areRowsHidden = [...dropdownInstance.dropdownRows].every(row => row.style.display === 'none')
  toggleSearchNotFoundElement(dropdownInstance, areRowsHidden)
}

const highlightedRowKey = dropdownInstance => {
  const rows = [...dropdownInstance.dropdownRows]
  const highlightRow = rows.find(row => hasClass(row, DROPDOWN.default.class.highlight))
  const index = highlightRow === undefined ? -1 : rows.indexOf(highlightRow)
  return index === -1 ? null : index
}

const toggleRows = (dropdownInstance, visibilityStatus = true) => {
  const displayValue = visibilityStatus === true ? 'block' : 'none'
  dropdownInstance.dropdownRows.forEach(row => { row.style.display = displayValue })
}

const inputMatchesSearchedText = (dropdownInstance, input, searchText) => {
  const currentText = input.getAttribute(DROPDOWN.default.class.dataText).toLowerCase()
  const containsText = currentText.indexOf(searchText) >= 0

  return containsText || searchText.length === 0
}

const compareInputTextWithSearchedText = (dropdownInstance, input, searchText) => {
  const display = inputMatchesSearchedText(dropdownInstance, input, searchText) ? 'block' : 'none'
  input.closest(DROPDOWN.default.selector.row).style.display = display
}

const keepDropdownRowVisible = (dropdownInstance, highlightedRowKey) => {
  const highlightedRow = dropdownInstance.dropdownRows[highlightedRowKey]
  const scrollPosition = (highlightedRow.offsetTop + highlightedRow.offsetHeight) - dropdownInstance.dropdownBody.offsetHeight
  dropdownInstance.dropdownBody.scrollTop = scrollPosition
}

const nextAvailableRowOfArray = (dropdownInstance, rows) => {
  return rows.find(row => row.offsetHeight !== 0)
}

const upArrowButtonFunctionality = dropdownInstance => {
  // change highlighted row
  let currentHighlightedRowKey = highlightedRowKey(dropdownInstance)

  if (currentHighlightedRowKey !== null) {
    // since the direction is upwards, the array of rows which in we should check will be reduced
    // the next available row is the closest visible one before the current one
    const potentialRows = [...dropdownInstance.dropdownRows].slice(0, currentHighlightedRowKey).reverse()
    const nextRow = nextAvailableRowOfArray(dropdownInstance, potentialRows)

    if (nextRow !== undefined) {
      removeClass(dropdownInstance.dropdownRows[currentHighlightedRowKey], DROPDOWN.default.class.highlight)
      addClass(nextRow, DROPDOWN.default.class.highlight)
      currentHighlightedRowKey--
    }
    // keep highlighted row visible
    keepDropdownRowVisible(dropdownInstance, currentHighlightedRowKey)
  }
}

const downArrowButtonFunctionality = dropdownInstance => {
  // change highlighted row
  let currentHighlightedRowKey = highlightedRowKey(dropdownInstance)

  if (currentHighlightedRowKey !== null) {
    // the next available row is the closest visible one after the current one
    const potentialRows = [...dropdownInstance.dropdownRows].slice(currentHighlightedRowKey + 1)
    const nextRow = nextAvailableRowOfArray(dropdownInstance, potentialRows)

    if (nextRow !== undefined) {
      removeClass(dropdownInstance.dropdownRows[currentHighlightedRowKey], DROPDOWN.default.class.highlight)
      addClass(nextRow, DROPDOWN.default.class.highlight)
      currentHighlightedRowKey++
    }
  } else {
    currentHighlightedRowKey = 0
    addClass(dropdownInstance.dropdownRows[currentHighlightedRowKey], DROPDOWN.default.class.highlight)
  }

  // keep highlighted row visible
  keepDropdownRowVisible(dropdownInstance, currentHighlightedRowKey)
}

const enterButtonFunctionality = dropdownInstance => {
  const currentHighlightedRowKey = highlightedRowKey(dropdownInstance)
  if (currentHighlightedRowKey !== null) {
    const highlightedRow = dropdownInstance.dropdownRows[currentHighlightedRowKey]
    const input = findOne(highlightedRow, DROPDOWN.checkbox.selector.selectableCheckboxes)
    if (input) toggleCheckbox(input)
    if (!dropdownInstance.isSingle) return updateTitle(dropdownInstance)

    removeClass(dropdownInstance.dropdownMenu, DROPDOWN.default.class.show)
    dropdownInstance.closeDropdown()
  }
}

const backspaceButtonFunctionality = dropdownInstance => {
  const removeChips = find(dropdownInstance.dropdown, `.${DROPDOWN.chip.class.removeChip}`)
  if (removeChips.length) removeChips[removeChips.length - 1].click()
}

const moveThroughItemsEvent = (dropdownInstance, event) => {
  const keyCodeFunctions = {
    [KEY_CODES.up]: upArrowButtonFunctionality,
    [KEY_CODES.down]: downArrowButtonFunctionality,
    [KEY_CODES.enter]: enterButtonFunctionality,
  }

  if (!dropdownInstance.isDropdownShown()) return
  if (!Object.keys(keyCodeFunctions).includes(event.keyCode.toString())) return

  event.preventDefault()
  keyCodeFunctions[event.keyCode].call(this, dropdownInstance)
}

const bindSearchEvents = dropdownInstance => {
  document.addEventListener('keydown', event => { moveThroughItemsEvent(dropdownInstance, event) })
}

const triggerEventOnBackspace = (dropdownInstance, event) => {
  // hitting backspace when the search input is empty will remove the last chip added
  const backspaceTriggeredOnEmptySearchInput =
    dropdownInstance.isDropdownShown() &&
    event.keyCode === KEY_CODES.backspace &&
    dropdownInstance.dropdownSearchInput &&
    !dropdownInstance.searchText
  if (backspaceTriggeredOnEmptySearchInput) {
    event.preventDefault()
    backspaceButtonFunctionality(dropdownInstance)
  }
}

const triggerSearchEvent = dropdownInstance => {
  const searchText = dropdownInstance.dropdownSearchInput.value.toLowerCase()

  // trigger the search in every group
  dropdownInstance.search(searchText)
}

const addEventListenersOnSearch = dropdownInstance => {
  document.addEventListener('keydown', event => { triggerEventOnBackspace(dropdownInstance, event) })

  if (!dropdownInstance.dropdownSearchInput) return

  dropdownInstance.dropdownSearchInput.addEventListener('keyup', () => { triggerSearchEvent(dropdownInstance) })
}

const clickedOnIcon = (dropdownInstance, event) => {
  const chipIcons = [...find(dropdownInstance.dropdown, DROPDOWN.default.selector.chipIcon)]
  if (dropdownInstance.isTypeAheadMultiselect) return chipIcons.some(dropdown => dropdown === event.target)

  const arrow = findOne(dropdownInstance.dropdown, DROPDOWN.default.selector.arrow)
  return event.target === arrow
}

const clickOnDropdownEvent = (dropdownInstance, event) => {
  if (dropdownInstance.isMenuShown()) {
    if (!dropdownInstance.isTypeAheadMultiselect) return dropdownInstance.closeDropdown()
    if (clickedOnIcon(dropdownInstance, event)) dropdownInstance.closeDropdown()
  } else {
    dropdownInstance.openDropdown()
    dropdownInstance.focusOnInput()
  }
}

const onClickEvent = (dropdownInstance, event) => {
  if (dropdownInstance.dropdownToggle.contains(event.target)) clickOnDropdownEvent(dropdownInstance, event)
  else dropdownInstance.closeDropdown()
}

const clickOnDropdownMenuEvent = (dropdownInstance, event) => {
  if (dropdownInstance.isSingle) dropdownInstance.closeDropdown()
  event.stopPropagation()
  dropdownInstance.focusOnInput()
}

const toggleDropdownMenuEvent = dropdownInstance => {
  document.addEventListener('click', event => onClickEvent(dropdownInstance, event))

  dropdownInstance.dropdownMenu.addEventListener('click', event => { clickOnDropdownMenuEvent(dropdownInstance, event) })
}

const initialize = dropdownInstance => {
  // divide dropdown by groups
  initializeSearchBar(dropdownInstance)
  updateTitle(dropdownInstance)

  toggleDropdownMenuEvent(dropdownInstance)
  bindSearchEvents(dropdownInstance)
}

// Classes
export class BaseDropdownGroupClass {
  /**
   * @param dropdownGroup should be a HTML object
   * @param dropdownObject should be a instance of Single or Multi Select Dropdowns
   */
  constructor(dropdownGroup, dropdownObject) {
    this.dropdownObject = dropdownObject
    this.dropdownGroup = dropdownGroup

    this.inputs = []
  }
}

export class BaseDropdownClass {
  /**
   * @param dropdown should be a HTML object
   */
  constructor(dropdown) {
    this.dropdown = dropdown
    this.dropdownGroups = find(this.dropdown, DROPDOWN.default.selector.group)
    this.dropdownSearchInput = findOne(this.dropdown, DROPDOWN.default.selector.searchInput)
    this.dropdownSearchNotFound = findOne(this.dropdown, DROPDOWN.default.selector.searchNotFound)
    this.dropdownTitleContent = findOne(this.dropdown, DROPDOWN.default.selector.toggleContent)
    this.dropdownToggle = findOne(this.dropdown, DROPDOWN.default.selector.toggle)
    this.dropdownMenu = findOne(this.dropdown, DROPDOWN.default.selector.menu)
    this.dropdownBody = findOne(this.dropdown, DROPDOWN.default.selector.body)
    this.dropdownRows = find(this.dropdownBody, DROPDOWN.default.selector.row)
    this.dropdownInputs = find(this.dropdownBody, DROPDOWN.checkbox.selector.namedInputs)
    this.dropdownHeaderRows = find(this.dropdown, DROPDOWN.default.selector.headerRow)
    this.dropdownTitle = findOne(this.dropdown, DROPDOWN.default.selector.title)
    this.defaultTitle = this.dropdownTitle.innerHTML
    if (this.isTypeAheadMultiselect) this.dropdownChips = findOne(this.dropdown, DROPDOWN.chip.selector.chips)

    this.groups = []
    this.searchText = ''

    this.hasSearchFunctionality = true

    initialize(this)
  }

  get isSingle() {
    return false
  }

  get isTypeAheadMultiselect() {
    return false
  }

  get isCheckMarkMultiselect() {
    return false
  }

  isMenuShown() {
    return hasClass(this.dropdownMenu, DROPDOWN.default.class.show)
  }

  isDropdownShown() {
    return hasClass(this.dropdown, DROPDOWN.default.class.show)
  }

  removeHighlightedRow() {
    const currentHighlightedRowKey = highlightedRowKey(this)
    if (currentHighlightedRowKey !== null) removeClass(this.dropdownRows[currentHighlightedRowKey], DROPDOWN.default.class.highlight)
  }

  showHeaderRows(visibilityStatus = true) {
    const displayValue = visibilityStatus === true ? 'block' : 'none'
    this.dropdownHeaderRows.forEach(row => { row.style.display = displayValue })
  }

  resetRowsVisibility() {
    this.showHeaderRows()
    toggleRows(this)

    if (this.hasSearchFunctionality && this.isTypeAheadMultiselect) this.dropdownSearchInput.removeAttribute('style')
  }

  search(searchText) {
    if (searchText === this.searchText) return

    if (!searchText.length) {
      this.resetRowsVisibility()
    } else {
      this.dropdownInputs.forEach(input => { compareInputTextWithSearchedText(this, input, searchText) })

      if (!this.searchText.length) this.showHeaderRows(false)

      if (this.hasSearchFunctionality && this.isTypeAheadMultiselect) {
        this.dropdownSearchInput.style.width = ((searchText.length + 3) * LETTER_WIDTH) + 'px'
      }
    }

    toggleSearchNotFound(this)
    this.searchText = searchText
  }

  closeDropdown() {
    removeClass(this.dropdownMenu, DROPDOWN.default.class.show)
    removeClass(this.dropdown, DROPDOWN.default.class.show)
    if (this.dropdownSearchInput) {
      this.dropdownSearchInput.value = ''
      this.search(this.dropdownSearchInput.value)
    }
    this.removeHighlightedRow()
    updateTitle(this)
  }

  openDropdown() {
    addClass(this.dropdownMenu, DROPDOWN.default.class.show)
    addClass(this.dropdown, DROPDOWN.default.class.show)
    updateTitle(this)
  }

  focusOnInput() {
    if (this.dropdownSearchInput) this.dropdownSearchInput.focus()
  }
}
