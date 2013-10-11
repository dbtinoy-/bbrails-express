JabberApp.module('Views', function view(Views, App, Backbone, Marionette) {
  Views.CompositeView = Marionette.CompositeView.extend({
    itemViewEventPrefix: 'childview'
  });
});

