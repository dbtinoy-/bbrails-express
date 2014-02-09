JabberApp.module 'CrewApp.New', (New, App, Backbone, Marionette, $, _) ->
  New.Crew = App.Views.ItemView.extend(
    template: require('./tpl/_new.hbs')
    form:
      buttons:
        placement: 'left'
  )
  return
