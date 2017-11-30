'use strict';

let path = require('path');
/*
 |--------------------------------------------------------------------------
 | Global Settings
 |--------------------------------------------------------------------------
 */
module.exports = function () {
    /**
     * base config
     *
     * @type {{src: string, output: string, laravel: string}}
     */
    let base = {
        src: 'src/',
        output: '../static/pc/v3/',
        laravel: '../website/'
    };
    /**
     *  all config
     */
    return {
        /*
         |----------------------------------------------------------------
         | Mix Config
         |----------------------------------------------------------------
         */
        /**
         * Mix options
         *
         * @type {Object}
         */
        mix:{
            options:{
                extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
                processCssUrls: false, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
                purifyCss: false, // Remove unused CSS selectors.
                browserSync: true, //Does the project require BrowserSync support?
                notifications: {
                    onSuccess: true,
                    onFailure: true
                },
            }
        },
        /*
         |----------------------------------------------------------------
         | Src-Output-Public Path Config
         |----------------------------------------------------------------
         */
        /**
         * Source directory
         *
         * @type {String}
         */
        src: base.src,
        /**
         * Assets build directory (images、css、js...)
         *
         * @type {String}
         */
        output: base.output,
        /**
         * mix.setPublicPath(this)
         *
         * @type {String}
         */
        publicPath: 'public',
        /*
         |----------------------------------------------------------------
         | Assets Path Config(images、fonts...)
         |----------------------------------------------------------------
         */
        assets: {
            srcFolder: path.join(base.src,'assets/'),
            outputFolder: path.join(base.output,'assets/')
        },
        /*
         |----------------------------------------------------------------
         | JS Path Config
         |----------------------------------------------------------------
         */
        js: {
            search: '/**/*.js',
            ignore: ['**/node_modules/**/*', '**/components/**/*', '**/libs/**/*', '**/plugin/**/*', '**/utils/**/*', '**/_*.*'],
            srcFolder: path.join(base.src,'script/'),
            outputFolder: 'js/'
        },
        /*
         |----------------------------------------------------------------
         | Kit Packages Path Config
         |----------------------------------------------------------------
         */
        kit: {
            srcFolder:  path.join(base.src,'kit/'),
            outputFolder:  path.join(base.output,'kit/'),
        },
        /*
         |----------------------------------------------------------------
         | CSS Config
         |----------------------------------------------------------------
         */
        css: {
            search: '/**/*.css',
            srcFolder: path.join(base.src,'css/'),
            outputFolder: path.join(base.output,'css/')
        },
        sass: {
            search: '/**/*.+(sass|scss)',
            ignore: ['**/node_modules/**/*', '**/includes/**/*', '**/_*.*'],
            srcFolder: path.join(base.src,'sass/'),
            outputFolder: 'css/'
        },
        less: {
            search: '/**/*.less',
            ignore: ['**/node_modules/**/*', '**/includes/**/*', '**/_*.*'],
            srcFolder: path.join(base.src,'less/'),
            outputFolder: 'css/'
        },
        /*
         |----------------------------------------------------------------
         | Laravel Blade View Path Config
         |----------------------------------------------------------------
         */
        view: {
            search: '/**/*.blade.php',
            srcFolder: path.join(base.src,'views/'),
            outputFolder: path.join(base.laravel,'resources/views/pc/v3/'),
        }
    }
}();