<template>
  <div class="dropdown-row">
    <div class="dropdown-item" v-if="isMultipleSelect">
      <div class="custom-control custom-checkbox custom-control-right">
        <input
          class="custom-control-input"
          :checked="checked"
          :data-text="itemTitle"
          :disabled="disabled"
          :id="generatedId"
          :name="name"
          :type="inputType"
          :value="itemValue"
        >

        <label class="custom-control-label" :for="generatedId">
          {{ itemTitle }}
        </label>
      </div>
    </div>

    <div class="dropdown-item" v-else-if="isTypeAhead">
      <label class="raul-checkbox-wrapper">
        <span class="raul-form-input-text">{{ itemTitle }}</span>

        <input
          :checked="checked"
          :data-text="itemTitle"
          :disabled="disabled"
          :id="generatedId"
          :name="name"
          :type="inputType"
          :value="itemValue"
        >

        <i class="fa fa-check dropdown-checked-icon"></i>
      </label>
    </div>

    <div class="dropdown-item" :class="checkedClass" v-else>
      <label class="raul-radio-wrapper">
        <span class="raul-form-input-text" :class="disabledClass">{{ itemTitle }}</span>

        <input
          :checked="checked"
          :data-text="itemTitle"
          :disabled="disabled"
          :id="generatedId"
          :name="name"
          :type="inputType"
          :value="itemValue"
        >

        <i class="fa fa-check dropdown-checked-icon"></i>
      </label>
    </div>
  </div>
</template>

<script>
  import { random, times } from 'lodash/fp'

  export default {
    data() {
      return {
        randomString() {
          return times(() => random(0, 35).toString(36))(20).join('')
        },
      }
    },

    props: {
      checked: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
      },
      itemId: {
        type: String,
      },
      name: {
        type: String,
      },
      itemTitle: {
        type: String,
        required: true,
      },
      itemValue: {
        type: String,
        required: true,
      },
      type: {
        type: String,
      },
    },

    computed: {
      checkedClass() {
        return this.checked ? 'checked' : null
      },
      disabledClass() {
        return this.disabled ? 'raul-input-text-disabled' : null
      },
      isMultipleSelect() {
        return this.type === 'multiple'
      },
      isTypeAhead() {
        return this.type === 'type-ahead'
      },
      inputType() {
        return (this.type === 'multiple' || this.type ==='type-ahead') ? 'checkbox' : 'radio'
      },
      generatedId() {
        return this.itemId ? this.itemId : `dropdown-${this.randomString()}`
      },
    },
  }
</script>
