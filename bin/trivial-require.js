#!/usr/bin/env node

// Imports \\
var trivial_require = require('../lib/index.js');


// Help \\
function tr_usage() {
    console.log("usage: trivial-require file");
}

if (process.argv.length < 2) {
    tr_usage();
    return 1;
}


// Run \\
console.log(trivial_require(process.argv[2]));
