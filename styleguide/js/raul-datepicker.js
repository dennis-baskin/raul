$('#raul-simple-datepicker').datepicker({
  format: 'M. d, yyyy',
  autoclose: true,
})

$('#raul-inline-datepicker').datepicker({
  format: 'M. d, yyyy',
})
$('#raul-inline-datepicker').on('changeDate', function() {
  $('#raul-inline-datepicker-input').val(
    $('#raul-inline-datepicker').datepicker('getFormattedDate')
  )
})

$('#raul-date-range-picker').datepicker({
  format: 'M. d, yyyy',
  autoclose: true,
  inputs: $('#raul-date-range-picker').find('.datepicker-range-start, .datepicker-range-end'),
  keepEmptyValues: true,
}).on('changeDate', function() {
  const startDateInput = $(this).find('.datepicker-range-start')
  const endDateInput = $(this).find('.datepicker-range-end')

  if (startDateInput.val() &&
      endDateInput.val()
  ) return

  if (startDateInput.val()) {
    endDateInput.focus()
  } else {
    startDateInput.focus()
  }
})

$('#raul-date-range-picker-grouped').datepicker({
  format: 'M. d, yyyy',
  autoclose: true,
  inputs: $('#raul-date-range-picker-grouped').find('.datepicker-range-start, .datepicker-range-end'),
  keepEmptyValues: true,
}).on('changeDate', function() {
  const startDateInput = $(this).find('.datepicker-range-start')
  const endDateInput = $(this).find('.datepicker-range-end')

  if (startDateInput.val() &&
    endDateInput.val()
  ) return

  if (startDateInput.val()) {
    endDateInput.focus()
  } else {
    startDateInput.focus()
  }
})
