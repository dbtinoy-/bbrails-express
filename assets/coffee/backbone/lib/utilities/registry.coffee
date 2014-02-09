JabberApp.module 'Utilities', (Utilities, App, Backbone, Marionette, $, _) ->
  API =
    register: (instance, id) ->
      @_registry = {}  unless @_registry
      @_registry[id] = instance
      return

    unregister: (instance, id) ->
      delete @_registry[id]

      return

    resetRegistry: ->
      old_count = @getRegistrySize()
      _.each @_registry, (controller, key) ->
        controller.region.close()  if controller.region
        return

      msg = [
        'There were '
        old_count
        ' controllers in the registry, there are now '
        @getRegistrySize()
      ].join('')
      if @getRegistrySize() > 0
        console.warn msg, @_registry
      else
        console.log msg
      return

    getRegistrySize: ->
      _.size @_registry

  App.commands.setHandler 'register:instance', (instance, id) ->
    API.register instance, id  if App.environment is 'development'
    return

  App.commands.setHandler 'unregister:instance', (instance, id) ->
    API.unregister instance, id  if App.environment is 'development'
    return

  App.commands.setHandler 'reset:registry', ->
    API.resetRegistry()
    return

  return
