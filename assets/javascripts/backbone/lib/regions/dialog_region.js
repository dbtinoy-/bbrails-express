JabberApp.module('Regions', function(Regions, App, Backbone, Marionette, $, _) {

  Regions.Dialog = Marionette.Region.extend({

    show: function(view) {
      //wrap view in dialog wrapper and show new dialogView
      view = App.request('dialog:wrapper', view);
      // if (this.dialogWrapper) {
      //   view = this.dialogWrapper(view);
      // }
      Marionette.Region.prototype.show.call(this, view);
    }


  , onShow: function (view) {
      this.setupBindings(view);
      this.$el.addClass('modal fade').attr({
        tabindex: '-1'
      , role: 'dialog'
      , 'aria-hidden': 'true'
      });
      this.openDialog();
    }

  , setupBindings: function(view) {
      this.listenTo(view, 'dialog:close', this.close);
    }

  , openDialog: function() {
      this.$el.modal();

      // when model is hidden => make sure controller is closed
      // use one to remove listener once called
      this.$el.one('hidden.bs.modal', _.bind(this.close, this));
   }

  , onClose: function() {
      this.stopListening();
    }


  , closeDialog: function() {
      this.$el.modal('hide');
    }

  });

});