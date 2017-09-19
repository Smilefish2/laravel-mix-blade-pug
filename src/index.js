/*
 |--------------------------------------------------------------------------
 | Welcome to laravel-mix-blade-pug!
 |--------------------------------------------------------------------------
 */
const _ = require('lodash');
const glob = require('glob');
const path = require('path');
const Verify = require('laravel-mix/src/Verify');

const config = require('./config');
const MixPugTask = require('./tasks/MixPugTask');


/**
 *  main entrance
 *
 * @param src
 * @param output
 * @param pluginOptions
 * @returns {pug}
 */
var pug = function (src, output, pluginOptions = {}) {
    let options = _.merge(config, pluginOptions);
    Config.merge({
        pug: options
    });

    Verify.dependency('pug', ['pug'], true);

    let files = glob.sync(path.join(src, options.search), {ignore: options.ignore});
    let task = new MixPugTask({ src, output, options, files });

    Mix.addTask(task);

    return this;
}

module.exports = pug;