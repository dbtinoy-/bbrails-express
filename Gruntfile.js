/*jshint node:true */

var handleify = require('handleify');


module.exports = function (grunt) {
  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    bundle_dest: 'public/bundle'
  , app_cli_path: 'assets/'
  , app_cli_js: '<%= app_cli_path %>/javascripts'
  , app_cli_less: '<%= app_cli_path %>/stylesheets'
  , bower_src: '<%= app_cli_path %>/bower_components'


  , browserify: {
      client: {
        src: ['<%= app_cli_js %>/backbone/app.js']
      , dest: '<%= bundle_dest %>/bundle.js'
      , options: {
          debug: true
        , fast: true
        , transform: ['handleify']
        }
      }

    , vendor: {
        src: ['<%= app_cli_js %>/vendor.js']
      , dest: '<%= bundle_dest %>/vendor.js'
      , noParse: [
          '<%= bower_src %>/modernizr/modernizr.js'
        , '<%= bower_src %>/jquery/jquery.js'
        , '<%= bower_src %>/backbone/backbone.js'
        , '<%= bower_src %>/marionette/lib/backbone.marionette.js'
        , '<%= bower_src %>/spinjs/spin.js'
        , '<%= bower_src %>/spinjs/jquery.spin.js'
        ]
      , options: {
          shim: {
            modernizr: {
              path: '<%= bower_src %>/modernizr/modernizr.js'
            , exports: 'Modernizr'
            }

          , jquery: {
              path: '<%= bower_src %>/jquery/jquery.js',
              exports: '$'
            }

          , backbone: {
                path: '<%= bower_src %>/backbone/backbone.js',
                exports: 'Backbone',
                depends: {
                  underscore: 'underscore'
                }
            }

          , marionette: {
              path: '<%= bower_src %>/marionette/lib/backbone.marionette.js',
              exports: 'Marionette',
              depends: {
                jquery: '$',
                backbone: 'Backbone',
                underscore: '_'
              }
            }
          , 'backbone.mutators': {
              path: '<%= bower_src %>/backbone.mutators/backbone.mutators.js'
            , exports: null
            }

          , 'underscore.string': {
              path: '<%= bower_src %>/underscore.string/lib/underscore.string.js'
            , exports: null
            , depends: {
                underscore: '_'
              }
            }

          }
        //backbone need underscore alias :(
        , alias : [
            'lodash:underscore'
          , '<%= bower_src %>/backbone/backbone.js:Backbone'
          , '<%= bower_src %>/spinjs/spin.js:spin'
          ]
        }
      }
    }


  , less: {
      development: {
        options: {
          paths: ['<%= app_cli_less %>', '<%= bower_src %>/bootstrap/less', '<%= bower_src %>/font-awesome/less']
        }
      , files: [
          {src: ['<%= app_cli_less %>/index.less'], dest: '<%= bundle_dest %>/bundle.css'}
        ]
      }
    }

  , watch: {
      options: {
        livereload: true
      }
    , js: {
        files: ['<%= app_cli_js %>/**/*.js', '<%= app_cli_js %>/**/*.hbs', '!<%= app_cli_js %>/vendor.js']
      , tasks: ['browserify:client']
      , options: {
          interrupt: true
        }
      }

    , vendor: {
        files: ['<%= app_cli_js %>/vendor.js']
      , tasks: ['browserify:vendor']
      }

    , karma: {
        files: ['<%= browserify.client.dest %>', 'test/browser/**/*-test.js']
      , tasks: ['karma:unit:run']
      , options: {
          livereload: false
        }
      }
    , css: {
        files: ['<%= app_cli_less %>/**/*.less']
      , tasks: ['less']
      , options: {
          interrupt: true
        }
      }
    }

  , karma: {
      unit: {
        configFile: 'config/karma.conf.js'
      , browsers: ['Chrome']
      // , autoWatch: true
      , background: true
      }
    }

  , simplemocha: {
      options: {
        ignoreLeaks: false
      , ui: 'bdd'
      , reporter: 'spec'
      }
    , all: { src: ['test/*-test.js'] }
    }

  , nodemon: {
      dev: {
        options: {
          file: 'index.js'
        , nodeArgs: ['--debug']
        , watchedExtensions: ['js']
        , watchedFolders: ['server']
        }
      }
    }

  , concurrent: {
      target: {
        tasks: ['nodemon', 'watch']
      , options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.renameTask('simplemocha', 'test');

  // grunt.registerTask('default', ['karma', 'browserify:vendor', 'concurrent']);
  grunt.registerTask('default', ['browserify:vendor', 'concurrent']);
};