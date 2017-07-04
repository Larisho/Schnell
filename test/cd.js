"use strict";

const errors = require('../dist/errors');
const path = require('path');
const os = require('os');

let should = require('chai').should();
let builtins = require('../dist/builtins');

process.env.NODE_ENV = 'test';

module.exports = function() {

    beforeEach(function() {
        process.chdir(__dirname);
    });

    it('should move up a directory on "../"', function() {
        let currDirArray = process.cwd().split(path.sep);
        builtins.cd(['../']);
        let newDirArray = process.cwd().split(path.sep);

        newDirArray.length.should.equal(currDirArray.length - 1);

        // "Cleverly" remove the last dir from the path and check if old and new path are identical
        let currDirStringMinusOne = currDirArray.slice(0, currDirArray.length - 1).join(path.sep);

        currDirStringMinusOne.should.equal(newDirArray.join(path.sep));
    });

    it('should go to the home directory on "~"', function() {
        builtins.cd(['~']);
        let newDir = process.cwd();

        newDir.should.equal(os.homedir());
    });

    it('should go to the home directory on no parameters', function() {
        builtins.cd([]);
        let newDir = process.cwd();

        newDir.should.equal(os.homedir());
    });

    it('should arrive at the same directory it started after "../" and "test"', function() {
        let currDir = process.cwd();
        builtins.cd(['../']);
        builtins.cd(['test']);

        let newDir = process.cwd();

        newDir.should.equal(currDir);
    });

    it('should accept an absolute path and change the directory to it', function() {
        let actualPath = os.homedir();

        builtins.cd([actualPath]);

        process.cwd().should.equal(actualPath);
    });

    it('should accept a relative path and change the directory to it', function() {
        should.not.Throw(function() {
            builtins.cd(['../../Schnell']);
        }, errors.DirError);

        let expectedPath = __dirname.split(path.sep);
        expectedPath = expectedPath.slice(0, expectedPath.length - 1);

        process.cwd().should.equal(expectedPath.join(path.sep));
    });

    it('should error out when given incorrect parameters', function() {
        should.Throw(function() {
            builtins.cd(['blah', 'bloop', 'bleep']);
        }, errors.CommandUseError);
    });

};