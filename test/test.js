var expect = require('chai').expect;

describe('postcss-loader', function () {

    it('processes CSS with default plugins', function () {
        var css = require('!raw-loader!../!./cases/style.css');
        expect(css).to.eql('a { color: red }\r\n');
    });

    it('processes CSS with custom plugins', function () {
        var css = require('!raw-loader!../?pack=blues!./cases/style.css');
        expect(css).to.eql('a { color: blue }\r\n');
    });

    it('processes CSS in safe mode', function () {
        var css = require('!raw-loader!' +
                          '../?parser=postcss-safe-parser!' +
                          './cases/broken.css');
        expect(css).to.eql('a { color:\r\n}');
    });

    it('lets other plugins alter the used plugins', function () {
        var css = require('!raw-loader!../?rewrite=true!./cases/style.css');
        expect(css).to.eql('a { color: black }\r\n');
    });

    it('processes CSS-in-JS', function () {
        var css = require('!raw-loader!' +
                          '../?parser=postcss-js!' +
                          './cases/style.js');
        expect(css).to.eql('a {\n    color: red\n}');
    });

    it('processes CSS with exec', function () {
        var css = require('!raw-loader!' +
                          '../?exec!' +
                          './cases/exec.js');
        expect(css).to.eql('a {\n    color: green\n}');
    });

    it('inlines map', function () {
        var css = require('!raw-loader!../?sourceMap=inline!./cases/style.css');
        expect(css).to.include('/*# sourceMappingURL=');
    });

    it('initializes plugins from serializable options', function () {
        var css = require('!raw-loader!../?pack=declarePlugins!./cases/style.css');
        expect(css).to.eql('a { color: blue }\r\n');
    });

});
