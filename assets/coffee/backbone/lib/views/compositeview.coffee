JabberApp.module 'Views', view = (Views, App, Backbone, Marionette) ->
  Views.CompositeView = Marionette.CompositeView.extend(itemViewEventPrefix: 'childview')
  return
