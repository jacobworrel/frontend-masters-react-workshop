import { createMachine, assign } from 'xstate';

const initialContext = {
  duration: 60,
  elapsed: 0,
  interval: 0.1,
};

export const timerMachine = createMachine({
  initial: 'idle',
  // Add initial context
  context: initialContext,

  states: {
    idle: {
      // Reset duration and elapsed on entry
      // ...

      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      on: {
        TOGGLE: 'paused',
        ADD_MINUTE: {
          actions: assign({
            duration: (context) => context.duration + 60,
          })
        }
      },
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: {
          target: 'idle',
          actions: assign({
            duration: () => initialContext.duration,
            elapased: () => initialContext.elapsed,
          })
        },
      },
    },
  },
});
