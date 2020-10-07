import Data from './state/data';
import { InitDataAction } from './actions/data';

import Training, { PipeElement } from './state/training';
import {
  InitTrainingAction,
  StartTrainingAction,
  PipeNextAction,
} from './actions/training';

export type DataStateType = Data;
export type DataActionTypes = InitDataAction;

export type TrainingStateType = Training;
export type PipeElementType = PipeElement;
export class State {
  constructor(public data: Data, public currentTraining: Training) {}
}
export type TrainingActionTypes =
  | InitTrainingAction
  | StartTrainingAction
  | PipeNextAction;
