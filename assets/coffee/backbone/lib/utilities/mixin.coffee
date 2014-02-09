JabberApp.module 'Utilities', (Utilities, App, Backbone, Marionette, $, _) ->
  include = ->
    concerns = (if 1 <= arguments.length then slice.call(arguments, 0) else [])
    klass = this
    _.each concerns, (concern_key) ->
      throw new Error('Undefined mixin concern ' + concern_key)  unless _.has(App.Concerns, concern_key)
      concern = App.Concerns[concern_key]
      
      # call the beforeIncluded method if it exists on our concern
      # the context of 'this' within beforeIncluded method will be
      # the prototype of our klass
      concern.beforeIncluded.call klass::, klass, concern  if _.has(concern, 'beforeIncluded')
      
      # remove mixinKeywords from concern before mixin to klass target
      Cocktail.mixin klass, _.omit(concern, mixinKeywords)
      
      # call the afterIncluded method if it exists on our concern
      concern.afterIncluded.call klass::, klass, concern  if _.has(concern, 'afterIncluded')
      return

    klass
  slice = Array::slice
  Cocktail = Backbone.Cocktail
  mixinKeywords = [
    'beforeIncluded'
    'afterIncluded'
  ]
  modules = [
    {
      Marionette: [
        'ItemView'
        'Layout'
        'CollectionView'
        'CompositeView'
      ]
    }
    {
      Entities: [
        'Model'
        'Collection'
      ]
    }
  ]
  _.each modules, (module) ->
    _.each module, (klasses, key) ->
      _.each klasses, (klass) ->
        obj = window[key] or App[key]
        obj[klass].include = include
        return

      return

    return

  return
