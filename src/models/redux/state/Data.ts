import Exercise from '../../Exercise';
import Workout from '../../Workout';

export default class Data {
  constructor(public workouts: Workout[], public exercises: Exercise[]) {}
}
