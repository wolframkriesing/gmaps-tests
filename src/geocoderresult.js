export default class GeocoderResult {
  
  constructor(location, formattedAddress) {
    this.location = location;
    this.formattedAddress = formattedAddress;
  }
  
  static fromGoogleGeocoderResult(gGeocoderResult) {
    let location = gGeocoderResult.geometry.location;
    let formattedAddress = gGeocoderResult.formatted_address;
    return new GeocoderResult(location, formattedAddress);
  }
  
  static fromFakeData(location, formattedAddress) {
    return new GeocoderResult(location, formattedAddress);
  }
  
}