import Exercise from './Exercise';

export enum SetType {
  Duration,
  Repetition,
}

export default class SetUnit {
  constructor(
    public exercise: Exercise,
    public type: string,
    public duration: number,
    public rest: number
  ) {}
}
