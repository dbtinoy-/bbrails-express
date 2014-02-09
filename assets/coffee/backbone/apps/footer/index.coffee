require './show/index.coffee'
JabberApp.module 'FooterApp', (FooterApp, App, Backbone, Marionette, $, _) ->
  @startWithParent = false
  API = show: ->
    new FooterApp.Show.Controller(region: App.footerRegion)

  @on 'start', ->
    API.show()
    

  
