JabberApp.module('FooterApp.Show', function(Show, App, Backbone, Marionette, $, _) {
  Show.Footer = App.Views.ItemView.extend({
    template: require('./tpl/footer.hbs')
  });
});