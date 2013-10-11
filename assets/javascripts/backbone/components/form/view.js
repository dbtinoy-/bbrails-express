/*

 */
function formWrapperDef(Form, App, Backbone, Marionette, $, _) {

  Form.FormWrapper = Marionette.Layout.extend({
    template: require('./tpl/form_wrapper.hbs')
  , tagName: 'form'
  , className: 'form-horizontal'
  , attributes: function() {
      return {
        'data-type':  this.getFormDataType()
      , role:         'form'
      };
    }

  , regions: {
      formContentRegion: '#form-content-region'
    }

  , ui: {
      buttonContainer: 'ul.list-inline'
    }

  , triggers: {
      'submit':                             'form:submit'
    , 'click [data-form-button="cancel"]':  'form:cancel'
    }

  , modelEvents: {
      'change:_errors':   'changeErrors'
    , 'sync:start':       'syncStart'
    , 'sync:stop':        'syncStop'
    }

  , initialize: function() {
      this.setInstancePropertiesFor('config', 'buttons');
    }

  , serializeData: function() {
      var buttons = this.buttons ? this.buttons.toJSON() : false;
      return {
          footer: this.config.footer
        , buttons: buttons
        };
    }

  , onShow: function() {
      _.defer(_.bind(this.showDefered, this));
    }

  , showDefered: function() {
      if (this.config.focusFirstInput) this.focusFirstInput();
      this.buttonPlacement();
    }

  , focusFirstInput: function() {
      this.$(':input:enabled:visible:first').focus();
    }

  , buttonPlacement: function() {
      if (this.buttons) this.ui.buttonContainer.addClass(this.buttons.placement);
    }

  , getFormDataType: function() {
      if (this.model.isNew()) {
        return 'new';
      } else {
        return 'edit';
      }
    }

  , changeErrors: function(model, errors, options) {
      if (this.config.errors) {
        if (_.isEmpty(errors)) {
          this.removeErrors();
        } else {
          this.addErrors(errors);
        }
      }
    }

  , removeErrors: function() {
      this.$('.has-error').removeClass('has-error').find('small.help-block').remove();
    }

  , addErrors: function(errors) {
      var self = this;
      errors = errors || {};
      _.each(errors, function(array, name) {
        self.addError(name, array[0]);
      });
    }

  , addError: function(name, error) {
      var el = this.$('[name="'+name+'"]')
        , sm = $('<small class="help-block">'+error+'</small>');
      el.after(sm).closest('.form-group').addClass('has-error');
    }

  , syncStart: function(model) {
      if (this.config.syncing) {
        this.toggleWrapper({className: 'opacity'});
      }
    }

  , syncStop: function(model) {
      if (this.wrapperVisibled()) {
        this.toggleWrapper(false);
      }
    }

  , onClose: function() {
      if (this.wrapperVisibled()) {
        this.toggleWrapper(false);
      }
    }
  });
}



function load(App) {
  App.module('Components.Form', formWrapperDef);
}

if (JabberApp) { load(JabberApp); }

module.exports = load;