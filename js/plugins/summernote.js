import 'summernote/dist/summernote-bs4'

// Default plugin instantiation if using '#summernote' id
jQuery(($) => {
  $('#summernote').summernote({
    placeholder: 'Basic text editor component!',
    tabsize: 2,
    minHeight: 100,
  })
})
