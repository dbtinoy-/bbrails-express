require('./view');

JabberApp.module('CrewApp.Edit', function(Edit, App, Backbone, Marionette, $, _) {

  Edit.Controller = App.Controllers.Application.extend({
    initialize: function(options) {
      var id    = options.id
        , crew  = options.crew;

      if (!crew) { crew = App.request('crew:entity', id); }


      this.listenTo(crew, 'updated', function() {
        App.vent.trigger('crew:updated', crew);
      });

      this.layout = this.getLayoutView(crew);

      this.listenTo(this.layout, 'show', function() {
        this.showRegions(crew);
      });

      this.show(this.layout, { loading: true });
    }


  , showRegions: function(crew) {
      this.formRegion(crew);
      this.titleRegion(crew);
    }

  , titleRegion: function(crew) {
      var titleView = this.getTitleView(crew);
      this.layout.titleRegion.show(titleView);
    }

  , formRegion: function(crew) {
      var editView = this.getEditView(crew)
        , formView = App.request('form:wrapper', editView);

      this.listenTo(editView, 'form:cancel', function() {
        App.vent.trigger('crew:cancelled', crew);
      });

      this.layout.formRegion.show(formView);
    }

  , getTitleView: function(crew) {
      return new Edit.Title({ model: crew });
    }

  , getEditView: function(crew) {
      return new Edit.Crew({ model: crew });
    }

  , getLayoutView: function(crew) {
      return new Edit.Layout({ model: crew });
    }

  });



});