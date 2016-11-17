(function (global) {
    var connectsdk = {}, modules = {};

    /* SDK internal function */
    connectsdk.define = function (module, dependencies, fn) {
        if (dependencies && dependencies.length) {
            for (var i = 0; i < dependencies.length; i++) {
                dependencies[i] = modules[dependencies[i]];
            }
        }
        modules[module] = fn.apply(this, dependencies || []);
    };

    // Export `connectsdk` based on environment.
    global.connectsdk = connectsdk;

    if (typeof exports !== 'undefined') {
        exports.connectsdk = connectsdk;
    }

    connectsdk.define('connectsdk.core', [], function () {
        return connectsdk;
    });

    // use require.js if available otherwise we use our own
    if (typeof define === 'undefined') {
        global.define = connectsdk.define;
    }
} (typeof window === 'undefined' ? this : window));

// (re)define core
define("connectsdk.core", [], function () {
    var global = typeof window === 'undefined' ? this : window;
    var connectsdk = {};
    global.connectsdk = connectsdk;
    if (typeof exports !== 'undefined') {
        exports.connectsdk = connectsdk;
    }
    return connectsdk;
});
