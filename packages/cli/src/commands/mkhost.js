/* global process */
import os from 'os';
import { E } from '@endo/far';
import { withEndoAgent } from '../context.js';

export const mkhost = async ({
  handleName,
  agentName,
  agentNames,
  introducedNames,
}) =>
  withEndoAgent(agentNames, { os, process }, async ({ agent }) => {
    const newHost = await E(agent).provideHost(handleName, {
      introducedNames,
      agentName,
    });
    console.log(newHost);
  });
