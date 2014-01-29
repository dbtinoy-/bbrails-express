JabberApp.module('DeliveriesApp.List', function(List, App, Backbone, Marionette, $, _) {

  List.Layout = App.Views.Layout.extend({
    template: require('./tpl/layout.hbs')
  , regions: {
      titleRegion:  '#title-region'
    , panelRegion:  '#panel-region'
    , listRegion:   '#list-region'
    }
  });


  List.Title = App.Views.ItemView.extend({
    template: require('./tpl/_title.hbs')
  });


  List.Panel = App.Views.ItemView.extend({
    template: require('./tpl/_panel.hbs')
  });



  List.Deliveries = App.Views.ItemView.extend({
    template: require('./tpl/_deliveries.hbs')
  , tagName: 'ol'
  });


  List.Deliveriess = App.Views.CompositeView.extend({
    template: require('./tpl/_deliveriess.hbs')
  , itemView: List.Deliveries
  , itemViewContainer: '.lbody'
  , className: 'jab-list'
  });


});