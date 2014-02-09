controller = (Controllers, App, Backbone, Marionette, $, _) ->
  Controllers.Application = Marionette.Controller.extend(
    constructor: (options) ->
      options = options or {}
      @region = options.region or App.request('default:region')
      @_instance_id = _.uniqueId('controller')
      App.execute 'register:instance', this, @_instance_id
      Marionette.Controller::constructor.call this, options

    close: ->
      
      # delete this.region;
      # delete this.options;
      App.execute 'unregister:instance', this, @_instance_id
      Marionette.Controller::close.apply this, arguments

    onClose: ->
      console.log 'controller closing', this
      return

    show: (view, options) ->
      options = options or {}
      _.defaults options,
        loading: false
        region: @region

      @setMainView view
      @_manageView view, options
      return

    setMainView: (view) ->
      
      # the first view we show is always going to become the mainView of our
      # controller (whether its a layout or another view type). So if this
      # *is* a layout, when we show other regions inside of that layout, we
      # check for the existance of mainView first, so our controller is only
      # closed down when the original mainView is closed
      return  if @_mainView
      @_mainView = view
      @listenTo view, 'close', @close
      return

    _manageView: (view, options) ->
      if options.loading
        
        # show the loading view
        App.execute 'show:loading', view, options
      else
        options.region.show view
      return
  )
  return
load = (App) ->
  App.module 'Controllers', controller
  return
load JabberApp  if JabberApp
module.exports = load