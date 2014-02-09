fetch = (Utilities, App, Backbone, Marionette, $, _) ->
  App.commands.setHandler 'when:fetched', (entities, callback) ->
    xhrs = _.chain([entities]).flatten().pluck('_fetch').value()
    $.when.apply($, xhrs).done callback
    return

  return
load = (App) ->
  App.module 'Utilities', fetch
  return
load JabberApp  if JabberApp
module.exports = load