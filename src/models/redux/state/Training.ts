import Workout from '../../Workout';

export default class Training {
    constructor(
      public workout: Workout | null,
      public hasStarted: boolean,
      public setIndex: number,
      public repetition: number,
    ) {}
  }