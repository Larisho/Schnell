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
const os = require('os');
const fs = require('fs');
const clear = require('clear');
const util = require('./util');
const errors = require('./errors');

let builtins = {
    cd: cd,
    ls: ls,
    cp: cp,
    chmod: chmod,
    echo: echo,
    cat: cat,
    clear: clear,
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

    let flag = fs.existsSync(dir);

    if (!flag && input.length <= 1) {
        if (dir === '~') {
            process.chdir(os.homedir());
            return "";
        }
        if (!dir) {
            process.chdir(os.homedir());
            return "";
        }

        throw new errors.DirError(dir);
    }
    else {
        if (input.length === 1) {
            if (path.isAbsolute(dir)) {
                process.chdir(dir);
                return "";
            }
            else {
                dir = path.normalize(dir);
                process.chdir(dir);
                return "";
            }
        }
        else {
            throw new errors.CommandUseError(usage);
        }
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
 * @param input Array STDIN
 * @return string STDOUT
 */
function pwd(input) {

    const usage = "Usage: pwd [--help]";

    if (input && input.length === 1) {
        if (input[0] === "--help" || input[0] === "-h") {
            return usage;
        }
        else {
            throw new errors.CommandUseError(usage);
        }

    }
    else if (input && input.length > 1)
        throw new errors.CommandUseError(usage);
    else
        return path.resolve(process.cwd());
}

function rm() {

}

function tail() {

}

/**
 * Creates a file with the given name in
 * the directory the user is currently in.
 *
 * @param input Array STDIN
 * @return string STDOUT
 */
function touch(input) {

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

    function writeFunc(...input) {
        process.stdout.write(input.join(""))
    }

    let code = input.join(" ");

    let func = new Function('require', 'write', code);

    try {
        func(require, writeFunc);
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