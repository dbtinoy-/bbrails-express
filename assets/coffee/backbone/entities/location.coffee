JabberApp.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->
  Location = Entities.Model.extend(
    urlRoot: 'admin/locations'
    dangerLookups:
      low: 'success'
      medium: 'warning'
      high: 'danger'

    mutators:
      dangerClass: ->
        return  unless @get('danger')
        @dangerLookups[@get('danger')]

      dangerFormatted: ->
        d = @get('danger')
        return  unless d
        _.capitalize d
  )
  LocationCollection = Entities.Collection.extend(
    model: Location
    url: 'admin/locations'
    comparator: (m) ->
      m.get('name').toLowerCase()
  )
  API =
    getNewLocation: ->
      new Location()

    getLocations: ->
      location = new LocationCollection()
      location.fetch reset: true
      location

  App.reqres.setHandler 'location:entities', ->
    API.getLocations()

  App.reqres.setHandler 'new:location:entity', ->
    API.getNewLocation()

  return
