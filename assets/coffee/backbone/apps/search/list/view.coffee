JabberApp.module 'SearchApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Layout = App.Views.Layout.extend(
    template: require('./tpl/list_layout.hbs')
    regions:
      panelRegion: '#panel-region'
      moviesRegion: '#movies-region'
  )
  List.Panel = App.Views.ItemView.extend(
    template: require('./tpl/_panel.hbs')
    ui:
      input: 'input'

    events:
      'submit form': 'formSubmitted'

    formSubmitted: (e) ->
      e.preventDefault()
      val = $.trim(@ui.input.val())
      @trigger 'search:submitted', val
      return
  )
  List.Movie = App.Views.ItemView.extend(
    template: require('./tpl/_movie.hbs')
    tagName: 'tr'
  )
  List.Empty = App.Views.ItemView.extend(
    template: require('./tpl/_empty.hbs')
    tagName: 'tr'
  )
  List.Movies = App.Views.CompositeView.extend(
    template: require('./tpl/_movies.hbs')
    itemView: List.Movie
    itemViewContainer: 'tbody'
    emptyView: List.Empty
    className: 'col-lg-12'
  )
  List.Hero = App.Views.ItemView.extend(template: require('./tpl/_hero.hbs'))
  return
