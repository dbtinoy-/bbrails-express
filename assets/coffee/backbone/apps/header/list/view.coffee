JabberApp.module 'HeaderApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Nav = App.Views.ItemView.extend(
    tagName: 'li'
    template: require('./tpl/_nav.hbs')
  )
  List.Nav.include 'Chooseable'
  List.Header = App.Views.CompositeView.extend(
    template: require('./tpl/list.hbs')
    itemView: List.Nav
    itemViewContainer: '#list-nav'
  )
  return
