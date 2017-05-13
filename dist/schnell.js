"use strict";

/**
 * @author Gabriele Bianchet-David
 * @version 0.0.1
 *
 * @description Cross-platform terminal
 *
 * Main file in the Schnell application. Sets up the CLI and calls
 * the Read, Evaluate, Print, Loop.
 */

/***************************************** IMPORTS ******************************************************************/

// Import read-line module to read lines from command line
const readLine = require('readline');

// Import OS for cross platform EOL
const os = require('os');

// Node.js version of NCurses' color manipulation features
const colors = require('colors');

// Import the UNIX Shell commands
const builtins = require('./builtins');

// Import the parser
const parser = require('./parse');

// Import syntactic checker
// const checkSyntax = require('./syntax');

// Import evaluation module
const evaluate = require('./evaluation');

// Import the errors
const errors = require('./errors');

/*************************************END IMPORTS*******************************************************************/

/**************************************CONSTANTS********************************************************************/

// Defining cross-plat constant for EOL
const EOL = os.EOL;

// Create the CLI instance
const cli = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: null
});

colors.setTheme({
    prompt: ['green', 'bold'],
    stdout: ['bold', 'gray'],
    stderr: ['red', 'underline']
});

/***********************************END CONSTANTS*******************************************************************/

/**************************************HELPER FUNCTIONS*************************************************************/


function toStdout(text) {
    process.stdout.write(text.stdout + EOL + EOL);
}

function toStderr(text) {
    process.stderr.write(text.stderr + EOL + EOL);
}

function buildPrompt() {
    let str = os.userInfo()['username'] + "@" + os.hostname() + " " + builtins.pwd() + ">" + EOL + "$ ";
    return str.prompt;
}

function mainLoop(line) {
    try {

        let output = evaluate(parser(line.trim())) || "";

        toStdout(output);

    } catch (e) {
        if (e instanceof errors.BashError)
            toStderr(e.getErrorMessage());
        else
            toStderr(e);
    }

    // Rebuild prompt
    prompt = buildPrompt();
    cli.setPrompt(prompt, prompt.length);
    cli.prompt();
}

function onInterrupt() {
    toStdout("Exiting...");
    process.exit(0);
}

/**********************************END HELPER FUNCTIONS*************************************************************/

/*********************************************MAIN******************************************************************/

let prompt = buildPrompt();

// Set the prompt
cli.setPrompt(prompt, prompt.length);

// Start prompt loop
cli.prompt();

cli.on('line', mainLoop)
    .on('close', onInterrupt);


module.exports = {
    toStderr,
    toStdout
};