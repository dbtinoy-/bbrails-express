
JabberApp.module('AdminApp.List', function(List, App, Backbone, Marionette, $, _) {
  require('./list.view.js');

  List.Controller = App.Controllers.Application.extend({
    name: 'AdminApp.List'

  , initialize: function(options) {
      var adminNavs = App.request('admin:nav:entities');

      this.listenTo(adminNavs, 'collection:chose:one', function(chosen) {
        App.vent.trigger('admin:nav:chose', chosen.get('name'), this.layout.articleRegion);
      });

      this.layout = this.getLayoutView();

      this.listenTo(this.layout, 'show', function() {
        this.bannerRegion();
        this.listRegion(adminNavs, options.nav);
      });

      this.show(this.layout);
    }

  , bannerRegion: function() {
      var bannerView = this.getBannerView();
      this.show(bannerView, { region: this.layout.bannerRegion });
    }

  , listRegion: function(adminNavs, nav) {
      adminNavs.chooseByName(nav);

      var listView = this.getListView(adminNavs);

      this.show(listView, { region: this.layout.adminNavsRegion });
    }



  , getListView: function(adminNavs) {
      return new List.Navs({ collection: adminNavs });
    }

  , getBannerView: function() {
      return new List.Banner();
    }

  , getLayoutView: function() {
      return new List.Layout();
    }

  });

});