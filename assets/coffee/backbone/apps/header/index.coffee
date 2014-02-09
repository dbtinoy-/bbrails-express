JabberApp.module 'HeaderApp', (HeaderApp, App, Backbone, Marionette, $, _) ->
  require './list/index.coffee'
  @startWithParent = false
  API = list: (navs) ->
    new HeaderApp.List.Controller(
      region: App.headerRegion
      navs: navs
    )

  @on 'start', (navs) ->
    API.list navs
    

  
