"use strict";

const errors = require('../dist/errors');

let should = require('chai').should();
let builtins = require('../dist/builtins');
let fs = require('fs');

process.env.NODE_ENV = 'test';

module.exports = function() {
    it('should print out the contents of a file', function() {
        let expected = fs.readFileSync('cat.js', 'utf8');
        let actual = builtins.cat(['cat.js']);

        actual.should.equal(expected);
    });

    it('should print out the concatenated contents of many files', function() {
        let arrayOfFiles = ['cat.js', 'cd.js', 'echo.js'];
        let expected = '';
        arrayOfFiles.forEach(function(value) {
            expected += fs.readFileSync(value, 'utf8');
        });

        let actual = builtins.cat(arrayOfFiles);

        actual.should.equal(expected);
    });

    it('should error out when not supplying any arguments', function() {
        should.Throw(function() {
            builtins.cat([]);
        }, errors.CommandUseError)
    });
};