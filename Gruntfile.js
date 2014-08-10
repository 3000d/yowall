'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'public_html/assets/js/plugins/*.js',
    'public_html/assets/js/_*.js'
  ];

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'public_html/assets/js/*.js',
        '!public_html/assets/js/scripts.js',
        '!public_html/assets/**/*.min.*'
      ]
    },
    less: {
      dev: {
        files: {
          'public_html/assets/css/main.css': [
            'public_html/assets/less/main.less'
          ]
        },
        options: {
          compress: false,
          sourceMap: true,
          sourceMapFilename: 'public_html/assets/css/main.css.map',
          sourceMapRootpath: '/'
        }
      },
      build: {
        files: {
          'public_html/assets/css/main.min.css': [
            'public_html/assets/less/main.less'
          ]
        },
        options: {
          compress: true
        }
      }
    },
    concat: {
      options: {
        separator: ';',
        sourceMap: true
      },
      dist: {
        src: [jsFileList],
        dest: 'public_html/assets/js/scripts.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'public_html/assets/js/scripts.min.js': [jsFileList]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'public_html/assets/css/'
          }
        },
        src: 'public_html/assets/css/main.css'
      },
      build: {
        src: 'public_html/assets/css/main.min.css'
      }
    },
    watch: {
      less: {
        files: [
          'public_html/assets/less/*.less',
          'public_html/assets/less/**/*.less'
        ],
        tasks: ['less:dev', 'autoprefixer:dev']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'concat']
      },
      livereload: {
        options: {
          livereload: 1337
        },
        files: [
          'public_html/assets/css/main.css',
          'public_html/assets/js/scripts.js',
          '*.php'
        ]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'jshint',
    'less:dev',
    'autoprefixer:dev',
    'concat'
  ]);
  grunt.registerTask('build', [
    'jshint',
    'less:build',
    'autoprefixer:build',
    'uglify',
    'modernizr'
  ]);
};
