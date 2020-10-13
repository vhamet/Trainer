export const createTableUnitType = `
    CREATE TABLE IF NOT EXISTS unitType (
        id INTEGER PRIMARY KEY NOT NULL,
        label TEXT NOT NULL
    );
`;
export const fillTableUnitType = (args: string[]): string =>
  `INSERT INTO unitType (label) VALUES ${args.map(() => '(?) ')}`;

export const createTableExercise = `
CREATE TABLE IF NOT EXISTS exercise (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL
);
`;
export const fillTableExercise = (args: string[]): string =>
  `INSERT INTO exercise (title) VALUES ${args.map(() => '(?) ')}`;

export const createTableSetUnit = `
    CREATE TABLE IF NOT EXISTS setUnit (
        id INTEGER PRIMARY KEY NOT NULL,
        exerciseId INTEGER NOT NULL,
        typeId BOOLEAN NOT NULL,
        duration INTEGER NOT NULL,
        rest INTEGER,
        FOREIGN KEY(exerciseId) REFERENCES exercise(id)
        FOREIGN KEY(typeId) REFERENCES unitType(id)
    );
`;
export const fillTableSetUnit = (args: number[][]): string =>
  `INSERT INTO setUnit (exerciseId, typeId, duration, rest) VALUES ${args.map(
    () => '(?, ?, ?, ?) ',
  )}`;

export const createTableWorkout = `
    CREATE TABLE IF NOT EXISTS workout (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        preparation INTEGER NOT NULL
    );
`;
export const fillTableWorkout = (args: (number | string)[][]): string =>
  `INSERT INTO workout (title, preparation) VALUES ${args.map(
    () => '(?, ?) ',
  )}`;

export const createTableWorkoutSets = `
    CREATE TABLE IF NOT EXISTS workoutSets (
        workoutId INTEGER NOT NULL,
        setUnitId INTEGER NOT NULL,
        rest INTEGER,
        repetition INTEGER,
        FOREIGN KEY(workoutId) REFERENCES workout(id),
        FOREIGN KEY(setUnitId) REFERENCES setUnit(id)
    );
`;
export const fillTableWorkoutSets = (args: number[][]): string =>
  `INSERT INTO workoutSets (workoutId, setUnitId, rest, repetition) VALUES ${args.map(
    () => '(?, ?, ?, ?) ',
  )}`;

export const checkDbInitialized = `SELECT 1 FROM exercise`;

export const getUnitTypes = `SELECT * FROM unitType`;
export const getExercises = `SELECT * FROM exercise`;
export const getSetUnit = `SELECT * FROM setUnit`;
export const getWorkouts = `SELECT * FROM workout`;
export const getWorkoutSets = `SELECT * FROM workoutSets`;

export const getData = `
    SELECT 
        ws.workoutId,
        ws.setUnitId,
        ws.rest as setRest,
        ws.repetition,
        w.title as workoutTitle,
        w.preparation,
        su.exerciseId,
        su.typeId,
        su.duration,
        su.rest as unitRest,
        ex.title as exerciceTitle,
        ut.label as type
    FROM 
        workoutSets ws
        LEFT JOIN workout w ON w.id = ws.workoutId
        LEFT JOIN setUnit su ON su.id = ws.setUnitId
        LEFT JOIN exercise ex ON ex.id = su.exerciseId
        LEFT JOIN unitType ut ON ut.id = su.typeId
    `;

export const getSetTypes = 'SELECT id, label FROM unitType';
