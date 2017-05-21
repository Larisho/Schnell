"use strict";

/**
 * @author Gabriele Bianchet-David
 * @version 0.0.1
 *
 * @description Cross-platform terminal
 *
 * Evaluate user input string function
 */

const builtins = require('./builtins');
const errors = require('./errors');

/**
 * Takes the AST and executes the appropriate commands.
 *
 * @param input AST received from syntax analysis
 * @return string STDOUT
 */

function evaluate(input) {

    if (input[0] === "")
        return "";

    if (input[0] === "exit") {
        return "Exiting...";
    }
    try {
        if (input.length < 2)
            return builtins[input[0]]([]);
        else
            return builtins[input[0]](input.slice(1));
    } catch (e) {
        if (e instanceof TypeError) {
            throw new errors.CommandError(input[0]);
        }
        else {
            throw e;
        }
    }
}

module.exports = evaluate;