"use strict";

/*
 * Main File to set up the CLI.
 */

/***************************************** IMPORTS ******************************************************************/

// Import Readline module to read lines from command line
const readLine = require('readline');

// Import OS for cross platform EOL
const os = require('os');

// Node.js version of NCurses
const colors = require('colors');

// Import the UNIX Shell commands from ShellJS
const builtins = require('./builtins');

// Import the parser
const parse = require('./parse');

// Import syntactic checker
const checkSyntax = require('./syntax');

// Import evaluation module
const evaluate = require('./evaluation');

// Import the errors
const errors = require('./errors');

/*************************************END IMPORTS*******************************************************************/


/**************************************CONSTANTS********************************************************************/

// Defining cross-plat constant for EOL
const EOL = os.EOL;

// Defining prompt
const prompt = os.userInfo().username + "@" + os.hostname() + " " + builtins.pwd() + ">" + EOL + "$ ";

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

// Create parser object
const parser = new parse();

/***********************************END CONSTANTS*******************************************************************/

/**************************************HELPER FUNCTIONS*************************************************************/

function buildPrompt() {

}

function mainLoop(line) {
    try {
        parser.parse(line);

        console.log(parser.argv + EOL);

        let AST = checkSyntax(parser.argv);

        console.log(AST);

        evaluate(AST);
    } catch (e) {
        if (e.name === 'SyntaxError')
            e.printError();
        else
            console.log(e);
    }

    let prompt = os.userInfo().username + "@" + os.hostname() + " " + builtins.pwd() + ">" + EOL + "$ ";
    cli.setPrompt(prompt, prompt.length);
    cli.prompt();
}

function onInterrupt() {
    console.log(EOL + "Exiting...");
    process.exit(0);
}

// Set the prompt
cli.setPrompt(prompt, prompt.length);

// Start prompt loop
cli.prompt();

cli.on('line', mainLoop)
    .on('close', onInterrupt);
