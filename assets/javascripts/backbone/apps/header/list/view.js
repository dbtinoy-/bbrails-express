JabberApp.module('HeaderApp.List', function(List, App, Backbone, Marionette, $, _) {

  List.Nav = App.Views.ItemView.extend({
    tagName: 'li'
  , template: require('./tpl/_nav.hbs')

  , modelEvents: {
      'change:chosen': 'changeChosen'
    }

  , changeChosen: function(model, value, options) {
      this.$el.toggleClass('active', value);
    }

  });


  List.Header = App.Views.CompositeView.extend({
    template: require('./tpl/list.hbs')
  , itemView: List.Nav
  , itemViewContainer: '#list-nav'
  });


});