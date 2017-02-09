module.exports = function(grunt) {
    'use strict';

    // ---------------------------------------------------------------------------------------------------------- Banner

    function getBanner() {
        return '/*! <%= pkg.name %> - <%= pkg.description %> - Version: <%= pkg.version %> */\n';
    }

    // ----------------------------------------------------------------------------------------------------------- Grunt

    grunt.initConfig({
        pkg    : grunt.file.readJSON('package.json'),
        concat : {
            dist : {
                options : {
                    banner : getBanner()
                },
                src  : ['src/js/cookie.js'],
                dest : 'dist/js/cookie.js'
            }
        },
        jsdoc : {
            dist : {
                options: {
                    private   : false,
                    template  : "node_modules/ink-docstrap/template",
                    configure : "jsdoc.json"
                },
                src  : ['src/js/cookie.js'],
                dest : 'doc'
            }
        },
        uglify : {
            dist : {
                options : {
                    banner : getBanner()
                },
                src  : 'src/js/cookie.js',
                dest : 'dist/js/cookie.min.js'
            }
        }
    });

    // ----------------------------------------------------------------------------------------------- Plugins

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');

    // ------------------------------------------------------------------------------------------------- Tasks


    grunt.registerTask('build',   ['concat:dist', 'uglify:dist', 'jsdoc']);
    grunt.registerTask('doc',     ['jsdoc']);
};