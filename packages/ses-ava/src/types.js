// @ts-check
import 'ses';

/**
 * @callback Logger
 * @param {...any} args
 * @returns {void}
 */

/**
 * @callback LogCallError
 *
 * Calls `thunk()` passing back its approximately its outcome, but first
 * logging any erroneous outcome to the `logger`, which defaults to
 * `console.log`.
 *
 * If thunk returns a non-promise, silently return it.
 * If thunk throws, log what was thrown and then rethrow it.
 * If thunk returns a promise, immediately return a new unresolved promise.
 * If the first promise fulfills, silently fulfill the returned promise even if
 * the fulfillment was an error.
 * If the first promise rejects, log the rejection reason and then reject the
 * returned promise with the same reason.
 * The delayed rejection of the returned promise is an observable difference
 * from directly calling `thunk()` but will be equivalent enough for most
 * purposes.
 *
 * TODO This function is useful independent of ava, so consider moving it
 * somewhere and exporting it for general reuse.
 *
 * @param {() => any} thunk
 * @param {string} name
 * @param {Logger=} logger
 */

/**
 * Simplified from ava's types.
 * TODO perhaps just import ava's type declarations instead
 *
 * @typedef {Object} ExecutionContext
 * The type of ava's `t` parameter, with methods like `assert`, `truthy`, etc.
 *
 * @callback TestFunc
 * ava's types call this `Implementation`, but that's just too confusing.
 *
 * @param {ExecutionContext} t
 * @returns {any}
 *
 * @callback BaseInterface
 * @param {string} title
 * @param {TestFunc} testFunc
 * @returns {void}
 *
 * @typedef {BaseInterface} TestInterface
 * @property {BaseInterface} after
 * @property {BaseInterface} afterEach
 * @property {BaseInterface} before
 * @property {BaseInterface} beforeEach
 * @property {BaseInterface} cb
 * @property {BaseInterface} failing
 * @property {BaseInterface} serial
 * @property {BaseInterface} only
 * @property {BaseInterface} skip
 */
