"use strict";

/**
 * @author Gabriele Bianchet-David
 * @version 0.0.9
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

// Import the utilities class
const util = require('./util');

// Import the UNIX Shell commands
const builtins = require('./builtins');

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

/***********************************END CONSTANTS*******************************************************************/

/**************************************HELPER FUNCTIONS*************************************************************/

function buildPrompt() {
    let str = os.userInfo()['username'] + "@" + os.hostname() + " " + builtins.pwd() + ">" + EOL + "δ ";
    return util.promptColour(str);
}

function mainLoop(line) {
    try {

        let output = evaluate(parse(line.trim())) || "";

        util.write(false, output);

        if (output === "Exiting...")
            process.exit(0);

    } catch (e) {
        if (e instanceof errors.BashError)
            util.write(true, e.getErrorMessage() + EOL);
        else if (e instanceof errors.ScriptError)
            util.write(true, e.getErrorMessage() + EOL);
        else
            util.write(true, e + EOL);
    }

    // Rebuild prompt
    prompt = buildPrompt();
    cli.setPrompt(prompt, prompt.length);
    cli.prompt();
}

function onInterrupt() {
    util.write(false, "Exiting...");
    process.exit(0);
}

function parse(userInput) {
    // tokenize the input
    return userInput.split(" ");
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
