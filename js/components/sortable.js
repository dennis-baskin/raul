import {
  addClass,
  removeClass
} from '../dom-utils'

const createSortable = (selector, options) => {
  const sortableLists = document.querySelectorAll(selector)

  sortableLists.forEach(sortableList => {
    const sortableItems = sortableList.children

    sortableItems.forEach((sortableItem) => {
      sortableItem.addEventListener('mouseover', e => addClass(e.currentTarget, 'hovered'))

      sortableItem.addEventListener('mouseout', e => removeClass(e.currentTarget, 'hovered'))
    })

    window.Sortable.create(sortableList, {
      animation: 150,
      forceFallback: true,
      ...options,
    })

    window.Sortable.utils.on(sortableList, 'start', function(e) {
      addClass(sortableItems[e.oldIndex], 'sortable-initial')
      addClass(sortableList, 'sorting')
    })

    window.Sortable.utils.on(sortableList, 'end', function(e) {
      removeClass(sortableList, 'sorting')
      sortableItems.forEach(sortableItem => removeClass(sortableItem, 'hovered'))
    })
  })
}

RAUL.sortable = {
  create: createSortable,
}
