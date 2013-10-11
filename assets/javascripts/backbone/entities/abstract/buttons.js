function buttons(Entities, App, Backbone, Marionette, $, _) {

  Entities.Button = Entities.Model.extend({
    defaults: {
      buttonType: 'button'
    }
  });


  Entities.ButtonCollection = Entities.Collection.extend({
    model: Entities.Button
  });


  var API = {
    getFormButtons: function(buttons, model) {
      var res = []
        , buttonCollection;

      buttons = this.getDefaultButtons(buttons, model);
      if (buttons.cancel) res.push({type: 'cancel',   className: 'btn btn-default', text: buttons.cancel                        });
      if (buttons.primary) res.push({type: 'primary', className: 'btn btn-primary', text: buttons.primary, buttonType: 'submit' });

      if (buttons.placement == 'left') res.reverse();

      buttonCollection = new Entities.ButtonCollection(res);
      buttonCollection.placement = buttons.placement;
      return buttonCollection;
    }

  , getDefaultButtons: function(buttons, model) {
      return _.defaults(buttons, {
        primary: model.isNew() ? 'Create' : 'Update'
      , cancel: 'Cancel'
      , placement: 'right'
      });
    }
  };

  App.reqres.setHandler('form:button:entities', function(buttons, model) {
    return API.getFormButtons(buttons || {}, model);
  });
}

function load(App) {
  App.module('Entities', buttons);
}

if (JabberApp) {
  load(JabberApp);
}

module.exports = load;