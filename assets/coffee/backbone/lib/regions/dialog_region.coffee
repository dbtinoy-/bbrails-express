JabberApp.module 'Regions', (Regions, App, Backbone, Marionette, $, _) ->
  Regions.Dialog = Marionette.Region.extend(
    show: (view) ->
      
      #wrap view in dialog wrapper and show new dialogView
      view = App.request('dialog:wrapper', view)
      
      # if (this.dialogWrapper) {
      #   view = this.dialogWrapper(view);
      # }
      Marionette.Region::show.call this, view
      return

    onShow: (view) ->
      @setupBindings view
      @$el.addClass('modal fade').attr
        tabindex: '-1'
        role: 'dialog'
        'aria-hidden': 'true'

      @openDialog()
      return

    setupBindings: (view) ->
      @listenTo view, 'dialog:close', @close
      return

    openDialog: ->
      @$el.modal()
      
      # when model is hidden => make sure controller is closed
      # use one to remove listener once called
      @$el.one 'hidden.bs.modal', _.bind(@close, this)
      return

    onClose: ->
      @stopListening()
      return

    closeDialog: ->
      @$el.modal 'hide'
      return
  )
  return
