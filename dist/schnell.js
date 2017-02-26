/*
 * Main File to set up the CLI.
 */

"use strict";

// Import Readline module to read lines from command line
const readLine = require('readline');

// Import OS for cross platform EOL
const os = require('os');

// Import the parser
const parse = require('./parse');
let parser = new parse();

const errors = require('./errors');

// Defining cross-plat constant for EOL
let EOL = os.EOL;

// Defining prompt
let prompt = "$ ";

// Create the CLI instance
let rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: null
});

// Set the prompt
rl.setPrompt(prompt, prompt.length);

// Start prompt loop
rl.prompt();

rl.on('line', (line) => {
    try {
        parser.parse(line);
    } catch (e) {
        if (e.name === 'SyntaxError')
            e.printError();
    }
    console.log(parser.argv);

    evaluate(parser.argv);

    rl.prompt();
}).on('close', () => {
    console.log(EOL + "Exiting...");
    process.exit(0);
});
