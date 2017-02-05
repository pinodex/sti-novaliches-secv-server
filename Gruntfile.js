module.exports = function(grunt){

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    loadPath: ['node_modules/foundation-sites/scss']
                },
                
                files: [{
                    expand: true,
                    cwd:    'public/assets/sass',
                    dest:   'public/assets/css',
                    src:    ['**/*.scss'],
                    ext:    '.css'
                }]
            }
        },

        watch: {
            files: 'public/assets/sass/*.scss',
            
            tasks: [
                'sass'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'watch'
    ]);

    grunt.registerTask('compile', [
        'sass'
    ]);

};
