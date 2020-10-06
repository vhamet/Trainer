import {
  INIT_TRAINING,
  GO_TO_SET,
  START_TRAINING,
  NEXT_REPETITION,
} from '../actions/training';
import Training from '../../models/redux/state/Training';

const initialState: Training = {
  workout: null,
  hasStarted: false,
  setIndex: -1,
  repetition: 1,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case INIT_TRAINING:
      return {
        ...initialState,
        workout: action.workout,
      };
    case START_TRAINING:
      return { ...state, hasStarted: true };
    case GO_TO_SET:
      return {
        ...state,
        setIndex: action.index,
        repetition: 1,
      };
    case NEXT_REPETITION:
      return {
        ...state,
        repetition: state.repetition + 1,
      };
    default:
      return state;
  }
};
