function model (Entities, App, Backbone, Marionette, $, _) {
  Entities.Model = Backbone.Model.extend({
    idAttribute: '_id'

  , destroy: function(options) {
      options = options || {};

      options = _.defaults(options, {
        wait: true
      });

      this.set('_destroy', true);
      Backbone.Model.prototype.destroy.call(this, options);
    }


  , isDestroyed: function() {
      return this.get('_destroy');
    }

  , save: function(data, options) {
      var isNew = this.isNew();

      options = options || {};

      options = _.defaults(options, {
        wait: true
      , success: _.bind(this.saveSuccess, this, isNew, options.collection)
      , error: _.bind(this.saveError, this)
      });
      this.unset('_errors');

      Backbone.Model.prototype.save.call(this, data, options);
    }

  , saveSuccess: function(isNew, collection) {

      if (isNew) {
        if (collection) {
          collection.add(this);
          collection.trigger('model:created', this);
        }
        this.trigger('created', this);

      } else {
        collection = collection || this.collection;
        if (collection) collection.trigger('model:updated', this);
        this.trigger('updated', this);
      }
    }

  , saveError: function(model, xhr, options) {
      var error_text;

      if (xhr.status != '500' && xhr.status != '404') {
        error_text = $.parseJSON(xhr.responseText);
        this.set('_errors', error_text ? error_text.errors: null);
      }
    }
  });
}


function load(App) {
  App.module('Entities', model);
}

if (JabberApp) {
  load(JabberApp);
}

module.exports = load;