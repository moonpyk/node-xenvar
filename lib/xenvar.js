/*
 * envar
 * https://github.com/moonpyk/node-envar
 *
 * Copyright (c) 2013 Clément Bourgeois
 * Licensed under the MIT license.
 */

(function (exports) {
    "use strict";

    /**
     * Expand ~
     * @param {string} val
     * @returns {string|*}
     */
    exports.expanduser = function (val) {
        if (typeof val !== "string") {
            return val;
        }

        if (typeof process.env.HOME === "string") { // *NIX
            return val.replace(/~/g, process.env.HOME);

        } else if(typeof process.env.USERPROFILE === "string") { // Windows
            return val.replace(/~/g, process.env.USERPROFILE);
        }

        return val;
    };

    /**
     * Expand paths containing shell variable substitutions.
     * Variables format is ${varname}, varnames can be made out of letters, digits and the character '_'
     * @param {string} val
     * @returns {string|*}
     */
    exports.expandvars = function (val) {
        if (typeof val !== "string") {
            return val;
        }

        for(var k in process.env) {
            val = val.replace(
                new RegExp('\\$\\{' + k + '\\}', "g"),
                process.env[k]
            );
        }

        val = val.replace(/\$\{\w*\}/g, "");

        return val;
    };

    /**
     * Expands ~ and ${varname} construct at once
     * @param val
     * @returns {*}
     */
    exports.x = function (val) {
        if (typeof val !== "string") {
            return val;
        }

        return exports.expanduser(exports.expandvars(val));
    };
}(exports));
