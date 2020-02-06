import {
  find,
  hasClass,
  Q
} from '../dom-utils'

const RAUL_PROGRESS_CLASS = '.raul-progress'
const PROGRESS_BAR_CLASS = '.raul-progress-bar'
const ANIMATE_CLASS = 'animate'
const PERCENT_CLASS = 'show-percent'

const VALUEMIN_ATTRIBUTE = 'aria-valuemin'
const VALUENOW_ATTRIBUTE = 'aria-valuenow'
const VALUEMAX_ATTRIBUTE = 'aria-valuemax'

const widthPercent = progressBar => {
  const valuemin = progressBar.getAttribute(VALUEMIN_ATTRIBUTE)
  const valuenow = progressBar.getAttribute(VALUENOW_ATTRIBUTE)
  const valuemax = progressBar.getAttribute(VALUEMAX_ATTRIBUTE)
  // rule of three
  const hundredPercent = valuemax - valuemin
  return valuenow * 100 / hundredPercent
}

const animateProgressBar = progressBar => {
  const targetWidth = widthPercent(progressBar)
  const showPercent = hasClass(progressBar, PERCENT_CLASS)

  const animation = setInterval(increaseWidth, 3)
  let currentWidth = 0
  function increaseWidth() {
    if (currentWidth > targetWidth) {
      clearInterval(animation)
    } else {
      progressBar.style.width = currentWidth + '%'
      if (showPercent) progressBar.innerHTML = progressBar.style.width
      currentWidth++
    }
  }
}

const setProgressBarWidth = progressBar => {
  if (hasClass(progressBar, ANIMATE_CLASS)) return animateProgressBar(progressBar)

  progressBar.style.width = widthPercent(progressBar) + '%'
  if (hasClass(progressBar, PERCENT_CLASS)) progressBar.innerHTML = progressBar.style.width
}

class Progress {
  /**
   * @param progress should be a HTML object
   */
  constructor(progress) {
    this.progress = progress
    this.progressBars = find(this.progress, PROGRESS_BAR_CLASS)

    this.progressBars.forEach(progressBar => setProgressBarWidth(progressBar))
  }
}

export default () => {
  const progresses = Q(RAUL_PROGRESS_CLASS)

  progresses.forEach(progress => {
    if (progress.RAUL && progress.RAUL.progress) return
    progress.RAUL = progress.RAUL || {}
    progress.RAUL.progress = new Progress(progress)
  })
}
