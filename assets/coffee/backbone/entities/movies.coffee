JabberApp.module 'Entities', (Entities, App, Backbone, Marionette, $, _) ->
  Entities.Movie = Entities.Model.extend({})
  Entities.MoviesCollection = Entities.Collection.extend(
    model: Entities.Movie
    parse: (resp) ->
      resp.movies
  )
  API = getMovies: (url, params) ->
    _.defaults params,
      apikey: '25y56jxy5bf2748ewwd5t4d5' # App.request('rotten:tomatoes:api:key');
      country: 'us'

    movies = new Entities.MoviesCollection()
    movies.url = [
      'http://api.rottentomatoes.com/api/public/v1.0/'
      url
      '.json?callback=?'
    ].join('')
    movies.fetch
      reset: true
      data: params

    movies

  App.reqres.setHandler 'movie:rental:entities', ->
    API.getMovies 'lists/dvds/top_rentals',
      limit: 20


  App.reqres.setHandler 'search:movie:entities', (searchTerm) ->
    API.getMovies 'movies',
      q: $.trim(searchTerm)


  App.reqres.setHandler 'theatre:movie:entities', ->
    API.getMovies 'lists/movies/in_theaters',
      page_limit: 10
      page: 1


  App.reqres.setHandler 'upcoming:movie:entities', ->
    API.getMovies 'lists/movies/upcoming',
      page_limit: 10
      page: 1


  return
