/**
 * RAUL Page Header
 */

RAUL = window.RAUL || {};

RAUL.pageheader = {};

RAUL.pageheader.$pageHeader = $('#raul-page-header');
RAUL.pageheader.$breadcrumbsDropdown = RAUL.pageheader.$pageHeader.find('#raul-page-header-breadcrumbs-dropdown');
RAUL.pageheader.$breadcrumbBack = RAUL.pageheader.$pageHeader.find('#raul-page-header-breadcrumbs-back');

RAUL.pageheader.$breadcrumbBack.on('click', function(e) {
  if (!RAUL.pageheader.$breadcrumbsDropdown.is(':visible')) {
    RAUL.pageheader.$breadcrumbsDropdown.slideDown();
  } else {
    RAUL.pageheader.$breadcrumbsDropdown.slideUp();
  }
  e.stopPropagation();
  RAUL.header.closeOtherContexts('breadcrumbs');
});
