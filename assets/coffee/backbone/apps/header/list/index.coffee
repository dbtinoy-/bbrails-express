require './view.coffee'
JabberApp.module 'HeaderApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Controller = App.Controllers.Application.extend(
    initialize: (options) ->
      navs = options.navs
      listView = @getListView(navs)
      @show listView
      

    getListView: (navs) ->
      new List.Header(collection: navs)
  )
  
