var Handlebars = require('handleify');

Handlebars.registerHelper('log', function(context, options) {
  console.log('hbs log', context, options, this);
  return 'log';
});


JabberApp.module('Views', function (Views, App, Backbone, Marionette, $, _) {
  var _remove = Marionette.View.prototype.remove
    , slice = Array.prototype.slice;

  require('swag');

  Swag.registerHelpers(Handlebars);

  function argsToArray(args) {
    return args.length > 0 ? slice.call(args, 0): [];
  }

  _.extend(Marionette.View.prototype, {
      remove: function() {
        console.log('removing view', this);

        var destroy = this.model && this.model.isDestroyed && this.model.isDestroyed()
          , wrapper
            //_remove function binded to this
          , binded_remove = _remove.bind(this)
          , args = argsToArray(arguments);

        if (destroy) {
          wrapper = this.$el.toggleWrapper({
            className: 'opacity'
          , backgroundColor: 'red'
          });

          //fade out & remove wrapper
          wrapper.fadeOut(400, function() {
            $(this).remove();
          });

          //fadeout view el & remove view
          this.$el.fadeOut(400, function() {
            binded_remove(args);
          });

        } else {
          binded_remove(args);
        }
      }

    , toggleWrapper: function(init) {
        init = init == null ? true : init;
        this._wrapperVisibled = !!init;
        this.$el.toggleWrapper({className: 'opacity'}, init);
      }

    , wrapperVisibled: function() {
        return this._wrapperVisibled;
      }


    , setInstancePropertiesFor: function() {
        var self = this;

        _.each(_.pick(this.options, argsToArray(arguments)), function(prop, key) {
          self[key] = prop;
        });

      }
  });
});
