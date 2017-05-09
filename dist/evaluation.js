/*
 * Contains the logic of execution of the shell commands.
 */

"use strict";

const shell = require('shelljs');

/**
 * Takes the AST and executes the appropriate commands.
 *
 * @param inputAST AST received from syntax analysis
 * @return String
 */

function evaluate(inputAST) {
    shell[inputAST[0].value](inputAST[1].value);
}

exports = module.exports = evaluate;