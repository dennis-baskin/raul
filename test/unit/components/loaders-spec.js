import {Loader} from '../../../js/components/loaders.js'

describe('Loader', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    document.body.appendChild(
      new window.DOMParser().parseFromString(`
        <div class='content'>
          <div class="container"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
        </div>
      `, 'text/html').body.firstChild
    )
  })

  describe('<constructor>', () => {
    describe('without options', () => {
      const loader = new Loader()

      it('creates a new instance', () => {
        expect(loader).to.be.an.instanceof(Loader)
      })

      it('sets correct default value for "type" property', () => {
        expect(loader).to.have.property('type', 'page')
      })

      it('sets correct default value for "target" property', () => {
        expect(loader).to.have.property('target', '')
      })

      it('sets correct default value for "loader" property', () => {
        expect(loader.loader).to.match('.raul-page-loader-wrapper')
        expect(loader.loader).to.contain('.raul-page-loader')
      })
    })

    describe('with options', () => {
      const loader = new Loader({
        type: 'content',
        target: '.container',
      })

      it('creates a new instance', () => {
        expect(loader).to.be.an.instanceof(Loader)
      })

      it('sets correct value for "type" property', () => {
        expect(loader).to.have.property('type', 'content')
      })

      it('sets correct value for "target" property', () => {
        expect(loader).to.have.property('target', '.container')
      })

      it('sets correct default value for "loader" property', () => {
        expect(loader.loader).to.match('.raul-content-loader-wrapper')
        expect(loader.loader).to.contain('.raul-content-loader')
      })
    })
  })

  describe('#add', () => {
    describe('with page loader options', () => {
      const loader = new Loader({type: 'page'})

      beforeEach(() => loader.add())

      it('appends to body', () => {
        const wrapper = document.querySelector('.raul-page-loader-wrapper')
        const loader = wrapper.querySelector('.raul-page-loader')

        expect(wrapper).to.match('.raul-page-loader-wrapper')
        expect(loader).to.match('.raul-page-loader')
      })

      it('adds a class to the body which indicates that the page is loading', () => {
        const actual = [...document.body.classList].includes('page-loading')

        expect(actual).to.be.true
      })
    })

    describe('with options derived from instantiation', () => {
      const loader = new Loader({
        type: 'content',
        target: '.container',
      })

      beforeEach(() => loader.add())

      it('appends to target property of instance', () => {
        const targetElement = document.querySelector('.container')

        expect(targetElement).to.contain('.raul-content-loader-wrapper')
        expect(targetElement).to.contain('.raul-content-loader')
      })
    })

    describe('with target argument provided', () => {
      const loader = new Loader({
        type: 'content',
        target: '.container',
      })

      describe('as a selector string', () => {
        beforeEach(() => loader.add('.box'))

        it('appends to first found match', () => {
          const targetElement = document.querySelector('.box')

          expect(targetElement).to.contain('.raul-content-loader-wrapper')
          expect(targetElement).to.contain('.raul-content-loader')
        })

        it('does not append to instance target', () => {
          const targetElement = document.querySelector(loader.target)

          expect(targetElement).not.to.contain('.raul-content-loader-wrapper')
          expect(targetElement).not.to.contain('.raul-content-loader')
        })
      })

      describe('as an element', () => {
        let selectedElement

        beforeEach(() => {
          selectedElement = document.querySelector('.box')
          loader.add(selectedElement)
        })

        it('appends to provided target', () => {
          expect(selectedElement).to.contain('.raul-content-loader-wrapper')
          expect(selectedElement).to.contain('.raul-content-loader')
        })

        it('does not append to instance target', () => {
          const targetElement = document.querySelector(loader.target)

          expect(targetElement).not.to.contain('.raul-content-loader-wrapper')
          expect(targetElement).not.to.contain('.raul-content-loader')
        })
      })

      describe('as a HTMLCollection', () => {
        let selectedElements

        beforeEach(() => {
          selectedElements = [...document.querySelectorAll('.box')]
          loader.add(selectedElements)
        })

        it('appends to the first element of collection', () => {
          expect(selectedElements[0]).to.contain('.raul-content-loader-wrapper')
          expect(selectedElements[0]).to.contain('.raul-content-loader')

          selectedElements.slice(1).forEach((element) => {
            expect(element).not.to.contain('.raul-content-loader-wrapper')
            expect(element).not.to.contain('.raul-content-loader')
          })
        })

        it('does not append to instance target', () => {
          const targetElement = document.querySelector(loader.target)

          expect(targetElement).not.to.contain('.raul-content-loader-wrapper')
          expect(targetElement).not.to.contain('.raul-content-loader')
        })
      })
    })
  })

  describe('#remove', () => {
    describe('with page loader options', () => {
      const loader = new Loader({type: 'page'})

      beforeEach(() => {
        loader.add()
        loader.remove()
      })

      it('removes loader from target', () => {
        const targetElement = document.body

        expect(targetElement).not.to.contain('.raul-content-loader-wrapper')
        expect(targetElement).not.to.contain('.raul-content-loader')
      })

      it('removes a class to the body which indicates that the page is loading', () => {
        const actual = [...document.body.classList].includes('page-loading')

        expect(actual).to.be.false
      })
    })

    describe('with content loader options', () => {
      const loader = new Loader({
        type: 'content',
        target: '.container',
      })

      beforeEach(() => {
        loader.add()
        loader.remove()
      })

      it('removes loader from target', () => {
        const targetElement = document.querySelector(loader.target)

        expect(targetElement).not.to.contain('.raul-content-loader-wrapper')
        expect(targetElement).not.to.contain('.raul-content-loader')
      })
    })
  })

  describe('.template', () => {
    const whitespaceRegex = /\s\s+/g

    it('generates default loader html in string format when arguments are not supplied', () => {
      const template = Loader.template()

      expect(template.replace(whitespaceRegex, '')).to.eq(`
        <div class="raul-page-loader-wrapper">
          <div class="raul-page-loader"></div>
        </div>
      `.replace(whitespaceRegex, ''))
    })

    it('generates specified loader html in string format, when arguments are supplied', () => {
      const template = Loader.template({type: 'content'})

      expect(template.replace(whitespaceRegex, '')).to.eq(`
        <div class="raul-content-loader-wrapper">
          <div class="raul-content-loader"></div>
        </div>
      `.replace(whitespaceRegex, ''))
    })
  })

  describe('.addContentLoader', () => {
    describe('when target is supplied as a selector string', () => {
      beforeEach(() => Loader.addContentLoader('.box'))

      it('appends a content loader to every found match', () => {
        const selectedElements = [...document.querySelectorAll('.box')]

        selectedElements.forEach((element) => {
          expect(element).to.contain('.raul-content-loader-wrapper')
          expect(element).to.contain('.raul-content-loader')
        })
      })
    })

    describe('when target is supplied as an element', () => {
      beforeEach(() => Loader.addContentLoader(document.querySelector('.box')))

      it('appends to provided target', () => {
        const selectedElement = document.querySelector('.box')

        expect(selectedElement).to.contain('.raul-content-loader-wrapper')
        expect(selectedElement).to.contain('.raul-content-loader')
      })
    })

    describe('when target is supplied as a HTMLCollection', () => {
      beforeEach(() => Loader.addContentLoader(document.querySelectorAll('.box')))

      it('appends a content loader to every found match', () => {
        const selectedElements = [...document.querySelectorAll('.box')]

        selectedElements.forEach((element) => {
          expect(element).to.contain('.raul-content-loader-wrapper')
          expect(element).to.contain('.raul-content-loader')
        })
      })
    })
  })

  describe('.removeContentLoader', () => {
    describe('when target is supplied as a selector string', () => {
      beforeEach(() => {
        Loader.addContentLoader('.box')
        Loader.removeContentLoader('.box')
      })

      it('removes all content loaders found within matching selector', () => {
        const selectedElements = [...document.querySelectorAll('.box')]

        selectedElements.forEach((element) => {
          expect(element).not.to.contain('.raul-content-loader-wrapper')
          expect(element).not.to.contain('.raul-content-loader')
        })
      })
    })

    describe('when target is supplied as an element', () => {
      beforeEach(() => {
        Loader.addContentLoader('.box')
        Loader.removeContentLoader(document.querySelector('.box'))
      })

      it('removes all content loaders found within element', () => {
        const selectedElement = document.querySelector('.box')

        expect(selectedElement).not.to.contain('.raul-content-loader-wrapper')
        expect(selectedElement).not.to.contain('.raul-content-loader')
      })
    })

    describe('when target is supplied as a HTMLCollection', () => {
      beforeEach(() => {
        Loader.addContentLoader('.box')
        Loader.removeContentLoader(document.querySelectorAll('.box'))
      })

      it('appends a content loader to every found match', () => {
        const selectedElements = [...document.querySelectorAll('.box')]

        selectedElements.forEach((element) => {
          expect(element).not.to.contain('.raul-content-loader-wrapper')
          expect(element).not.to.contain('.raul-content-loader')
        })
      })
    })
  })

  describe('.removeAllContentLoaders', () => {
    beforeEach(() => {
      Loader.addContentLoader('.box')
      Loader.addContentLoader('.container')
      Loader.removeAllContentLoaders()
    })

    it('removes all content loaders from document', () => {
      expect(document.body).not.to.contain('.raul-content-loader-wrapper')
      expect(document.body).not.to.contain('.raul-content-loader')
    })
  })

  describe('.addPageLoader', () => {
    beforeEach(() => Loader.addPageLoader())

    it('appends a page loader to the body', () => {
      const wrapper = document.querySelector('.raul-page-loader-wrapper')
      const loader = wrapper.querySelector('.raul-page-loader')

      expect(wrapper).to.match('.raul-page-loader-wrapper')
      expect(loader).to.match('.raul-page-loader')
    })

    it('adds a class to the body which indicates that the page is loading', () => {
      const actual = [...document.body.classList].includes('page-loading')

      expect(actual).to.be.true
    })
  })

  describe('.removePageLoader', () => {
    beforeEach(() => {
      Loader.addPageLoader()
      Loader.removePageLoader()
    })

    it('removes page loader from the body', () => {
      expect(document.body).not.to.contain('.raul-content-loader-wrapper')
      expect(document.body).not.to.contain('.raul-content-loader')
    })

    it('removes a class to the body which indicates that the page is loading', () => {
      const actual = [...document.body.classList].includes('page-loading')

      expect(actual).to.be.false
    })
  })
})
