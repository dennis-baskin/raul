import './polyfills'

import 'xss/dist/xss.min'
import 'moment/min/moment.min'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min'
import 'sortablejs/Sortable.min'

const DEFAULT_ASSET_BASE = ''

const DEFAULT_RAUL_CONSTANTS = {
  CSS_BASE: DEFAULT_ASSET_BASE,
  JS_BASE: DEFAULT_ASSET_BASE,
  AUTOLOAD: true,
}

window.RAUL = (window.RAUL && window.RAUL === Object(window.RAUL)) ? window.RAUL : {}

window.RAUL = {...DEFAULT_RAUL_CONSTANTS, ...window.RAUL}
