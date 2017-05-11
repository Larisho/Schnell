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

    if (inputAST[0].value === "exit") {
        console.log("Exiting...");
        process.exit(0);
    }

    let returnValue = shell[inputAST[0].value](inputAST[1].value);

    console.log(returnValue.stdout);
}

exports = module.exports = evaluate;