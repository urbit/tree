module.exports = function (grunt) {
  grunt.initConfig({
    sync: {
      main: {
        files: [{
          cwd: '.',
          src: ['bundle.js'],
          dest: '/Users/galen/src/urbit/zod/home/web/tree/',
        }],
        verbose: true,
      },
    },
    watch: {
      scripts: {
        files: 'bundle.js',
        tasks: ['sync'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sync');

  grunt.registerTask('default', 'sync');
};
