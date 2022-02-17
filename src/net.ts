///<amd-module name="connectsdk.net"/>

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import Promise = require("./promise");
import { AjaxRequest, AjaxRequestOptions, JSONPOptions, SdkResponse } from "./types";

/**
 * Removes leading and trailing whitespace.
 */
const trim = typeof "".trim === "function" ? (s: string): string => s.trim() : (s: string): string => s.replace(/^\s\s*/, "").replace(/\s\s*$/, "");

const parseXML = window.DOMParser
  ? (text: string): unknown => new DOMParser().parseFromString(text, "text/xml")
  : (text: string): unknown => {
      const xml = new ActiveXObject("Microsoft.XMLDOM");
      xml.async = "false";
      xml.loadXML(text);
      return xml;
    };

class JSONPCallback {
  private readonly methodName: string;
  private scriptTag?: HTMLScriptElement;

  constructor(private readonly url: string, private readonly success: (json: unknown) => void, private readonly failure: () => void) {
    this.methodName = "__connectsdk_jsonp_" + new Date().getTime();

    const runCallback = (json: unknown): void => {
      this.success(json);
      this.teardown();
    };

    window[this.methodName] = runCallback;
  }

  run(): void {
    this.scriptTag = document.createElement("script");
    this.scriptTag.id = this.methodName;
    this.scriptTag.src = this.url.replace("{callback}", this.methodName);
    this.scriptTag.onerror = (): void => this.failure();
    document.body.appendChild(this.scriptTag);
  }

  teardown(): void {
    window[this.methodName] = null;
    try {
      delete window[this.methodName];
    } catch (e) {
      /* ignore */
    }
    if (this.scriptTag) {
      document.body.removeChild(this.scriptTag);
    }
  }
}

function xhr(): XMLHttpRequest {
  if (typeof XMLHttpRequest !== "undefined" && (window.location.protocol !== "file:" || !window.ActiveXObject)) {
    return new XMLHttpRequest();
  } else {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {
      /* ignore */
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {
      /* ignore */
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      /* ignore */
    }
  }
  throw new Error("Could not initialze xhr");
}

function successfulRequest(request: XMLHttpRequest): boolean {
  return (request.status >= 200 && request.status < 300) || request.status == 304 || (request.status == 0 && !!request.responseText);
}

class Net {
  /**
   * Serialize JavaScript for HTTP requests.
   *
   * @param {Object} object An Array or Object
   * @returns {String} A string suitable for a GET or POST request
   */
  static serialize(object: object | string): string {
    if (!object) {
      return "";
    }

    if (typeof object === "string") {
      return object;
    }

    const results: string[] = [];
    for (const key in object) {
      results.push(encodeURIComponent(key) + "=" + encodeURIComponent(object[key]));
    }
    return results.join("&");
  }

  /**
   * Parses JSON represented as a string.
   *
   * @param {String} string The original string
   * @returns {Object} A JavaScript object
   */
  static parseJSON(string: string): unknown {
    if (typeof string !== "string" || !string) {
      return null;
    }
    string = trim(string);
    return window.JSON.parse(string);
  }

  /**
   * Parses XML represented as a string.
   *
   * @param {String} string The original string
   * @returns {Object} A JavaScript object
   */
  static parseXML(text: string): unknown {
    return parseXML(text);
  }

  /**
   * Creates an Ajax request.  Returns an object that can be used
   * to chain calls.  For example:
   *
   *      $t.post("/post-test")
   *        .data({ key: "value" })
   *        .end(function(res) {
   *          assert.equal("value", res.responseText);
   *        });
   *
   *      $t.get("/get-test")
   *        .set("Accept", "text/html")
   *        .end(function(res) {
   *          assert.equal("Sample text", res.responseText);
   *        });
   *
   * The available chained methods are:
   *
   * `set` -- set a HTTP header
   * `data` -- the postBody
   * `end` -- send the request over the network, and calls your callback with a `res` object
   * `send` -- sends the request and calls `data`: `.send({ data: value }, function(res) { });`
   *
   * @param {String} The URL to call
   * @param {Object} Optional settings
   * @returns {Object} A chainable object for further configuration
   */
  static ajax(url: string, options?: AjaxRequestOptions): AjaxRequest {
    const request = xhr();
    const promise = new Promise<SdkResponse>();

    const opts = typeof options !== "undefined" ? options : {};

    function respondToReadyState(): void {
      if (request.readyState == 4) {
        const contentType = request["mimeType"] || request.getResponseHeader("content-type") || "";

        const response: SdkResponse = {
          status: request.status,
          responseText: request.responseText,
          success: successfulRequest(request),
        };

        if (/json/.test(contentType)) {
          response.responseJSON = Net.parseJSON(request.responseText);
        } else if (/xml/.test(contentType)) {
          response.responseXML = Net.parseXML(request.responseText);
        }

        if (opts.callback) {
          return opts.callback(response, request);
        }

        if (response.success) {
          if (opts.success) {
            opts.success(response, request);
          }
          promise.resolve(response);
        } else {
          if (opts.error) {
            opts.error(response, request);
          }
          promise.reject(response);
        }
      }
    }

    function setHeaders(): void {
      const defaults = {
        Accept: "text/javascript, application/json, text/html, application/xml, text/xml, */*",
        "Content-Type": "application/json",
      };

      opts.headers = opts.headers || {};
      /**
       * Merge headers with defaults.
       */
      for (const name in defaults) {
        // eslint-disable-next-line no-prototype-builtins
        if (!opts.headers.hasOwnProperty(name)) {
          opts.headers[name] = defaults[name];
        }
      }
      for (const name in opts.headers) {
        request.setRequestHeader(name, opts.headers[name]!);
      }
    }

    opts.method = opts.method ? opts.method.toLowerCase() : "get";
    opts.asynchronous = opts.asynchronous || true;
    opts.postBody = opts.postBody || "";
    request.onreadystatechange = respondToReadyState;
    request.open(opts.method, url, opts.asynchronous);

    opts.headers = opts.headers || {};
    if (opts.contentType) {
      opts.headers["Content-Type"] = opts.contentType;
    }

    if (typeof opts.postBody !== "string") {
      // Serialize JavaScript
      opts.postBody = Net.serialize(opts.postBody);
    }

    function send(): void {
      try {
        setHeaders();
        request.send(opts.postBody);
      } catch (e) {
        if (opts.error) {
          opts.error();
        }
      }
    }

    const chain = {
      set: (key: string, value: string): AjaxRequest => {
        opts.headers = opts.headers || {};
        opts.headers[key] = value;
        return chain;
      },
      send: (data: object | string, callback: (response: SdkResponse, request: XMLHttpRequest) => void): AjaxRequest => {
        opts.postBody = Net.serialize(data);
        opts.callback = callback;
        send();
        return chain;
      },
      end: (callback?: (response: SdkResponse, request: XMLHttpRequest) => void): AjaxRequest => {
        opts.callback = callback;
        send();
        return chain;
      },
      data: (data: object | string): AjaxRequest => {
        opts.postBody = Net.serialize(data);
        return chain;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      then: (success: (result: SdkResponse) => void, failure?: (result: any) => void): AjaxRequest => {
        chain.end();
        promise.then(success, failure);
        return chain;
      },
    };
    return chain;
  }

  /**
   * An Ajax GET request.
   *
   *      $t.get("/get-test")
   *        .set("Accept", "text/html")
   *        .end(function(res) {
   *          assert.equal("Sample text", res.responseText);
   *        });
   *
   * @param {String} url The URL to request
   * @param {Object} options The Ajax request options
   * @returns {Object} A chainable object for further configuration
   */
  static get(url: string, options?: AjaxRequestOptions): AjaxRequest {
    if (typeof options === "undefined") {
      options = {};
    }
    options.method = "get";
    return Net.ajax(url, options);
  }

  /**
   * An Ajax POST request.
   *
   *      $t.post("/post-test")
   *        .data({ key: "value" })
   *        .end(function(res) {
   *          assert.equal("value", res.responseText);
   *        });
   *
   * @param {String} url The URL to request
   * @param {Object} options The Ajax request options (`postBody` may come in handy here)
   * @returns {Object} An object for further chaining with promises
   */
  static post(url: string, options?: AjaxRequestOptions): AjaxRequest {
    if (typeof options === "undefined") {
      options = {};
    }
    options.method = "post";
    return Net.ajax(url, options);
  }

  /**
   * A jsonp request.  Example:
   *
   *     var url = "http://feeds.delicious.com/v1/json/";
   *     url += "alex_young/javascript?callback={callback}";
   *
   *     connectsdk.net.jsonp(url, {
   *       success: function(json) {
   *         console.log(json);
   *       }
   *     });
   *
   * @param {String} url The URL to request
   */
  static jsonp(url: string, options: JSONPOptions): void {
    const failure =
      typeof options.failure !== "undefined"
        ? options.failure
        : (): void => {
            /* ignore */
          };
    const callback = new JSONPCallback(url, options.success, failure);
    callback.run();
  }
}

export = Net;
