JabberApp.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->
  Nav = Entities.Model.extend(isDivider: ->
    @get 'divider'
  )
  
  # , isChosen: function() {
  #     return this.get('chosen');
  #   }
  
  # , choose: function() {
  #     this.set('chosen', true);
  #   }
  
  # , unchoose: function() {
  #     this.set('chosen', false);
  #   }
  
  # , chooseByCollection: function() {
  #     this.collection.choose(this);
  #   }
  NavCollection = Entities.Collection.extend(
    model: Nav
    
    # , initialize: function() {
    #     new Backbone.SingleChooser(this);
    #   }
    
    # , choose: function(model) {
    #     _(this.where({ chosen: true })).invoke('unchoose');
    #     model.choose();
    #   }
    chooseByName: (nav) ->
      @choose @findWhere(name: nav) or @first()
      return
  )
  NavCollection.include 'SingleChooser'
  API =
    getNavs: ->
      navs = new NavCollection([
        {
          name: 'Dashboard'
          url: '#dashboard'
          icon: 'fa fa-tachometer'
        }
        {
          name: 'Deliveries'
          url: '#deliveries'
          icon: 'fa fa-rocket'
        }
        {
          name: 'Crew'
          url: '#crew'
          icon: 'fa fa-users'
        }
        {
          name: 'Admin'
          url: '#admin'
          icon: 'fa fa-cog'
        }
      ])
      navs

    getAdminNavs: ->
      navs = new NavCollection([
        {
          name: 'Locations'
          url: '#admin/locations'
          icon: 'fa fa-fw fa-map-marker'
        }
        {
          name: 'Recipients'
          url: '#admin/recipients'
          icon: 'fa fa-fw fa-user'
        }
        {
          name: 'Contents'
          url: '#admin/contents'
          icon: 'fa fa-fw fa-archive'
        }
        {
          name: 'Outcomes'
          url: '#admin/outcomes'
          icon: 'fa fa-fw fa-check-square-o'
        }
      ])
      navs

  App.reqres.setHandler 'nav:entities', ->
    API.getNavs()

  App.reqres.setHandler 'admin:nav:entities', ->
    API.getAdminNavs()

  return
