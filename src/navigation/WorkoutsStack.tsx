import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WorkoutsScreen from '../screens/WorkoutsScreen';
import EditWorkoutScreen from '../screens/EditWorkoutScreen';
import EditSetScreen from '../screens/EditSetScreen';
import { Set } from '../models/app';

export type WorkoutsParamList = {
  EditWorkout: { workoutId: number } | undefined;
  Workouts: undefined;
  EditSet: { set: Set } | undefined;
};
const WorkoutStackNavigator = createStackNavigator<WorkoutsParamList>();

const defaultNavOptions = {
  headerStyle: {
    borderBottomWidth: 0.5,
    borderColor: '#DEDEDE',
    backgroundColor: '#303030',
  },
  headerTintColor: 'tomato',
};

const WorkoutsNavigator: React.FC = () => {
  return (
    <WorkoutStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <WorkoutStackNavigator.Screen
        name="Workouts"
        component={WorkoutsScreen}
        options={{ headerTitle: 'WORKOUTS' }}
      />
      <WorkoutStackNavigator.Screen
        name="EditWorkout"
        component={EditWorkoutScreen}
        options={({ route }) => ({
          headerTitle: route.params?.workoutId
            ? 'EDIT WORKOUT'
            : 'CREATE WORKOUT',
        })}
      />
      <WorkoutStackNavigator.Screen
        name="EditSet"
        component={EditSetScreen}
        options={({ route }) => ({
          headerTitle: route.params?.set ? 'EDIT SET' : 'CREATE SET',
        })}
      />
    </WorkoutStackNavigator.Navigator>
  );
};

export default WorkoutsNavigator;
