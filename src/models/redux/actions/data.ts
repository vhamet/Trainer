import { INIT_DATA } from '../../../store/actions/data';
import { Workout, Exercise, SetType } from '../../app';

export interface InitDataAction {
  type: typeof INIT_DATA;
  workouts: Workout[];
  exercises: Map<number, Exercise>;
  setTypes: SetType[];
}
