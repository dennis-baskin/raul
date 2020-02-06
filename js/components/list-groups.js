/**
 * RAUL List Groups
 */

function toggleSublist() {
  $('.raul-list-group-item li').has('.raul-sublist-group').each(function(i, element) {
    var sublist = $(this).find('.raul-sublist-group');

    $(this).children('label').find('input[type=checkbox]').is(':checked') ? sublist.show() : sublist.hide();
  });
}

$(document).ready(function() {
  toggleSublist();

  $('.raul-switch input[type=checkbox]').change(function() {
    toggleSublist();
  });
});
