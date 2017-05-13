/*
 * Contains everything having to do with parsing the input.
 */

"use strict";

const errors = require('./errors');

class Parser {
    constructor() {
        // Argument vector
        this.argv = ["Nothing parsed"];

        // Argument count
        this.argc = 0;
    }

    parse(userInput) {
        // tokenize the input
        let raw = userInput.split(" ");
        let argv = [];

        for (let i = 0; i < raw.length; i++) {

            // If argv[i] is the beginning of a string make the
            // whole string a token
            if (raw[i][0] === '"' || raw[i][0] === "'") {

                if (raw[i][raw[i].length - 1] === "'" || raw[i][raw[i].length - 1] === '"') {
                    argv.push(raw[i]);
                    continue;
                }

                if (raw[i] === undefined) {
                    throw new errors.SyntaxError("Unterminated String", raw.join(' '));
                }

                // Save the appropriate delimiter
                let artifact = raw[i][0];
                // Build string here
                let totalString = '';
                // Get length of word at 'i'
                let length = raw[i].length - 1;

                // Iterate through the rest of the text until
                // a matching operator is found.
                while (raw[i][length] !== artifact) {

                    // Append next word to total string
                    totalString += raw[i] + ' ';
                    // Increment 'i'
                    i++;

                    // If that operator is not found,
                    // throw a syntax error.
                    if (i >= raw.length) {
                        // throw error!
                        throw new errors.SyntaxError("Unterminated String", totalString);
                    }

                    // Get length of next word
                    length = raw[i].length - 1;
                }
                // Add final piece of string to total
                totalString += raw[i];
                // Push new token onto argument vector
                argv.push(totalString);
            }
            else {
                // Push new token onto argument vector
                argv.push(raw[i]);
            }
        }

        this.argv = argv.filter((val) => {
            return val !== '';
        });
        this.argc = this.argv.length;
    }
}

module.exports = Parser;