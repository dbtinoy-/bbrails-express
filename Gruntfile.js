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
        , '<%= bower_src %>/backbone.marionette/lib/backbone.marionette.js'
        , '<%= bower_src %>/spinjs/spin.js'
        , '<%= bower_src %>/spinjs/jquery.spin.js'
        ]
      , options: {
          shim: {
            modernizr: {
              path: '<%= bower_src %>/modernizr/modernizr.js'
            , exports: 'Modernizr'
            }

          , backbone: {
              path: '<%= bower_src %>/backbone/backbone.js'
            , exports: 'Backbone'
            }

          , marionette: {
                path: '<%= bower_src %>/backbone.marionette/lib/backbone.marionette.js'
              , exports: 'Marionette'
            }

          }
        //backbone need underscore alias :(
        , alias : [
            'node_modules/lodash:underscore'
          , '<%= bower_src %>/jquery/jquery.js:jquery'
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
        files: ['<%= app_cli_js %>/**/*.js', '<%= app_cli_js %>/**/*.hbs']
      , tasks: ['browserify:client']
      , options: {
          interrupt: true
        }
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
  grunt.registerTask('default', ['karma', 'browserify:vendor', 'concurrent']);
};