JabberApp.module 'AdminLocationsApp.List', (List, App, Backbone, Marionette, $, _) ->
  require './view.coffee'
  List.Controller = App.Controllers.Application.extend(
    name: 'AdminLocationsApp.List'
    initialize: (options) ->
      locations = App.request('location:entities')
      @layout = @getLayoutView()
      @listenTo @layout, 'show', ->
        @panelRegion locations
        @locationsRegion locations
        return

      @show @layout,
        loading:
          entities: locations

      return

    panelRegion: (locations) ->
      panelView = @getPanelView()
      @listenTo panelView, 'new:location:clicked', ->
        App.vent.trigger 'new:location:clicked', locations
        return

      @show panelView,
        region: @layout.panelRegion

      return

    locationsRegion: (locations) ->
      listView = @getListView(locations)
      @listenTo listView, 'childview:destroy:location:clicked', (iv, args) ->
        model = args.model
        model.destroy()  if confirm('Are you sure you want to delete : ' + model.get('name'))
        return

      @show listView,
        region: @layout.locationsRegion

      return

    getPanelView: ->
      new List.Panel()

    getListView: (locations) ->
      new List.Locations(collection: locations)

    getLayoutView: ->
      new List.Layout()
  )
  return

JabberApp.module 'AdminLocationsApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Layout = App.Views.Layout.extend(
    template: require('./tpl/layout.hbs')
    regions:
      locationsRegion: '#locations-region'
      panelRegion: '#panel-region'
  )
  List.Panel = App.Views.ItemView.extend(
    template: require('./tpl/_panel.hbs')
    triggers:
      'click button': 'new:location:clicked'
  )
  List.Location = App.Views.ItemView.extend(
    template: require('./tpl/_location.hbs')
    tagName: 'tr'
    triggers:
      'click [data-js-destroy]': 'destroy:location:clicked'
  )
  List.Locations = App.Views.CompositeView.extend(
    template: require('./tpl/_locations.hbs')
    itemView: List.Location
    itemViewContainer: 'tbody'
  )
  return
