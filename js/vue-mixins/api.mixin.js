import { transform } from 'lodash'

export const Api = (apiObject) => {
  return {
    data() {
      // Bind context to vue instance on any functions passed in
      const api = transform(apiObject, (result, value, key) => {
        if (typeof value === 'function') return (result[key] = value.bind(this))

        const getter = (() => value.hasOwnProperty('get') ? value.get.bind(this) : null)()
        const setter = (() => value.hasOwnProperty('set') ? value.set.bind(this) : null)()

        if (value && typeof value === 'object' && (getter || setter)) {
          Object.defineProperty(result, key, { get: getter, set: setter })
        }
      }, {})

      return {
        api,
      }
    },

    mounted() {
      this.$el.parentElement.api = this.api
    },
  }
}
