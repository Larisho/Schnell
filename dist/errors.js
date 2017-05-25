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

class ScriptError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name;
    }

    getErrorMessage() {
        return this.message;
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

class ArgumentsError extends BashError {

    getErrorMessage() {
        return ('Error parsing argument: ' + this.message);
    }
}

class DirError extends BashError {

    getErrorMessage() {
        return ('Error: Directory "' + this.message + '" does not exist');
    }
}

class FileError extends BashError {

    getErrorMessage() {
        return ('Error: File "' + this.message + '" does not exist');
    }
}

module.exports = {
    BashError,
    ScriptError,
    CommandError,
    CommandUseError,
    ArgumentsError,
    DirError,
    FileError
};