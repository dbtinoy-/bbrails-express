
JabberApp.module('EventsApp.Edit', function(Edit, App, Backbone, Marionette, $, _) {

  Edit.Event = App.Views.ItemView.extend({
    template: require('./tpl/event.hbs')

  , modelEvents: {
      'change:name': function() { console.log('name changed'); }
    }

  , dialog: {
      header_title: 'Edit event'

    , buttons: {
        cancel: false
      , primary: 'Salut'
      }
    }

  , onDialogOkClicked: function() {
      this.trigger('dialog:close');
    }

  , onDialogCancelClicked: function() {
      this.trigger('dialog:close');
    }
  });
});