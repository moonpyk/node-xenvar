(function (exports) {
    "use strict";

    var xenvar = require('../lib/xenvar.js');

    /*
     ======== A Handy Little Nodeunit Reference ========
     https://github.com/caolan/nodeunit

     Test methods:
     test.expect(numAssertions)
     test.done()
     Test assertions:
     test.ok(value, [message])
     test.equal(actual, expected, [message])
     test.notEqual(actual, expected, [message])
     test.deepEqual(actual, expected, [message])
     test.notDeepEqual(actual, expected, [message])
     test.strictEqual(actual, expected, [message])
     test.notStrictEqual(actual, expected, [message])
     test.throws(block, [error], [message])
     test.doesNotThrow(block, [error], [message])
     test.ifError(value)
     */

    exports['xenvar'] = {
        setUp: function (done) {
            // setup here
            done();
        },
        'shitty args': function (test) {
            test.equals(xenvar.x(), undefined);
            test.deepEqual(xenvar.x({}), {});
            test.done();
        },
        'expanduser': function (test) {
            test.ok(typeof xenvar.expanduser("~") === "string");

            console.log("");
            console.log("Resolved '~' -> '%s'", xenvar.expanduser("~"));

            if (process.platform === "win32") {
                process.env.USERPROFILE = "C:\\Users\\moonpyk";
                test.equals(xenvar.expanduser("~"), process.env.USERPROFILE);

            } else {
                process.env.HOME = "/home/moonpyk";
                test.equals(xenvar.expanduser("~"), process.env.HOME);
            }

            test.done();
        },
        'expandvars': function (test) {
            test.equals(xenvar.expandvars("${NON_EXISTANT_VARIABLE}"), "");

            process.env.XENVAR = "Hello world";
            process.env.HELLLLLLO_WORLD = "Sup.";
            test.equals(xenvar.expandvars("${XENVAR}"), process.env.XENVAR);

            test.equals(xenvar.expandvars(
                "${XENVAR}${HELLLLLLO_WORLD}"),
                process.env.XENVAR + process.env.HELLLLLLO_WORLD
            );

            test.equals(xenvar.expandvars("${}"), "");

            process.env.XENVAR = process.env.HELLLLLLO_WORLD = undefined;

            test.done();
        },
        'x': function (test) {
            process.env.XENVAR = "Hello world";

            if (process.platform === "win32") {
                process.env.USERPROFILE = "C:\\Users\\moonpyk";
                test.equals(xenvar.x("~;${XENVAR}"), process.env.USERPROFILE + ";" + process.env.XENVAR);

            } else {
                process.env.HOME = "/home/moonpyk";
                test.equals(xenvar.x("~;${XENVAR}"), process.env.HOME + ";" + process.env.XENVAR);
            }

            test.done();
        }
    };
}(exports));


