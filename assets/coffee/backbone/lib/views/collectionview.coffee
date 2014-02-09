JabberApp.module 'Views', (Views, App, Backbone, Marionette) ->
  Views.CollectionView = Marionette.CollectionView.extend(itemViewEventPrefix: 'childview')
  return
