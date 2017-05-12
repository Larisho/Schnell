/*
 * Contains the logic of execution of the shell commands.
 */

"use strict";

const builtins = require('./builtins');

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
    if (inputAST[0].value === "man") {
        console.log("No manual files available");
        return "No manual files available";
    }

    return builtins[inputAST[0].value](inputAST.slice(1));
}

exports = module.exports = evaluate;