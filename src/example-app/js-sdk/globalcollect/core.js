( function(global) {
    var GCsdk = {}, modules = {};

    /* SDK internal function */
    var testCache = {}, detectionTests = {};
    GCsdk.addDetectionTest = function(name, fn) {
        if (!detectionTests[name]) {
            detectionTests[name] = fn;
        }
    };

    /* SDK internal function */
    GCsdk.detect = function(testName) {
        if (typeof testCache[testCache] === 'undefined') {
            testCache[testName] = detectionTests[testName]();
        }
        return testCache[testName];
    };


    /* SDK internal function */
    GCsdk.define = function(module, dependencies, fn) {
        if ( typeof define === 'function' && define.amd) {
            define(module, dependencies, fn);
        } else {
            if (dependencies && dependencies.length) {
                for (var i = 0; i < dependencies.length; i++) {
                    dependencies[i] = modules[dependencies[i]];
                }
            }
            modules[module] = fn.apply(this, dependencies || []);
        }
    };

    // Export `GCsdk` based on environment.
    global.GCsdk = GCsdk;

    if (typeof exports !== 'undefined') {
        exports.GCsdk = GCsdk;
    }

    GCsdk.define('GCsdk.core', [], function() {
        return GCsdk;
    });

    // use require.js if available otherwise we use our own
    if (typeof define === 'undefined') {
        global.define = GCsdk.define;
    }
}( typeof window === 'undefined' ? this : window));