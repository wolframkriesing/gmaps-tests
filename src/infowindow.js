export default class InfoWindow {
  
  constructor(position) {
    this.gInfowindow = new google.maps.InfoWindow({
      position: position
    });
    
  }
  
  setContent(content) {
    this.gInfowindow.setContent(content);
  }
  
  open(map, marker) {
    this.gInfowindow.open(map.gMap, marker.gMarker);
  }
  
}