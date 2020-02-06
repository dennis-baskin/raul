export const SEARCH_LOWER_LIMIT = 5
export const LETTER_WIDTH = 8

export const KEY_CODES = {
  up: 38,
  down: 40,
  enter: 13,
  backspace: 8,
}

export const DROPDOWN_PREFIX = `dropdown`

export const DROPDOWN = {
  default: {
    class: {
      show: 'show',
      highlight: 'highlight',
      dataText: 'data-text',
    },

    selector: {
      select: `.raul-${DROPDOWN_PREFIX}-select`,
      group: `.${DROPDOWN_PREFIX}-group`,
      item: `.${DROPDOWN_PREFIX}-item`,
      search: `.${DROPDOWN_PREFIX}-search`,
      searchInput: `.${DROPDOWN_PREFIX}-search-input`,
      searchNotFound: `.${DROPDOWN_PREFIX}-search-not-found-wrapper`,
      menu: `.${DROPDOWN_PREFIX}-menu`,
      toggle: `.${DROPDOWN_PREFIX}-toggle`,
      toggleContent: `.${DROPDOWN_PREFIX}-toggle-content`,
      title: `.${DROPDOWN_PREFIX}-title`,
      row: `.${DROPDOWN_PREFIX}-row:not(.${DROPDOWN_PREFIX}-row-header)`,
      headerRow: `.${DROPDOWN_PREFIX}-row.${DROPDOWN_PREFIX}-row-header`,
      body: `.${DROPDOWN_PREFIX}-body`,
      arrow: `.${DROPDOWN_PREFIX}-arrow`,
      chipIcon: `.${DROPDOWN_PREFIX}-chips-plus-icon`,
      sectionTitle: '.section-title',
    },
  },

  multiple: {
    class: {
      select: `${DROPDOWN_PREFIX}-multiple`,
      typeAhead: `${DROPDOWN_PREFIX}-multiple-type-ahead`,
    },
  },

  checkbox: {
    selector: {
      namedInputs: 'input[name]',
      checkAll: 'input.check-all',
      selectableCheckboxes: 'input[name]:not([disabled])',
      checkedInput: 'input[name]:checked',
      checked: 'checked',
    },
    class: {
      justChecked: 'just-checked',
    },
  },

  chip: {
    class: {
      chip: `${DROPDOWN_PREFIX}-chip`,
      removeChip: `${DROPDOWN_PREFIX}-chip-remove`,
    },

    selector: {
      chips: `.${DROPDOWN_PREFIX}-chips`,
    },
  },
}
