/*

 */
function formControllerDef(Form, App, Backbone, Marionette, $, _) {

  Form.Controller = App.Controllers.Application.extend({
    initialize: function(options) {
      options = options || {};

      this.contentView = options.view;

      this.formLayout = this.getFormLayout(options.config);

      this.listenTo(this.formLayout, 'show', this.formContentRegion);
      this.listenTo(this.formLayout, 'form:submit', this.formSubmit);
      this.listenTo(this.formLayout, 'form:cancel', this.formCancel);
    }

  , formCancel: function() {
      this.contentView.triggerMethod('form:cancel');
    }

  , formSubmit: function() {
      var data = Backbone.Syphon.serialize(this.formLayout)
        , model = this.contentView.model
        , collection = this.contentView.collection;

      if (this.contentView.triggerMethod('form:submit', data) !== false) {
        this.processFormData(data, model, collection);
      }
    }

  , processFormData: function(data, model, collection) {
      model.save(data, {collection: collection});
    }

  , onClose: function() {
      console.log ('onClose', this);
    }

  , formContentRegion: function() {
      this.region = this.formLayout.formContentRegion;
      this.show(this.contentView);
    }

  , getFormLayout: function(options) {
      var config = this.getDefaultConfig(_.result(this.contentView, 'form'))
        , buttons;

      _.extend(config, options || {});

      buttons = this.getButtons(config.buttons);

      return new Form.FormWrapper({
          config: config
        , model: this.contentView.model
        , buttons: buttons
        });
    }

  , getDefaultConfig: function(config) {
      return _.defaults(config || {}, {
          footer: true
        , focusFirstInput: true
        , errors: true
        , syncing: true
        });
    }

  , getButtons: function(buttons) {
      if (buttons !== false) return App.request('form:button:entities', buttons, this.contentView.model);
    }

  });

  App.reqres.setHandler('form:wrapper', function(contentView, options) {
    options = options || {};
    if (!contentView.model) { throw new Error('No model found inside of form\'s contentView'); }

    var formController = new Form.Controller({
        view:   contentView
      , config: options
      });

    return formController.formLayout;
  });
}

function load(App) {
  var view = require('./view');
  if (!JabberApp) view(App);

  App.module('Components.Form', formControllerDef);
}

if (JabberApp) { load(JabberApp); }

module.exports = load;