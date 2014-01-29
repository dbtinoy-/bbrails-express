function fetch(Utilities, App, Backbone, Marionette, $, _) {

  App.commands.setHandler('when:fetched', function(entities, callback) {
    var xhrs = _.chain([entities]).flatten().pluck('_fetch').value();
    $.when.apply($, xhrs).done(callback);
  });

}

function load(App) {
  App.module('Utilities', fetch);
}

if (JabberApp) {
  load(JabberApp);
}

module.exports = load;