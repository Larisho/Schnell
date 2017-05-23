"use strict";

/**
 * @author Gabriele Bianchet-David
 * @version 0.0.1
 *
 * @description Cross-platform terminal
 *
 * File that handles parsing the syntax and creating
 * an AST of sorts.
 */

const errors = require('./errors');

/**
 * @deprecated Abstract Syntax Tree no longer needed for evaluation.
 *
 * Iterate through input tokens and create an
 * Abstract Syntax Tree. Also, check for syntax issues.
 * @param inputTokens array of strings
 * @return Array of Objects
 */

function checkSyntax(inputTokens) {
    let AST = [];

    let Stack = [];

    for (let i = 0; i < inputTokens.length; i++) {

        if (inputTokens[i][0] === '"' || inputTokens[i][0] === "'") {
            let type = inputTokens[i][0] === '"' ? "dq-string" : "sq-string";
            let input = inputTokens[i].substring(1, inputTokens[i].length - 1);
            AST.push({tokenType: type, value: input});
        }
        else {
            for (let k = 0; k < inputTokens[i].length; k++) {

                let char = inputTokens[i][k];
                switch (char) {
                    case '{':
                        Stack.push(char);
                        break;
                    case '}':
                        if (Stack.peek() === '{')
                            Stack.pop();
                        else
                            Stack.push(char);
                        break;
                    case '[':
                        Stack.push(char);
                        break;
                    case ']':
                        if (Stack.peek() === '[')
                            Stack.pop();
                        else
                            Stack.push(char);
                        break;
                    default:
                        break;
                }
            }

            if (i === 0) {
                AST.push({tokenType: "program-name", value: inputTokens[i]});
            }
            else if (inputTokens[i][0] === '-' || inputTokens[i][0] === '--') {
                AST.push({tokenType: "switch", value: inputTokens[i]});
            }
            else {
                AST.push({tokenType: "sub-option", value: inputTokens[i]});
            }
        }

    }

    if (Stack.length > 0) {
        throw new errors.SyntaxError("Unmatched Delimiter", "'" + Stack.peek() + "'");
    }

    return AST;
}

Array.prototype.peek = function() {
    return this[this.length - 1];
};

module.exports = checkSyntax;