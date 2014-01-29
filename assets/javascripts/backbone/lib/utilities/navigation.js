JabberApp.module('Utilities', function(Utilities, App, Backbone, Marionette, $, _) {

  _.extend(App, {
    navigate: function(route, options) {
      Backbone.history.navigate(route, options || {});
    }

  , getCurrentRoute: function() {
      var frag = Backbone.history.fragment;
      if (_.isEmpty(frag)) {
        return null;
      } else {
        return frag;
      }
    }

  , startHistory: function() {
      if (Backbone.history) {
        Backbone.history.start();
      }
    }
  });

})