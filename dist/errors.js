/*
 * Implementation of custom error classes.
 */

"use strict";

class BashError extends Error {
    constructor(message, errorHint) {
        super(message);

        this.name = this.constructor.name;
        if (errorHint)
            this.errorHint = errorHint;
    }

    printError() {
        console.log(this.message + ': ' + this.errorHint);
    }
}

class SyntaxError extends BashError {
    constructor(message, where) {
        super(message);

        this.name = this.constructor.name;
        this.errorHint = where;
    }

    printError() {
        console.log(this.message + ': [ ' + this.errorHint + ' ]');
    }
}

module.exports = {
    BashError,
    SyntaxError
};