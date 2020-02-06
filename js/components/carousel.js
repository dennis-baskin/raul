import {
  addClass,
  find,
  findOne,
  hasClass,
  Q,
  removeClass,
  toggleClass
} from '../dom-utils'

const SELECTOR = '.raul-carousel'
const VISIBLE_AREA_SELECTOR = '.visible-area'
const ITEMS_LIST_SELECTOR = '.raul-carousel-items'
const CARDS_SELECTOR = '.raul-carousel-items li'
const PREV_BUTTON_SELECTOR = '.prev'
const NEXT_BUTTON_SELECTOR = '.next'
const DOTS_SELECTOR = '.raul-carousel-dots'
const CAROUSEL_CARDS_SELECTOR = 'raul-carousel-cards'
// window's width at which basic card's width becomes responsive
const CARD_RESPONSIVE_BELOW_WINDOW_WIDTH = 560

class AbstractCarousel {
  /**
   * @param carousel should be a HTML object
   */
  constructor(carousel) {
    this.carousel = carousel
    this.visibleArea = findOne(this.carousel, VISIBLE_AREA_SELECTOR)
    this.itemsList = findOne(this.carousel, ITEMS_LIST_SELECTOR)
    this.cards = find(this.carousel, CARDS_SELECTOR)
    this.prevBtn = findOne(this.carousel, PREV_BUTTON_SELECTOR)
    this.nextBtn = findOne(this.carousel, NEXT_BUTTON_SELECTOR)

    this.totalItemsWidth = 0
    this.itemWidth = 0
  }

  updateDimensions() {}

  resetCarousel() {}

  bindEvents() {}
}

class BasicCarousel extends AbstractCarousel {
  /**
   * @param carousel should be a HTML object
   */
  constructor(carousel) {
    super(carousel)
    this.initialItemWidth = this.cards[0].offsetWidth
    this.visibleAreaWidth = 0
    this.cardWidth = 0

    this.updateDimensions()
    this.leftHidden = 0
    this.rightHidden = this.totalItemsWidth - this.visibleAreaWidth
    this.slideCarousel(this.leftHidden)
    this.bindEvents()
  }

  updateDimensions() {
    this.visibleAreaWidth = this.visibleArea.offsetWidth
    this.itemWidth = this.cards[0].offsetWidth

    const isMobile = window.innerWidth <= CARD_RESPONSIVE_BELOW_WINDOW_WIDTH
    this.cardWidth = (isMobile) ? this.visibleAreaWidth : this.initialItemWidth
    this.cards.forEach(card => {
      card.style.width = `${this.cardWidth}px`
    })

    this.totalItemsWidth = this.cardWidth * this.cards.length
    this.itemsList.style.width = `${this.totalItemsWidth}px`
  }

  slideCarousel(slideTo) {
    this.itemsList.style.transform = `translateX(-${slideTo}px)`

    toggleClass(this.prevBtn, 'd-none', this.leftHidden <= 0)
    toggleClass(this.nextBtn, 'd-none', this.rightHidden <= 0)
  }

  slideLeft() {
    const slideBy = this.leftHidden < this.cardWidth ? this.leftHidden : this.cardWidth
    this.leftHidden -= slideBy
    this.rightHidden += slideBy
    this.slideCarousel(this.leftHidden)
  }

  slideRight() {
    const slideTo = this.rightHidden < this.cardWidth ? this.rightHidden : this.cardWidth
    this.rightHidden -= slideTo
    this.leftHidden += slideTo
    this.slideCarousel(this.leftHidden)
  }

  resetCarousel() {
    this.updateDimensions()
    this.leftHidden = 0
    this.rightHidden = this.totalItemsWidth - this.visibleAreaWidth
    this.slideCarousel(this.leftHidden)
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', e => {
      e.preventDefault()
      this.slideLeft()
    })
    this.nextBtn.addEventListener('click', e => {
      e.preventDefault()
      this.slideRight()
    })
    window.addEventListener('resize', () => {
      this.resetCarousel()
    })
  }
}

class CardCarousel extends AbstractCarousel {
  /**
   * @param carousel should be a HTML object
   */
  constructor(carousel) {
    super(carousel)
    this.dots = findOne(this.carousel, DOTS_SELECTOR)

    this.addDots()
    this.bindEvents()
    this.setCardActiveByIndex(1)
    this.updateDimensions()

    this.getActiveItemIndex = () => {
      return +(findOne(this.itemsList, '.active').dataset.index)
    }
  }

  updateDimensions() {
    this.cards.forEach(card => {
      card.style.width = `${this.visibleArea.offsetWidth}px`
      card.style.minHeight = `${this.visibleArea.offsetHeight}px`
    })

    this.itemWidth = this.visibleArea.offsetWidth
    this.totalItemsWidth = this.itemWidth * this.cards.length

    this.itemsList.style.width = `${this.totalItemsWidth}px`
  }

  addDots() {
    const dots = this.dots
    this.cards.forEach(function(item, index) {
      const newDot = `<div class="raul-carousel-dot" data-index="${index + 1}"></div>`
      dots.insertAdjacentHTML('beforeend', newDot)
    })

    const dotWidth = this.dots.offsetWidth * 0.5
    this.dots.style.marginLeft = `-${dotWidth}px`
  }

  setCardActiveByIndex(index) {
    if (index < 1) index = 1
    if (index > this.cards.length) index = this.cards.length

    const slideBy = (index - 1) * this.itemWidth
    this.itemsList.style.transform = `translate(-${slideBy}px)`

    this.cards.forEach(card => removeClass(card, 'active'))
    addClass(findOne(this.itemsList, `[data-index='${index}']`), 'active')
    find(this.dots, '.raul-carousel-dot').forEach(dot => removeClass(dot, 'dot-active'))
    addClass(findOne(this.dots, `[data-index='${index}']`), 'dot-active')

    toggleClass(this.prevBtn, 'd-none', index === 1)
    toggleClass(this.nextBtn, 'd-none', index === this.cards.length)
  }

  resetCarousel() {
    this.updateDimensions()
    this.setCardActiveByIndex(1)
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', e => {
      e.preventDefault()
      this.setCardActiveByIndex(this.getActiveItemIndex() - 1)
    })
    this.nextBtn.addEventListener('click', e => {
      e.preventDefault()
      this.setCardActiveByIndex(this.getActiveItemIndex() + 1)
    })
    find(this.dots, '.raul-carousel-dot').forEach((dot) => {
      dot.addEventListener('click', e => {
        e.preventDefault()
        this.setCardActiveByIndex(+dot.getAttribute('data-index'))
      })
    })
    window.addEventListener('resize', () => {
      this.resetCarousel()
    })
  }
}

export default () => {
  const isHidden = el => el.offsetParent === null
  const carousels = Q(SELECTOR)

  carousels.forEach(carousel => {
    if (isHidden(carousel)) return
    if (carousel.RAUL && carousel.RAUL.carousel) return
    carousel.RAUL = carousel.RAUL || {}
    carousel.RAUL.carousel = hasClass(carousel, CAROUSEL_CARDS_SELECTOR) ? new CardCarousel(carousel) : new BasicCarousel(carousel)
  })
}

export { BasicCarousel, CardCarousel }
