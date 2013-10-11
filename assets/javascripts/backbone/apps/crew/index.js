require('./list');
require('./new');
require('./edit');

JabberApp.module('CrewApp', function(CrewApp, App, Backbone, Marionette, $, _) {
  CrewApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'crew':           'list'
    , 'crew/:id/edit':  'edit'
    }
  });

  var API = {
    list: function() {
      return new CrewApp.List.Controller();
    }

  , newCrew: function(region) {
      return new CrewApp.New.Controller({
        region: region
      });
    }

  , edit: function(id, member) {
      new CrewApp.Edit.Controller({
        id: id,
        crew: member
      });
    }
  };

  App.commands.setHandler('new:crew:member', function(region) {
    return API.newCrew(region);
  });

  App.vent.on('crew:member:clicked crew:created', function(member) {
    App.navigate(['crew/', member.id,'/edit'].join(''));
    API.edit(member.id, member);
  });

  App.vent.on('crew:cancelled crew:updated', function(member) {
    App.navigate('crew');
    API.list();
  });

  App.vent.on('crew:')

  App.addInitializer(function() {
    new CrewApp.Router({
      controller: API
    });
  });

});