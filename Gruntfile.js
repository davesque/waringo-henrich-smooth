'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jasmine: {
      src: 'src/**/*.js',
      options: {
        specs: 'spec/*Spec.js',
        helpers: 'spec/*Helper.js',
        vendor: 'vendor/**/*.js',
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default');

};
