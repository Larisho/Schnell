"use strict";

const path = require('path');
const fs = require('fs');
const stdout = require('./schnell').toStdout;
const stderr = require('./schnell').toStderr;
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

function cat() {

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

function man() {
    return 'There are no manual pages available';
}

module.exports = builtins;