JabberApp.module 'DeliveriesApp.List', (List, App, Backbone, Marionette, $, _) ->
  require './view.coffee'
  List.Controller = App.Controllers.Application.extend(
    name: 'DeliveriesApp.List'
    initialize: (options) ->
      @layout = @getLayoutView()
      @listenTo @layout, 'show', ->
        @titleRegion()
        @panelRegion()
        @listRegion()
        return

      @show @layout,
        loading: true

      return

    getLayoutView: ->
      new List.Layout()

    titleRegion: ->
      titleView = @getTitleView()
      @show titleView,
        region: @layout.titleRegion

      return

    panelRegion: ->
      panelView = @getPanelView()
      @show panelView,
        region: @layout.panelRegion

      return

    listRegion: ->
      listView = @getListView()
      @show listView,
        region: @layout.listRegion

      return

    getTitleView: ->
      new List.Title()

    getPanelView: ->
      new List.Panel()

    getListView: ->
      new List.Deliveriess()
  )
  return

JabberApp.module 'DeliveriesApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Layout = App.Views.Layout.extend(
    template: require('./tpl/layout.hbs')
    regions:
      titleRegion: '#title-region'
      panelRegion: '#panel-region'
      listRegion: '#list-region'
  )
  List.Title = App.Views.ItemView.extend(template: require('./tpl/_title.hbs'))
  List.Panel = App.Views.ItemView.extend(template: require('./tpl/_panel.hbs'))
  List.Deliveries = App.Views.ItemView.extend(
    template: require('./tpl/_deliveries.hbs')
    tagName: 'ol'
  )
  List.Deliveriess = App.Views.CompositeView.extend(
    template: require('./tpl/_deliveriess.hbs')
    itemView: List.Deliveries
    itemViewContainer: '.lbody'
    className: 'jab-list'
  )
  return
