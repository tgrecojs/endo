// @ts-check
import 'ses';
import './types.js';

/**
 * Just forwards to global `console.log`.
 *
 * @type {import('./types').Logger}
 */
const defaultLogger = (...args) => {
  console.log(...args);
};

/**
 * Determine if the argument is a Promise.
 * (Approximately copied from promiseKit.js)
 *
 * @param {any} maybePromise The value to examine
 * @returns {maybePromise is Promise} Whether it is a promise
 */
const isPromise = maybePromise =>
  Promise.resolve(maybePromise) === maybePromise;

/**
 * @type {import('./types').LogCallError}
 */
const logErrorFirst = (thunk, name, logger = defaultLogger) => {
  let result;
  try {
    result = thunk();
  } catch (err) {
    logger(`THROWN from ${name}:`, err);
    throw err;
  }
  if (isPromise(result)) {
    return result.then(
      v => v,
      reason => {
        logger(`REJECTED from ${name}:`, reason);
        return result;
      },
    );
  } else {
    return result;
  }
};

const faceMethodsWhitelist = [
  'after',
  'afterEach',
  'before',
  'beforeEach',
  'cb',
  'failing',
  'serial',
  'only',
  'skip',
];

/**
 * @param { import('./types').BaseInterface } face
 * @param { import('./types').Logger =} logger
 * @returns { import('./types').BaseInterface } Not yet frozen!
 */
const wrapFace = (face, logger = defaultLogger) => {
  /** @type {import('./types').BaseInterface} */
  const faceWrappper = (title, testFunc) => {
    /** @type {import('./types').TestFunc} */
    const testFuncWrapper = t => {
      harden(t);
      return logErrorFirst(() => testFunc(t), 'ava test', logger);
    };
    return face(title, testFuncWrapper);
  };
  return faceWrappper;
};

/**
 * The ava `test` function takes a callback argument of the form
 * `t => {...}`. If the ourcome of this function indicates an error, either
 * by throwing or by eventually rejecting a returned promise, ava does its
 * own peculiar console-like display of this error and its stacktrace.
 * However, it does not use the ses `console` and so bypasses all the fancy
 * diagnostics provided by the ses `console`.
 *
 * If a test file replace the line
 * ```js
 * import test from 'ava';
 * ```
 * with
 * ```js
 * import { wrapTest } from '@agoric/ses-ava';
 * import rawTest from 'ava';
 *
 * const test = wrapTest(rawTest);
 * ```
 * Then the calls to `test` in the rest of the test file will act like they
 * used to, except that, if a test fails because the test function (the
 * callback argument to `test`) fails by throwing or by returning a promise
 * that eventually rejects, the error is first sent to the console before
 * propagating into `rawTest`.
 *
 * @param {import('./types').TestInterface} avaTest
 * @param {import('./types').Logger=} logger
 * @returns {import('./types').TestInterface}
 */
const wrapTest = (avaTest, logger = defaultLogger) => {
  /** @type {import('./types').TestInterface} */
  const testWrapper = wrapFace(avaTest, logger);
  for (const methodName of faceMethodsWhitelist) {
    if (methodName in avaTest) {
      const boundFace = (title, testFunc) =>
        avaTest[methodName](title, testFunc);
      testWrapper[methodName] = wrapFace(boundFace);
    }
  }
  harden(testWrapper);
  return testWrapper;
};
// harden(wrapTest);
export { wrapTest };
