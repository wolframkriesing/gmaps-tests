import assert from 'assert';
import sinon from 'sinon';
const noop = function() {};

assert.called = sinon.assert.called;

describe('the app', function() {
  describe('geocodes address', function() {

    it('from given location string', function() {
      
    });
    it('does show map on success', function() {
      let geocodeSuccess = {
        fromAddress: (location, onError, onSuccess) => {
          onSuccess();
        }
      };
      
      let app = new App(noop, geocodeSuccess);
      sinon.stub(app, 'showMap');
      app.run();
      
      assert.called(app.showMap);
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
    
  });
  describe('opens infowindow on marker click', function() {
    it('opens the infowindow', function() {
      
    });
    it('with the address from the geocode', function() {
      
    });
  });
});

class App {
  
  constructor(alert, geocode) {
    this.alert = alert;
    this.geocode = geocode;
  }
  
  showMap() {
    
  }
  
  run() {
    let onError = (errorText) => {
      this.alert('Geocode was not successful for the following reason: ' + errorText);
    };
    const onSuccess = () => {
      this.showMap();
    };
    this.geocode.fromAddress('', onError, onSuccess);
  }
  
}
