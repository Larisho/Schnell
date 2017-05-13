"use strict";

/**
 * @author Gabriele Bianchet-David
 * @version 0.0.1
 *
 * @description Cross-platform terminal
 *
 * Implementation of custom error classes.
 */

class BashError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name;
    }

    getErrorMessage() {
        return ('Error: Something went wrong with the shell! ' + this.message);
    }
}

class CommandError extends BashError {

    getErrorMessage() {
        return ('Error: Command "' + this.message + '" cannot be found');
    }
}

class CommandUseError extends BashError {

    getErrorMessage() {
        return ('Unrecognized input - ' + this.message);
    }
}

class DirError extends BashError {

    getErrorMessage() {
        return ('Error: "' + this.message + '" does not exist');
    }
}

class FileError extends BashError {

    getErrorMessage() {
        return ('Error: File "' + this.message + '" does not exist');
    }
}

module.exports = {
    BashError,
    CommandError,
    CommandUseError,
    DirError,
    FileError
};