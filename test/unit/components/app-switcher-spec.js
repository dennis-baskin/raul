import {AppSwitcher} from '../../../js/components/app-switcher.js'

describe('AppSwitcher', () => {
  before(() => {
    document.body.innerHTML = ''
    document.body.appendChild(
      new window.DOMParser().parseFromString(`
        <span class="unified-navbar-item">
          <a href="#switcher">
            <i id="raul-header-app-switcher" class="raul-header-app-switcher fa fa-th"></i>
          </a>
        </span>
      `, 'text/html').body.firstChild
    )
  })

  describe('<constructor>', () => {
    describe('without options', () => {
      let appSwitcher

      before(() => {
        appSwitcher = new AppSwitcher()
      })

      it('creates a new instance', () => {
        expect(appSwitcher).to.be.an.instanceof(AppSwitcher)
      })

      it('sets correct default value for "switcherData" property', () => {
        expect(appSwitcher.products).to.be.an.instanceof(Array)
      })

      it('finds  "trigger" property', () => {
        const trigger = document.querySelector('#raul-header-app-switcher')

        expect(appSwitcher).to.have.property('trigger', trigger)
      })

      it('generates switcher DOM elements from templates')
    })

    describe('.fromOptions', () => {
      it('matches the constructor call')
    })

    describe('.appSwitcherTemplate', () => {
      it('generates HTML string from template')
    })

    describe('.familyTemplate', () => {
      it('generates HTML string from template')
    })

    describe('.productTemplate', () => {
      it('generates HTML string from template')
    })

    describe('.remove', () => {
      it('finds and removes switcher DOM element if exists')
    })

    describe('#getSwitcher', () => {
      it('gets generated element from switcher HTML template based on instance product data')
    })

    describe('#getFavoriteProductsHTML', () => {
      it('gets generated favorites HTML template string based on instance product data')
    })

    describe('#getFamilyProductsHTML', () => {
      it('gets generated HTML template string based on instance product data sorted by family')
    })

    describe('#add', () => {
      it('shows switcher in UI')
    })

    describe('#remove', () => {
      it('hides switcher in UI')
    })

    describe('#bindEvents', () => {
      it('binds click event on trigger')

      it('binds click event on outside of trgger and content')
    })
  })
})
