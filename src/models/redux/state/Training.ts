import { Workout, SetType } from '../../app';

export class PipeElement {
  constructor(
    public label: string,
    public currentSet: string,
    public currentRep: string,
    public duration: number,
    public type: SetType,
    public sDuration: string,
    public isRest?: boolean,
  ) {}
}

export default class Training {
  constructor(
    public workout: Workout | null,
    public pipe: PipeElement[],
    public hasStarted: boolean,
    public pipeIndex: number,
  ) {}
}
