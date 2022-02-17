///<amd-module name="connectsdk.promise"/>

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/**
 * The Promise class.
 */
class Promise<T> {
  readonly isSingleton: boolean;

  /**
   * Resolves a promise.
   */
  readonly resolve: (result: T) => void;
  /**
   * Rejects a promise.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly reject: (result: any) => void;
  /**
   * Adds a success and failure handler for completion of this Promise object.
   *
   * @param {Function} success The success handler
   * @param {Function} failure The failure handler
   * @returns {Promise} `this`
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly then: (success: (result: T) => void, failure?: (result: any) => void) => Promise<T>;

  constructor(singleton?: boolean) {
    this.isSingleton = singleton || false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pending: { resolve: (result: T) => void; reject?: (result: any) => void }[] = [];

    /**
     * Runs through each pending 'thenable' based on type (resolve, reject).
     *
     * @param {String} type The thenable type
     * @param {Object} result A value
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function complete(type: "resolve" | "reject", result: any): void {
      while (pending[0]) {
        const cb = pending.shift()![type];
        if (cb) {
          cb(result);
        }
      }
    }

    this.resolve = (result: T): void => {
      complete("resolve", result);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.reject = (result: any): void => {
      complete("reject", result);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.then = (success: (result: T) => void, failure?: (result: any) => void): Promise<T> => {
      pending.push({
        resolve: success,
        reject: failure,
      });
      return this;
    };
  }

  static resolve<T>(value: T): Promise<T> {
    const promise = new Promise<T>();
    setTimeout(() => promise.resolve(value), 0);
    return promise;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static reject<T>(reason: any): Promise<T> {
    const promise = new Promise<T>();
    setTimeout(() => promise.reject(reason), 0);
    return promise;
  }
}

export = Promise;
