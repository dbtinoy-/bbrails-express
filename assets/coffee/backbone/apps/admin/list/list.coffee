JabberApp.module 'AdminApp.List', (List, App, Backbone, Marionette, $, _) ->
  require './view.coffee'
  List.Controller = App.Controllers.Application.extend(
    name: 'AdminApp.List'
    initialize: (options) ->
      adminNavs = App.request('admin:nav:entities')
      @listenTo adminNavs, 'collection:chose:one', (chosen) ->
        App.vent.trigger 'admin:nav:chose', chosen.get('name'), @layout.articleRegion
        return

      @layout = @getLayoutView()
      @listenTo @layout, 'show', ->
        @bannerRegion()
        @listRegion adminNavs, options.nav
        return

      @show @layout
      return

    bannerRegion: ->
      bannerView = @getBannerView()
      @show bannerView,
        region: @layout.bannerRegion

      return

    listRegion: (adminNavs, nav) ->
      adminNavs.chooseByName nav
      listView = @getListView(adminNavs)
      @show listView,
        region: @layout.adminNavsRegion

      return

    getListView: (adminNavs) ->
      new List.Navs(collection: adminNavs)

    getBannerView: ->
      new List.Banner()

    getLayoutView: ->
      new List.Layout()
  )
  return

JabberApp.module 'AdminApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Layout = App.Views.Layout.extend(
    template: require('./tpl/layout.hbs')
    regions:
      bannerRegion: '#banner-region'
      articleRegion: '#article-region'
      adminNavsRegion: '#admin-navs-region'
  )
  List.Banner = App.Views.ItemView.extend(template: require('./tpl/_banner.hbs'))
  List.Nav = App.Views.ItemView.extend(
    template: require('./tpl/_nav.hbs')
    tagName: 'li'
    events:
      'click a': 'choose'
  )
  List.Nav.include 'Chooseable'
  List.Navs = App.Views.CollectionView.extend(
    tagName: 'ul'
    className: 'nav nav-pills nav-stacked'
    itemView: List.Nav
  )
  return
