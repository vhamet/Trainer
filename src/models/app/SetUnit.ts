import Exercise from './Exercise';

export enum SetType {
  Repetition = 1,
  Duration = 2,
}

export default class SetUnit {
  constructor(
    public exercise: Exercise,
    public type: number,
    public duration: number,
    public rest: number,
  ) {}
}
