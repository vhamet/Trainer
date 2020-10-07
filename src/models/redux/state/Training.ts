import Workout from '../../Workout';
import { SetType } from '../../SetUnit';

export class PipeElement {
  constructor(
    public label: string,
    public duration: number,
    public type: SetType
  ) {}
}

export default class Training {
  constructor(
    public workout: Workout | null,
    public pipe: PipeElement[],
    public hasStarted: boolean,
    public pipeIndex: number
  ) {}
}
