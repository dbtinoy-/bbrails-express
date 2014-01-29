/*

 */
function dialogWrapperDef(Dialog, App, Backbone, Marionette, $, _) {

  Dialog.DialogWrapper = Marionette.Layout.extend({
    template: require('./tpl/dialog_wrapper.hbs')
  , className: 'modal-dialog'

  , regions: {
      dialogContentRegion: '#dialog-content-region'
    }

  , ui: {
      headerContainer: 'div.modal-header'
    , buttonContainer: 'div.modal-footer'
    }

  , triggers: {
      'click [data-form-button="primary"]':   'dialog:ok:clicked'
    , 'click [data-form-button="cancel"]':    'dialog:cancel:clicked'
    }


  , initialize: function() {
      this.setInstancePropertiesFor('config', 'buttons');
    }

  , serializeData: function() {
      var buttons = this.buttons ? this.buttons.toJSON() : false;

      if (buttons) {
        this.buttons.reset();
        delete this.buttons;
      }

      return {
          config: this.config
        , buttons: buttons
        };
    }

  , onShow: function() {
      _.defer(_.bind(this.showDefered, this));
    }

  , showDefered: function() {
      if (this.config.focusFirstInput) this.focusFirstInput();
    }

  , titleize: function(title) {
      this.ui.headerContainer.find('.modal-title').text(title);
    }

  });
}



function load(App) {
  App.module('Components.Dialog', dialogWrapperDef);
}

if (JabberApp) { load(JabberApp); }

module.exports = load;