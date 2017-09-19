'use strict';

const parse = require('pug-parser');

module.exports = function() {
    var Blade = parse.Parser.prototype;
    /**
     * Parse blade directives
     * @return {object}
     */
    Blade.parseDirectives = function () {
        var tok = this.expect('bladeDirectives');
        var node = {
            type: 'InterpolatedTag',
            name: tok.name,
            val: tok.val,
            line: tok.line,
            column: tok.col,
            filename: this.filename,
            statements: tok.statements,
        };

        // type: 'bladeDirectives',
        //     line: 1,
        //     col: 1,
        //     val: '($test)',
        //     name: '@if',
        //     statements: true

        var block;

        // handle block
        block = 'indent' == this.peek().type;
        if (block) {
            block = this.block();
        }

        // handle missing block
        if (tok.requiresBlock && !block) {
            block = this.emptyBlock(tok.line + 1);
        }

        node.block = block;

        return node;
    };
    /**
     *   tag
     * | doctype
     * | mixin
     * | include
     * | filter
     * | comment
     * | text
     * | text-html
     * | dot
     * | each
     * | code
     * | yield
     * | id
     * | class
     * | interpolation
     */

    Blade.parseExpr = function(){
        switch (this.peek().type) {
            case 'bladeDirectives':
                return this.parseDirectives();
            case 'tag':
                return this.parseTag();
            case 'mixin':
                return this.parseMixin();
            case 'block':
                return this.parseBlock();
            case 'mixin-block':
                return this.parseMixinBlock();
            case 'case':
                return this.parseCase();
            case 'extends':
                return this.parseExtends();
            case 'include':
                return this.parseInclude();
            case 'doctype':
                return this.parseDoctype();
            case 'filter':
                return this.parseFilter();
            case 'comment':
                return this.parseComment();
            case 'text':
            case 'interpolated-code':
            case 'start-pug-interpolation':
                return this.parseText({block: true});
            case 'text-html':
                return this.initBlock(this.peek().line, this.parseTextHtml());
            case 'dot':
                return this.parseDot();
            case 'each':
                return this.parseEach();
            case 'code':
                return this.parseCode();
            case 'blockcode':
                return this.parseBlockCode();
            case 'if':
                return this.parseConditional();
            case 'while':
                return this.parseWhile();
            case 'call':
                return this.parseCall();
            case 'interpolation':
                return this.parseInterpolation();
            case 'yield':
                return this.parseYield();
            case 'id':
            case 'class':
                this.tokens.defer({
                    type: 'tag',
                    val: 'div',
                    line: this.peek().line,
                    col: this.peek().col,
                    filename: this.filename
                });
                return this.parseExpr();
            default:
                var pluginResult = this.runPlugin('expressionTokens', this.peek());
                if (pluginResult) return pluginResult;
                this.error('INVALID_TOKEN', 'unexpected token "' + this.peek().type + '"', this.peek());
        }
    }
};