import Geocode from './geocode';
import Map from './map';
import InfoWindow from './infowindow.js';
import Marker from './marker';
import GeocoderResult from './geocoderresult.js';

function onError(error) {
  alert('Geocode was not successful for the following reason: ' + error);
}

function onSuccess(results) {
  let geocoderResult = GeocoderResult.fromGoogleGeocoderResult(results[0]);
  //var location, result;
  //
  //result = results[0];
  //location = result.geometry.location;
  //const address = result.formatted_address;

  let map = new Map(geocoderResult.location);
  let marker = new Marker(map, geocoderResult.location);
  let infowindow = new InfoWindow(geocoderResult.location);
  marker.registerOnClick(function() {
    infowindow.setContent(geocoderResult.formattedAddress);
    infowindow.open(map, marker);
  });
}

let geocode = new Geocode();
geocode.fromAddress('Hamburg', onError, onSuccess);