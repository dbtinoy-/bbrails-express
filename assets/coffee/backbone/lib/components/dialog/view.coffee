#
#
# 
dialogWrapperDef = (Dialog, App, Backbone, Marionette, $, _) ->
  Dialog.DialogWrapper = Marionette.Layout.extend(
    template: require('./tpl/dialog_wrapper.hbs')
    className: 'modal-dialog'
    regions:
      dialogContentRegion: '#dialog-content-region'

    ui:
      headerContainer: 'div.modal-header'
      buttonContainer: 'div.modal-footer'

    triggers:
      'click [data-form-button="primary"]': 'dialog:ok:clicked'
      'click [data-form-button="cancel"]': 'dialog:cancel:clicked'

    initialize: ->
      @setInstancePropertiesFor 'config', 'buttons'
      return

    serializeData: ->
      buttons = (if @buttons then @buttons.toJSON() else false)
      if buttons
        @buttons.reset()
        delete @buttons
      config: @config
      buttons: buttons

    onShow: ->
      _.defer _.bind(@showDefered, this)
      return

    showDefered: ->
      @focusFirstInput()  if @config.focusFirstInput
      return

    titleize: (title) ->
      @ui.headerContainer.find('.modal-title').text title
      return
  )
  return
load = (App) ->
  App.module 'Components.Dialog', dialogWrapperDef
  return
load JabberApp  if JabberApp
module.exports = load