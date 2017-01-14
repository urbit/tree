module.exports = function (grunt) {
  var config = require('./grunt.config.js');

  grunt.initConfig({
    sync: {
      js: {
        files: [
          { cwd: '.',
            src: ['bundle.js'],
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
        files: ['bundle.js', config.arvo + '**'],
        tasks: 'sync',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sync');

  grunt.registerTask('default', 'sync');
};
