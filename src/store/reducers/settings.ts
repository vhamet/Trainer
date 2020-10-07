import { TOGGLE_SOUND } from '../actions/settings';
import { SettingsStateType, SettingsActionTypes } from '../../models/redux';

const initialState: SettingsStateType = {
  soundOn: true,
};

export default (
  state = initialState,
  action: SettingsActionTypes,
): SettingsStateType => {
  switch (action.type) {
    case TOGGLE_SOUND:
      return { ...state, soundOn: !state.soundOn };
    default:
      return state;
  }
};
