/*
 * Contains everything having to do with parsing the input.
 */

"use strict";

// const errors = require('./errors');

/**
 * @deprecated
 * @param userInput
 * @returns Array
 */
function parser(userInput) {
    // tokenize the input
    return userInput.split(" ");
}


module.exports = parser;