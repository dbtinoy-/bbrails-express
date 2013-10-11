/*

 */
function dialogControllerDef(Dialog, App, Backbone, Marionette, $, _) {

  Dialog.Controller = App.Controllers.Base.extend({
    initialize: function(options) {
      options = options || {};

      this.contentView = options.view;

      this.dialogLayout = this.getDialogLayout(options.config);
      this.listenTo(this.dialogLayout, 'show', this.dialogContentRegion);
      this.listenTo(this.dialogLayout, 'dialog:cancel:clicked', this.dialogCancel);
      this.listenTo(this.dialogLayout, 'dialog:ok:clicked', this.dialogOk);

      this.listenTo(this.contentView, 'dialog:close', this.dialogClose);
      this.listenTo(this.contentView, 'dialog:title', this.dialogTitleize);
    }

  , dialogCancel: function() {
      this.contentView.triggerMethod('dialog:cancel:clicked');
    }

  , dialogOk: function() {
      this.contentView.triggerMethod('dialog:ok:clicked');
    }

  , dialogTitleize: function(title) {
      this.dialogLayout.titleize(title);
    }

  , dialogClose: function() {
      this.dialogLayout.trigger('dialog:close');
    }

  , onClose: function() {
      console.log ('onClose', this);
    }

  , dialogContentRegion: function() {
      this.region = this.dialogLayout.dialogContentRegion;
      this.show(this.contentView);
    }

  , getDialogLayout: function(options) {
      var config = this.getDefaultConfig(_.result(this.contentView, 'dialog'))
        , buttons;

      _.extend(config, options || {});

      buttons = this.getButtons(config.buttons);

      return new Dialog.DialogWrapper({
          config: config
        , buttons: buttons
        });
    }

  , getDefaultConfig: function(config) {
      return _.defaults(config || {}, {
          footer: true
        , header: true
        , header_title: 'Default dialog title'
        , header_cross: true
        });
    }

  , getButtons: function(buttons) {
      if (buttons !== false) return App.request('form:button:entities', buttons, this.contentView.model);
    }

  });

  App.reqres.setHandler('dialog:wrapper', function(contentView, options) {
    options = options || {};

    var dialogController = new Dialog.Controller({
        view:   contentView
      , config: options
      });

    return dialogController.dialogLayout;
  });
}

function load(App) {
  var view = require('./view');
  if (!JabberApp) view(App);

  App.module('Components.Dialog', dialogControllerDef);
}

if (JabberApp) { load(JabberApp); }

module.exports = load;