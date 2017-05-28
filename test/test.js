"use strict";

const pwd = require('./pwd');
const cd = require('./cd');
const touch = require('./touch');
const echo = require('./echo');
const cat = require('./cat');

process.env.NODE_ENV = 'test';

describe('builtins', function() {
    describe('#pwd', pwd);
    describe('#cd', cd);
    describe('#touch', touch);
    describe('#echo', echo);
    describe('#cat', cat);
});