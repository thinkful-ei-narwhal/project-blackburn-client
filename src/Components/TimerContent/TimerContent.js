import { Keyframes } from 'react-spring/renderprops.cjs';
import delay from 'delay';

const TimerContent = Keyframes.Spring(async (next) => {
  while (true) {
    await next({
      from: { opactity: 0, color: 'seagreen' },
      opacity: 1,
      color: 'tomato',
      value: '3',
    });
    await delay(1000);
    await next({
      from: { opactity: 0, color: 'seagreen' },
      opacity: 1,
      color: 'tomato',
      value: '2',

    });
    await delay(1000);
    await next({
      from: { opactity: 0, color: 'seagreen' },
      opacity: 1,
      color: 'tomato',
      value: '1',

    });
    await delay(1000);
    await next({
      from: { opactity: 0, color: 'tomato' },
      opacity: 1,
      color: 'seagreen',
      value: '0',
    });
    await delay(1000);
    break;
  }
});

export default TimerContent;
