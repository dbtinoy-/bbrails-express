function fetch(Entities, App, Backbone, Marionette, $, _) {

  App.commands.setHandler('when:fetched', function(entities, callback) {
    var xhrs = _.chain([entities]).flatten().pluck('_fetch').value();
    $.when.apply($, xhrs).done(callback);
  });

}

function load(App) {
  App.module('Entities', fetch);
}

if (JabberApp) {
  load(JabberApp);
}

module.exports = load;