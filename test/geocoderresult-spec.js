import assert from 'assert';
import GeocoderResult from '../src/geocoderresult.js';

describe('test env ', function() {
  it('works', function() {
    assert.equal(1,1);
  });
});

describe('geocoder result', function() {
  let result;
  beforeEach(function() {
    result = GeocoderResult.fromFakeData('location', 'address');
  });
  it('has a location', function() {
    assert.ok('location' in result);
  });
  it('has a formatted address', function() {
    assert.ok('formattedAddress' in result);
  });
});

