JabberApp.module 'FooterApp.Show', (Show, App, Backbone, Marionette, $, _) ->
  Show.Footer = App.Views.ItemView.extend(template: require('./tpl/footer.hbs'))
  return
