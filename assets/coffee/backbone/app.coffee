require '../config/index.coffee'
App = window.JabberApp = new Backbone.Marionette.Application()
App.addRegions
  headerRegion: '#header-region'
  mainRegion: '#main-region'
  footerRegion: '#footer-region'


# , dialogRegion: Backbone.Marionette.Region.Dialog.extend({el: '#dialog-region', dialogWrapper: function(view) {
#     return App.request('dialog:wrapper', view);
#   }})
App.rootRoute = 'crew'
App.on 'initialize:before', (options) ->
  throw new Error('environment must be set')  unless options.environment
  App.environment = options.environment
  App.navs = App.request('nav:entities')
  return

App.addInitializer ->
  @module('HeaderApp').start App.navs
  @module('FooterApp').start()
  return

App.vent.on 'nav:choose', (nav) ->
  App.navs.chooseByName nav
  return

App.reqres.setHandler 'default:region', ->
  App.mainRegion

App.on 'initialize:after', ->
  # create our specialized dialog region
  # in initialize:after ensure App.Regions.Dialog is correctly initialized and present
  @addRegions dialogRegion:
    selector: '#dialog-region'
    regionType: App.Regions.Dialog

  @startHistory()
  unless @getCurrentRoute()
    @navigate @rootRoute,
      trigger: true

App

require './lib/index.coffee'
require './entities/index.coffee'
require './apps/index.coffee'