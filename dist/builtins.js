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
const yargs = require('yargs');
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
 * @param input Array STDIN
 * @return {string} STDOUT
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

/**
 * Sends the arguments to the standard output.
 *
 * @param input Array STDIN
 * @returns {string} STDOUT
 */
function echo(input) {
    let args = yargs.parse(input.join(' '));
    let usage = 'Usage: echo [STRING...]';

    if (!args._ || args._.length < 1)
        throw new errors.CommandUseError(usage);

    return args._.join(' ');
}

/**
 * Concatenates files to STDOUT
 *
 * @param input Array STDIN
 * @return {string} STDOUT
 */
function cat(input) {
    let args = yargs.parse(input.join(' '));
    let usage = 'Usage: cat [FILE...]';

    if (!args._ || args._.length < 1)
        throw new errors.CommandUseError(usage);

    let stdout = '';
    for (let value of args._) {
        if (!path.isAbsolute(value)) {
            value = path.resolve(value);
        }
        if (!fs.existsSync(value)) {
            throw errors.FileError(value);
        }

        stdout += fs.readFileSync(value, 'utf8');
    }

    return stdout;
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
 * @return {string} STDOUT
 */
function pwd(input) {
    const usage = "Usage: pwd";

    if (input && input.length > 0) {
        throw new errors.CommandUseError(usage);
    }
    else {
        return path.resolve(process.cwd());
    }
}

/**
 * Deletes the file or directory.
 *
 * @param input Array STDIN
 * @return {string} STDOUT
 */
function rm(input) {
    /*    let args = yargs
     .boolean('r') // recursive
     .boolean('f') // force
     .boolean('i') // interactive
     .boolean('I') // almost interactive
     .boolean('v') // verbose
     .string('_')
     .parse(input);

     let limit = -1;
     let removeDirs = false;

     if (args.I) {
     limit = 3;
     }
     if (args.i) {
     limit = 1;
     }
     if (args.f) {
     limit = -1;
     removeDirs = true;
     }

     if (args.r) {

     }
     else {
     args._.forEach(function(value) {
     if (args.v) {
     util.write(false, "Removing " + value);
     }

     // remove file
     });
     }*/
}

function tail() {

}

/**
 * Creates a file with the given name in
 * the directory the user is currently in.
 *
 * @param input Array STDIN
 * @return {string} STDOUT
 */
function touch(input) {
    let args = yargs
        .boolean('a') // Change Access time only
        .boolean('c') // If file does not exist, don't create it
        .boolean('m') // Change Mod time only
        .boolean('r') // Use the Access and Mod time of the first file on the second
        .boolean('t') // Creates file with given time as creation value
        .string('_')  // Make sure everything in underscore is a string
        .parse(input.join(' '));

    let usage = 'touch [-a | -c | -m | -r [FILE] | -t [DATE]] [FILE...]';

    if (!args._ || args._.length < 1) {
        throw new errors.CommandUseError(usage);
    }

    if (args.t) {
        args.t = args._[0];

        args._[0] = null;
        args._ = args._.filter((val) => {
            return val !== null;
        });
    }

    for (let value of args._) {
        if (!path.isAbsolute(value)) {
            value = path.resolve(value);
        }
    }

    if (!args.c) {
        args._.forEach(function (val) {
            if (fs.existsSync(val)) {
                let stats = fs.statSync(val);
                if (stats.isDirectory()) {
                    return;
                }
                fs.closeSync(fs.openSync(val, 'a'));
                runChecks(val, stats);
            }
            else {
                fs.closeSync(fs.openSync(val, 'a'));
                let stats = fs.statSync(val);
                runChecks(val, stats);
            }
        });
    }
    if (args.c) {
        args._.forEach(function (val) {
            if (fs.existsSync(val)) {
                let stats = fs.statSync(val);
                runChecks(val, stats);
            }
        });
    }

    function runChecks(filePath, stats) {

        if (!args.t && !args.r) {
            if (args.a) {
                fs.utimesSync(filePath, Date.now() / 1000, stats.mtime);
            }
            if (args.m) {
                fs.utimesSync(filePath, stats.atime, Date.now() / 1000);
            }
        }
        else if (args.r && !args.t) {
            if (args._.length > 1) {
                if ((process.cwd() + path.sep + args._[0]) !== filePath) {
                    let st = fs.statSync(process.cwd() + path.sep + args._[0]);
                    fs.utimesSync(filePath, st.atime, st.mtime);
                }

            }
            else {
                throw new errors.ArgumentsError('-r');
            }
        }
        else if (args.t && !args.r) {

            let date = new Date(Date.parse(args.t));

            if (date === "Invalid Date")
                throw new errors.ArgumentsError('-t');

            fs.utimesSync(filePath, date.getTime() / 1000, date.getTime() / 1000);
        }
    }

    return "";
}

function which() {

}

function ping() {

}

/**
 * Allows the user to execute JS code on the system
 *
 * @param input Array STDIN
 * @returns {string} STDOUT
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