/**
 * @group unit:promise
 */

import Promise = require("../src/promise");

describe("Promise", () => {
  test("immediately resolved", (done) => {
    const fn = jest.fn();

    Promise.resolve("resolved").then((result) => {
      expect(result).toBe("resolved");
      expect(fn).not.toBeCalled();
      done();
    }, fn);
  });

  test("immediately rejected", (done) => {
    const fn = jest.fn();

    Promise.reject("rejected").then(fn, (reason) => {
      expect(reason).toBe("rejected");
      expect(fn).not.toBeCalled();
      done();
    });
  });

  test("resolved later", (done) => {
    const fn = jest.fn();

    const promise = new Promise<string>().then((result) => {
      expect(result).toBe("resolved");
      expect(fn).not.toBeCalled();
      done();
    }, fn);
    setTimeout(() => promise.resolve("resolved"), 50);
  });

  test("rejected later", (done) => {
    const fn = jest.fn();

    const promise = new Promise<string>().then(fn, (reason) => {
      expect(reason).toBe("rejected");
      expect(fn).not.toBeCalled();
      done();
    });
    setTimeout(() => promise.reject("rejected"), 50);
  });
});
