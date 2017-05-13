/*
 * Contains the logic of execution of the shell commands.
 */

"use strict";

const colors = require('colors');
const builtins = require('./builtins');
const errors = require('./errors');

/**
 * Takes the AST and executes the appropriate commands.
 *
 * @param input AST received from syntax analysis
 * @return string STDOUT
 */

function evaluate(input) {

    if (input[0] === "exit") {
        process.stdout.write("Exiting...\n".gray.bold);
        process.exit(0);
    }

    try {
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