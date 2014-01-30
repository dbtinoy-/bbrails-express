JabberApp.module('Concerns', function(Concerns, App, Backbone, Marionette, $, _) {

  Concerns.Chooser = {
    initialize: function() {
      new Backbone.Chooser(this);
    }
  };

  Concerns.SingleChooser = {
    beforeIncluded: function(klass, concern) {
      klass.prototype.model.include('Chooser');
    }

  , initialize: function() {
      new Backbone.SingleChooser(this);
    }
  }
});