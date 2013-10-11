/* global describe, it, chai, Marionette */

var assert = chai.assert;


describe('Loading App (JabberApp)', function() {
  it('should be defined', function() {
    assert(JabberApp);
  });

  it('should throw error without environment', function() {
    assert.throws(function() { JabberApp.start(); });
    assert.doesNotThrow(function() { JabberApp.start({environment: 'test'}); });
  });


  it('should have $, Backbone, Marionette, _ available', function() {
    assert($);
    assert(Backbone);
    assert(Marionette);
    assert(_);
  });

  it('should have default modules', function() {
    var available_modules = [
      'Components'
    , 'Controllers'
    , 'Entities'
    , 'Entities'
    , 'Views'
    ];

    var ok = _.every(available_modules, function(module) {
      return JabberApp.submodules[module];
    });
    assert(ok);
  });
});