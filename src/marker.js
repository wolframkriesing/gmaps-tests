export default class Marker {
  
  constructor(map, position) {
    this.gMarker = new google.maps.Marker({
      map: map.gMap,
      position: position
    });
  }
  
  registerOnClick(callback) {
    google.maps.event.addListener(this.gMarker, 'click', callback);
  }
  
}