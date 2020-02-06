import {
  findOne,
  Q,
  toggleClass
} from '../../dom-utils'

const FILTER_SELECTOR = '.table-filter'
const FILTER_SEARCH_SELECTOR = '.filter-search'

const SHOW_CLASS = 'show'

const toggleSearch = (e, filterObject) => {
  const shouldAddClass = filterObject.filterSearch.contains(e.target)
  toggleClass(filterObject.filterSearch, SHOW_CLASS, shouldAddClass)
}

class HeadingFilter {
  /**
   * @param { HTMLElement } filter
   */
  constructor(filter) {
    this.filter = filter
    this.filterSearch = findOne(this.filter, FILTER_SEARCH_SELECTOR)

    window.addEventListener('click', e => toggleSearch(e, this))
  }
}

export default () => {
  const filters = Q(FILTER_SELECTOR)

  filters.forEach(filter => {
    if (filter.RAUL && filter.RAUL.headingFilter) return
    filter.RAUL = filter.RAUL || {}
    filter.RAUL.headingFilter = new HeadingFilter(filter)
  })
}

export { HeadingFilter }
