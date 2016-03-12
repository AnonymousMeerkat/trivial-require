// Imports \\
var fs   = require('fs');
var path = require('path');


// Help \\
function tr_usage() {
    console.log("usage: trivial-require file");
}

if (process.argv.length < 2) {
    tr_usage();
    return 1;
}


// Main code \\
var tr_included = {};
var tr_contents = "";

function tr_require(file) {
    if (file in tr_included)
        return;
    else
        tr_included[file] = true;

    var contents = fs.readFileSync(file) + '';
    var lines    = contents.split('\n');

    for (var i = 0; i < lines.length; i++) {
        var require_match = lines[i].match(/[^A-Za-z0-9]require *\(['"]([^'"]*)['"]\)/);

        if (require_match !== null) {
            tr_contents += ";\n";

            if (require_match[1][0] !== '.')
                continue;

            var thepath = path.resolve(path.dirname(file), require_match[1]) + '.js';
            tr_require(thepath);
        } else if (lines[i].search("[^A-Za-z0-9]module\.exports") >= 0) {
            tr_contents += ";\n";
        } else {
            tr_contents += lines[i] + "\n";
        }
    }
}

tr_require(path.resolve('.', process.argv[2]));
console.log(tr_contents);
