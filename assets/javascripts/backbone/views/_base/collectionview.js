JabberApp.module('Views', function (Views, App, Backbone, Marionette) {
  Views.CollectionView = Marionette.CollectionView.extend({
    itemViewEventPrefix: 'childview'
  });
});
