function collection (Entities, App, Backbone, Marionette, $, _) {
  Entities.Collection = Backbone.Collection.extend();
}

function load(App) {
  App.module('Entities', collection);
}

if (JabberApp) {
  load(JabberApp);
}

module.exports = load;