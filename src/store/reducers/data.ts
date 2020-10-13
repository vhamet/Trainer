import { INIT_DATA } from '../actions/data';
import { DataStateType, DataActionTypes } from '../../models/redux';

const initialState: DataStateType = {
  workouts: [],
  exercises: new Map(),
  setTypes: [],
};

export default (
  state = initialState,
  action: DataActionTypes,
): DataStateType => {
  switch (action.type) {
    case INIT_DATA:
      return {
        workouts: action.workouts,
        exercises: action.exercises,
        setTypes: action.setTypes,
      };
    default:
      return state;
  }
};
