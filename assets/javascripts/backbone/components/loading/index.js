
function loadingControllerDef(Loading, App, Backbone, Marionette, $, _) {
  Loading.Controller = App.Controllers.Base.extend({
    name: 'LoadingController'

  , initialize: function(options) {
      var view = options.view
        , config = options.config
        , loadingView;

      // defaults does not work with boolean
      if (_.isBoolean(config)) config = {};

      _.defaults(config, {
          loadingType: 'spinner'
        , entities: this.getEntities(view)
        , debug: false
        });

      switch (config.loadingType) {
      case 'opacity':
        this.region.currentView.$el.css('opacity', 0.5);
        break;
      case 'spinner':
        loadingView = this.getLoadingView();
        this.show(loadingView);
        break;
      }

      this.showRealView(view, loadingView, config);
    }

  , showRealView: function(realView, loadingView, config) {
      var self = this;

      App.execute('when:fetched', config.entities, function() {
        // ... after then entities are fetched, execute callback
        // ============================================================================
        // If the region we are trying to insert is not the loadingView then
        // we know the user has naviaged to a different page while the loading
        // view was still open. In that case, we know to manually close the original
        // view so its controller is also closed. We also prevent showing the real
        // view (which would snam the user back to the old view unexpectedly)
        // ============================================================================

        switch(config.loadingType) {
        case 'opacity':
          self.region.currentView.$el.removeAttr('style');
          break;

        case 'spinner':
          if (self.region.currentView !== loadingView) {
            realView.close();
            return;
          }
          break;
        }

        if (!config.debug) self.show(realView);
      });
    }


  , getEntities: function(view) {
      // return the entities manually set during configuration, or just pull
      // off the model and collection from the view (if they exist)
      return _.chain(view).pick('model', 'collection').toArray().compact().value();
    }

  , getLoadingView: function() {
      return new Loading.LoadingView();
    }
  });

  App.commands.setHandler('show:loading', function(view, options) {
    return new Loading.Controller({
      view: view
    , region: options.region
    , config: options.loading
    });
  });
}

function load(App) {
  var view = require('./view');
  if (!JabberApp) view(App);

  App.module('Components.Loading', loadingControllerDef);
}

if (JabberApp) { load(JabberApp); }

module.exports = load;