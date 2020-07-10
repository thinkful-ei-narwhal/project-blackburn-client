import React from 'react';
import { Keyframes, animated, config } from 'react-spring/renderprops';
import delay from 'delay';
const TimerContent = Keyframes.Spring(async (next) => {
  while (true) {
    await next({
      from: { opactity: 0, background: 'seagreen' },
      opacity: 1,
      background: 'tomato',
      value: 'GET READY',
    });
    await delay(3000);
    await next({
      from: { opactity: 0, background: 'tomato' },
      opacity: 1,
      background: 'seagreen',
      value: 'GO',
    });
    await delay(500);

    break;
  }
});

export default TimerContent;
