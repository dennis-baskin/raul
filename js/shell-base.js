import './polyfills'

const DEFAULT_ASSET_BASE = ''

const DEFAULT_RAUL_CONSTANTS = {
  CSS_BASE: DEFAULT_ASSET_BASE,
  JS_BASE: DEFAULT_ASSET_BASE,
  AUTOLOAD: true,
}

window.RAUL = (window.RAUL && window.RAUL === Object(window.RAUL)) ? window.RAUL : {}

window.RAUL = {...DEFAULT_RAUL_CONSTANTS, ...window.RAUL}
