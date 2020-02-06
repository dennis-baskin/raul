import {
  addClass,
  elementFromTemplate,
  findOne,
  getTotalTransitionTime,
  Q,
  remove,
  removeClass
} from '../dom-utils'

/* Constants */
// Selectors/Classes
const TOGGLE_ACTIVE_NOTIFICATIONS_SELECTOR = '.raul-toggle-active-notifications'
const CLOSE_ACTIVE_NOTIFICATIONS_SELECTOR = '.raul-close-active-notifications'
const CONTAINER_ACTIONS_SELECTOR = '.raul-notification-container-actions'
const CLOSE_BUTTON_SELECTOR = '.raul-notification-close'
const NOTIFICATION_TOGGLE_SELECTOR = '[data-notification-toggle]'
const SHOW_CLASS = 'raul-notification-slide-show'

// Elements templates
const CLOSE_BUTTON = '<div class="raul-notification-close" title="Close">&times;</div>'

const NOTIFICATION_CONTAINER = `
  <div class="raul-notification-container">
    <div class="raul-notification-container-actions">
      <span class="raul-toggle-active-notifications"></span>
      <span class="raul-close-active-notifications">Close All</span>
    </div>
  </div>
`

const defaultNotificationTemplate = ({type, title, description, detailsLink, closeButton}) => `
  <div class="raul-notification raul-${type}-notification">
    <div class="raul-notification-wrapper">
      <div class="raul-notification-content">
        ${title}
  
        ${description}
  
        ${detailsLink}
      </div>
  
      ${closeButton}
    </div>
  </div>
`

const descriptionElement = description => {
  return description ? `<div class="raul-notification-description">${description}</div>` : ''
}

const titleElement = title => {
  return title ? `<div class="raul-notification-title">${title}</div>` : ''
}

const moreLink = ({moreDetailsHref, moreDetailsText = 'More Details'}) => {
  return `<a href="${moreDetailsHref}" class="raul-notification-details">${moreDetailsText}</a>`
}

/* The container which in the notifications will be created/managed */
class NotificationContainer {
  constructor() {
    this.element = this.appendNotificationContainerToBody()
    if (!this.element) return

    this.toggleActiveNotificationsElement = findOne(this.element, TOGGLE_ACTIVE_NOTIFICATIONS_SELECTOR)
    this.toggleActiveNotificationsElement.addEventListener('click', () => this.activateToggleFunctionality())
    this.closeActiveNotificationsElement = findOne(this.element, CLOSE_ACTIVE_NOTIFICATIONS_SELECTOR)
    this.closeActiveNotificationsElement.addEventListener('click', () => this.activateCloseFunctionality())
    this.containerActionsElement = findOne(this.element, CONTAINER_ACTIONS_SELECTOR)

    this.toggle(false)
  }

  appendNotificationContainerToBody() {
    const body = document.querySelector('body')
    this.element = elementFromTemplate(NOTIFICATION_CONTAINER)
    body.appendChild(this.element)
    return this.element
  }

  // Buttons' functionalities
  activateToggleFunctionality() {
    Notifications.activeNotificationsExpandedStatus = !activeNotificationsExpanded
  }

  activateCloseFunctionality() {
    Notifications.closeAll()
  }

  // Toggles the visibility of notifications' container
  toggle(displayValue) {
    this.element.style.display = displayValue ? 'block' : 'none'
  }

  // Toggles the visibility of action buttons
  toggleContainerElement(displayValue) {
    this.containerActionsElement.style.display = displayValue ? 'flex' : 'none'
  }

  update() {
    const activeNotificationsCount = Notifications.active.length
    if (activeNotificationsCount === 0) {
      return setTimeout(() => {
        if (!Notifications.active.length) this.toggle(false)
      }, fadeAwayTime)
    }

    this.toggle(true)
    if (!showBulkActionButtons) return
    if (activeNotificationsCount === 1) return this.toggleContainerElement(false)

    this.toggleActiveNotificationsElement.innerHTML =
      (activeNotificationsExpanded ? 'Hide ' : 'Show ') +
      `${activeNotificationsCount}`
    this.toggleContainerElement(true)
  }
}

/* Notification class private functions */
const createNotificationFromTemplate = ({
  title,
  type = 'info',
  showCloseButton = true,
  moreDetailsHref = null,
  moreDetailsText = null,
  description,
}) => {
  const detailsLink = moreDetailsHref ? moreLink({
    moreDetailsHref: moreDetailsHref,
    moreDetailsText: moreDetailsText,
  }) : ''
  const closeButton = showCloseButton ? CLOSE_BUTTON : ''
  const titleE = titleElement(title)
  const descriptionE = descriptionElement(description)

  return window.filterXSS(defaultNotificationTemplate({
    type: type,
    title: titleE,
    description: descriptionE,
    detailsLink: detailsLink,
    closeButton: closeButton,
  }), XSS_OPTIONS)
}

const activateCloseButtonFunctionality = notificationInstance => {
  const closeButton = findOne(notificationInstance.notification, CLOSE_BUTTON_SELECTOR)
  if (closeButton) closeButton.addEventListener('click', () => notificationInstance.close())
}

const showAllActiveNotifications = () => {
  const activeNotifications = Notifications.active.reverse()
  let previousItemsHeight = 0
  for (let i = 0; i < activeNotifications.length; i++) {
    activeNotifications[i].notification.style.transform = `translateY(${previousItemsHeight}px)`
    previousItemsHeight += activeNotifications[i].notification.offsetHeight
  }

  activeNotificationsExpanded = true
  notificationContainer.update()
}

const hideAllActiveNotifications = () => {
  const activeNotifications = Notifications.active.reverse()
  activeNotifications.forEach(notificationInstance => { notificationInstance.notification.removeAttribute('style') })

  activeNotificationsExpanded = false
  notificationContainer.update()
}

const updateTransitionTime = notification => {
  const notificationTransitionTime = getTotalTransitionTime(notification)
  if (fadeAwayTime > notificationTransitionTime) fadeAwayTime = notificationTransitionTime
}

const XSS_OPTIONS = {
  whiteList: {
    a: ['href', 'target', 'class', 'title'],
    div: ['class', 'title'],
    span: ['class', 'title'],
  },
}

// Prepare the environment used by notifications
const notificationContainer = new NotificationContainer()
let allNotifications = []
let activeNotificationsExpanded = false
let showBulkActionButtons = true
let fadeAwayTime = 500
window.addEventListener('resize', () => {
  // Notifications might change in size when resizing the window; additional verifications required
  if (activeNotificationsExpanded) showAllActiveNotifications()
})

export class Notification {
  constructor({
    title = null,
    type = 'info',
    description = null,
    moreDetailsHref = null,
    moreDetailsText = 'More',
    ttl = null,
    showCloseButton = true,
    preventDisplay = false,
  } = {}) {
    this.description = description
    this.moreDetailsHref = moreDetailsHref
    this.moreDetailsText = moreDetailsText
    this.ttl = ttl
    this.title = title
    this.type = type
    this.showCloseButton = typeof (showCloseButton) === 'boolean' ? showCloseButton : showCloseButton !== 'false'
    this.preventDisplay = typeof (preventDisplay) === 'boolean' ? preventDisplay : preventDisplay !== 'false'

    this.addedToDOM = false
    this.isClosed = true

    this.notification = elementFromTemplate(createNotificationFromTemplate({
      title: this.title,
      type: this.type,
      showCloseButton: this.showCloseButton,
      description: this.description,
      moreDetailsHref: this.moreDetailsHref,
      moreDetailsText: this.moreDetailsText,
    }))
    allNotifications.push(this)

    if (!this.preventDisplay) this.show()
  }

  addToDOM() {
    activateCloseButtonFunctionality(this)
    notificationContainer.element.appendChild(this.notification)
    updateTransitionTime(this.notification)
    this.addedToDOM = true
  }

  show() {
    if (!this.addedToDOM) this.addToDOM()
    setTimeout(() => { addClass(this.notification, SHOW_CLASS) }, 50)
    if (this.ttl) setTimeout(() => { this.close() }, this.ttl)

    this.isClosed = false
    if (activeNotificationsExpanded) setTimeout(() => { showAllActiveNotifications() }, 50)
    notificationContainer.update()
  }

  close() {
    this.notification.removeAttribute('style')
    removeClass(this.notification, SHOW_CLASS)

    this.isClosed = true
    if (activeNotificationsExpanded) setTimeout(() => { showAllActiveNotifications() }, 50)
    notificationContainer.update()
  }

  remove() {
    remove(this.notification)
    this.addedToDOM = false
  }

  // Methods to create new notifications of specific types
  static info(options = {}) {
    return new (this)({...options, type: 'info'})
  }

  static success(options = {}) {
    return new (this)({...options, type: 'success'})
  }

  static warning(options = {}) {
    return new (this)({...options, type: 'warning'})
  }

  static danger(options = {}) {
    return new (this)({...options, type: 'danger'})
  }
}

export const Notifications = {
  // Getters that return an array of notifications
  get active() {
    return allNotifications.filter(notification => !notification.isClosed)
  },

  get all() {
    return allNotifications
  },

  // Notifications' visibility/display methods
  closeAll() {
    allNotifications.forEach(notification => { notification.close() })
  },

  showAll() {
    allNotifications.forEach(notification => { notification.show() })
  },

  // Check/Update active notifications visibility type
  get activeNotificationsExpandedStatus() {
    return activeNotificationsExpanded
  },

  set activeNotificationsExpandedStatus(value) {
    const boolValue = !!value
    if (activeNotificationsExpanded === boolValue) return

    if (boolValue) return showAllActiveNotifications()
    hideAllActiveNotifications()
  },

  // Check/Update active bulk action buttons visibility type
  get bulkActionButtonsDisplayStatus() {
    return showBulkActionButtons
  },

  set bulkActionButtonsDisplayStatus(value) {
    const boolValue = !!value
    if (showBulkActionButtons === boolValue) return

    showBulkActionButtons = boolValue
    notificationContainer.toggleContainerElement(boolValue)
  },
}

export default () => {
  const notifications = Q(NOTIFICATION_TOGGLE_SELECTOR)

  notifications.forEach(notification => {
    if (notification.RAUL && notification.RAUL.hasNotification) return
    notification.RAUL = notification.RAUL || {}
    notification.RAUL.hasNotification = true

    notification.addEventListener('click', () => {
      const data = notification.dataset

      return new Notification({
        title: data.notificationTitle,
        type: data.notificationType,
        description: data.notificationDescription,
        moreDetailsHref: data.notificationMoreDetailsLink,
        moreDetailsText: data.notificationMoreDetailsText,
        ttl: data.notificationTtl,
        showCloseButton: data.notificationShowCloseButton,
        preventDisplay: data.notificationPreventDisplay,
      })
    })
  })
}
