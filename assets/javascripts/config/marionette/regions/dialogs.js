
Marionette.Region.Dialog = Marionette.Region.extend({
  constructor: function() {
  }

, show: function(view) {
    //wrap view in dialog wrapper and show new dialogView
    if (this.dialogWrapper) {
      view = this.dialogWrapper(view);
    }
    Marionette.Region.prototype.show.call(this, view);
  }


, onShow: function (view) {
    this.setupBindings(view);

    this.$el.addClass('modal fade').attr({
      tabindex: '-1'
    , role: 'dialog'
    , 'aria-hidden': 'true'
    });

    this.$el.on('hidden.bs.modal', _.bind(this.closedDialog, this));
    this.$el.modal();
  }

, setupBindings: function(view) {
    this.listenTo(view, 'dialog:close', this.closeDialog);
  }

, closeDialog: function() {
    this.$el.modal('hide');
  }

, closedDialog: function() {
    this.close();
    this.stopListening();
  }


});