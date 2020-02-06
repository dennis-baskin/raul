var mapHelpers = RAUL.plugins.maps.google

var locations = [
  {lat: 39.463276, lng: -116.563480, info: 'This is info window 1'},
  {lat: 39.718234, lng: -110.363181, info: 'This is info window 2'},
  {lat: 38.727111, lng: -110.371124, info: 'This is info window 3'},
  {lat: 43.848588, lng: -111.209834, info: 'This is info window 4'},
  {lat: 43.851702, lng: -111.216968, info: 'This is info window 5'},
  {lat: 44.671264, lng: -100.863657, info: 'This is info window 6'},
  {lat: 45.304724, lng: -118.662905, info: 'This is info window 7'},
  {lat: 46.817685, lng: -115.699196, info: 'This is info window 8'},
  {lat: 46.828611, lng: -115.790222, info: 'This is info window 9'},
  {lat: 47.750000, lng: -115.116667, info: 'This is info window 10'},
  {lat: 40.759859, lng: -115.128708, info: 'This is info window 11'},
  {lat: 42.765015, lng: -115.133858, info: 'This is info window 12'},
  {
    lat: 41.770104,
    lng: -105.143299,
    info: '<h2>Custom InfoBox</h2><p>This is info window 13</p>',
  },
  {lat: 39.773700, lng: -115.145187, info: 'This is info window 14'},
  {lat: 37.774785, lng: -115.137978, info: 'This is info window 15'},
  {lat: 37.819616, lng: -104.968119, info: 'This is info window 16'},
  {lat: 38.330766, lng: -114.695692, info: 'This is info window 17'},
  {lat: 39.927193, lng: -115.053218, info: 'This is info window 18'},
  {lat: 41.330162, lng: -114.865694, info: 'This is info window 19'},
  {lat: 42.734358, lng: -117.439506, info: 'This is info window 20'},
]

var map = new window.google.maps.Map(
  document.getElementById('map'),
  {
    center: mapHelpers.averageLatLng(locations),
    zoom: 5,
  }
)

var markers = locations.map(function(location, i) {
  const marker = mapHelpers.createMarker({
    map: map,
    lat: location.lat,
    lng: location.lng,
    info: '<div class="p-3">' + location.info + '</div>',
    zIndex: i,
  })

  RAUL.plugins.maps.google.InfoBox.fromMarker(marker)

  return marker
})

mapHelpers.createMarkerClusterer({map: map, markers: markers})
