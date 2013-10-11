require('./view');

JabberApp.module('CrewApp.New', function(New, App, Backbone, Marionette, $, _) {

  New.Controller = App.Controllers.Base.extend({

    initialize: function(options) {
      var crew = App.request('new:crew:entity')
        , newView
        , formView;

      this.listenTo(crew, 'created', function() {
        App.vent.trigger('crew:created', crew);
      });

      newView = this.getNewView(crew);
      formView = App.request('form:wrapper', newView);
      this.listenTo(newView, 'form:cancel', this.closeRegion);

      this.show(formView);
    }

  , closeRegion: function() {
      this.region.close();
    }

  , getNewView: function(crew) {
      return new New.Crew({ model: crew });
    }
  });
});
