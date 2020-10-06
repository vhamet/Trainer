import SetUnit from './SetUnit';

export default class Set {
  constructor(
    public unit: SetUnit,
    public rest?: number,
    public repetition?: number
  ) {}
}
