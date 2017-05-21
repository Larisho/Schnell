"use strict";

/**
 * @author Gabriele Bianchet-David
 * @version 0.0.1
 *
 * @description Cross-platform terminal
 *
 * Implementation of built in commands
 */

const path = require('path');
const fs = require('fs');
const util = require('./util');
const errors = require('./errors');

let builtins = {
    cd: cd,
    ls: ls,
    cp: cp,
    chmod: chmod,
    echo: echo,
    cat: cat,
    find: find,
    mkdir: mkdir,
    rmdir: rmdir,
    head: head,
    mv: mv,
    pwd: pwd,
    rm: rm,
    tail: tail,
    touch: touch,
    which: which,
    ping: ping,
    js: js,
    man: man
};

/**
 * Changes the current, working directory.
 *
 * @param input Switches and Arguments
 * @return string STDOUT
 */
function cd(input) {

    let usage = 'Usage: cd [PATH]';
    let dir = input[0];

    if (input.length === 1) {
        if (path.isAbsolute(dir)) {
            if (fs.existsSync(dir))
                process.chdir(dir);
            else
                throw new errors.DirError(dir);
        }
        else {
            dir = path.normalize(dir);
            process.chdir(dir);
        }
    }
    else if(input.length === 0) {
        return "This behaviour has not been defined yet";
    }
    else {
        throw new errors.CommandUseError(usage);
    }
}

function ls() {

}

function cp() {

}

function chmod() {

}

function echo() {

}

function cat(input) {

}

function find() {

}

function mkdir() {

}

function rmdir() {

}

function head() {

}

function mv() {

}

/**
 * Print the present working directory.
 *
 * @param args Array of tokenized STDIN
 * @return string STDOUT
 */
function pwd(args) {

    const usage = "Usage: pwd [--help]";

    if (args) {
        if (args[0] === "--help" || args[0] === "-h") {
            return usage;
        }
        else {
            throw new errors.CommandUseError(usage);
        }

    }

    return path.resolve(process.cwd());
}

function rm() {

}

function tail() {

}

function touch() {

}

function which() {

}

function ping() {

}

/**
 * Allows the user to execute JS code on the system
 * @param input
 * @returns {string}
 */
function js(input) {
    let writeFunc = "function write(...input){process.stdout.write(input.join())} ";
    let code = writeFunc + input.join(" ");
    util.write(false, code);
    let func = new Function(code);

    try {
        func();
        return "";
    }
    catch (e) {
        throw new errors.ScriptError(e.message);
    }
}

function man() {
    return 'There are no manual pages available';
}

module.exports = builtins;