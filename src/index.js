
function geocodeFromAddress(address, callback) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: address}, callback);
}

geocodeFromAddress('Hamburg', function(results, status) {
  var position, result, marker, map, infowindow;
  
  if (status != google.maps.GeocoderStatus.OK) {
    alert('Geocode was not successful for the following reason: ' + status);
  }
    
  result = results[0];
  position = result.geometry.location;

  map = new google.maps.Map(document.getElementById('map'), {
    center: position,
    zoom: 13
  });

  marker = new google.maps.Marker({
    map: map,
    position: position
  });

  infowindow = new google.maps.InfoWindow({
    position: position
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(result.formatted_address);
    infowindow.open(map, marker);
  });
});