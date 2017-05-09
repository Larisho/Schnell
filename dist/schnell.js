/*
 * Main File to set up the CLI.
 */

"use strict";

// Import Readline module to read lines from command line
const readLine = require('readline');

// Import OS for cross platform EOL
const os = require('os');

// Import the UNIX Shell commands from ShellJS
const shell = require('shelljs');

// Import the parser
const parse = require('./parse');
let parser = new parse();

// Import syntactic checker
const checkSyntax = require('./syntax');

// Import evaluation module
const evaluate = require('./evaluation');

// Import the errors
const errors = require('./errors');

// Defining cross-plat constant for EOL
let EOL = os.EOL;

// Defining prompt
let prompt = os.userInfo().username + "@" + os.hostname() + " " + shell.pwd() + ">" + EOL + "$ ";

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

    let prompt = os.userInfo().username + "@" + os.hostname() + " " + shell.pwd() + ">" + EOL + "$ ";
    rl.setPrompt(prompt, prompt.length);
    rl.prompt();
}).on('close', () => {
    console.log(EOL + "Exiting...");
    process.exit(0);
});
