JabberApp.module 'AdminRecipientsApp.List', (List, App, Backbone, Marionette, $, _) ->
  require './view.coffee'
  List.Controller = App.Controllers.Application.extend(
    name: 'AdminRecipientsApp.List'
    initialize: (options) ->
      @layout = @getLayoutView()
      @listenTo @layout, 'show', ->

      @show @layout,
        loading: true

      return

    getLayoutView: ->
      new List.Layout()
  )
  return

JabberApp.module 'AdminRecipientsApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Layout = App.Views.Layout.extend(
    template: require('./tpl/layout.hbs')
    regions:
      titleRegion: '#title-region'
      panelRegion: '#panel-region'
      listRegion: '#list-region'
  )
  return
