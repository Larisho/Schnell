"use strict";

/**
 * @author Gabriele Bianchet-David
 * @version 0.0.9
 *
 *
 * @description Cross-platform terminal
 *
 * Utility functions
 */

const chalk = require("chalk");

const stdoutColour = chalk.white;
const stderrColour = chalk.bold.red;
const promptColour = chalk.green.bold;

function write(isError, ...rest) {
    if (isError)
        stderrColour(console.error(rest.join("")));
    else
        stdoutColour(console.log(rest.join("")));
}

module.exports = {
    stdoutColour,
    stderrColour,
    promptColour,
    write
};