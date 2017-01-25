module.exports = function (grunt) {
  var config = require('./grunt.config.js');

  var buildDestination = config.arvo || config.pier;
  var initConfig = {
    sync: {
      js: {
        files: [
          { cwd: './build/',
            src: ['bundle.js'],
            dest: buildDestination + 'web/tree/' },
        ] },
      css: {
        files: [
          { cwd: './build/',
            src: ['main.css'],
            dest: buildDestination + 'web/tree/' },
        ] }
    },
    watch: {
      scripts: {
        files: ['build/bundle.js', 'build/main.css', config.arvo + '**'],
        tasks: 'sync',
      },
    },
  };
  if(config.arvo){
    initConfig.sync.arvo = 
    arvo = {
        files: [
          { cwd: config.arvo,
            src: ['**'],
            dest: config.pier },
        ],
        verbose: true,
    }
  }
    
  grunt.initConfig(initConfig)

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sync');

  grunt.registerTask('default', 'sync');
};
