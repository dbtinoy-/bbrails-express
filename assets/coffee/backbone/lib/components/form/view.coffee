#
#
# 
formWrapperDef = (Form, App, Backbone, Marionette, $, _) ->
  Form.FormWrapper = Marionette.Layout.extend(
    template: require('./tpl/form_wrapper.hbs')
    tagName: 'form'
    className: 'form-horizontal'
    attributes: ->
      'data-type': @getFormDataType()
      role: 'form'

    regions:
      formContentRegion: '#form-content-region'

    ui:
      buttonContainer: 'ul.list-inline'

    triggers:
      submit: 'form:submit'
      'click [data-form-button="cancel"]': 'form:cancel'

    modelEvents:
      'change:_errors': 'changeErrors'
      'sync:start': 'syncStart'
      'sync:stop': 'syncStop'

    initialize: ->
      @setInstancePropertiesFor 'config', 'buttons'
      return

    serializeData: ->
      buttons = (if @buttons then @buttons.toJSON() else false)
      footer: @config.footer
      buttons: buttons

    onShow: ->
      _.defer _.bind(@showDefered, this)
      return

    showDefered: ->
      @focusFirstInput()  if @config.focusFirstInput
      @buttonPlacement()
      return

    focusFirstInput: ->
      @$(':input:enabled:visible:first').focus()
      return

    buttonPlacement: ->
      @ui.buttonContainer.addClass @buttons.placement  if @buttons
      return

    getFormDataType: ->
      if @model.isNew()
        'new'
      else
        'edit'

    changeErrors: (model, errors, options) ->
      if @config.errors
        if _.isEmpty(errors)
          @removeErrors()
        else
          @addErrors errors
      return

    removeErrors: ->
      @$('.has-error').removeClass('has-error').find('small.help-block').remove()
      return

    addErrors: (errors) ->
      self = this
      errors = errors or {}
      _.each errors, (array, name) ->
        self.addError name, array[0]
        return

      return

    addError: (name, error) ->
      el = @$('[name="' + name + '"]')
      sm = $('<small class="help-block">' + error + '</small>')
      el.after(sm).closest('.form-group').addClass 'has-error'
      return

    syncStart: (model) ->
      @toggleWrapper className: 'opacity'  if @config.syncing
      return

    syncStop: (model) ->
      @toggleWrapper false  if @wrapperVisibled()
      return

    onClose: ->
      @toggleWrapper false  if @wrapperVisibled()
      return
  )
  return
load = (App) ->
  App.module 'Components.Form', formWrapperDef
  return
load JabberApp  if JabberApp
module.exports = load