/* global describe, it, chai, before, after, sinon*/

var expect = chai.expect;
var  App = JabberApp;


describe.only('app entities', function() {
  before(function() {
    // this.server = sinon.fakeServer.create();
  });


  it('should be defined', function() {
    var resp_json = [
          {"_id": "1","age": 26, "avatar": "fry.jpg","name": "Philip J. Fry","origin": "Earth", "quote": "bla blabla", "species": "Human", "title": "Executive Delivery Boy"},
          {"__v": 0,"_id": "2","age": 37, "avatar": "leela.jpg", "name": "Turanga Leela","origin": "Earth", "quote": "", "species": "Mutant","title": "Captain"}
      ];
    // var callback = sinon.spy();
    // this.server.respondWith('GET', 'crew/1', [200, {'Content-Type': 'application/json'}, JSON.stringify(resp_json[0])]);
    var crew = new App.Entities.Crew({ _id: 1 });
    assert(crew._fetch === undefined);
    crew.fetch();
    assert(crew._fetch)
    // this.server.respond();


    // console.log(callback.callCount);
  });

  after(function() {
    // this.server.restore();
  });

});