"use strict";

/**
 * @author Gabriele Bianchet-David
 * @version 0.0.1
 *
 * @description Cross-platform terminal
 * @deprecated
 *
 * Contains everything having to do with parsing the input.
 */

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