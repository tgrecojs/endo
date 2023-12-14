/* global process */
import os from 'os';
import path from 'path';

import {
  whereEndoState,
  whereEndoEphemeralState,
  whereEndoSock,
  whereEndoCache,
} from '@endo/where';

const { username, homedir, ...rest } = os.userInfo();
console.group('--------- cli/src/locator.js -------')
console.log('os.userInfo() ### ',{username, homedir, ...rest})
const temp = os.tmpdir();
const info = {
  user: username,
  home: homedir,
  temp,
};
console.group('------------------------')

console.log('info ### ',info)
console.group('------------------------')

export const statePath = whereEndoState(process.platform, process.env, info);
console.log('statePath ### ',statePath, {platform:process.platform, env: process.env})
console.group('------------------------')

export const logPath = path.join(statePath, 'endo.log');
console.log('logPath ### ',logPath)

console.groupEnd()
export const ephemeralStatePath = whereEndoEphemeralState(
  process.platform,
  process.env,
  info,
);

export const cachePath = whereEndoCache(process.platform, process.env, info);

export const sockPath = whereEndoSock(process.platform, process.env, info);
