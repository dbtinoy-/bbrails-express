_sync = Backbone.sync
Backbone.sync = (method, entity, options) ->
  sync = undefined
  _.defaults options,
    beforeSend: _.bind(methods.beforeSend, entity)
    complete: _.bind(methods.complete, entity)

  sync = _sync(method, entity, options)
  entity._fetch = sync  if not entity._fetch and method is 'read'
  sync

methods =
  beforeSend: ->
    @trigger 'sync:start', this
    return

  complete: ->
    @trigger 'sync:stop', this
    return