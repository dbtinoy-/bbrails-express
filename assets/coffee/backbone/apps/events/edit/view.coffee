JabberApp.module 'EventsApp.Edit', (Edit, App, Backbone, Marionette, $, _) ->
  Edit.Event = App.Views.ItemView.extend(
    template: require('./tpl/event.hbs')
    modelEvents:
      'change:name': ->
        console.log 'name changed'
        return

    dialog:
      header_title: 'Edit event'
      buttons:
        cancel: false
        primary: 'Salut'

    onDialogOkClicked: ->
      @trigger 'dialog:close'
      return

    onDialogCancelClicked: ->
      @trigger 'dialog:close'
      return
  )
  return
