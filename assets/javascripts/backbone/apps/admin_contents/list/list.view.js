JabberApp.module('AdminContentsApp.List', function(List, App, Backbone, Marionette, $, _) {

  List.Layout = App.Views.Layout.extend({
    template: require('./tpl/layout.hbs')
  , regions: {
      titleRegion:  '#title-region'
    , panelRegion:  '#panel-region'
    , listRegion:   '#list-region'
    }
  });



});