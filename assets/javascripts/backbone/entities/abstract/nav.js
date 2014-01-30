JabberApp.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {

  var Nav = Entities.Model.extend({
    isDivider: function() {
      return this.get('divider');
    }

  // , isChosen: function() {
  //     return this.get('chosen');
  //   }

  // , choose: function() {
  //     this.set('chosen', true);
  //   }

  // , unchoose: function() {
  //     this.set('chosen', false);
  //   }

  // , chooseByCollection: function() {
  //     this.collection.choose(this);
  //   }
  });

  var NavCollection = Entities.Collection.extend({
    model: Nav

  // , initialize: function() {
  //     new Backbone.SingleChooser(this);
  //   }

  // , choose: function(model) {
  //     _(this.where({ chosen: true })).invoke('unchoose');
  //     model.choose();
  //   }

  , chooseByName: function(nav) {
      this.choose(this.findWhere({name: nav}) || this.first() );
    }
  });

  NavCollection.include('SingleChooser');


  var API = {
        getNavs: function() {
          var navs = new NavCollection([
              { name: 'Dashboard',  url: '#dashboard',  icon: 'fa fa-tachometer' }
            , { name: 'Deliveries', url: '#deliveries', icon: 'fa fa-rocket' }
            , { name: 'Crew',       url: '#crew',       icon: 'fa fa-users' }
            , { name: 'Admin',      url: '#admin',      icon: 'fa fa-cog' }
             ]);
          return navs;
        }

      , getAdminNavs: function () {
          var navs = new NavCollection([
                { name: 'Locations',  url: '#admin/locations',  icon: 'fa fa-fw fa-map-marker' }
              , { name: 'Recipients',  url: '#admin/recipients',  icon: 'fa fa-fw fa-user' }
              , { name: 'Contents',  url: '#admin/contents',  icon: 'fa fa-fw fa-archive' }
              , { name: 'Outcomes',  url: '#admin/outcomes',  icon: 'fa fa-fw fa-check-square-o' }
              ]);

          return navs;
        }
      };

  App.reqres.setHandler('nav:entities', function() {
    return API.getNavs();
  });


  App.reqres.setHandler('admin:nav:entities', function() {
    return API.getAdminNavs();
  });

});