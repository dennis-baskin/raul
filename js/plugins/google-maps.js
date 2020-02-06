RAUL = window.RAUL || {}
RAUL.plugins = RAUL.plugins || {}
RAUL.plugins.maps = RAUL.plugins.maps || {}

const CLUSTER_ICON_PATH = 'https://cdn.realpage.com/images/map/clusters/m'

const DEFAULT_CLUSTER_ICONS = [
  {
    textColor: '#ffffff',
    url: CLUSTER_ICON_PATH + '1.png',
    width: '53',
    height: '53',
  },
  {
    textColor: '#ffffff',
    url: CLUSTER_ICON_PATH + '2.png',
    width: '56',
    height: '56',
  },
  {
    textColor: '#ffffff',
    url: CLUSTER_ICON_PATH + '3.png',
    width: '66',
    height: '66',
  },
  {
    textColor: '#ffffff',
    url: CLUSTER_ICON_PATH + '4.png',
    width: '78',
    height: '78',
  },
  {
    textColor: '#ffffff',
    url: CLUSTER_ICON_PATH + '5.png',
    width: '90',
    height: '90',
  },
]

const MARKER_ICONS = {
  simple: {
    url: 'https://cdn.realpage.com/images/map/pin-dot.png',
    scaledSize: new window.google.maps.Size(20, 26),
    labelOrigin: new window.google.maps.Point(10, 10),
  },

  withNumber: {
    url: 'https://cdn.realpage.com/images/map/pin-number.png',
    scaledSize: new window.google.maps.Size(20, 26),
    labelOrigin: new window.google.maps.Point(10, 10),
  },
}

/**
 * Returns Element built from markup
 */
const generateContent = (markup) => {
  const template = `
    <div class="info-box">
      <div class="info-box-content">
        ${markup}
      </div>
      <div class="info-box-caret"></div>
    </div>
  `

  return new window.DOMParser().parseFromString(template, 'text/html').body.firstChild
}

/**
 * Returns LatLngLiteral representing content position
 */
const getContentPosition = (instace) => {
  const position = instace.getProjection().fromLatLngToDivPixel(instace.latlng)
  const contentStyle = window.getComputedStyle(instace.content)
  const contentHeight = parseFloat(contentStyle.height)
  const contentWidth = parseFloat(contentStyle.width)
  const markerOffsetY = instace.markerSize.height + contentHeight + INFO_BOX_CARET_HEIGHT_OFFSET
  const markerOffsetX = contentWidth / 2

  return {
    left: position.x - markerOffsetX,
    top: position.y - markerOffsetY,
  }
}

const INFO_BOX_CARET_HEIGHT_OFFSET = 10

/**
 * Represents an Info Box (a custom version of InfoWindow using OverlayView).
 * @extends google.maps.OverlayView
 */
class InfoBox extends window.google.maps.OverlayView {
  constructor(map, marker, content = '') {
    super()

    this.mapReference = map
    this.marker = marker
    this.markerIcon = this.marker.getIcon()
    this.latlng = this.marker.getPosition()
    this.content = generateContent(content)
    this.markerSize = this.markerIcon.size || this.markerIcon.scaledSize

    this.content.__infoBox__ = this

    window.google.maps.event.addDomListener(this.content, 'click', (event) => {
      event.stopPropagation()
      window.google.maps.event.trigger(this, 'click')
    })

    window.google.maps.event.addListener(this.marker, 'click', () => {
      [...document.querySelectorAll('.info-box')].forEach((infoBox) => infoBox.__infoBox__.close())
      this.open()
    })

    window.google.maps.event.addListener(map, 'click', (event) => this.close())
  }

  /**
   * Extension metho to help generate InfoBox directly from marker
   * @param {google.maps.Marker} marker - an instance of a google maps Marker
   */
  static fromMarker(marker) {
    return new this(marker.map, marker, marker.info)
  }

  /**
   * Opens the InfoBox instance
   */
  open() {
    this.setMap(this.mapReference)
  }

  /**
   * A required method implementation of OverlayView
   */
  draw() {
    const position = getContentPosition(this)

    this.content.style.left = `${position.left}px`
    this.content.style.top = `${position.top}px`
  }

  /**
   * A required method implementation of OverlayView
   */
  onAdd() {
    this.getPanes().floatPane.appendChild(this.content)
    this.content.style.display = 'block'
  }

  /**
   * A required method implementation of OverlayView
   */
  onRemove() {
    this.content.style.display = 'none'
  }

  /**
   * Closes the InfoBox instance
   */
  close() {
    this.setMap(null)
  }
}

RAUL.plugins.maps.google = {
  InfoBox: InfoBox,

  /**
   * Determines center point of markers. Returns Lat/Lng object literal.
   * @param {Array<LatLng|Lat/Lng object literal>} locations - Array of LatLng objects or literals.
   */
  averageLatLng(locations) {
    const average = (arr) => arr.reduce((left, right) => left + right) / arr.length

    return {
      lat: average(locations.map(function(location) { return location.lat })),
      lng: average(locations.map(function(location) { return location.lng })),
    }
  },

  /**
   * Creates a new google map marker instance
   * @param {Object} map - The map object instance.
   * @param {string || null} [label = null] - The marker label number.
   * @param {number} lat - The latitude coordinate.
   * @param {number} lng - The longitude coordinate.
   * @param {string} [info = null] - The marker info window text.
   * @param {number} [zIndex = null] - The z-index of the marker.
   */
  createMarker({
    map,
    label = null,
    lat,
    lng,
    info = null,
    zIndex = null,
  }) {
    return new window.google.maps.Marker({
      icon: label ? MARKER_ICONS.withNumber : MARKER_ICONS.simple,
      info: info,
      label: label ? {
        text: label,
        color: '#ffffff',
        fontSize: '0.65rem',
      } : null,
      map: map,
      position: new window.google.maps.LatLng(lat, lng),
      zIndex: zIndex,
    })
  },

  /**
   * Creates a new google map marker clusterer instance
   * @param {Object} map - The map object instance.
   * @param {Array} markers - Markers array.
   * @param {Object} options - Marker clusterer options.
   */
  createMarkerClusterer({ map, markers, options = {} }) {
    const opts = {styles: DEFAULT_CLUSTER_ICONS, ...options}
    return new window.MarkerClusterer(map, markers, opts)
  },
}
