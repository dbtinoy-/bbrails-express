JabberApp.module 'RentalsApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Layout = App.Views.Layout.extend(
    template: require('./tpl/list_layout.hbs')
    regions:
      resultsRegion: '#results-region'
      rentalsRegion: '#rentals-region'
      paginationRegion: '#pagination-region'
  )
  List.Rental = App.Views.ItemView.extend(
    template: require('./tpl/_rental.hbs')
    tagName: 'tr'
  )
  List.Rentals = App.Views.CompositeView.extend(
    template: require('./tpl/_rentals.hbs')
    itemView: List.Rental
    itemViewContainer: 'tbody'
    className: 'col-lg-12'
  )
  List.Results = App.Views.ItemView.extend(template: require('./tpl/_results.hbs'))
  List.Pagination = App.Views.ItemView.extend(template: require('./tpl/_pagination.hbs'))
  return
