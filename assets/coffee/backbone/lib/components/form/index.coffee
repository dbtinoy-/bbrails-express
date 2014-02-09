#
#
# 
formControllerDef = (Form, App, Backbone, Marionette, $, _) ->
  Form.Controller = App.Controllers.Application.extend(
    initialize: (options) ->
      options = options or {}
      @contentView = options.view
      @formLayout = @getFormLayout(options.config)
      @listenTo @formLayout, 'show', @formContentRegion
      @listenTo @formLayout, 'form:submit', @formSubmit
      @listenTo @formLayout, 'form:cancel', @formCancel
      

    formCancel: ->
      @contentView.triggerMethod 'form:cancel'
      

    formSubmit: ->
      data = Backbone.Syphon.serialize(@formLayout)
      model = @contentView.model
      collection = @contentView.collection
      @processFormData data, model, collection  if @contentView.triggerMethod('form:submit', data) isnt false
      

    processFormData: (data, model, collection) ->
      model.save data,
        collection: collection

      

    onClose: ->
      console.log 'onClose', this
      

    formContentRegion: ->
      @region = @formLayout.formContentRegion
      @show @contentView
      

    getFormLayout: (options) ->
      config = @getDefaultConfig(_.result(@contentView, 'form'))
      buttons = undefined
      _.extend config, options or {}
      buttons = @getButtons(config.buttons)
      new Form.FormWrapper(
        config: config
        model: @contentView.model
        buttons: buttons
      )

    getDefaultConfig: (config) ->
      _.defaults config or {},
        footer: true
        focusFirstInput: true
        errors: true
        syncing: true


    getButtons: (buttons) ->
      App.request 'form:button:entities', buttons, @contentView.model  if buttons isnt false
  )
  App.reqres.setHandler 'form:wrapper', (contentView, options) ->
    options = options or {}
    throw new Error('No model found inside of form\'s contentView') unless contentView.model
    formController = new Form.Controller(
      view: contentView
      config: options
    )
    formController.formLayout

  
load = (App) ->
  view = require('./view.coffee')
  view App unless JabberApp
  App.module 'Components.Form', formControllerDef
  
load JabberApp  if JabberApp
module.exports = load