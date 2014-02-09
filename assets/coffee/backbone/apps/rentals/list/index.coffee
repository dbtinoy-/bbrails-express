require './view.coffee'
JabberApp.module 'RentalsApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Controller = App.Controllers.Application.extend(
    initialize: ->
      rentals = App.request('movie:rental:entities')
      App.execute 'when:fetched', rentals, ->
        rentals.reset rentals.sortBy('runtime')
        

      @layout = @getLayoutView()
      @listenTo @layout, 'show', ->
        @resultsView rentals
        @rentalsView rentals
        @paginationView rentals
        

      @show @layout,
        loading:
          entities: rentals

      

    resultsView: (rentals) ->
      resultsView = @getResultsView(rentals)
      @layout.resultsRegion.show resultsView
      

    rentalsView: (rentals) ->
      rentalsView = @getRentalsView(rentals)
      @layout.rentalsRegion.show rentalsView
      

    paginationView: (rentals) ->
      paginationView = @getPaginationView(rentals)
      @layout.paginationRegion.show paginationView
      

    getResultsView: (rentals) ->
      new List.Results(collection: rentals)

    getRentalsView: (rentals) ->
      new List.Rentals(collection: rentals)

    getPaginationView: (rentals) ->
      new List.Pagination(collection: rentals)

    getLayoutView: ->
      new List.Layout()

    layoutShow: ->
  )
  
