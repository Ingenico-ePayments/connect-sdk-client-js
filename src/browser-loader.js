/* eslint-disable */
(function (global){
  if (typeof define === "undefined") {
    var modules = {};
    global.define = function (module, dependencies, fn) {
      if (dependencies && dependencies.length) {
        for (var i = 0; i < dependencies.length; i++) {
          var dependency = modules[dependencies[i]]
          if (typeof dependency === "undefined" && dependencies[i] !== "require" && dependencies[i] !== "exports") {
            console.warn(`Could not find dependency '${dependencies[i]}' of module '${module}'`)
          }
          dependencies[i] = dependency;
        }
      }
      modules[module] = fn.apply(this, dependencies || []);
    };
    global.define("node-forge", [], function () {
      return global.forge || {};
    })
  }
  if (typeof exports === "undefined") {
    global.define("exports", [], function () {
      return {};
    });
  }
}(typeof window === "undefined" ? this : window));
