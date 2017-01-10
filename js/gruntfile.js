module.exports = function (grunt) {
  grunt.initConfig({
    sync: {
      js: {
        files: [
          { cwd: '.',
            src: ['bundle.js'],
            dest: '/Users/galen/Documents/src/urbit/arvo/web/tree/' },
        ] },
      arvo: {
        files: [
          { cwd: '/Users/galen/Documents/src/urbit/arvo/',
            src: ['**'],
            dest: '/Users/galen/Documents/src/urbit/zod/home/' },
        ],
        verbose: true,
      },
    },
    watch: {
      scripts: {
        files: ['bundle.js', '/Users/galen/Documents/src/urbit/arvo/**'],
        tasks: 'sync',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sync');

  grunt.registerTask('default', 'sync');
};
