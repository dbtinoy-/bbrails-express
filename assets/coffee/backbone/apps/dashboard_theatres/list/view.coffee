JabberApp.module 'DashboardTheatreApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Theatre = App.Views.ItemView.extend(
    template: require('./tpl/_theatre.hbs')
    tagName: 'tr'
  )
  List.Theatres = App.Views.CompositeView.extend(
    template: require('./tpl/theatres.hbs')
    itemView: List.Theatre
    itemViewContainer: 'tbody'
  )
  return
