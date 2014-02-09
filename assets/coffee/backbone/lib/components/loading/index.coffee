loadingControllerDef = (Loading, App, Backbone, Marionette, $, _) ->
  Loading.Controller = App.Controllers.Application.extend(
    name: "LoadingController"
    initialize: (options) ->
      view = options.view
      config = options.config
      loadingView = undefined
      
      # defaults does not work with boolean
      config = {}  if _.isBoolean(config)
      _.defaults config,
        loadingType: "spinner"
        entities: @getEntities(view)
        debug: false

      switch config.loadingType
        when "opacity"
          @region.currentView.$el.css "opacity", 0.5
        when "spinner"
          loadingView = @getLoadingView()
          @show loadingView
      @showRealView view, loadingView, config
      return

    showRealView: (realView, loadingView, config) ->
      self = this
      App.execute "when:fetched", config.entities, ->
        
        # ... after then entities are fetched, execute callback
        # ============================================================================
        # If the region we are trying to insert is not the loadingView then
        # we know the user has naviaged to a different page while the loading
        # view was still open. In that case, we know to manually close the original
        # view so its controller is also closed. We also prevent showing the real
        # view (which would snam the user back to the old view unexpectedly)
        # ============================================================================
        switch config.loadingType
          when "opacity"
            self.region.currentView.$el.removeAttr "style"
          when "spinner"
            if self.region.currentView isnt loadingView
              realView.close()
              return
        self.show realView  unless config.debug
        return

      return

    getEntities: (view) ->
      
      # return the entities manually set during configuration, or just pull
      # off the model and collection from the view (if they exist)
      _.chain(view).pick("model", "collection").toArray().compact().value()

    getLoadingView: ->
      new Loading.LoadingView()
  )
  App.commands.setHandler "show:loading", (view, options) ->
    new Loading.Controller(
      view: view
      region: options.region
      config: options.loading
    )

  return
load = (App) ->
  view = require("./view.coffee")
  view App  unless JabberApp
  App.module "Components.Loading", loadingControllerDef
  return
load JabberApp  if JabberApp
module.exports = load