// Imports \\
var fs   = require('fs');
var path = require('path');


// Main code \\

// Cached files
var tr_included = {};

// Contents of the new file
var tr_contents = "";

function tr_require(file) {
    // Check if already included
    if (file in tr_included)
        return;
    else
        tr_included[file] = true;

    // Read
    var contents = fs.readFileSync(file) + '';
    var lines    = contents.split('\n');

    for (var i = 0; i < lines.length; i++) {
        // Simple regex to match most single-lined require() lines
        var require_match = lines[i].match(/[^A-Za-z0-9]require *\(['"]([^'"]*)['"]\)/);

        if (require_match !== null) {
            tr_contents += ";\n"; // Blank statement

            // Node module (non-relative path)
            if (require_match[1][0] !== '.')
                continue;

            // Recurse
            var thepath = path.resolve(path.dirname(file), require_match[1]) + '.js';
            tr_require(thepath);
        } else if (lines[i].search("[^A-Za-z0-9]module\.exports") >= 0) {
            // Blank out lines containing module.exports
            tr_contents += ";\n";
        } else {
            // Print out the line
            tr_contents += lines[i] + "\n";
        }
    }
}

function trivial_require(file) {
    tr_included = {};
    tr_contents = "";

    tr_require(path.resolve('.', file));

    return tr_contents;
}


module.exports = trivial_require;
