import { INIT_DATA } from '../actions/data';
import { DataStateType, DataActionTypes } from '../../models/redux';

const initialState: DataStateType = {
  workouts: [],
  exercises: new Map(),
};

export default (
  state = initialState,
  action: DataActionTypes,
): DataStateType => {
  switch (action.type) {
    case INIT_DATA:
      return { workouts: action.workouts, exercises: action.exercises };
    default:
      return state;
  }
};
