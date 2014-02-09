require './view.coffee'
JabberApp.module 'SearchApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Controller = App.Controllers.Application.extend(
    initialize: (options) ->
      @layout = @getLayoutView()
      @listenTo @layout, 'show', ->
        @panelView()
        @moviesView()
        

      @show @layout
      

    panelView: ->
      panelView = @getPanelView()
      @listenTo panelView, 'search:submitted', (searchTerm) ->
        @moviesView searchTerm
        

      @show panelView,
        region: @layout.panelRegion

      

    
    # this.layout.panelRegion.show(panelView);
    moviesView: (searchTerm) ->
      if searchTerm
        @searchView searchTerm
      else
        @showHeroView()
      

    searchView: (searchTerm) ->
      movies = App.request('search:movie:entities', searchTerm)
      moviesView = @getMoviesView(movies)
      opts =
        region: @layout.moviesRegion
        loading: true

      opts.loading = loadingType: 'opacity'  if @layout.moviesRegion.currentView isnt @heroView
      @show moviesView, opts
      

    
    # this.layout.moviesRegion.show(moviesView);
    showHeroView: ->
      @heroView = @getHeroView()
      @show @heroView,
        region: @layout.moviesRegion

      

    
    # this.layout.moviesRegion.show(heroView);
    getHeroView: ->
      new List.Hero()

    getMoviesView: (movies) ->
      new List.Movies(collection: movies)

    getPanelView: ->
      new List.Panel()

    getLayoutView: ->
      new List.Layout()
  )
  
