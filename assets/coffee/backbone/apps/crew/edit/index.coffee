require './view.coffee'
JabberApp.module 'CrewApp.Edit', (Edit, App, Backbone, Marionette, $, _) ->
  Edit.Controller = App.Controllers.Application.extend(
    initialize: (options) ->
      id = options.id
      crew = options.crew
      crew = App.request('crew:entity', id) unless crew
      @listenTo crew, 'updated', ->
        App.vent.trigger 'crew:updated', crew
        

      @layout = @getLayoutView(crew)
      @listenTo @layout, 'show', ->
        @showRegions crew
        

      @show @layout,
        loading: true

      

    showRegions: (crew) ->
      @formRegion crew
      @titleRegion crew
      

    titleRegion: (crew) ->
      titleView = @getTitleView(crew)
      @layout.titleRegion.show titleView
      

    formRegion: (crew) ->
      editView = @getEditView(crew)
      formView = App.request('form:wrapper', editView)
      @listenTo editView, 'form:cancel', ->
        App.vent.trigger 'crew:cancelled', crew
        

      @layout.formRegion.show formView
      

    getTitleView: (crew) ->
      new Edit.Title(model: crew)

    getEditView: (crew) ->
      new Edit.Crew(model: crew)

    getLayoutView: (crew) ->
      new Edit.Layout(model: crew)
  )
  
