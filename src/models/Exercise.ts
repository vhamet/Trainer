export enum ExerciseType {
  Abs,
  Pushup,
  Pullup,
  Flexibility,
  Stretching,
  Cardio,
  HIIT,
}

export enum Muscle {
  Abs,
  Biceps,
  Back,
  Shoulders,
  Stretching,
  Chest,
  Glutes,
  Arms,
  Legs,
  Triceps,
}

export default class Exercise {
  constructor(
    public id: number,
    public title: string,
    public type?: string[],
    public muscle?: string[]
  ) {}
}
