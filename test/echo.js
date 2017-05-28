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

    it('should take many inputs and print all of it correctly', function() {
        let str1 = "hello world";
        let str2 = "bloop blah";
        let str3 = "blah blah blah";
        let str4 = "\n\n\nhehehe";
        let str5 = "\t\t\n\t\n\tbah";

        let v1 = str1 + str2 + str3 + str4 + str5;
        let v2 = str1.split(' ')
            .concat(str2.split(' '))
            .concat(str3.split(' '))
            .concat(str4.split(' ')).concat(str5.split(' '));

        let stdout1 = builtins.echo(v1.split(' '));
        let stdout2 = builtins.echo(v2);

        stdout1.should.equal(v1);
        stdout2.should.equal(v2.join(' '));
    });

    it('should error out when not supplying any arguments', function() {
        should.Throw(function() {
            builtins.echo([]);
        }, errors.CommandUseError)
    });
};