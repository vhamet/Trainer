import React, { useState, useEffect } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';

import WorkoutsStack from './WorkoutsStack';
import TrainingScreen from '../screens/TrainingScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import Center from '../components/Center/Center';
import { INIT_DATA } from '../store/actions/data';
import { INIT_TRAINING } from '../store/actions/training';
import { State } from '../models/redux';
import { Workout } from '../models/app';
import * as db from '../utils/db/database';

export type AppTabsParamList = {
  Workouts: undefined;
  Training: { workout: Workout } | undefined;
  Exercises: undefined;
};
const Tabs = createBottomTabNavigator<AppTabsParamList>();

interface TabBarElementProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  route: RouteProp<Record<string, object | undefined>, string>;
  color: string;
  size: number;
}

const TabBarElement: React.FC<TabBarElementProps> = ({
  route,
  color,
  size,
}: TabBarElementProps) => {
  switch (route.name) {
    case 'Workouts':
      return <Feather name="list" size={size} color={color} />;
    case 'Training':
      return <AntDesign name="rocket1" size={size} color={color} />;
    case 'Exercises':
      return <Feather name="settings" size={size} color={color} />;
    default:
      return null;
  }
};

const AppTabs: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { workouts } = useSelector((state: State) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      await db.init();
      const { workouts, exercises, setTypes } = await db.getData();
      dispatch({ type: INIT_DATA, workouts, exercises, setTypes });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const setTraining = async () => {
      const workoutId = parseInt(
        (await AsyncStorage.getItem('workoutId')) || '0',
        10,
      );

      dispatch({
        type: INIT_TRAINING,
        workout: workouts.find((w) => w.id === workoutId) || workouts[0],
      });
      setLoading(false);
    };

    if (workouts && workouts.length) {
      setTraining();
    }
  }, [workouts]);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="tomato" />
      </Center>
    );
  }

  return (
    <Tabs.Navigator
      initialRouteName="Training"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => TabBarElement({ route, color, size }),
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        activeBackgroundColor: 'rgba(25,25,25, 0.95)',
        inactiveBackgroundColor: 'rgba(25,25,25, 0.95)',
      }}
    >
      <Tabs.Screen name="Workouts" component={WorkoutsStack} />
      <Tabs.Screen name="Training" component={TrainingScreen} />
      <Tabs.Screen name="Exercises" component={ExercisesScreen} />
    </Tabs.Navigator>
  );
};

export default AppTabs;
