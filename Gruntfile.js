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
    watch: {
      files: ['**/*.js'],
      tasks: ['jasmine'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'jasmine', 'watch');

};
