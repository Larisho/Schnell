"use strict";

// Node.js version of NCurses
let colors = require('colors');

colors.setTheme({
    prompt: ['bold', 'gray'],
    error: ['red', 'underline']
});

let builtins = {
    cd: cd,
    ls: ls,
    cp: cp,
    chmod: chmod,
    echo: echo,
    cat: cat,
    find: find,
    mkdir: mkdir,
    head: head,
    mv: mv,
    pwd: pwd,
    rm: rm,
    tail: tail,
    touch: touch,
    which: which,
    ping: ping
};

function cd() {

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

function head() {

}

function mv() {

}

function pwd() {

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