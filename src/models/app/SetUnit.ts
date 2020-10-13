import Exercise from './Exercise';

export enum SetTypeEnum {
  Repetition = 1,
  Duration = 2,
}

export class SetType {
  constructor(public id: number, public label: string) {}
}

export default class SetUnit {
  constructor(
    public exercise: Exercise,
    public type: SetTypeEnum,
    public duration: number,
    public rest: number,
  ) {}
}
