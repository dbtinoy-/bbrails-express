JabberApp.module 'DashboardUpcomingApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Upcoming = App.Views.ItemView.extend(
    template: require('./tpl/_upcoming.hbs')
    tagName: 'tr'
  )
  List.Upcomings = App.Views.CompositeView.extend(
    template: require('./tpl/upcomings.hbs')
    itemView: List.Upcoming
    itemViewContainer: 'tbody'
  )
  return
