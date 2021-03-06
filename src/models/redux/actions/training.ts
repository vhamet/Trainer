import {
  INIT_TRAINING,
  START_TRAINING,
  GO_TO_PIPE_INDEX,
} from '../../../store/actions/training';
import { Workout } from '../../app';

export interface InitTrainingAction {
  type: typeof INIT_TRAINING;
  workout: Workout;
}

export interface StartTrainingAction {
  type: typeof START_TRAINING;
}

export interface GoToPipeIndexAction {
  type: typeof GO_TO_PIPE_INDEX;
  index: number;
}
