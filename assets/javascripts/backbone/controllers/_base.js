
function controller(Controllers, App, Backbone, Marionette, $, _) {

  Controllers.Base = Marionette.Controller.extend({
    constructor: function(options) {
      options = options || {};

      this.region = options.region || App.request('default:region');

      this._instance_id = _.uniqueId('controller');
      App.execute('register:instance', this, this._instance_id);
      return Marionette.Controller.prototype.constructor.call(this, options);
    }

  , close: function() {
      // delete this.region;
      // delete this.options;
      App.execute('unregister:instance', this, this._instance_id);
      return Marionette.Controller.prototype.close.apply(this, arguments);
    }

  , onClose: function() {
      console.info('controller closing', this);
    }

  , show: function(view, options) {
      options = options || {};
      _.defaults(options, {
        loading: false
      , region: this.region
      });

      this._setMainView(view);

      this._manageView(view, options);
    }

  , _setMainView: function(view) {
      // the first view we show is always going to become the mainView of our
      // controller (whether its a layout or another view type). So if this
      // *is* a layout, when we show other regions inside of that layout, we
      // check for the existance of mainView first, so our controller is only
      // closed down when the original mainView is closed

      if (this._mainView) return;
      this._mainView = view;
      this.listenTo(view, 'close', this.close);
    }


  , _manageView: function(view, options) {
      if (options.loading) {
        // show the loading view
        App.execute('show:loading', view, options);
      } else {
        options.region.show(view);
      }
    }
  });

}


function load(App) {
  App.module('Controllers', controller);
}

if (JabberApp) {
  load(JabberApp);
}

module.exports = load;