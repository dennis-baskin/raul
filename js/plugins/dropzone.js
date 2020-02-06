import 'dropzone/dist/min/dropzone.min'
import {
  findOne,
  Q
} from '../dom-utils'

const MAIN_SELECTOR = '.raul-uploader'
const DROPAREA_SELECTOR = '.raul-uploader-droparea'
const FILES_SELECTOR = '.raul-uploader-files'
const DATA_URL_ATTRIBUTE = 'data-url'
const PROGRESS_BAR_SELECTOR = '.raul-progress-bar'

const DEFAULT_FILE_TEMPLATE = `
  <div class="raul-file">
    <div class="raul-file-icon-wrapper">
      <img data-dz-thumbnail>

      <div class="raul-content-loader default-icon"></div>
    </div>

    <div class="raul-file-details">
      <div class="raul-file-header">
        <span class="raul-file-name" data-dz-name></span>

        <div class="raul-file-cancel" data-dz-remove></div>
      </div>

      <div class="raul-file-footer" data-dz-errormessage>
        <span data-dz-size></span>

        <div class="raul-progress progress">
          <div
            class="raul-progress-bar progress-bar success"
            role="progressbar"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
            data-dz-uploadprogress
          >
          </div>
        </div>
      </div>
    </div>
  </div>
`

const DEFAULT_OPTIONS = {
  previewTemplate: DEFAULT_FILE_TEMPLATE,
  init: function() {
    this.on('uploadprogress', function(file, progress) {
      const progressBar = findOne(file.previewElement, PROGRESS_BAR_SELECTOR)
      if (progressBar) progressBar.innerHTML = `${Math.round(progress)}%`
    })
  },
}

const requiredOptions = selector => {
  return {
    url: Q(selector)[0].getAttribute(DATA_URL_ATTRIBUTE),
    previewsContainer: `${selector} ${FILES_SELECTOR}`,
    clickable: `${selector} ${DROPAREA_SELECTOR}`,
  }
}

const mergeOptions = (selector, options) => {
  return Object.assign({},
    DEFAULT_OPTIONS,
    requiredOptions(selector),
    options
  )
}

if (window.RAUL.plugins === undefined) window.RAUL.plugins = {}

window.RAUL.plugins.Dropzone = function(selector, options = {}) {
  return new Dropzone(selector, mergeOptions(selector, options))
}

window.RAUL.plugins.Dropzone.load = function() {
  const raulDropzones = [...Q(MAIN_SELECTOR)]

  raulDropzones.forEach(raulDropzone => {
    const idPrefix = raulDropzone.hasAttribute('id') ? `#${raulDropzone.getAttribute('id')} ` : ''
    const selector = `${idPrefix}${MAIN_SELECTOR}`
    return new Dropzone(selector, mergeOptions(selector))
  })
}
