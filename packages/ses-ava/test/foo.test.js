import rawTest from 'ava';
import { wrapTest } from '../src/ses-ava-test.js';

lockdown();

const test = wrapTest(rawTest);

test('foo', t => {
  t.assert(true);
});
