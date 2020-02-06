import { DROPDOWN } from './dropdown-utils'
import {
  hasClass,
  Q
} from '../../dom-utils'
import {
  SingleSelectDropdown,
  MultiSelectTypeAheadDropdown,
  MultiSelectCheckMarkDropdown
} from './dropdowns'

export default () => {
  const dropdownType = dropdown => {
    if (hasClass(dropdown, DROPDOWN.multiple.class.select)) {
      if (hasClass(dropdown, DROPDOWN.multiple.class.typeAhead)) return new MultiSelectTypeAheadDropdown(dropdown)
      else return new MultiSelectCheckMarkDropdown(dropdown)
    } else return new SingleSelectDropdown(dropdown)
  }
  const dropdowns = Q(DROPDOWN.default.selector.select)

  dropdowns.forEach(dropdown => {
    if (dropdown.RAUL && dropdown.RAUL.dropdown) return
    dropdown.RAUL = dropdown.RAUL || {}
    dropdown.RAUL.dropdown = dropdownType(dropdown)
  })
}

export { MultiSelectCheckMarkDropdown, MultiSelectTypeAheadDropdown, SingleSelectDropdown }
