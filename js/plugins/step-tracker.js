import 'jquery-bootstrap-wizard'

window.RAUL = window.RAUL || {}
window.RAUL.plugins = window.RAUL.plugins || {}

const DEFAULT_TAB_CLASS = 'nav-step-track'
const DEFAULT_FOOTER_CLASS = 'nav-step-track-footer'
const NOOP = () => { }

const setUIState = function(options) {
  if (options.callback() === false) return

  setTabState(options)
  setFooterState(options)

  options.callback(options.tab, options.navigation, options.nextTabIndex)
}

const setTabState = function({navigation, nextTabIndex}) {
  navigation.find('a').removeClass('disabled complete')

  navigation.find('li').each(function(i) {
    if (i > nextTabIndex) {
      $(this).find('a').addClass('disabled')
    } else if (i < nextTabIndex) {
      $(this).find('a').addClass('complete')
    }
  })
}

const setFooterState = function({container, footerClass, nextTabIndex}) {
  var prevBtn = container.find(`.${footerClass} .previous`)
  var separatorLine = prevBtn.next()
  var isFirstTab = nextTabIndex === 0

  prevBtn.toggleClass('hidden d-none', isFirstTab)
  separatorLine
    .toggleClass('col-sm-8', !isFirstTab)
    .toggleClass('col-sm-10', isFirstTab)
}

const toggleSeparatorLine = function(container, footerClass) {
  var prevBtn = container.find(`.${footerClass} .previous`)
  var separatorLine = prevBtn.next()
  var windowWidth = $(window).width()

  if (windowWidth < 578) {
    separatorLine.find('hr').hide()
  } else {
    separatorLine.find('hr').show()
  }
}

class StepTracker {
  constructor(selector, {
    tabClass = DEFAULT_TAB_CLASS,
    footerClass = DEFAULT_FOOTER_CLASS,
    finishButtonText = 'done',
    onInit = NOOP,
    onShow = NOOP,
    onFinish = NOOP,
    onFirst = NOOP,
    onLast = NOOP,
    onNext = NOOP,
    onPrevious = NOOP,
    onTabChange = NOOP,
    onTabClick = NOOP,
  } = {}) {
    this.container = $(selector)

    const self = this

    const callbacks = {
      onInit,
      onShow,
      onFinish,
      onFirst,
      onLast,
      onNext,
      onPrevious,
    }

    const wizardOptions = {
      tabClass,

      ...Object.keys(callbacks).reduce((accumulator, functionName) => {
        accumulator[functionName] = (tab, navigation, nextTabIndex) => {
          setUIState({
            footerClass,
            tab,
            navigation,
            nextTabIndex,
            container: self.container,
            callback: callbacks[functionName],
          })
        }

        return accumulator
      }, {}),

      onTabChange: function(tab, navigation, index, clickedIndex) {
        const nextButton = self.container.find('li.next')
        const nextButtonLink = nextButton.find('a')
        const isLast = clickedIndex === navigation.find('li').length - 1

        nextButton.toggleClass('finish', isLast)
        nextButtonLink.text(isLast ? finishButtonText : 'Next')

        onTabChange(tab, navigation, index, clickedIndex)
      },

      onTabClick: (tab, navigation, index, clickedIndex) => {
        if (onTabClick() === false) return

        var clickedTab = $(navigation.find('li')[clickedIndex])

        setUIState({
          footerClass,
          tab,
          navigation,
          nextTabIndex: clickedIndex,
          container: self.container,
          callback: NOOP,
        })

        // call callback outside of setUIState in order to pass in current index
        onTabClick(tab, navigation, index, clickedIndex)

        if (clickedTab.find('a').hasClass('disabled') && clickedTab.find('a').hasClass('complete')) {
          return true
        } else if (clickedTab.find('a').hasClass('disabled')) {
          return false
        } else {
          return true
        }
      },
    }

    this.container.bootstrapWizard(wizardOptions)

    setFooterState({footerClass, nextTabIndex: 0, container: this.container})

    this.container.find(`.${footerClass} a`).click((e) => e.preventDefault())

    $(window).resize(() => {
      toggleSeparatorLine(this.container, footerClass)
    })
  }
}

window.RAUL.plugins.StepTracker = StepTracker

$(document).ready(() => new RAUL.plugins.StepTracker('#rootwizard'))
