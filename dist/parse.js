/*
 * Contains everything having to do with parsing the input.
 */

"use strict";

function Parser() {
    if (!(this instanceof Parser)) {
        return new Parser();
    }

    /*
     // Argument vector
     this.argv = [];

     // Argument count
     this.argc = 0;
     */

}

Parser.prototype.parse = function (userInput) {
    // tokenize the input
    let raw = userInput.split(" ");
    let argv = [];

    for (let i = 0; i < raw.length; i++) {

        // If argv[i] is the beginning of a string make the
        // whole string a token
        if (raw[i][0] === '"' || raw[i][0] === "'") {

            // Save the appropriate delimiter
            let artifact = raw[i][0];
            // Build string here
            let totalString = '';
            // Get length of word at 'i'
            let length = raw[i].length - 1;

            // Iterate through the rest of the text until
            // a matching operator is found.
            do {

                // If that operator is not found,
                // throw a syntax error.
                if (i > raw.length) {
                    // throw error!
                    console.log('You done goofed!');
                    process.exit(1);
                }

                // Append next word to total string
                totalString += raw[i] + ' ';
                // Increment 'i'
                i++;
                // Get length of next word
                length = raw[i].length - 1;
            } while (raw[i][length] !== artifact);
            argv.push(totalString.trim());
        }
        else {
            argv.push(raw[i]);
        }
    }

    console.log(argv);
};

exports = module.exports = Parser;