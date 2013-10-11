JabberApp.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {


  Entities.Crew = Entities.Model.extend({
    urlRoot: 'crew'
  });

  Entities.CrewCollection = Entities.Collection.extend({
    model: Entities.Crew
  , url: 'crew'
  });

  var API = {
    getCrew: function() {
      var crew = new Entities.CrewCollection();
      crew.fetch({reset: true});
      return crew;
    }

  , getCrewMember: function(id) {
      var member = new Entities.Crew({ _id: id });
      member.fetch();
      return member;
    }

  , getNewCrewMember: function() {
      return new Entities.Crew();
    }
  };

  App.reqres.setHandler('crew:entities', function() {
    return API.getCrew();
  });

  App.reqres.setHandler('crew:entity', function(id) {
    return API.getCrewMember(id);
  });

  App.reqres.setHandler('new:crew:entity', function() {
    return API.getNewCrewMember();
  });

});