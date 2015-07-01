export default class Map {
  constructor(position) {
    this.gMap = new google.maps.Map(document.getElementById('map'), {
      center: position,
      zoom: 13
    });
    
  }
}