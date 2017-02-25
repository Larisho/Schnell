/*
 * Main File to set up the CLI.
 */

"use strict";
// Import Readline module to read lines from command line
const readLine = require('readline');
// Import OS for cross platform EOL
const os = require('os');
// Import the parser
const parser = require('./parse')();
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
    parser.parse(line);
    rl.prompt();
}).on('close', () => {
    console.log(EOL + "Exiting...");
    process.exit(0);
});
