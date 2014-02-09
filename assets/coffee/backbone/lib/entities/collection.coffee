collection = (Entities, App, Backbone, Marionette, $, _) ->
  Entities.Collection = Backbone.Collection.extend()
  return
load = (App) ->
  App.module 'Entities', collection
  return
load JabberApp  if JabberApp
module.exports = load