import assert from 'assert';
import sinon from 'sinon';
const noop = function() {};

assert.called = sinon.assert.called;
assert.calledWith = sinon.assert.calledWith;

describe('the app', function() {

  let geocodeSuccess;
  beforeEach(function() {
    geocodeSuccess = {
      fromAddress: (location, onError, onSuccess) => {
        onSuccess('irrelevant');
      }
    };
  });
  
  describe('geocodes address', function() {

    it('from given location string', function() {
      let geocodeSuccess = {
        fromAddress: sinon.stub()
      };
      
      const location = 'Hamburg';
      let app = new App(noop, geocodeSuccess);
      app.run(location);
      
      assert.calledWith(geocodeSuccess.fromAddress, location);
    });
    it('does show map on success', function() {
      const result = {};
      let geocodeSuccess = {
        fromAddress: (location, onError, onSuccess) => {
          onSuccess(result);
        }
      };
      
      let app = new App(noop, geocodeSuccess);
      sinon.stub(app, 'showMap');
      app.run();
      
      assert.calledWith(app.showMap, result);
    });
    it('handles error', function() {
      const errorText = 'error text';
      let geocodeWithError = {
        fromAddress: (location, onError, onSuccess) => {
          onError(errorText);
        }
      };
      
      let wasCalledWith = false;
      let alert = function(text) { wasCalledWith = text; };
      
      let app = new App(alert, geocodeWithError);
      app.run();
      
      assert.equal(wasCalledWith, 'Geocode was not successful for the following reason: ' + errorText);
    });
    
  });
  it('shows marker at address`s location', function() {
    let app = new App(noop, geocodeSuccess);
    sinon.spy(app, 'showMarker');
    app.run();
    
    assert.called(app.showMarker);
  });
  describe('opens infowindow on marker click', function() {
    it('opens the infowindow', function() {
      let markerDouble = {
        registerOnClick: (fn) => { fn(); }
      };
      let infoWindow = {
        open: sinon.stub()
      };
      
      let app = new App(noop, geocodeSuccess, markerDouble, infoWindow);
      app.run();
      
      assert.called(infoWindow.open);
    });
    it('with the address from the geocode', function() {
      
    });
  });
});

class App {
  
  constructor(alert, geocode, marker, infoWindow) {
    this.alert = alert;
    this.geocode = geocode;
    this.marker = marker;
    this.infoWindow = infoWindow;
  }
  
  showMap() {
    
  }
  
  showMarker() {
    
  }
  
  run(location) {
    let onError = (errorText) => {
      this.alert('Geocode was not successful for the following reason: ' + errorText);
    };
    const onSuccess = (result) => {
      this.showMap(result);
      this.showMarker();
      this.marker && this.marker.registerOnClick(() => {
        this.infoWindow.open();
      })
    };
    this.geocode.fromAddress(location, onError, onSuccess);
  }
  
}
