/*
 |--------------------------------------------------------------------------
 | Welcome to blade!
 |--------------------------------------------------------------------------
 */
let mix = require('laravel-mix');
let path = require('path');
let glob = require('glob');
let del = require('del');

let blade = require('./blade');

mix.pug = require('laravel-mix-blade-pug');
//mix.jade = require('laravel-mix-blade-jade');

/*
 |--------------------------------------------------------------------------
 | Run Settings
 |--------------------------------------------------------------------------
 */
mix.options(blade.mix.options);
mix.setPublicPath(blade.publicPath);
mix.webpackConfig({
    output: {
        path: path.resolve(__dirname, blade.output)
    }
});

/*
 |--------------------------------------------------------------------------
 | Asset Management
 |--------------------------------------------------------------------------
 */
/**
 * Del Build Files
 */
if(!Mix.inProduction()){
    del.sync([
        path.resolve(__dirname, blade.output),
        path.resolve(__dirname, blade.view.outputFolder)
    ],{force: true});
}

/**
 * Copy Assets
 */
mix.copyDirectory(blade.assets.srcFolder, blade.assets.outputFolder);

/**
 * Copy Kit Packages
 */
mix.copyDirectory(blade.kit.srcFolder, blade.kit.outputFolder);

/**
 * Merge to common.min.css
 */
mix.styles([
    './node_modules/sweetalert/dist/sweetalert.css',
], path.join(blade.css.outputFolder,'common.min.css'));

/**
 * Compile less
 */
glob.sync(path.join(blade.less.srcFolder, blade.less.search), {ignore: blade.less.ignore}).forEach(function (file) {
    var fileName = file.replace(/\\/g, '/')
        .replace(blade.less.srcFolder.replace(/\\/g, '/'), '')
        .replace('.less','.min.css');
    var buildPath = path.join(blade.less.outputFolder, fileName);
    mix.less(file, buildPath);
});

/**
 * Compile javascript
 */
glob.sync(path.join(blade.js.srcFolder, blade.js.search), {ignore: blade.js.ignore}).forEach(function (file) {
    var fileName = file.replace(/\\/g, '/')
        .replace(blade.js.srcFolder.replace(/\\/g, '/'), '')
        .replace('.js','.min.js');
    var buildPath = path.join(blade.js.outputFolder, fileName);
    mix.js(file, buildPath);
});

/**
 * Compile Blade View
 */
mix.pug(blade.view.srcFolder, blade.view.outputFolder);
//mix.jade(blade.view.srcFolder, blade.view.outputFolder);

/**
 * Browsersync auto refresh
 */
mix.browserSync({
    proxy: 'www.escapeplan.me',
    files: [
        path.join(blade.css.outputFolder, blade.css.search),
        path.join(blade.output, blade.js.outputFolder, blade.js.search),
        path.join(blade.view.outputFolder, blade.view.search)
    ]
});