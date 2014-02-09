JabberApp.module 'CrewApp.Edit', (Edit, App, Backbone, Marionette, $, _) ->
  Edit.Layout = App.Views.Layout.extend(
    template: require('./tpl/layout.hbs')
    regions:
      formRegion: '#form-region'
      titleRegion: '#title-region'
  )
  Edit.Title = App.Views.ItemView.extend(
    template: require('./tpl/_title.hbs')
    modelEvents:
      updated: 'render'
  )
  Edit.Crew = App.Views.ItemView.extend(template: require('./tpl/_edit.hbs'))
  return


# , form: {
#     footer: false
#   }
# , onFormSubmit: function(data) {
#     console.log('Edit.Crew onFormSubmit', data);
#     return false;
#   }