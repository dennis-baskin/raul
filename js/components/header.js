/**
 * RAUL Header
 */
const BS_4_MOBILE_BREAKPOINT = 768;

window.RAUL = window.RAUL || {};

RAUL.header = {};

var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

var setupNavToggle = function() {
  var isDarkTheme = window.localStorage.getItem('nav-theme') === 'dark';
  var leftNavToggle = $('.leftNavToggle, .left-nav-toggle');
  var leftNavToggleIcon = leftNavToggle.find('i');

  leftNavToggleIcon.toggleClass('fa-toggle-off', !isDarkTheme);
  leftNavToggleIcon.toggleClass('fa-toggle-on', isDarkTheme);

  leftNavToggle.on('click', function() {
    var icon = leftNavToggleIcon;

    if (icon.hasClass('fa-toggle-off')) {
      icon.removeClass('fa-toggle-off');
      icon.addClass('fa-toggle-on');

      RAUL.leftnav.$leftnav.removeClass('raul-left-navigation-light');
      RAUL.leftnav.$leftnav.addClass('raul-left-navigation-dark');

      window.localStorage.setItem('nav-theme', 'dark');
    } else {
      icon.removeClass('fa-toggle-on');
      icon.addClass('fa-toggle-off');

      RAUL.leftnav.$leftnav.removeClass('raul-left-navigation-dark');
      RAUL.leftnav.$leftnav.addClass('raul-left-navigation-light');

      window.localStorage.setItem('nav-theme', 'light');
    }
  });
};

RAUL.header.closeOtherContexts = function(target) {
  if (target !== 'navigation' && RAUL.header.$leftnav && $(window).width() < BS_4_MOBILE_BREAKPOINT) {
    $('body').removeClass('raul-left-navigation-mobile-open');
  }
  if (target !== 'more' && RAUL.header.$more && RAUL.header.$more.css('right') === '0px') {
    RAUL.header.$more.css('width', '0');
    RAUL.header.$more.css('box-shadow', 'none');
  }

  if (target !== 'switcher') RAUL.AppSwitcher.remove();

  if (target !== 'notifications' && RAUL.header.$notifications && RAUL.header.$notifications.is(':visible')) {
    RAUL.header.$notifications.fadeOut();
  }
  if (target !== 'user' && RAUL.header.$user && RAUL.header.$user.is(':visible')) {
    RAUL.header.$user.slideUp();
  }
  if (target !== 'shopping' && RAUL.header.$shopping && RAUL.header.$shopping.is(':visible')) {
    RAUL.header.$shopping.fadeOut();
  }
  if (target !== 'breadcrumbs' && RAUL.header.$breadcrumbsDropdown && RAUL.header.$breadcrumbsDropdown.is(':visible')) {
    RAUL.header.$breadcrumbsDropdown.slideUp();
  }
};

$(document).on('click touchstart', function(e) {
  if ($(e.target).closest('.raul-header-app-switcher').length === 1 || $(e.target).closest('.raul-switcher-context').length === 1) {
    RAUL.header.closeOtherContexts('switcher');
  } else if ($(e.target).closest('.raul-left-navigation').length === 1 || $(e.target).closest('.raul-header-menu-button').length === 1) {
    RAUL.header.closeOtherContexts('navigation');
  } else {
    RAUL.header.closeOtherContexts('document');
  }
});

RAUL.$mainContainer = $('#raul-page-container');

RAUL.header.$header = $('#raul-header');
RAUL.header.$breadcrumbsDropdown = $('#raul-page-header').find('#raul-page-header-breadcrumbs-dropdown');
RAUL.header.$breadcrumbBack = $('#raul-page-header').find('#raul-page-header-breadcrumbs-back');

RAUL.header.$leftnav = $('#raul-left-navigation');
RAUL.header.$leftnavTrigger = RAUL.header.$header.find('#raul-header-menu-button');
var theCookie = '; ' + document.cookie;
var cookieParts = theCookie.split('; expandedLeftNav=');
if (cookieParts.length == 2) {
  var $navState = cookieParts.pop().split(';').shift();
}

if (cookieParts.length != 2) {
  if ($('body').hasClass('raul-left-navigation-expanded')) {
    document.cookie = 'expandedLeftNav=true';
  } else {
    document.cookie = 'expandedLeftNav=false';
  }
}
$(window).resize(function() {
  if ($(window).width() >= BS_4_MOBILE_BREAKPOINT) {
    $('body').removeClass('raul-left-navigation-mobile-open');
  }
});

$(document).ready(function() {
  // set initials to avatar icon
  const nameBoundaryRegex = /\b\s*/;
  const userName = $('#raul-header-user-handle').text().trim();
  const userNames = userName.split(nameBoundaryRegex);
  const {0: firstName, length: namesLength, [namesLength - 1]: lastName} = userNames;
  const initials = [firstName, lastName].map(name => name.charAt(0).toUpperCase()).join('');

  $('#raul-header-user-avatar').text(initials);

  setupNavToggle();
});

/**
 * Set a max height to the minimized left nav submenus
 * so the user could reach every subitem by scrolling
 */
RAUL.header.$leftnavItems = $('.raul-left-navigation-item');
const viewportHeight = window.innerHeight;

RAUL.header.setHeightOfSubmenu = function(element) {
  const $leftnavItem = element;
  const leftnavItemsOffsetTop = $leftnavItem.offset().top - $(window).scrollTop();
  const leftnavItemsHeight = $leftnavItem.outerHeight();
  const leftnavSubmenu = $leftnavItem.next('.raul-left-navigation-subitems');
  const leftnavSubmenuNewHeight = viewportHeight - (leftnavItemsOffsetTop + leftnavItemsHeight);

  leftnavSubmenu.css('max-height', leftnavSubmenuNewHeight);
};

// Left Nav Behaviors
RAUL.header.changeNavState = function() {
  if ($(window).width() >= BS_4_MOBILE_BREAKPOINT) {
    if ($('body').hasClass('raul-left-navigation-expanded')) {
      $('body').removeClass('raul-left-navigation-expanded');
      $('.raul-left-navigation-subitems').css({display: 'none'});
      RAUL.header.$leftnavItems.each(function() {
        RAUL.header.setHeightOfSubmenu($(this));
      });
      setTimeout(function() {
        $('.raul-left-navigation-subitems').css('display', '');
      }, 600);
      document.cookie = 'expandedLeftNav=false';
      window.localStorage.setItem('nav-state', 'minimized');
    } else {
      $('body').addClass('raul-left-navigation-expanded');
      document.cookie = 'expandedLeftNav=true';
      window.localStorage.setItem('nav-state', 'expanded');
      $('.raul-left-navigation-subitems').removeAttr('style');
    }
  } else {
    $('body').toggleClass('raul-left-navigation-mobile-open');
  }
};

RAUL.header.$leftnavTrigger.on('click', function(e) {
  e.stopPropagation();
  RAUL.header.changeNavState();
});

setTimeout(function() {
  RAUL.header.$leftnav.show();
}, 0);

// Logo Behaviors
RAUL.header.$logo = RAUL.header.$header.find('#raul-header-logo');

// Title Behaviors
RAUL.header.$title = RAUL.header.$header.find('.raul-header-title');
RAUL.header.$titleWithSubInfo = RAUL.header.$header.find('.raul-header-title.has-sub-info');
RAUL.header.$company = RAUL.header.$header.find('.raul-header-company');
RAUL.header.$secondaryTitleElements = RAUL.header.$title.find('.raul-header-company, .raul-header-properties, .raul-header-divider');

RAUL.header.$title.toggleClass('has-sub-info', RAUL.header.$secondaryTitleElements.length > 0);

// Search Behaviors
RAUL.header.$search = RAUL.header.$header.find('#raul-header-search-input');
RAUL.header.$searchTrigger = RAUL.header.$header.find('#raul-header-search-icon');
RAUL.header.$searchMobile = RAUL.header.$header.find('#raul-header-search-input-mobile');
RAUL.header.$searchMobileTrigger = RAUL.header.$header.find('#raul-header-search-icon-mobile');

RAUL.header.$switcherTrigger = RAUL.header.$header.find('#raul-header-app-switcher');

RAUL.header.$searchMobileTrigger.on('click', function(e) {
  RAUL.header.$leftnavTrigger.fadeOut(300);
  RAUL.header.$logo.fadeOut(300);
  RAUL.header.$title.fadeOut(300);
  RAUL.header.$searchMobileTrigger.fadeOut(300);
  RAUL.header.$userTrigger.fadeOut(300).delay().removeClass('d-sm-block');
  RAUL.header.$switcherTrigger.fadeOut(300);
  RAUL.header.$notificationsTrigger.fadeOut(300);
  RAUL.header.$moreTrigger.fadeOut(300);
  setTimeout(function() {
    RAUL.header.$searchMobile.css({'width': '100%', 'padding': '0 10px'}).focus();
  }, 300);
});
RAUL.header.$searchMobile.on('blur', function() {
  RAUL.header.$searchMobile.css({'width': '0', 'padding': '0'});
  setTimeout(function() {
    RAUL.header.$leftnavTrigger.fadeIn();
    RAUL.header.$logo.fadeIn();
    RAUL.header.$title.fadeIn();
    RAUL.header.$searchMobileTrigger.fadeIn();
    RAUL.header.$userTrigger.fadeIn().delay().addClass('d-sm-block');
    RAUL.header.$switcherTrigger.fadeIn(300);
    RAUL.header.$notificationsTrigger.fadeIn(300);
    RAUL.header.$moreTrigger.fadeIn(300);
  }, 300);
});

// Home Icon Behaviors
RAUL.header.$homeTrigger = RAUL.header.$header.find('#raul-header-home');

RAUL.header.$homeTrigger.on('click', function(e) {
  e.stopPropagation();
});

// Help Behaviors
RAUL.header.$helpTrigger = RAUL.header.$header.find('#raul-header-help');

RAUL.header.$helpTrigger.on('click', function(e) {
  e.stopPropagation();
});

// Settings Behaviors
RAUL.header.$settingsTrigger = RAUL.header.$header.find('#raul-header-settings');

RAUL.header.$settingsTrigger.on('click', function(e) {
  e.stopPropagation();
});

// Shopping Behaviors
RAUL.header.$shopping = $('#raul-shopping-context');
RAUL.header.$shoppingTrigger = RAUL.header.$header.find('#raul-header-shopping');

if (!RAUL.header.$shopping) {
  RAUL.header.$shoppingTrigger.on('click', function(e) {
    e.stopPropagation();
  });
} else {
  RAUL.header.$shoppingTrigger.on('click', function(e) {
    if (RAUL.header.$shopping.is(':visible')) {
      RAUL.header.$shopping.fadeOut();
    } else {
      RAUL.header.$shoppingTrigger.closest('.icon-container, .unified-navbar-item').append(RAUL.header.$shopping.css({
        position: 'absolute',
        right: -30,
        top: RAUL.header.$header.outerHeight(),
      }).fadeIn());
    }
    e.preventDefault();
    e.stopPropagation();
    RAUL.header.closeOtherContexts('shopping');
  });

  RAUL.header.$shopping.on('click', function(e) {
    e.stopPropagation();
  });
}

// Notifications Behaviors
RAUL.header.$notifications = $('#raul-notifications-context');
RAUL.header.$notificationsTrigger = RAUL.header.$header.find('#raul-header-notifications');

if (!RAUL.header.$notifications) {
  RAUL.header.$notificationsTrigger.on('click', function(e) {
    e.stopPropagation();
  });
} else {
  RAUL.header.$notificationsTrigger.on('click', function(e) {
    if (RAUL.header.$notifications.is(':visible')) {
      RAUL.header.$notifications.fadeOut();
    } else {
      RAUL.header.$notificationsTrigger.closest('.icon-container, .unified-navbar-item').append(
        RAUL.header.$notifications.css({
          position: 'absolute',
          right: -30,
          top: RAUL.header.$header.outerHeight(),
        }).fadeIn()
      );
    }
    e.preventDefault();
    e.stopPropagation();
    RAUL.header.closeOtherContexts('notifications');
  });

  RAUL.header.$notifications.on('click', function(e) {
    e.stopPropagation();
  });
}

// User Behaviors
RAUL.header.$user = $('#raul-user-context');
RAUL.header.$userTrigger = RAUL.header.$header.find('#raul-header-user');

RAUL.header.$userTrigger.on('click', function(e) {
  var _icon = $(this);
  if (RAUL.header.$user.is(':visible')) {
    RAUL.header.$user.slideUp();
  } else {
    RAUL.header.$userTrigger.append(RAUL.header.$user.css({
      'position': 'absolute',
      'right': 0,
      'top': (RAUL.header.$header.height()),
    }).slideDown());
  }
  e.stopPropagation();
  RAUL.header.closeOtherContexts('user');
});
RAUL.header.$user.on('click', function(e) {
  e.stopPropagation();
});

// More Behaviors
RAUL.header.$more = $('#raul-header-more-context');
RAUL.header.$moreTrigger = RAUL.header.$header.find('#raul-header-more');

RAUL.header.$moreTrigger.on('click', function(e) {
  if (parseInt(RAUL.header.$more.css('width')) > 0) {
    RAUL.header.$more.css('width', '0px');
    RAUL.header.$more.css('box-shadow', 'none');
  } else {
    RAUL.header.$more.css('width', '300px');
    RAUL.header.$more.css('box-shadow', 'rgba(0, 0, 0, .2) -4px 0 16px 0');
  }
  e.stopPropagation();
  RAUL.header.closeOtherContexts('more');
});
RAUL.header.$more.on('click', function(e) {
  e.stopPropagation();
});

// More User Behaviors
RAUL.header.$moreUser = RAUL.header.$user.clone();
RAUL.header.$moreUserTrigger = $('#raul-header-more-context').find('.raul-header-user');

if (RAUL.header.$moreUserTrigger) {
  RAUL.header.$moreUser.addClass('hidden-sm-up').css({
    'background': '#fff',
    'border': 'none',
    'margin': '0',
    'width': '100%',
    'height': 'auto',
    'max-height': '200px',
    'overflow-y': 'auto',
    'box-shadow': 'none',
  });

  RAUL.header.$moreUserTrigger.on('touchstart', function(e) { // prevent closing aside on touch event
    e.stopPropagation();
  });
  RAUL.header.$moreUserTrigger.on('click', function(e) {
    if (RAUL.header.$moreUser.is(':visible')) {
      RAUL.header.$moreUser.slideUp();
    } else {
      RAUL.header.$moreUser.slideDown();
    }
    e.stopPropagation();
  });
}
RAUL.header.$moreUserTrigger.after(RAUL.header.$moreUser);

// More Home Behaviors
RAUL.header.$moreHometrigger = $('#raul-header-more-context').find('.raul-header-context-home');

if (RAUL.header.$moreHometrigger) {
  RAUL.header.$moreHometrigger.on('click', function(e) {
    e.stopPropagation();
  });
}

RAUL.header.$moreHelpTrigger = $('#raul-header-more-context').find('.raul-header-context-help');
if (RAUL.header.$moreHelpTrigger) {
  RAUL.header.$moreHelpTrigger.on('click', function(e) {
    e.stopPropagation();
  });
}

RAUL.header.$moreSettingsTrigger = $('#raul-header-more-context').find('.raul-header-context-help');
if (RAUL.header.$moreSettingsTrigger) {
  RAUL.header.$moreSettingsTrigger.on('click', function(e) {
    e.stopPropagation();
  });
}

RAUL.header.$moreShopping = RAUL.header.$shopping.clone();
RAUL.header.$moreShoppingTrigger = $('#raul-header-more-context').find('.raul-header-context-shopping');
if (RAUL.header.$moreShoppingTrigger) {
  if (!RAUL.header.$moreShopping) {
    RAUL.header.$moreShoppingTrigger.on('click', function() {
      window.location = RAUL.header.$moreShoppingTrigger.data('url');
    });
  } else {
    RAUL.header.$moreShopping.addClass('hidden-xl-up').css({
      'background': '#E4E6E7',
      'border': 'none',
      'margin': '0',
      'width': '100%',
      'height': 'auto',
      'max-height': '200px',
      'overflow-y': 'auto',
    });
    RAUL.header.$moreShoppingTrigger.on('click', function(e) {
      var _icon = $(this);
      if (RAUL.header.$moreShopping.is(':visible')) {
        RAUL.header.$moreShopping.slideUp();
      } else {
        RAUL.header.$moreShopping.slideDown();
      }
      e.stopPropagation();
    });
  }
}
RAUL.header.$moreShoppingTrigger.after(RAUL.header.$moreShopping);

RAUL.header.$moreNotifications = RAUL.header.$notifications.clone();
RAUL.header.$moreNotificationsTrigger = $('#raul-header-more-context').find('.raul-header-context-notifications');
if (RAUL.header.$moreNotificationsTrigger) {
  if (!RAUL.header.$moreNotifications) {
    RAUL.header.$moreNotificationsTrigger.on('click', function() {
      window.location = RAUL.header.$moreNotificationsTrigger.data('url');
    });
  } else {
    RAUL.header.$moreNotifications.addClass('hidden-xl-up').css({
      'background': '#E4E6E7',
      'border': 'none',
      'margin': '0',
      'width': '100%',
      'height': 'auto',
      'max-height': '200px',
      'overflow-y': 'auto',
    });

    RAUL.header.$moreNotificationsTrigger.on('click', function(e) {
      if (RAUL.header.$moreNotifications.is(':visible')) {
        RAUL.header.$moreNotifications.slideUp();
      } else {
        RAUL.header.$moreNotifications.slideDown();
      }
      e.stopPropagation();
    });
  }
}
RAUL.header.$moreNotificationsTrigger.after(RAUL.header.$moreNotifications);
