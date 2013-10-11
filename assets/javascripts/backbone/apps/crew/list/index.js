require('./view');

JabberApp.module('CrewApp.List', function(List, App, Backbone, Marionette, $, _) {

  List.Controller = App.Controllers.Base.extend({
    initialize: function() {
      var crew = App.request('crew:entities');
      this.layout = this.getLayoutView();

      this.listenTo(this.layout, 'show', function() {
        this.titleRegion();
        this.panelRegion();
        this.crewRegion(crew);
      });

      this.show(this.layout, { loading: { entities: crew } });

    }


  , getLayoutView: function() {
      return new List.Layout();
    }

  , titleRegion: function() {
      var titleView = this.getTitleView();
      this.layout.titleRegion.show(titleView);
    }

  , panelRegion: function() {
      var panelView = this.getPanelView()
        , panelRegion = this.layout.panelRegion;

      this.listenTo(panelView, 'new:crew:button:clicked', this.newRegion);
      panelRegion.show(panelView);
    }

  , newRegion: function() {
      App.execute('new:crew:member', this.layout.newRegion);
    }

  , crewRegion: function(crew) {
      var crewView = this.getCrewView(crew);

      this.listenTo(crewView, 'childview:crew:member:clicked', function(view, args) {
        App.vent.trigger('crew:member:clicked', args.model);
      });

      this.listenTo(crewView, 'childview:crew:delete:clicked', function(child, args) {
        var model = args.model;

        if ( confirm( ['Are you sure you want to delete ', model.get('name'), '?'].join('') ) ) {
          model.destroy();
        } else {
          return false;
        }
      });

      this.layout.crewRegion.show(crewView);
    }

  , getTitleView: function() {
      return new List.Title();
    }

  , getPanelView: function() {
      return new List.Panel();
    }

  , getNewView: function() {
      return new List.New();
    }

  , getCrewView: function(crew) {
      return new List.Crew({collection: crew});
    }
  });

});