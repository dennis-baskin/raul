<template>
  <div :class="wrapperClasses">
    <label :for="computedInputId" v-if="title">
      {{ title }}
    </label>

    <div :id="computedInputId" class="input-daterange clearfix" v-if="inline && dateRange">
      <div class="datepicker-range-start float-left pr-3"></div>
      <div class="datepicker-range-end float-left"></div>

      <input
        class="form-control form-control-date"
        type="hidden"
        :id="computedInputIdStartDate"
      >
      <input
        class="form-control form-control-date datepicker-range-end"
        type="hidden"
        :id="computedInputIdEndDate"
      >
    </div>

    <div :id="computedInputId" class="input-daterange" v-else-if="dateRange && dateRangeGroup">
      <div class="input-group input-daterange">
        <input
          class="form-control form-control-date datepicker-range-start"
          type="text"
          :id="computedInputIdStartDate"
        >

        <div class="input-group-prepend">
          <div class="input-group-text">to</div>
        </div>

        <input
          class="form-control form-control-date datepicker-range-end"
          type="text"
          :id="computedInputIdEndDate"
        >
      </div>
    </div>

    <div :id="computedInputId" class="input-daterange" v-else-if="dateRange">
      <div class="form-group">
        <label :for="computedInputIdStartDate">
          Start Date
        </label>

        <input
          class="form-control form-control-date datepicker-range-start"
          type="text"
          :id="computedInputIdStartDate"
        >
      </div>

      <div class="form-group">
        <label :for="computedInputIdEndDate">
          End Date
        </label>

        <input
          class="form-control form-control-date datepicker-range-end"
          type="text"
          :id="computedInputIdEndDate"
        >
      </div>
    </div>

    <div
      :id="computedInputId"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @keydown="$emit('keydown', $event)"
      @keyup="$emit('keyup', $event)"
      v-else-if="inline"
    ></div>

    <input
      class="form-control form-control-date"
      type="text"
      :id="computedInputId"
      :name="inputName"
      :placeholder="placeholder"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @keydown="$emit('keydown', $event)"
      @keyup="$emit('keyup', $event)"
      v-else
    >
  </div>
</template>

<script>
  import { random, times } from 'lodash/fp'

  import { Api } from '../vue-mixins/api.mixin'

  const notDateRangeWarning = () => {
    return console ? console.warn('Date Picker is not of DateRange type') : null
  }

  const api = Api({
    date: {
      get() {
        if (this.dateRange) return this.startDate
        return $(this.targetId).datepicker('getDate')
      },

      set(date) {
        if (this.dateRange) return this.startDate = date
        $(this.targetId).datepicker('setDate', date)
        return this.api
      },
    },

    startDate: {
      get() {
        if (!this.dateRange) return notDateRangeWarning()
        return $(this.targetId).find('.datepicker-range-start').datepicker('getDate')
      },

      set(date) {
        if (!this.dateRange) return notDateRangeWarning()

        const rangeStart = $(this.targetId).find('.datepicker-range-start')

        // Unfortunate hackery to correctly update the visual states for this plugin

        // First sets the date correctly and highlights the active date
        rangeStart.datepicker('setDate', date)

        // Second sets the date range span classes to highlight the range between
        rangeStart.datepicker('update', date)

        // Third makes sure the end date is still set visually
        $(this.targetId).find('.datepicker-range-end').datepicker('update', this.api.endDate)

        return this.api
      },
    },

    endDate: {
      get() {
        if (!this.dateRange) return notDateRangeWarning()
        return $(this.targetId).find('.datepicker-range-end').datepicker('getDate')
      },

      set(date) {
        if (!this.dateRange) return notDateRangeWarning()

        const rangeEnd = $(this.targetId).find('.datepicker-range-end')

        // Unfortunate hackery to correctly update the visual states for this plugin

        // First sets the date correctly and highlights the active date
        rangeEnd.datepicker('setDate', date)

        // Second sets the date range span classes to highlight the range between
        rangeEnd.datepicker('update', date)

        // Third makes sure the start date is still set visually
        $(this.targetId).find('.datepicker-range-start').datepicker('update', this.api.startDate)

        return this.api
      },
    },

    minDate: {
      get() {
        if (!this.dateRange) return $(this.targetId).datepicker('getStartDate')
        return $(this.targetId).find('.datepicker-range-start').datepicker('getStartDate')
      },

      set(date) {
        if (!this.dateRange) return $(this.targetId).datepicker('setStartDate', date)
        $(this.targetId).find('.datepicker-range-start').datepicker('setStartDate', date)
        return this.api
      },
    },

    maxDate: {
      get() {
        if (!this.dateRange) return $(this.targetId).datepicker('getEndDate')
        return $(this.targetId).find('.datepicker-range-start').datepicker('getEndDate')
      },

      set(date) {
        if (!this.dateRange) return $(this.targetId).datepicker('setEndDate', date)
        $(this.targetId).find('.datepicker-range-start').datepicker('setEndDate', date)
        return this.api
      },
    },
  })

  export default {
    mixins: [api],

    props: {
      autoclose: {
        default: true,
        type: Boolean,
      },
      autofocus: {
        default: true,
        type: Boolean,
      },
      defaultDate: [String, Boolean],
      inputId: String,
      inputName: String,
      title: String,
      group: Boolean,
      inline: Boolean,
      orientation: String,
      placeholder: {
        default: 'Pick a date',
        type: String,
      },
      zIndex: Number,

      minDate: String,
      maxDate: String,

      dateRange: Boolean,
      dateRangeGroup: Boolean,
      startDateInputName: String,
      endDateInputName: String,
    },

    watch: {
      minDate(newVal, oldVal) {
        this.api.minDate = newVal
      },

      maxDate(newVal, oldVal) {
        this.api.maxDate = newVal
      },
    },

    data() {
      const randomSequence = times(() => random(0, 35).toString(36))(20).join('')

      return {
        generatedId: `datepicker-${randomSequence}`,
      }
    },

    computed: {
      computedInputId() {
        return this.inputId ? this.inputId : this.generatedId
      },

      computedInputIdStartDate() {
        return this.inputId ? `${this.inputId}-start-date` : `${this.generatedId}-start-date`
      },

      computedInputIdEndDate() {
        return this.inputId ? `${this.inputId}-end-date` : `${this.generatedId}-end-date`
      },

      targetId() {
        return `#${this.computedInputId}`
      },

      wrapperClasses() {
        return this.group ? 'form-group' : null
      },
    },

    mounted() {
      $(this.targetId).datepicker({
        autoclose: this.autoclose,
        defaultViewDate: this.defaultDate,
        format: 'M. d, yyyy',
        inline: this.inline,
        inputs: (() => {
          if (!(this.inline && this.dateRange)) return null
          return $(this.targetId).find('.datepicker-range-start, .datepicker-range-end')
        })(),
        orientation: this.orientation ? this.orientation : 'bottom',
        todayHighlight: true,
        templates: {
          leftArrow: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
          rightArrow: '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
        },
        zIndexOffset: this.zIndex ? this.zIndex : 100,
        startDate: this.minDate ? this.minDate : -Infinity,
        endDate: this.maxDate ? this.maxDate : Infinity,
        keepEmptyValues: this.autofocus && this.dateRange,
      }).on('changeDate', (event) => {
        this.$emit('change', event)

        if (!(this.autofocus && this.dateRange)) return

        const startDateInput = $(this.targetId).find('.datepicker-range-start')
        const endDateInput = $(this.targetId).find('.datepicker-range-end')

        if (startDateInput.val() && endDateInput.val()) return

        if (startDateInput.val()) {
          endDateInput.focus()
        } else {
          startDateInput.focus()
        }
      })
    },
  }
</script>
