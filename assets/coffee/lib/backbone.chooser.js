var __extends_, __hasProp_, __indexOf_, __slice_;

__indexOf_ = [].indexOf || function(item) {
  var i, l;
  i = 0;
  l = this.length;
  while (i < l) {
    if (i in this && this[i] === item) {
      return i;
    }
    i++;
  }
  return -1;
};

__hasProp_ = {}.hasOwnProperty;

__extends_ = function(child, parent) {
  var ctor, key;
  ctor = function() {
    this.constructor = child;
  };
  for (key in parent) {
    if (__hasProp_.call(parent, key)) {
      child[key] = parent[key];
    }
  }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  return child;
};

__slice_ = [].slice;

(function(Backbone) {
  var BaseChooser, _ref;
  BaseChooser = void 0;
  _ref = void 0;
  Backbone.Chooser = (function() {
    var Chooser;
    Chooser = function(model) {
      var method, _i, _len;
      method = void 0;
      _i = void 0;
      _len = void 0;
      _ref = void 0;
      this.model = model;
      this.model._chooser = this;
      _ref = this._publicMethods();
      _i = 0;
      _len = _ref.length;
      while (_i < _len) {
        method = _ref[_i];
        this.model[method] = _.bind(this[method], this);
        _i++;
      }
      this.chosen = false;
      this.model.set({
        chosen: false
      });
    };
    Chooser.prototype._publicMethods = function() {
      return ["choose", "unchoose", "toggleChoose", "isChosen"];
    };
    Chooser.prototype.isChosen = function() {
      return !!this.chosen;
    };
    Chooser.prototype.choose = function(options) {
      _ref = void 0;
      if (options == null) {
        options = {};
      }
      if (this.isChosen()) {
        return;
      }
      this.chosen = true;
      this.model.set({
        chosen: true
      }, options);
      if (options.silent !== true) {
        this.model.trigger("model:chosen", this.model);
      }
      if ((_ref = this.model.collection) != null) {
        if (typeof _ref.choose === "function") {
          return _ref.choose(this.model, options);
        } else {
          return void 0;
        }
      } else {
        return void 0;
      }
    };
    Chooser.prototype.unchoose = function(options) {
      _ref = void 0;
      if (options == null) {
        options = {};
      }
      if (!this.isChosen()) {
        return;
      }
      this.chosen = false;
      this.model.set({
        chosen: false
      }, options);
      if (options.silent !== true) {
        this.model.trigger("model:unchosen", this.model);
      }
      if ((_ref = this.model.collection) != null) {
        if (typeof _ref.unchoose === "function") {
          return _ref.unchoose(this.model, options);
        } else {
          return void 0;
        }
      } else {
        return void 0;
      }
    };
    Chooser.prototype.toggleChoose = function() {
      if (this.isChosen()) {
        return this.unchoose();
      } else {
        return this.choose();
      }
    };
    return Chooser;
  })();
  BaseChooser = (function() {
    BaseChooser = function(collection) {
      var method, _i, _len;
      method = void 0;
      _i = void 0;
      _len = void 0;
      _ref = void 0;
      this.collection = collection;
      this.collection._chooser = this;
      this.collection._chooser.chosen = {};
      _ref = this._publicMethods();
      _i = 0;
      _len = _ref.length;
      while (_i < _len) {
        method = _ref[_i];
        this.collection[method] = _.bind(this[method], this);
        _i++;
      }
    };
    BaseChooser.prototype._publicMethods = function() {
      return ["choose", "unchoose", "getChosen", "getFirstChosen", "chooseById"];
    };
    BaseChooser.prototype.getChosen = function() {
      return _.toArray(this.chosen);
    };
    BaseChooser.prototype.getFirstChosen = function() {
      return this.getChosen()[0];
    };
    BaseChooser.prototype.modelInChosen = function(model) {
      _ref = void 0;
      _ref = model.cid;
      return __indexOf_.call(_.keys(this.chosen), _ref) >= 0;
    };
    BaseChooser.prototype.addModel = function(model, options) {
      if (options == null) {
        options = {};
      }
      this.chosen[model.cid] = model;
      if (typeof model.choose === "function") {
        return model.choose(options);
      } else {
        return void 0;
      }
    };
    BaseChooser.prototype.removeModels = function(model) {
      var _i, _len, _results;
      _i = void 0;
      _len = void 0;
      _ref = void 0;
      _results = void 0;
      if (model == null) {
        model = false;
      }
      _ref = _.flatten([model || this.getChosen()]);
      _results = [];
      _i = 0;
      _len = _ref.length;
      while (_i < _len) {
        model = _ref[_i];
        delete this.chosen[model.cid];
        _results.push((typeof model.unchoose === "function" ? model.unchoose() : void 0));
        _i++;
      }
      return _results;
    };
    BaseChooser.prototype.triggerEvent = function(event, options) {
      if (event == null) {
        event = false;
      }
      if (options == null) {
        options = {};
      }
      _.defaults(options, {
        silent: false
      });
      if (options.silent === true) {
        return;
      }
      event || (event = this._getEvent());
      return this.collection.trigger(event, this._eventArg());
    };
    BaseChooser.prototype.chooseById = function(id, options) {
      var model;
      model = void 0;
      if (options == null) {
        options = {};
      }
      model = this.collection.get(id);
      if (model) {
        return this.choose(model, options);
      }
    };
    return BaseChooser;
  })();
  Backbone.SingleChooser = (function(_super) {
    var SingleChooser;
    SingleChooser = function() {
      _ref = SingleChooser.__super__.constructor.apply(this, arguments);
      return _ref;
    };
    __extends_(SingleChooser, _super);
    SingleChooser.prototype._eventArg = function() {
      return this.getFirstChosen();
    };
    SingleChooser.prototype.choose = function(model, options) {
      if (this.modelInChosen(model)) {
        return;
      }
      this.removeModels();
      this.addModel(model);
      return this.triggerEvent("collection:chose:one", options);
    };
    SingleChooser.prototype.unchoose = function(model, options) {
      if (!this.modelInChosen(model)) {
        return;
      }
      this.removeModels(model);
      return this.triggerEvent("collection:unchose:one", options);
    };
    return SingleChooser;
  })(BaseChooser);
  return Backbone.MultiChooser = (function(_super) {
    var MultiChooser;
    MultiChooser = function() {
      var method, _i, _len, _ref1;
      method = void 0;
      _i = void 0;
      _len = void 0;
      _ref1 = void 0;
      MultiChooser.__super__.constructor.apply(this, arguments);
      _ref1 = ["chooseAll", "chooseNone", "chooseByIds"];
      _i = 0;
      _len = _ref1.length;
      while (_i < _len) {
        method = _ref1[_i];
        this.collection[method] = _.bind(this[method], this);
        _i++;
      }
    };
    __extends_(MultiChooser, _super);
    MultiChooser.prototype._eventArg = function() {
      return this.getChosen();
    };
    MultiChooser.prototype.choose = function() {
      var args, eventShouldTrigger, model, options, _i, _len, _ref1;
      args = void 0;
      eventShouldTrigger = void 0;
      model = void 0;
      options = void 0;
      _i = void 0;
      _len = void 0;
      _ref1 = void 0;
      args = (1 <= arguments.length ? __slice_.call(arguments, 0) : []);
      options = (!(_.chain(args).flatten().last().value() instanceof Backbone.Model) ? args.pop() : {});
      eventShouldTrigger = false;
      _ref1 = _([args]).flatten();
      _i = 0;
      _len = _ref1.length;
      while (_i < _len) {
        model = _ref1[_i];
        if (this.modelInChosen(model)) {
          break;
        }
        eventShouldTrigger || (eventShouldTrigger = true);
        this.addModel(model, options);
        _i++;
      }
      if (eventShouldTrigger) {
        return this.triggerEvent(false, options);
      }
    };
    MultiChooser.prototype.unchoose = function() {
      var args, eventShouldTrigger, model, options, _i, _len, _ref1;
      args = void 0;
      eventShouldTrigger = void 0;
      model = void 0;
      options = void 0;
      _i = void 0;
      _len = void 0;
      _ref1 = void 0;
      args = (1 <= arguments.length ? __slice_.call(arguments, 0) : []);
      options = (!(_.chain(args).flatten().last().value() instanceof Backbone.Model) ? args.pop() : {});
      eventShouldTrigger = false;
      _ref1 = _([args]).flatten();
      _i = 0;
      _len = _ref1.length;
      while (_i < _len) {
        model = _ref1[_i];
        if (!this.modelInChosen(model)) {
          break;
        }
        eventShouldTrigger || (eventShouldTrigger = true);
        this.removeModels(model, options);
        _i++;
      }
      if (eventShouldTrigger) {
        return this.triggerEvent(false, options);
      }
    };
    MultiChooser.prototype.chooseAll = function(options) {
      var model, _i, _len, _ref1;
      model = void 0;
      _i = void 0;
      _len = void 0;
      _ref1 = void 0;
      if (options == null) {
        options = {};
      }
      if (!_.difference(this.collection.models, this.getChosen()).length) {
        return;
      }
      _ref1 = this.collection.models;
      _i = 0;
      _len = _ref1.length;
      while (_i < _len) {
        model = _ref1[_i];
        this.addModel(model);
        _i++;
      }
      return this.triggerEvent(false, options);
    };
    MultiChooser.prototype.chooseNone = function(options) {
      if (options == null) {
        options = {};
      }
      if (this.getChosen().length === 0) {
        return;
      }
      this.removeModels();
      return this.triggerEvent(false, options);
    };
    MultiChooser.prototype.chooseByIds = function(ids, options) {
      var id, _i, _len, _ref1, _results;
      id = void 0;
      _i = void 0;
      _len = void 0;
      _ref1 = void 0;
      _results = void 0;
      if (ids == null) {
        ids = [];
      }
      if (options == null) {
        options = {};
      }
      _.defaults(options, {
        chooseNone: true
      });
      if (options.chooseNone) {
        this.chooseNone(options);
      }
      _ref1 = _([ids]).flatten();
      _results = [];
      _i = 0;
      _len = _ref1.length;
      while (_i < _len) {
        id = _ref1[_i];
        _results.push(this.chooseById(id, options));
        _i++;
      }
      return _results;
    };
    MultiChooser.prototype._getEvent = function() {
      if (this.collection.length === this.getChosen().length) {
        return "collection:chose:all";
      }
      if (this.getChosen().length === 0) {
        return "collection:chose:none";
      }
      return "collection:chose:some";
    };
    return MultiChooser;
  })(BaseChooser);
})(Backbone);
