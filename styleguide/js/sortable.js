const sortable = RAUL.sortable

sortable.create('#items, #list-group-example, #table-example')

sortable.create(
  '#list-group-handler-example',
  {
    handle: '.sortable-handler',
  }
)
