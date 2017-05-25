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
};