buttons = (Entities, App, Backbone, Marionette, $, _) ->
  Entities.Button = Entities.Model.extend(defaults:
    buttonType: 'button'
  )
  Entities.ButtonCollection = Entities.Collection.extend(model: Entities.Button)
  API =
    getFormButtons: (buttons, model) ->
      res = []
      buttonCollection = undefined
      buttons = @getDefaultButtons(buttons, model)
      if buttons.cancel
        res.push
          type: 'cancel'
          className: 'btn btn-default'
          text: buttons.cancel

      if buttons.primary
        res.push
          type: 'primary'
          className: 'btn btn-primary'
          text: buttons.primary
          buttonType: 'submit'

      res.reverse()  if buttons.placement is 'left'
      buttonCollection = new Entities.ButtonCollection(res)
      buttonCollection.placement = buttons.placement
      buttonCollection

    getDefaultButtons: (buttons, model) ->
      _.defaults buttons,
        primary: (if model then ((if model.isNew() then 'Create' else 'Update')) else false)
        cancel: 'Cancel'
        placement: 'right'


  App.reqres.setHandler 'form:button:entities', (buttons, model) ->
    API.getFormButtons buttons or {}, model

  return
load = (App) ->
  App.module 'Entities', buttons
  return
load JabberApp  if JabberApp
module.exports = load