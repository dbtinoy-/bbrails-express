JabberApp.module('AdminApp.List', function(List, App, Backbone, Marionette, $, _) {

  List.Layout = App.Views.Layout.extend({
    template: require('./tpl/layout.hbs')
  , regions: {
      bannerRegion:     '#banner-region'
    , articleRegion:    '#article-region'
    , adminNavsRegion:  '#admin-navs-region'
    }
  });


  List.Banner = App.Views.ItemView.extend({
    template: require('./tpl/_banner.hbs')
  });





  List.Nav = App.Views.ItemView.extend({
    template: require('./tpl/_nav.hbs')
  , tagName: 'li'

  , modelEvents: {
      'change:chosen': 'changeChosen'
    }

  , events: {
      'click a': 'choose'
    }

  , onRender: function() {
      if (this.model.isChosen()) this.$el.addClass('active');
    }

  , changeChosen: function(model, value, options) {
      this.$el.toggleClass('active', value);
    }

  , choose: function(ev) {
      ev.preventDefault();
      this.model.chooseByCollection();
    }
  });





  List.Navs = App.Views.CollectionView.extend({
    tagName: 'ul'
  , className: 'nav nav-pills nav-stacked'
  , itemView: List.Nav
  });

});