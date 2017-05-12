"use strict";

const path = require('path');

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
    ping: ping
};

/**
 * Changes the current, working directory.
 *
 * @param rest Switches and Arguments
 * @return string STDOUT
 */
function cd(...rest) {

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

    if (args && args.length > 0) {
        if (args.length > 1) {
            return 'Too many arguments.\n' + usage;
        }
        if (args[0].value === "--help" || args[0].value === "-h") {
            return usage;
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

exports = module.exports = builtins;