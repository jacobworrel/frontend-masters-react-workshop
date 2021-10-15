import { createMachine, assign } from 'xstate';

const initialContext = {
  duration: 60,
  elapsed: 0,
  interval: 0.1,
};

const reset = assign({
  duration: initialContext.duration,
  elapsed: initialContext.elapsed,
});
const addMinute = assign({
  duration: (context) => context.duration + 60,
});
const tick = assign({
  elapsed: (context) => context.elapsed + context.interval,
});

export const timerMachine = createMachine({
  initial: 'idle',
  // Add initial context
  context: initialContext,

  states: {
    idle: {
      // Parameterize this action:
      entry: 'reset',

      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      on: {
        TOGGLE: 'paused',
        ADD_MINUTE: {
          actions: 'addMinute',
        },
        TICK: {
          actions: 'tick',
        }
      },
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: 'idle',
      },
    },
  },
}, {
  actions: { reset, tick, addMinute, }
});
