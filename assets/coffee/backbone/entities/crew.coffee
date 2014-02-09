JabberApp.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->
  Entities.Crew = Entities.Model.extend(urlRoot: 'crew')
  Entities.CrewCollection = Entities.Collection.extend(
    model: Entities.Crew
    url: 'crew'
  )
  API =
    getCrew: ->
      crew = new Entities.CrewCollection()
      crew.fetch reset: true
      crew

    getCrewMember: (id) ->
      member = new Entities.Crew(_id: id)
      member.fetch()
      member

    getNewCrewMember: ->
      new Entities.Crew()

  App.reqres.setHandler 'crew:entities', ->
    API.getCrew()

  App.reqres.setHandler 'crew:entity', (id) ->
    API.getCrewMember id

  App.reqres.setHandler 'new:crew:entity', ->
    API.getNewCrewMember()

  return
