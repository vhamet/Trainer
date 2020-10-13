import { Workout, Exercise, SetType } from '../../app';

export default class Data {
  constructor(
    public workouts: Workout[],
    public exercises: Map<number, Exercise>,
    public setTypes: SetType[],
  ) {}
}
