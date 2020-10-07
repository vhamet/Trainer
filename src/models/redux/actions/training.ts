import {
  INIT_TRAINING,
  START_TRAINING,
  PIPE_NEXT,
} from '../../../store/actions/training';
import { Workout } from '../../app';

export interface InitTrainingAction {
  type: typeof INIT_TRAINING;
  workout: Workout;
}

export interface StartTrainingAction {
  type: typeof START_TRAINING;
}

export interface PipeNextAction {
  type: typeof PIPE_NEXT;
}
