require './view.coffee'
JabberApp.module 'DashboardUpcomingApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Controller = App.Controllers.Application.extend(
    initialize: ->
      upcomings = App.request('upcoming:movie:entities')
      upcompingView = @getUpcomingView(upcomings)
      @show upcompingView,
        loading: true

      

    getUpcomingView: (upcomings) ->
      new List.Upcomings(collection: upcomings)
  )
  
