"use strict";

const errors = require('../dist/errors');
const fs = require('fs');
const path = require('path');

let should = require('chai').should();
let builtins = require('../dist/builtins');

process.env.NODE_ENV = 'test';

module.exports = function () {
    it('should create a new empty file when used with a new file name', function () {
        let newFile = 'temp';

        builtins.touch([newFile]);
        fs.existsSync(process.cwd() + path.sep + newFile).should.equal(true);
        fs.unlinkSync(process.cwd() + path.sep + newFile);
    });

    it('should not create an empty file when used with a new file name and the "-c" flag', function () {
        let newFile = 'temp';

        builtins.touch([newFile, '-c']);
        fs.existsSync(process.cwd() + path.sep + newFile).should.equal(false);
    });

    it('should change the access time of a file to the current time on the "-a" flag', function () {
        let command = '-a touch.js';

        builtins.touch(command.split(" "));

        let stats = fs.statSync(process.cwd() + path.sep + "touch.js");
        stats.atime.getTime().should.be.closeTo(Date.now(), 1000);
    });

    it('should change the modification time of a file to the current time on the "-m" flag', function () {
        let command = '-m touch.js';

        builtins.touch(command.split(" "));

        let stats = fs.statSync(process.cwd() + path.sep + "touch.js");
        stats.mtime.getTime().should.be.closeTo(Date.now(), 1000);
    });

    it('should change the access and modification time of a file based on the values for a given file (-r)', function () {
        let command = '-r test.js touch.js';

        builtins.touch(command.split(' '));
        let oldStats = fs.statSync(process.cwd() + path.sep + 'touch.js');
        let newStats = fs.statSync(process.cwd() + path.sep + 'test.js');

        oldStats.atime.getTime().should.equal(newStats.atime.getTime());
        oldStats.mtime.getTime().should.equal(newStats.mtime.getTime());
    });

    it('should change the access and modification time of a file based on a given input string (-t)', function () {
        let time = "May 24 2017 23:23:23";
        let newDate = new Date(time);

        builtins.touch('-t "May 24 2017 23:23:23" touch.js'.split(" "));
        let stats = fs.statSync(process.cwd() + path.sep + 'touch.js');

        stats.atime.getTime().should.equal(newDate.getTime());
        stats.mtime.getTime().should.equal(newDate.getTime());
    });

    it('should fail when no file names are supplied', function () {
        should.Throw(function() {
            builtins.touch(['-c']);
        }, errors.CommandUseError);
    });

    it('should set time to current time when the "-t" flag argument is incorrectly written', function () {
        let timeFlag = '-t "32 dec 00 11am" temp';
        let newTime = Date.now();
        builtins.touch(timeFlag.split(" "));

        let stats = fs.statSync(process.cwd() + path.sep + "temp");
        stats.atime.getTime().should.be.closeTo(newTime, 1000)
    });

    it('should be able to create multiple new files when many file names are supplied', function () {
        let newFiles = [
            'temp',
            'temp1',
            'temp2',
            'temp3'
        ];

        builtins.touch(newFiles);
        newFiles.forEach(function (value) {
            fs.existsSync(process.cwd() + path.sep + value).should.equal(true);
        });
        newFiles.forEach(function (value) {
            fs.unlinkSync(process.cwd() + path.sep + value);
        });
    });
};