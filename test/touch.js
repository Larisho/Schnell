"use strict";

const errors = require('../dist/errors');
const fs = require('fs');
const path = require('path');

let should = require('chai').should();
let builtins = require('../dist/builtins');

process.env.NODE_ENV = 'test';

module.exports = function() {
    it('should create a new empty file when used with a new file name', function() {
        let newFile = 'temp';

        builtins.touch([newFile]);
        fs.existsSync(process.cwd() + path.sep + newFile).should.equal(true);
        fs.unlinkSync(process.cwd() + path.sep + newFile);
    });

    it('should not create an empty file when used with a new file name and the "-c" flag', function() {
        let newFile = 'temp';

        builtins.touch([newFile, '-c']);
        fs.existsSync(process.cwd() + path.sep + newFile).should.equal(false);
    });

    it('should change the access time of a file to the current time on the "-a" flag', function() {

    });

    it('should change the modification time of a file to the current time on the "-m" flag', function() {

    });

    it('should change the access and modification time of a file based on the values for a given file (-r)', function() {

    });

    it('should change the access and modification time of a file based on a given input string (-t)', function() {

    });

    it('should fail when no file names are supplied', function() {

    });

    it('should fail when the "-t" flag argument is incorrectly written', function() {

    });

    it('should be able to create multiple new files when many file names are supplied', function() {

    });
};