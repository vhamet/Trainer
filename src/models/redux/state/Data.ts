import { Workout, Exercise } from '../../app';

export default class Data {
  constructor(
    public workouts: Workout[],
    public exercises: Map<number, Exercise>,
  ) {}
}
