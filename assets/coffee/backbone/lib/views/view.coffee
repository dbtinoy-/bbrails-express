Handlebars = require('handleify')
Handlebars.registerHelper 'log', (context, options) ->
  console.log 'hbs log', context, options, this
  'log'

JabberApp.module 'Views', (Views, App, Backbone, Marionette, $, _) ->
  argsToArray = (args) ->
    (if args.length > 0 then slice.call(args, 0) else [])
  _remove = Marionette.View::remove
  slice = Array::slice
  require 'swag'
  Swag.registerHelpers Handlebars
  _.extend Marionette.View::,
    remove: ->
      console.log 'removing view', this
      destroy = @model and @model.isDestroyed and @model.isDestroyed()
      wrapper = undefined
      
      #_remove function binded to this
      binded_remove = _remove.bind(this)
      args = argsToArray(arguments)
      if destroy
        wrapper = @$el.toggleWrapper(
          className: 'opacity'
          backgroundColor: 'red'
        )
        
        #fade out & remove wrapper
        wrapper.fadeOut 400, ->
          $(this).remove()
          return

        
        #fadeout view el & remove view
        @$el.fadeOut 400, ->
          binded_remove args
          return

      else
        binded_remove args
      return

    toggleWrapper: (init) ->
      init = (if not init? then true else init)
      @_wrapperVisibled = !!init
      @$el.toggleWrapper
        className: 'opacity'
      , init
      return

    wrapperVisibled: ->
      @_wrapperVisibled

    setInstancePropertiesFor: ->
      self = this
      _.each _.pick(@options, argsToArray(arguments)), (prop, key) ->
        self[key] = prop
        return

      return

  return
