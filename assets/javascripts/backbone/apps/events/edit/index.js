require('./view');

JabberApp.module('EventsApp.Edit', function(Edit, App, Backbone, Marionette, $, _) {

  Edit.Controller = App.Controllers.Application.extend({
    initialize: function (options) {
      var event = options.event
        , editView = this.getEditView(event);

      global.editView = editView;

      editView.on('dialog:ok:clicked', function() {
        console.log('dialog:ok:clicked handled by Controller');
      });
      this.show(editView);
    }

  , getEditView: function(event) {
      return new Edit.Event({
          model: event
        });
    }
  });

});