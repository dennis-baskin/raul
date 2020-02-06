import {
  append,
  elementFromTemplate,
  fadeOut,
  remove,
  removeClass,
  Q
} from '../dom-utils'

const ALERT_TOGGLE_SELECTOR = '[data-alert-toggle]'

const XSS_OPTIONS = {
  whiteList: {
    a: ['href', 'title', 'target'],
    div: ['class'],
    p: ['class'],
    h2: ['class'],
    h3: ['class'],
    span: ['class'],
    i: ['class'],
    strong: [],
    em: [],
  },
}

class Alert {
  constructor({
    classes = '',
    message = '',
    target = 'body',
    ttl = null,
    type = 'info',
  }) {
    this.classes = classes
    this.message = message
    this.target = Q(target)
    this.ttl = ttl
    this.type = type

    this.alert = elementFromTemplate(Alert.template({
      classes: this.classes,
      message: this.message,
      type: this.type,
    }))
  }

  add(target = null) {
    const appendTarget = target ? Q(target) : this.target

    if (appendTarget.length === 0) return false

    removeClass(this.alert, 'fade')
    remove(this.alert)
    append(this.alert, appendTarget[0])

    if (this.ttl) setTimeout(() => this.remove(), this.ttl)
  }

  remove() {
    fadeOut(this.alert, () => remove(this.alert))
  }

  static template({classes = '', message, type}) {
    return window.filterXSS(`
      <div class="alert alert-${type} ${classes}">
        ${message}
      </div>
    `, XSS_OPTIONS)
  }
}

export default () => {
  const alerts = Q(ALERT_TOGGLE_SELECTOR)

  alerts.forEach(alert => {
    if (alert.RAUL && alert.RAUL.hasAlert) return
    alert.RAUL = alert.RAUL || {}
    alert.RAUL.hasAlert = true

    alert.addEventListener('click', () => {
      const data = alert.dataset

      return new Alert({
        class: data.alertClass,
        message: data.alertMessage,
        target: data.alertTarget,
        type: data.alertType,
        ttl: data.alertTtl,
      }).add()
    })
  })
}

export { Alert }
