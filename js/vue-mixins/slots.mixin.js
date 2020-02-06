/**
 * Slots Mixin
 * ----------------------------------------------------------------------------
 *
 * This mixin focuses on adding a workaround for slot issues with dynamic
 * frameworks. To use this mixin you need to first import it into the component,
 * and use it as a mixin:
 *
 *   <script>
 *     import slots from '../vue-mixins/slots.mixin'
 *
 *     export default {
 *       mixins: [slots]
 *     }
 *   </script>
 *
 * This will make the specialized `<slot-template></slot-template>` available
 * to be added to the component template. Without a `name` attribute, it will
 * function as the default slot. You can add the name attribute to specify a
 * slot by name.
 *
 * The `<slot-template>` tags do not replace `<slot>` tags. An example of
 * using this inside a component:
 *
 *   <template>
 *     <div>
 *       <slot></slot>
 *       <slot-template></slot-template>
 *
 *       <div>
 *         <slot name="secondary-content"></slot>
 *         <slot-template name="secondary-content"></slot-template>
 *       </div>
 *     </div>
 *   </template>
 *
 * When passing in a named template, add the attribute slot="" that matches the slot name.
 *
 *   <template slot="secondary-content"></template>
 */

const isDefaultSlot = (slot) => slot === ''

const setSlot = (elementInstance, slot) => {
  const defaultSlot = isDefaultSlot(slot)
  const containerSelectorSuffix = defaultSlot ? ':not([name])' : `[name="${slot}"]`
  const slotTemplate = elementInstance.$el.querySelector(`slot-template${containerSelectorSuffix}`)
  const template = (() => {
    if (defaultSlot) return elementInstance.$el.parentElement
    return elementInstance.$el.parentElement.querySelector(`template[slot="${slot}"]`)
  })()

  if (!slotTemplate || !template) return

  const slotTemplateParent = slotTemplate.parentElement
  const childNodes = [...template.childNodes]
  const filteredChildNodes = defaultSlot ? childNodes.slice(1) : childNodes

  filteredChildNodes.forEach(node => slotTemplateParent.insertBefore(node, slotTemplate))

  slotTemplate.remove()

  if (!defaultSlot) template.remove()
}

const removeSlotTemplates = (instance) => {
  const slots = instance.$refs.slots
  if (slots && slots.length > 0) slots.forEach(element => element.remove())
}

const slots = function(value) {
  // Remove spaces, split on commas, and create an array of unique values including default
  const slots = ['', ...new Set(value.replace(' ', '').split(',').filter(x => x !== ''))]
  slots.forEach((slot) => setSlot(this, slot))
}

export default {
  props: {
    slots: String,
  },

  watch: {
    slots,
  },

  mounted() {
    removeSlotTemplates(this)
  },

  updated() {
    removeSlotTemplates(this)
  },
}
