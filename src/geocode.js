export default class Geocode {
  fromAddress(address, onError, onSuccess) {
    this.onError = onError;
    this.onSuccess = onSuccess;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address}, this.onGeocodeResult.bind(this));
  }
  
  onGeocodeResult(results, error) {
    if (error != google.maps.GeocoderStatus.OK) {
      this.onError(error);
    } else {
      this.onSuccess(results);
    }
  }
}

