JabberApp.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {

  Entities.Event = App.Entities.Model.extend({
  });

  Entities.EventCollection = App.Entities.Collection.extend({
    model: Entities.Event
  });

  var API = {
    getEvents: function() {
      return new Entities.EventCollection([
          { _id: 1, date: '20/09/2013', name: 'Birthday',     description: 'Age is high price to pay for maturity.'}
        , { _id: 2, date: '22/09/2013', name: 'Screencasts',  description: 'Release new screencasts, and update the site.'}
        , { _id: 3, date: '26/09/2013', name: 'Blog',         description: 'Finish writing epic blog post.'}
        ]);
    }
  };

  App.reqres.setHandler('event:entities', function() {
    return API.getEvents();
  });

});