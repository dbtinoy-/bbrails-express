JabberApp.module('Utilities', function(Utilities, App, Backbone, Marionette, $, _) {

  _.extend(Backbone.Marionette.Renderer, {
    render: function(template, data) {
      if (template === false) return;
      if (template) return template(data);
      throw ['Template ', template, ' not found'].join('');
    }
  });
});