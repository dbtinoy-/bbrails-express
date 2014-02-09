JabberApp.module 'AdminLocationsApp.New', (New, App, Backbone, Marionette, $, _) ->
  require './new.coffee'
  New.Controller = App.Controllers.Application.extend(
    name: 'AdminLocationsApp.New'
    initialize: (options) ->
      locations = options.locations
      location = App.request('new:location:entity')
      newView = @getNewView(locations, location)
      @listenTo newView, 'show', ->

      @show newView
      return

    getNewView: (locations, location) ->
      new New.Location(
        collection: locations
        model: location
      )
  )
  return

JabberApp.module 'AdminLocationsApp.New', (New, App, Backbone, Marionette, $, _) ->
  New.Location = App.Views.Layout.extend(
    template: require('./tpl/new_location.hbs')
    dialog:
      header_title: 'New Location'

    templateHelpers: ->
      dangerLookups: @model.dangerLookups
  )
  return
