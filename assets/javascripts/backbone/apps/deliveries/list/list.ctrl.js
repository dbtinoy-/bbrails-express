
JabberApp.module('DeliveriesApp.List', function(List, App, Backbone, Marionette, $, _) {
  require('./list.view.js');

  List.Controller = App.Controllers.Application.extend({
    name: 'DeliveriesApp.List'

  , initialize: function(options) {
      this.layout = this.getLayoutView();

      this.listenTo(this.layout, 'show', function() {
        this.titleRegion();
        this.panelRegion();
        this.listRegion();
      });

      this.show(this.layout, { loading: true });
    }


  , getLayoutView: function() {
      return new List.Layout();
    }


  , titleRegion: function() {
      var titleView = this.getTitleView();
      this.show(titleView, { region: this.layout.titleRegion });
    }


  , panelRegion: function() {
      var panelView = this.getPanelView();

      this.show(panelView, { region: this.layout.panelRegion });

    }


  , listRegion: function() {
      var listView = this.getListView();

      this.show(listView, { region: this.layout.listRegion });
    }


  , getTitleView: function() {
      return new List.Title();
    }

  , getPanelView: function() {
      return new List.Panel();
    }


  , getListView: function() {
      return new List.Deliveriess();
    }
  });

});