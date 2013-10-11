require('./view');

JabberApp.module('EventsApp.List', function(List, App, Backbone, Marionette, $, _) {

  List.Controller = App.Controllers.Base.extend({
    initialize: function(options) {
      var events = App.request('event:entities')
        , listView = this.getListView(events);

      this.listenTo(listView, 'childview:edit:event:clicked', this.editEvent);
      this.show(listView);
    }

  , editEvent: function(view,  args) {
      var model = args.model;
      App.vent.trigger('edit:event:clicked', model);
    }

  , getListView: function(events) {
      return new List.Events({
        collection: events
      });
    }

  });
});