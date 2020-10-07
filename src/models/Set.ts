import SetUnit from './SetUnit';

export default class Set {
  constructor(
    public unit: SetUnit,
    public repetition: number,
    public rest?: number,
  ) {}
}
