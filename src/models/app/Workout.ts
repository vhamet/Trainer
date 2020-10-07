import Set from './Set';

export default class Workout {
  constructor(
    public id: number,
    public title: string,
    public preparation: number,
    public sets: Set[],
  ) {}
}
