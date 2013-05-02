/*jshint es5: true*/

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jasmine: {
      src: 'src/**/*.js',
      options: {
        keepRunner: true,
        specs: 'spec/*Spec.js',
        helpers: 'spec/*Helper.js',
        vendor: 'vendor/**/*.js',
      }
    },
    watch: {
      files: ['**/*.js'],
      tasks: ['jasmine'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'watch');

};
