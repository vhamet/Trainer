import Data from './state/data';
import { InitDataAction } from './actions/data';

import Training, { PipeElement } from './state/training';
import {
  InitTrainingAction,
  StartTrainingAction,
  GoToPipeIndexAction,
} from './actions/training';

import Settings from './state/settings';
import { ToggleSoundAction } from './actions/settings';

export type DataStateType = Data;
export type DataActionTypes = InitDataAction;

export type TrainingStateType = Training;
export type PipeElementType = PipeElement;

export type SettingsStateType = Settings;

export class State {
  constructor(
    public data: Data,
    public currentTraining: Training,
    public settings: Settings,
  ) {}
}
export type TrainingActionTypes =
  | InitTrainingAction
  | StartTrainingAction
  | GoToPipeIndexAction;

export type SettingsActionTypes = ToggleSoundAction;
