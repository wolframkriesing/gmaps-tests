(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Geocode = (function () {
  function Geocode() {
    _classCallCheck(this, Geocode);
  }

  _createClass(Geocode, [{
    key: "fromAddress",
    value: function fromAddress(address, onError, onSuccess) {
      this.onError = onError;
      this.onSuccess = onSuccess;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, this.onGeocodeResult.bind(this));
    }
  }, {
    key: "onGeocodeResult",
    value: function onGeocodeResult(results, error) {
      if (error != google.maps.GeocoderStatus.OK) {
        this.onError(error);
      } else {
        this.onSuccess(results);
      }
    }
  }]);

  return Geocode;
})();

exports["default"] = Geocode;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeocoderResult = (function () {
  function GeocoderResult(location, formattedAddress) {
    _classCallCheck(this, GeocoderResult);

    this.location = location;
    this.formattedAddress = formattedAddress;
  }

  _createClass(GeocoderResult, null, [{
    key: "fromGoogleGeocoderResult",
    value: function fromGoogleGeocoderResult(gGeocoderResult) {
      var location = gGeocoderResult.geometry.location;
      var formattedAddress = gGeocoderResult.formatted_address;
      return new GeocoderResult(location, formattedAddress);
    }
  }, {
    key: "fromFakeData",
    value: function fromFakeData(location, formattedAddress) {
      return new GeocoderResult(location, formattedAddress);
    }
  }]);

  return GeocoderResult;
})();

exports["default"] = GeocoderResult;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _geocode = require('./geocode');

var _geocode2 = _interopRequireDefault(_geocode);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _infowindowJs = require('./infowindow.js');

var _infowindowJs2 = _interopRequireDefault(_infowindowJs);

var _marker = require('./marker');

var _marker2 = _interopRequireDefault(_marker);

var _geocoderresultJs = require('./geocoderresult.js');

var _geocoderresultJs2 = _interopRequireDefault(_geocoderresultJs);

function onError(error) {
  alert('Geocode was not successful for the following reason: ' + error);
}

function onSuccess(results) {
  var geocoderResult = _geocoderresultJs2['default'].fromGoogleGeocoderResult(results[0]);
  //var location, result;
  //
  //result = results[0];
  //location = result.geometry.location;
  //const address = result.formatted_address;

  var map = new _map2['default'](geocoderResult.location);
  var marker = new _marker2['default'](map, geocoderResult.location);
  var infowindow = new _infowindowJs2['default'](geocoderResult.location);
  marker.registerOnClick(function () {
    infowindow.setContent(geocoderResult.formattedAddress);
    infowindow.open(map, marker);
  });
}

var geocode = new _geocode2['default']();
geocode.fromAddress('Hamburg', onError, onSuccess);

},{"./geocode":1,"./geocoderresult.js":2,"./infowindow.js":4,"./map":5,"./marker":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfoWindow = (function () {
  function InfoWindow(position) {
    _classCallCheck(this, InfoWindow);

    this.gInfowindow = new google.maps.InfoWindow({
      position: position
    });
  }

  _createClass(InfoWindow, [{
    key: "setContent",
    value: function setContent(content) {
      this.gInfowindow.setContent(content);
    }
  }, {
    key: "open",
    value: function open(map, marker) {
      this.gInfowindow.open(map.gMap, marker.gMarker);
    }
  }]);

  return InfoWindow;
})();

exports["default"] = InfoWindow;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Map = function Map(position) {
  _classCallCheck(this, Map);

  this.gMap = new google.maps.Map(document.getElementById('map'), {
    center: position,
    zoom: 13
  });
};

exports['default'] = Map;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Marker = (function () {
  function Marker(map, position) {
    _classCallCheck(this, Marker);

    this.gMarker = new google.maps.Marker({
      map: map.gMap,
      position: position
    });
  }

  _createClass(Marker, [{
    key: 'registerOnClick',
    value: function registerOnClick(callback) {
      google.maps.event.addListener(this.gMarker, 'click', callback);
    }
  }]);

  return Marker;
})();

exports['default'] = Marker;
module.exports = exports['default'];

},{}]},{},[3]);
