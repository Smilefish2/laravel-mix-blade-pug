'use strict';

const lex = require('pug-lexer');

module.exports = function() {
    var Blade = lex.Lexer.prototype;

    /**
     * Blade directives
     */
    Blade.bladeDirectives = function () {
        var captures;
        var regexp = /^(@\w+)\b[\t]*(.*|[^\n]+)/;
        if (captures = regexp.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('bladeDirectives', captures[2]);
            tok.name = captures[1];
            tok.statements = true;

            this.tokens.push(tok);
            return true;
        }

    };


    /**
     * Blade Raw
     */
    Blade.bladeRaw = function () {
        var captures;
        var regexp = /^({{{[^\n]+}}})/;
        if (captures = regexp.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('bladeDirectives', captures[0]);

            this.tokens.push(tok);
            return true;
        }
    };


    /**
     * Blade Escaped
     */
    Blade.bladeEscaped = function () {
        var captures;
        var regexp = /^({{[^\n]+}})/;
        if (captures = regexp.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('bladeDirectives', captures[0]);

            this.tokens.push(tok);
            return true;
        }
    };


    /**
     * Blade Unescaped
     */
    Blade.bladeUnescaped = function () {
        var captures;
        var regexp = /^({!![^\n]+!!})/;
        if (captures = regexp.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('bladeDirectives', captures[0]);

            this.tokens.push(tok);
            return true;
        }
    };


    /**
     * Blade Javascript Framework
     */
    Blade.bladeJavascript = function () {
        var captures;
        var regexp = /^(@{{[^\n]+}})/;
        if (captures = regexp.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('bladeDirectives', captures[0]);

            this.tokens.push(tok);
            return true;
        }
    };

    /**
     * Move to the next token
     *
     * @api private
     */

    Blade.advance = function() {
        return this.callLexerFunction('blank')
            || this.callLexerFunction('eos')
            || this.callLexerFunction('endInterpolation')
            || this.callLexerFunction('yield')
            || this.callLexerFunction('doctype')
            || this.callLexerFunction('interpolation')
            || this.callLexerFunction('case')
            || this.callLexerFunction('when')
            || this.callLexerFunction('default')
            || this.callLexerFunction('extends')
            || this.callLexerFunction('append')
            || this.callLexerFunction('prepend')
            || this.callLexerFunction('block')
            || this.callLexerFunction('mixinBlock')
            || this.callLexerFunction('include')
            || this.callLexerFunction('mixin')
            || this.callLexerFunction('call')
            || this.callLexerFunction('conditional')
            || this.callLexerFunction('each')
            || this.callLexerFunction('while')
            || this.callLexerFunction('bladeRaw')
            || this.callLexerFunction('bladeEscaped')
            || this.callLexerFunction('bladeUnescaped')
            || this.callLexerFunction('bladeJavascript')
            || this.callLexerFunction('bladeDirectives')
            || this.callLexerFunction('tag')
            || this.callLexerFunction('filter')
            || this.callLexerFunction('blockCode')
            || this.callLexerFunction('code')
            || this.callLexerFunction('id')
            || this.callLexerFunction('dot')
            || this.callLexerFunction('className')
            || this.callLexerFunction('attrs')
            || this.callLexerFunction('attributesBlock')
            || this.callLexerFunction('indent')
            || this.callLexerFunction('text')
            || this.callLexerFunction('textHtml')
            || this.callLexerFunction('comment')
            || this.callLexerFunction('slash')
            || this.callLexerFunction('colon')
            || this.fail();
    };
};