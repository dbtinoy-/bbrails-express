JabberApp.module 'Utilities', (Utilities, App, Backbone, Marionette, $, _) ->
  _.extend App,
    navigate: (route, options) ->
      Backbone.history.navigate route, options or {}
      return

    getCurrentRoute: ->
      frag = Backbone.history.fragment
      if _.isEmpty(frag)
        null
      else
        frag

    startHistory: ->
      Backbone.history.start()  if Backbone.history
      return

  return
