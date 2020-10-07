import * as SQLite from 'expo-sqlite';

import * as queries from './scripts';
import * as data from './data';
import { Workout, Set, Exercise, SetUnit } from '../../models/app';

let db: SQLite.WebSQLDatabase;

type dataRow = {
  workoutId: number;
  workoutTitle: string;
  preparation: number;
  setUnitId: number;
  unitRest: number;
  repetition: number;
  typeId: number;
  type: string;
  duration: number;
  setRest: number;
  exerciseId: number;
  exerciceTitle: string;
};

const executeSqlAsync = (
  query: string,
  args?: any[],
): Promise<SQLite.SQLResultSet> => {
  if (!db) {
    throw new Error('DB NOT READY');
  }

  return new Promise(function (resolve, reject) {
    db.transaction((tx) => {
      tx.executeSql(query, args, (_, res) => resolve(res));
    }, reject);
  });
};

const fillDb = async () => {
  try {
    await Promise.all([
      executeSqlAsync(
        queries.fillTableUnitType(data.unitTypes),
        data.unitTypes,
      ),
      executeSqlAsync(
        queries.fillTableExercise(data.exercises),
        data.exercises,
      ),
      executeSqlAsync(
        queries.fillTableSetUnit(data.setUnits),
        data.setUnits.flat(),
      ),
      executeSqlAsync(
        queries.fillTableWorkout(data.workouts),
        data.workouts.flat(),
      ),
      executeSqlAsync(
        queries.fillTableWorkoutSets(data.workoutSets),
        data.workoutSets.flat(),
      ),
    ]);
  } catch (error) {
    console.log('DB FILLING ERROR:', error);
    return false;
  }
};

export const init = async (): Promise<boolean> => {
  try {
    db = SQLite.openDatabase('trainer.database');
    await executeSqlAsync(queries.createTableUnitType);
    await executeSqlAsync(queries.createTableExercise);
    await executeSqlAsync(queries.createTableSetUnit);
    await executeSqlAsync(queries.createTableWorkout);
    await executeSqlAsync(queries.createTableWorkoutSets);

    const isDbReady = (await executeSqlAsync(queries.checkDbInitialized))?.rows
      ?.length;
    if (!isDbReady) {
      await fillDb();
    }
  } catch (error) {
    console.log('DB INITIALIZATION ERROR:', error);
    return false;
  }

  return true;
};

export const getData = async (): Promise<{
  workouts: Workout[];
  exercises: Map<number, Exercise>;
}> => {
  try {
    const data = await executeSqlAsync(queries.getData);

    const workouts: Workout[] = [];
    const exercises: Map<number, Exercise> = new Map();
    let currentWorkout: Workout | undefined;
    let currentSets: Set[] = [];
    for (let i = 0; i < data.rows.length; i++) {
      const row: dataRow = data.rows.item(i);
      if (!exercises.has(row.exerciseId)) {
        exercises.set(
          row.exerciseId,
          new Exercise(row.exerciseId, row.exerciceTitle),
        );
      }
      const unit = new SetUnit(
        exercises.get(row.exerciseId)!,
        row.typeId,
        row.duration,
        row.unitRest,
      );
      const set = new Set(unit, row.repetition, row.setRest);

      if (!currentWorkout || currentWorkout.id !== row.workoutId) {
        currentSets = [set];
        currentWorkout = new Workout(
          row.workoutId,
          row.workoutTitle,
          row.preparation,
          currentSets,
        );
        workouts.push(currentWorkout);
      } else {
        currentSets.push(set);
      }
    }

    return { workouts, exercises };
  } catch (error) {
    console.log('DB FETCHING DATA ERROR:', error);
    throw Error('Could not fetch data ! Please try again later');
  }
};
