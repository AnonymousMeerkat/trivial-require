# trivial-require #

Trivial closure-friendly require() script.


What does this mean? Think browserify, but very fragile and extremely non-conformant.
That's trivial-require.

Why use this? Scripts run through browserify can certainly be closure-compiled,
but there's a lot of useless fluff that, if your script is written in a certain way, might not be needed.


## Coding for trivial-require ##

When coding with trivial-require in mind, think of require() as a function that will put the contents
of the file you are require()ing into the source file. Because that's almost literally what it does.

Both the require() line and any line containing module.exports are deleted.

There's another limitation as well: the path must be an immediate expression. In other words, don't do
something like:

    var path = "./my_module";
    require(path);


For example, this code that will work, both for node.js and trivial-require:


 my_module.js:

    var MyModule = {
        foo: 1,

        bar: function() {
            console.log("Hello World!");
        }
    };

    module.exports = MyModule;


 index.js:

    var MyModule = require('./my_module');
