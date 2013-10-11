JabberApp.module('EventsApp.List', function(List, App, Backbone, Marionette, $, _) {

  List.Event = App.Views.ItemView.extend({
    template: require('./tpl/_event.hbs')
  , tagName: 'tr'
  , triggers: {
      'click button': 'edit:event:clicked'
    }
  });

  List.Events = App.Views.CompositeView.extend({
    template: require('./tpl/events.hbs')
  , className: 'container'
  , itemView: List.Event
  , itemViewContainer: 'tbody'
  });
});