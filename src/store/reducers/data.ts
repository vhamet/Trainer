import { INIT_DATA } from '../actions/data';
import Workouts from '../../models/redux/state/Data';

const initialState: Workouts = {
  workouts: [],
  exercises: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case INIT_DATA:
      return { workouts: action.workouts, exercises: action.exercises };
    default:
      return state;
  }
};
