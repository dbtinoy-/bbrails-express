JabberApp.module('Concerns', function(Concerns, App, Backbone, Marionette, $, _) {

  Concerns.Chooseable = {
    modelEvents: {
      'change:chosen': 'changeChosen'
    }


  , onRender: function() {
      if (this.model.isChosen()) this.$el.addClass('active');
    }

  , changeChosen: function(model, value, options) {
      this.$el.toggleClass('active', value);
    }

  , choose: function(ev) {
      ev.preventDefault();
      this.model.choose();
    }

  , unchoose: function(ev) {
      ev.preventDefault();
      this.model.unchoose();
    }

  };
});