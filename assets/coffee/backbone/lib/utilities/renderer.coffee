JabberApp.module 'Utilities', (Utilities, App, Backbone, Marionette, $, _) ->
  _.extend Backbone.Marionette.Renderer,
    render: (template, data) ->
      return  if template is false
      return template(data)  if template
      throw [
        'Template '
        template
        ' not found'
      ].join('')

  return
