JabberApp.module 'Concerns', (Concerns, App, Backbone, Marionette, $, _) ->
  Concerns.Chooser = initialize: ->
    new Backbone.Chooser(this)
    return

  Concerns.SingleChooser =
    beforeIncluded: (klass, concern) ->
      klass::model.include 'Chooser'
      return

    initialize: ->
      new Backbone.SingleChooser(this)
      return

  return
