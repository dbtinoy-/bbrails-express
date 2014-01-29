
JabberApp.module('AdminRecipientsApp.List', function(List, App, Backbone, Marionette, $, _) {
  require('./list.view.js');

  List.Controller = App.Controllers.Application.extend({
    name: 'AdminRecipientsApp.List'

  , initialize: function(options) {

      this.layout = this.getLayoutView();

      this.listenTo(this.layout, 'show', function() {
      });

      this.show(this.layout, { loading: true });
    }


  , getLayoutView: function() {
      return new List.Layout();
    }

  });

});