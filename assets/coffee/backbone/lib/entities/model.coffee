model = (Entities, App, Backbone, Marionette, $, _) ->
  Entities.Model = Backbone.Model.extend(
    idAttribute: '_id'
    destroy: (options) ->
      options = options or {}
      options = _.defaults(options,
        wait: true
      )
      @set '_destroy', true
      Backbone.Model::destroy.call this, options
      return

    isDestroyed: ->
      @get '_destroy'

    save: (data, options) ->
      isNew = @isNew()
      options = options or {}
      options = _.defaults(options,
        wait: true
        success: _.bind(@saveSuccess, this, isNew, options.collection)
        error: _.bind(@saveError, this)
      )
      @unset '_errors'
      Backbone.Model::save.call this, data, options
      return

    saveSuccess: (isNew, collection) ->
      if isNew
        if collection
          collection.add this
          collection.trigger 'model:created', this
        @trigger 'created', this
      else
        collection = collection or @collection
        collection.trigger 'model:updated', this  if collection
        @trigger 'updated', this
      return

    saveError: (model, xhr, options) ->
      error_text = undefined
      if xhr.status isnt '500' and xhr.status isnt '404'
        error_text = $.parseJSON(xhr.responseText)
        @set '_errors', (if error_text then error_text.errors else null)
      return
  )
  return
load = (App) ->
  App.module 'Entities', model
  return
load JabberApp  if JabberApp
module.exports = load