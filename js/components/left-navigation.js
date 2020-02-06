/**
 * RAUL Left Navigation
 */

const BS_4_MOBILE_BREAKPOINT = 768;

RAUL = window.RAUL || {};

RAUL.leftnav = {};

RAUL.leftnav.$leftnav = $('#raul-left-navigation');
RAUL.leftnav.$leftnavMenu = $('.raul-left-navigation-items');
RAUL.leftnav.$leftnavItems = $('.raul-left-navigation-item');
RAUL.leftnav.$header = $('.raul-header');
RAUL.leftnav.$leftnavSubItems = $('.raul-left-navigation-subitems');

/**
 * Remove left nav fixed positioning if nav items total
 * height is bigger than viewport height or add it if not
 */
RAUL.leftnav.leftnavExceedHeight = function(leftNavHeight, documentHeight) {
  $('body').addClass('raul-left-navigation-exceed-height');
  RAUL.leftnav.$leftnavSubItems.removeAttr('style');
  if (leftNavHeight > documentHeight) {
    RAUL.leftnav.$leftnav.css('height', leftNavHeight);
  } else {
    RAUL.leftnav.$leftnav.removeAttr('style');
  }
};

RAUL.leftnav.leftnavFitHeight = function() {
  $('body').removeClass('raul-left-navigation-exceed-height');
  RAUL.leftnav.$leftnav.removeAttr('style');
  RAUL.leftnav.$header.removeAttr('style');
};

RAUL.leftnav.toggleLeftNavPosition = function() {
  const documentHeight = document.body.scrollHeight;
  const viewportHeight = window.innerHeight;
  const headerHeight = RAUL.leftnav.$header.outerHeight();
  const leftNavViewHeight = viewportHeight - headerHeight;
  const leftnavItemsLength = RAUL.leftnav.$leftnavItems.length;
  const leftnavItemsHeight = [...RAUL.leftnav.$leftnavItems].reduce(
    (accumulator, currentValue) => accumulator + $(currentValue).outerHeight(),
    0
  );
  const leftNavHeight = leftnavItemsHeight - leftnavItemsLength;
  if (leftnavItemsHeight > leftNavViewHeight) {
    RAUL.leftnav.leftnavExceedHeight(leftNavHeight, documentHeight);
  } else {
    RAUL.leftnav.leftnavFitHeight();
  }
};

/**
 * Set a max height to the minimized left nav submenus
 * so the user could reach every subitem by scrolling
 */
RAUL.leftnav.setHeightOfSubmenu = function(element) {
  const viewportHeight = window.innerHeight;
  const $leftnavItem = element;
  const leftnavItemsOffsetTop = $leftnavItem.offset().top - $(window).scrollTop();
  const leftnavItemsHeight = $leftnavItem.outerHeight();
  const leftnavSubmenu = $leftnavItem.next('.raul-left-navigation-subitems');
  const leftnavSubmenuNewHeight = viewportHeight - (leftnavItemsOffsetTop + leftnavItemsHeight);
  leftnavSubmenu.css('max-height', leftnavSubmenuNewHeight);
};

// changing selected state of main menu item only on subitem with no submenu click
var itemsNoSubmenu = RAUL.leftnav.$leftnav.find('.raul-left-navigation-subitem').not('.has-subitems');

RAUL.leftnav.$leftnav.find('.raul-left-navigation-subitem').not('.has-subitems').each(function() {
  $(this).on('click', function() {
    $('nav .raul-left-navigation-item').has('.raul-left-navigation-item-icon').removeClass('selected');
    itemsNoSubmenu.removeClass('active');
    $(this).addClass('active');

    $(this).parents('nav > ul > li').find('.raul-left-navigation-item').has('.raul-left-navigation-item-icon').addClass('selected');
  });
});

const toggleSubNav = function() {
  var arrow = $(this).find('.raul-left-navigation-item-arrow');
  var subItems = $(this).parent().find(' > .raul-left-navigation-subitems');

  if (!subItems.hasClass('subitems-open')) {
    if ($(this).hasClass('raul-left-navigation-item') && (!$('body').hasClass('raul-left-navigation-expanded') && !$('body').hasClass('raul-left-navigation-mobile-open'))) {
      return;
    }
    $(this).addClass('active');
    subItems.slideDown(500);
    arrow.removeClass('fa-angle-down').addClass('fa-angle-up');
    setTimeout(function() {
      subItems.addClass('subitems-open');
      subItems.removeAttr('style');
    }, 600);
  } else {
    if ($(this).hasClass('raul-left-navigation-item') && (!$('body').hasClass('raul-left-navigation-expanded') && !$('body').hasClass('raul-left-navigation-mobile-open'))) {
      return;
    }
    $(this).removeClass('active');
    subItems.slideUp(500);
    arrow.removeClass('fa-angle-up').addClass('fa-angle-down');
    setTimeout(function() {
      subItems.removeAttr('style');
      subItems.removeClass('subitems-open');
    }, 600);
  }
};

RAUL.leftnav.$leftnav.on('click', '.has-subitems', toggleSubNav);

/**
 * Set a max height to the left nav submenus
 * if the user is not using a mobile device
 * and if the state of the left nav is not expanded
 */
if ($(window).width() >= BS_4_MOBILE_BREAKPOINT && window.localStorage.getItem('nav-state') !== 'expanded') {
  $(window).on('load', function() {
    RAUL.leftnav.$leftnavItems.each(function() {
      RAUL.leftnav.setHeightOfSubmenu($(this));
    });
    RAUL.leftnav.toggleLeftNavPosition();
  });
}

/**
 * Set left nav expanded or minimized on all pages based on 'nav-state' item in localStorage
 * Default state is 'expanded'
 */
const leftNavState = window.localStorage.getItem('nav-state') || 'expanded';
$('body').toggleClass('raul-left-navigation-expanded', (leftNavState === 'expanded'));

if (window.localStorage.getItem('nav-theme') === 'dark') {
  RAUL.leftnav.$leftnav.removeClass('raul-left-navigation-light');
  RAUL.leftnav.$leftnav.addClass('raul-left-navigation-dark');
} else if (window.localStorage.getItem('nav-theme') === 'light') {
  RAUL.leftnav.$leftnav.removeClass('raul-left-navigation-dark');
  RAUL.leftnav.$leftnav.addClass('raul-left-navigation-light');
}

RAUL.leftnav.setHeight = function() {
  var _height = 0;
  RAUL.leftnav.$leftnav.find('.raul-left-navigation-item').each(function(i, e) {
    _height += $(e).outerHeight();
  });
};

RAUL.leftnav.setHeight();

let resetComputedValues;

$(window).on('resize', function(e) {
  if (e.currentTarget.outerWidth < BS_4_MOBILE_BREAKPOINT) {
    if (window.localStorage.getItem('nav-pinned') === 'true') {
      window.localStorage.setItem('nav-pinned', false);
    }
  } else {
    if (window.localStorage.getItem('nav-pinned') === 'false') {
      window.localStorage.setItem('nav-pinned', true);
    }
  }
  RAUL.leftnav.setHeight();

  /**
   * Optimize the resize event so the function will be executed
   * only if the user won't resize the window for 0.2 seconds
   * The function will be executed only
   * if the user is not using a mobile device
   * and if the state of the left nav is not expanded
   */
  if (resetComputedValues) clearTimeout(resetComputedValues);
  resetComputedValues = setTimeout(function() {
    if ($(window).width() >= BS_4_MOBILE_BREAKPOINT && !$('body').hasClass('raul-left-navigation-expanded')) {
      RAUL.leftnav.$leftnavItems.each(function() {
        RAUL.leftnav.setHeightOfSubmenu($(this));
      });
      RAUL.leftnav.toggleLeftNavPosition();
    }
  }, 200);
});

RAUL.ui.toggleSubNav = toggleSubNav;
