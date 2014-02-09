JabberApp.module 'Concerns', (Concerns, App, Backbone, Marionette, $, _) ->
  Concerns.Chooseable =
    modelEvents:
      'change:chosen': 'changeChosen'

    onRender: ->
      @$el.addClass 'active'  if @model.isChosen()
      return

    changeChosen: (model, value, options) ->
      @$el.toggleClass 'active', value
      return

    choose: (ev) ->
      ev.preventDefault()
      @model.choose()
      return

    unchoose: (ev) ->
      ev.preventDefault()
      @model.unchoose()
      return

  return
