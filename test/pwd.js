"use strict";

const errors = require('../dist/errors');

let should = require('chai').should();
let builtins = require('../dist/builtins');

process.env.NODE_ENV = 'test';

module.exports = function() {
    it('should print the working directory correctly', function() {
        let actualOutput = builtins.pwd();
        let expectedOutput = process.cwd();

        actualOutput.should.equal(expectedOutput);
    });

    it('should return help error message when garbage is passed as a parameter', function() {
        should.Throw(function() {
            builtins.pwd(['dwandwakn']);
        }, errors.CommandUseError);
    });

    it('should return help error message when tons garbage is passed as a parameter', function() {
        should.Throw(function() {
            builtins.pwd(['dwandwakn', 'wndawi', 'waidnaiwdnwa']);
        }, errors.CommandUseError);
    });
};