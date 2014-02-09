JabberApp.module 'CrewApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Layout = App.Views.Layout.extend(
    template: require('./tpl/layout.hbs')
    regions:
      titleRegion: '#title-region'
      panelRegion: '#panel-region'
      newRegion: '#new-region'
      crewRegion: '#crew-region'
  )
  List.Title = App.Views.ItemView.extend(template: require('./tpl/_title.hbs'))
  List.Panel = App.Views.ItemView.extend(
    template: require('./tpl/_panel.hbs')
    triggers:
      'click #new-crew': 'new:crew:button:clicked'
  )
  List.CrewMember = App.Views.ItemView.extend(
    template: require('./tpl/_crew_member.hbs')
    triggers:
      'click .crew-delete button': 'crew:delete:clicked'
      click: 'crew:member:clicked'
  )
  List.Empty = App.Views.ItemView.extend(template: require('./tpl/_empty.hbs'))
  List.Crew = App.Views.CompositeView.extend(
    template: require('./tpl/_crew.hbs')
    itemView: List.CrewMember
    emptyView: List.Empty
    itemViewContainer: '.crew-body'
  )
  return
