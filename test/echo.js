"use strict";

const errors = require('../dist/errors');

let should = require('chai').should();
let builtins = require('../dist/builtins');

process.env.NODE_ENV = 'test';

module.exports = function() {
    it('should take my input and return it in a string', function() {
        let string = "Hello world!\nHello World!";
        let stdout = builtins.echo(string.split(' '));
        stdout.should.equal(string);
    });
};