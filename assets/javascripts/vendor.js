/*jshint node:true*/

//modernizr must be shim (see gruntfile.js)
require('modernizr');

//auto registration of jQuery & $ to global (window)
var $ = require('jquery');

//lodash need manual global registration (or maybe browserify shim ??)
global._ = global.underscore = require('lodash');
//backbone need manual global registration
var backbone = global.Backbone = require('backbone');
backbone.$ = $;

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

//
require('./lib/backbone.routefilter');
require('./lib/backbone.chooser');
require('backbone.mutators');

//marionette needs manual global registration
global.Marionette = require('marionette');

backbone.Cocktail = require('../bower_components/cocktail/Cocktail.js');

require('../bower_components/backbone.syphon/lib/backbone.syphon.js');

require('../bower_components/spinjs/spin.js');
require('../bower_components/spinjs/jquery.spin.js');

require('../bower_components/bootstrap/js/affix');
require('../bower_components/bootstrap/js/alert');
require('../bower_components/bootstrap/js/button');
require('../bower_components/bootstrap/js/collapse');
require('../bower_components/bootstrap/js/dropdown');
require('../bower_components/bootstrap/js/modal');
require('../bower_components/bootstrap/js/tooltip');
require('../bower_components/bootstrap/js/popover');
require('../bower_components/bootstrap/js/transition');



// require('../bower_components/bootstrap/js/scrollspy');
// require('../bower_components/bootstrap/js/tab');
// require('../bower_components/bootstrap/js/typeahead');
