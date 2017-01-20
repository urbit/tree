module.exports = function (grunt) {
  var config = require('./grunt.config.js');

  grunt.initConfig({
    sync: {
      js: {
        files: [
          { cwd: './js/',
            src: ['bundle.js'],
            dest: config.arvo + 'web/tree/' },
        ] },
      css: {
        files: [
          { cwd: './css/',
            src: ['main.css'],
            dest: config.arvo + 'web/tree/' },
        ] },
      arvo: {
        files: [
          { cwd: config.arvo,
            src: ['**'],
            dest: config.pier },
        ],
        verbose: true,
      },
    },
    watch: {
      scripts: {
        files: ['js/bundle.js', 'css/main.css', config.arvo + '**'],
        tasks: 'sync',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sync');

  grunt.registerTask('default', 'sync');
};
