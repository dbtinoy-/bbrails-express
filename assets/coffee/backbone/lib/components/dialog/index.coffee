#
#
# 
dialogControllerDef = (Dialog, App, Backbone, Marionette, $, _) ->
  Dialog.Controller = App.Controllers.Application.extend(
    initialize: (options) ->
      options = options or {}
      @contentView = options.view
      @dialogLayout = @getDialogLayout(options.config)
      @listenTo @dialogLayout, 'show', @dialogContentRegion
      @listenTo @dialogLayout, 'dialog:cancel:clicked', @dialogCancel
      @listenTo @dialogLayout, 'dialog:ok:clicked', @dialogOk
      @listenTo @contentView, 'dialog:close', @dialogClose
      @listenTo @contentView, 'dialog:title', @dialogTitleize
      

    dialogCancel: ->
      @contentView.triggerMethod 'dialog:cancel:clicked'
      

    dialogOk: ->
      @contentView.triggerMethod 'dialog:ok:clicked'
      

    dialogTitleize: (title) ->
      @dialogLayout.titleize title
      

    dialogClose: ->
      @dialogLayout.trigger 'dialog:close'
      

    onClose: ->
      console.log 'onClose', this
      

    dialogContentRegion: ->
      @region = @dialogLayout.dialogContentRegion
      @show @contentView
      

    getDialogLayout: (options) ->
      config = @getDefaultConfig(_.result(@contentView, 'dialog'))
      buttons = undefined
      _.extend config, options or {}
      buttons = @getButtons(config.buttons)
      new Dialog.DialogWrapper(
        config: config
        buttons: buttons
      )

    getDefaultConfig: (config) ->
      _.defaults config or {},
        footer: true
        header: true
        header_title: 'Default dialog title'
        header_cross: true


    getButtons: (buttons) ->
      App.request 'form:button:entities', buttons, @contentView.model  if buttons isnt false
  )
  App.reqres.setHandler 'dialog:wrapper', (contentView, options) ->
    options = options or {}
    dialogController = new Dialog.Controller(
      view: contentView
      config: options
    )
    dialogController.dialogLayout

  
load = (App) ->
  view = require('./view.coffee')
  view App unless JabberApp
  App.module 'Components.Dialog', dialogControllerDef
  
load JabberApp  if JabberApp
module.exports = load