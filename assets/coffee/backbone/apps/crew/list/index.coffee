require './view.coffee'
JabberApp.module 'CrewApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Controller = App.Controllers.Application.extend(
    initialize: ->
      crew = App.request('crew:entities')
      @layout = @getLayoutView(crew)
      @listenTo @layout, 'show', ->
        @titleRegion()
        @panelRegion()
        @crewRegion crew
        

      @show @layout,
        loading: true

      

    getLayoutView: (crew) ->
      new List.Layout(collection: crew)

    titleRegion: ->
      titleView = @getTitleView()
      @layout.titleRegion.show titleView
      

    panelRegion: ->
      panelView = @getPanelView()
      panelRegion = @layout.panelRegion
      @listenTo panelView, 'new:crew:button:clicked', @newRegion
      panelRegion.show panelView
      

    newRegion: ->
      App.execute 'new:crew:member', @layout.newRegion
      

    crewRegion: (crew) ->
      crewView = @getCrewView(crew)
      @listenTo crewView, 'childview:crew:member:clicked', (view, args) ->
        App.vent.trigger 'crew:member:clicked', args.model
        

      @listenTo crewView, 'childview:crew:delete:clicked', (child, args) ->
        model = args.model
        if confirm([
          'Are you sure you want to delete '
          model.get('name')
          '?'
        ].join(''))
          model.destroy()
        else
          false
        

      @layout.crewRegion.show crewView
      

    getTitleView: ->
      new List.Title()

    getPanelView: ->
      new List.Panel()

    getNewView: ->
      new List.New()

    getCrewView: (crew) ->
      new List.Crew(collection: crew)
  )
  
