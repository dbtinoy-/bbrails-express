_.extend(Backbone.Marionette.Application.prototype, {
  navigate: function(route, options) {
    Backbone.history.navigate(route, options || {});
  }

, getCurrentRoute: function() {
    var frag = Backbone.history.fragment;
    if (_.isEmpty(frag)) {
      return null;
    } else {
      return frag;
    }
  }

, startHistory: function() {
    if (Backbone.history) {
      Backbone.history.start();
    }
  }

, register: function(instance, id) {
    if (!this._registry) this._registry = {};
    this._registry[id] = instance;
  }

, unregister: function(instance, id) {
    delete this._registry[id];
  }

, resetRegistry: function() {
    var old_count = this.getRegistrySize();
    _.each(this._registry, function(controller, key) {
      if (controller.region) controller.region.close();
    });

    var msg = ['There were ', old_count, ' controllers in the registry, there are now ', this.getRegistrySize()].join('');
    if (this.getRegistrySize() > 0) {
      console.warn(msg, this._registry);
    } else {
      console.log(msg);
    }
  }

, getRegistrySize: function() {
    return _.size(this._registry);
  }
});