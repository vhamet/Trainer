import { INIT_TRAINING, START_TRAINING, PIPE_NEXT } from '../actions/training';
import Training, { PipeElement } from '../../models/redux/state/Training';
import Workout from '../../models/Workout';
import { SetType } from '../../models/SetUnit';

const initialState: Training = {
  workout: null,
  pipe: [],
  hasStarted: false,
  pipeIndex: 0,
};

const workoutPipe = (workout: Workout): PipeElement[] => {
  const pipe = [
    new PipeElement('GET READY !', workout.preparation, SetType.Duration),
  ];

  for (const set of workout.sets) {
    for (let rep = 1; rep <= set.repetition; rep++) {
      const currentRep = set.repetition > 1 ? ` (${rep}/${set.repetition})` : '';
      const repetitions = set.unit.type === SetType.Repetition ? `${set.unit.duration} x `: '';
      const duration = set.unit.type === SetType.Duration ? ` x ${set.unit.duration}s`: '';
      pipe.push(
        new PipeElement(
          `${repetitions}${set.unit.exercise.title}${duration}${currentRep}`,
          set.unit.duration,
          set.unit.type
        )
      );
      if (set.unit.rest) {
        pipe.push(new PipeElement('REST', set.unit.rest, SetType.Duration));
      }
    }
    if (set.rest) {
      pipe.push(
        new PipeElement(
          `REST - Set ${set.unit.exercise.title} done !`,
          set.rest,
          SetType.Duration
        )
      );
    }
  }

  return pipe;
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case INIT_TRAINING:
      return {
        ...initialState,
        workout: action.workout,
        pipe: workoutPipe(action.workout),
      };
    case START_TRAINING:
      return { ...state, hasStarted: true };
    case PIPE_NEXT:
      return {
        ...state,
        pipeIndex: state.pipeIndex + 1,
      };
    default:
      return state;
  }
};
