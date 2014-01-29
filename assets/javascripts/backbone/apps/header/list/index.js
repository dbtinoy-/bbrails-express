require('./view');
JabberApp.module('HeaderApp.List', function(List, App, Backbone, Marionette, $, _) {
  List.Controller = App.Controllers.Application.extend({

    initialize: function(options) {
      var navs     = options.navs;
      var listView = this.getListView(navs);

      this.show(listView);
    }

  , getListView: function(navs) {
      return new List.Header({ collection: navs });
    }
  });
});