/*
 |--------------------------------------------------------------------------
 | laravel blade tag for pug core!
 |--------------------------------------------------------------------------
 */
'use strict';

var App = function () {

    /**
     * Overrides Pug Lexer Prototype
     */
    require('./lexer/BladeLexer')();

    /**
     * Overrides Pug Parser Prototype
     */
    require('./parser/BladeParser')();

    /**
     * Overrides Pug Compiler Prototype
     */
    require('./compiler/BladeCompiler')();
};

module.exports = App();
