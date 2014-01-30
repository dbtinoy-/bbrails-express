JabberApp.module('Utilities', function (Utilities, App, Backbone, Marionette, $, _) {

  var slice         = Array.prototype.slice;
  var Cocktail      = Backbone.Cocktail;
  var mixinKeywords = ['beforeIncluded', 'afterIncluded'];

  function include() {
    var concerns  = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    var klass = this;

    _.each(concerns, function(concern_key) {
      if (!_.has(App.Concerns, concern_key)) throw new Error('Undefined mixin concern '+ concern_key);
      var concern = App.Concerns[concern_key];

      // call the beforeIncluded method if it exists on our concern
      // the context of 'this' within beforeIncluded method will be
      // the prototype of our klass
      if (_.has(concern, 'beforeIncluded')) concern.beforeIncluded.call(klass.prototype, klass, concern);

      // remove mixinKeywords from concern before mixin to klass target
      Cocktail.mixin(klass, _.omit(concern, mixinKeywords));

      // call the afterIncluded method if it exists on our concern
      if (_.has(concern, 'afterIncluded')) concern.afterIncluded.call(klass.prototype, klass, concern);
    });

    return klass;
  }

  var modules = [
        { Marionette: ["ItemView", "Layout", "CollectionView", "CompositeView"] }
      , { Entities: ["Model", "Collection"] }
      ];

  _.each(modules, function(module) {
    _.each(module, function(klasses, key) {
      _.each(klasses, function(klass) {
        var obj = window[key] || App[key];
        obj[klass].include = include;
      });
    });
  });


});