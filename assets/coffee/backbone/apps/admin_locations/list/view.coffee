JabberApp.module "AdminLocationsApp.List", (List, App, Backbone, Marionette, $, _) ->
  List.Layout = App.Views.Layout.extend(
    template: require  "./tpl/layout.hbs"
    regions:
      locationsRegion: "#locations-region"
      panelRegion: "#panel-region"
  )
  List.Panel = App.Views.ItemView.extend(
    template: require  "./tpl/_panel.hbs"
    triggers:
      "click button": "new:location:clicked"
  )
  List.Location = App.Views.ItemView.extend(
    template: require  "./tpl/_location.hbs"
    tagName: "tr"
    triggers:
      "click [data-js-destroy]": "destroy:location:clicked"
  )
  List.Locations = App.Views.CompositeView.extend(
    template: require  "./tpl/_locations.hbs"
    itemView: List.Location
    itemViewContainer: "tbody"
  )
  