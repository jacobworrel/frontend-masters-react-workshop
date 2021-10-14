import * as React from 'react';
import { useMachine } from '@xstate/react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProgressCircle } from '../ProgressCircle';

// Import the timer machine and its initial state:
import { timerMachine, timerMachineConfig } from './timerMachine';

export const Timer = () => {
  const [state, send] = useMachine(timerMachine, timerMachineConfig.initial);

  const { duration, elapsed, interval } = {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  };

  return (
    <div
      className="timer"
      data-state={state.value}
      style={{
        // @ts-ignore
        '--duration': duration,
        '--elapsed': elapsed,
        '--interval': interval,
      }}
    >
      <header>
        <h1>Exercise 00</h1>
      </header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{state.value}</div>
        <div
          className="elapsed"
          onClick={() => {
            send({ type: 'TOGGLE' });
          }}
        >
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          <button
            onClick={() => {
              send({ type: 'RESET' });
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="actions">
        {state.value === 'running' ? <button
          onClick={() => {
            send({ type: 'TOGGLE' });
          }}
          title="Pause timer"
        >
          <FontAwesomeIcon icon={faPause} />
        </button> : null}

        {state.value === 'paused' || state.value === 'idle' ? <button
          onClick={() => {
            send({ type: 'TOGGLE' });
          }}
          title="Start timer"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button> : null}
      </div>
    </div>
  );
};
