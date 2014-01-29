/*jshint node:true*/

//modernizr must be shim (see gruntfile.js)
require('modernizr');

//auto registration of jQuery & $ to global (window)
require('../bower_components/jquery/jquery.js');

//lodash need manual global registration (or maybe browserify shim ??)
global._ = global.underscore = require('lodash');
//backbone need manual global registration
global.Backbone = require('../bower_components/backbone/backbone.js');

// require('../bower_components/backbone.stickit/backbone.stickit.js');
//
require('./lib/backbone.routefilter.js');

//marionette needs manual global registration
global.Marionette = require('marionette');

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
