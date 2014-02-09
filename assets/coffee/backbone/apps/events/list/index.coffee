require './view.coffee'
JabberApp.module 'EventsApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Controller = App.Controllers.Application.extend(
    initialize: (options) ->
      events = App.request('event:entities')
      listView = @getListView(events)
      @listenTo listView, 'childview:edit:event:clicked', @editEvent
      @show listView
      

    editEvent: (view, args) ->
      model = args.model
      App.vent.trigger 'edit:event:clicked', model
      

    getListView: (events) ->
      new List.Events(collection: events)
  )
  
