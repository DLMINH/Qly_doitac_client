module.exports = function(grunt) {
    grunt.initConfig({

        // define source files and their destinations
        concat: {
            js: {
                src: [
                    'app/bower_components/gentelella/vendors/jquery/dist/jquery.min.js',
                    'app/bower_components/gentelella/vendors/bootstrap/dist/js/bootstrap.min.js',
                    'app/bower_components/angular/angular.min.js',
                    'app/bower_components/angular-route/angular-route.js',
                    'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'app/bower_components/gentelella/vendors/fastclick/lib/fastclick.js',
                    'app/bower_components/gentelella/vendors/nprogress/nprogress.js',
                    'app/bower_components/gentelella/vendors/jQuery-Smart-Wizard/js/jquery.smartWizard.js',
                    'app/bower_components/gentelella/build/js/custom.min.js',
                    'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'app/bower_components/js-xlsx-style/dist/xlsx.full.min.js',
                    'app/bower_components/file-saver/FileSaver.min.js',
                    'app/bower_components/angular-sanitize/angular-sanitize.min.js',
                    'app/bower_components/angular-md5/angular-md5.min.js',
                    'app/bower_components/angucomplete-alt/dist/angucomplete-alt.min.js',
                    'app/bower_components/tags-input/tags-input.js',
                    'app/bower_components/ng-clipboard/dist/ng-clipboard.js',
                    'app/main/*.js', 'app/main/controllers/*.js', 'app/main/services/*.js'
                ],
                dest: 'app/main/uglify/concat.js'
            }
        },
        uglify: {
            client: {
                files: grunt.file.expandMapping(['app/main/uglify/concat.js'], 'final/', {
                    rename: function(destBase, destPath) {
                        return destPath.replace('.js', '.min.js');
                    }
                }),
                // files: {
                //     src: 'app/main/test/concat.js', // source files mask
                //     dest: 'app/main/test/', // destination folder
                //     expand: true, // allow dynamic building
                //     flatten: true, // remove all unnecessary nesting
                //     ext: '.min.js' // replace .js to .min.js
                // },
                options: {
                    mangle: false
                }
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                // cwd: 'assets/',
                src: ['app/main/uglify/concat.min.js'],
                dest: '',
                ext: '.min.js.gz'
            }
        },
        watch: {
            js: { files: ['app/main/*.js', 'app/main/controllers/*.js', 'app/main/services/*.js'], tasks: ['uglify'] },
        }
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // register at least this one task
    grunt.registerTask('default', ['concat', 'uglify', 'compress']);
    // grunt.registerMultiTask(taskName, [description, ] taskFunction);


};