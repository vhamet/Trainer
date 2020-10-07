import {
  INIT_TRAINING,
  START_TRAINING,
  GO_TO_PIPE_INDEX,
} from '../actions/training';
import Training, { PipeElement } from '../../models/redux/state/training';
import { Workout, SetType } from '../../models/app';
import { TrainingActionTypes } from '../../models/redux';

const initialState: Training = {
  workout: null,
  pipe: [],
  hasStarted: false,
  pipeIndex: 0,
};

const workoutPipe = (workout: Workout): PipeElement[] => {
  const pipe = [
    new PipeElement(
      'GET READY !',
      ' ',
      workout.preparation,
      SetType.Duration,
      '5s',
    ),
  ];

  for (const set of workout.sets) {
    for (let rep = 1; rep <= set.repetition; rep++) {
      const currentRep =
        set.repetition > 1 ? ` ${rep} / ${set.repetition}` : ' ';
      const sDuration =
        set.unit.type === SetType.Repetition
          ? `x${set.unit.duration} `
          : `${set.unit.duration}s`;
      pipe.push(
        new PipeElement(
          set.unit.exercise.title,
          currentRep,
          set.unit.duration,
          set.unit.type,
          sDuration,
        ),
      );

      if (set.unit.rest) {
        pipe.push(
          new PipeElement(
            'REST',
            ' ',
            set.unit.rest,
            SetType.Duration,
            `${set.unit.rest}s`,
            true,
          ),
        );
      }
    }
    if (set.rest) {
      pipe.push(
        new PipeElement(
          `REST`,
          ' ',
          set.rest,
          SetType.Duration,
          `${set.rest}s`,
          true,
        ),
      );
    }
  }

  return pipe;
};

export default (
  state = initialState,
  action: TrainingActionTypes,
): Training => {
  switch (action.type) {
    case INIT_TRAINING:
      return {
        ...initialState,
        workout: action.workout,
        pipe: workoutPipe(action.workout),
      };
    case START_TRAINING:
      return { ...state, hasStarted: true };
    case GO_TO_PIPE_INDEX:
      return {
        ...state,
        pipeIndex: action.index,
      };
    default:
      return state;
  }
};
