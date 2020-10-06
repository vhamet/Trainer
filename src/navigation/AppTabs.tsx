import React, { useState, useEffect } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';

import WorkoutsScreen from '../screens/WorkoutsScreen';
import TrainingScreen from '../screens/TrainingScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import Center from '../components/Center/Center';
import { TabsParamList } from './TabsParamList';
import { INIT_DATA } from '../store/actions/data';
import { INIT_TRAINING } from '../store/actions/training';
import * as db from '../utils/db/database';

import State from '../models/redux/state';

const Tabs = createBottomTabNavigator<TabsParamList>();

const AppTabs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { workouts } = useSelector((state: State) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      await db.init();
      const { workouts, exercises } = await db.getData();
      dispatch({ type: INIT_DATA, workouts, exercises });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const setTraining = async () => {
      const workoutId = parseInt(
        (await AsyncStorage.getItem('workoutId')) || '0'
      );
      dispatch({
        type: INIT_TRAINING,
        workout: workouts.find(w => w.id === workoutId) || workouts[0],
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
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'Workouts':
              return <Feather name={'list'} size={size} color={color} />;
            case 'Training':
              return <AntDesign name={'rocket1'} size={size} color={color} />;
            case 'Exercises':
              return <Feather name={'settings'} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        activeBackgroundColor: 'rgba(25,25,25, 0.95)',
        inactiveBackgroundColor: 'rgba(25,25,25, 0.95)',
      }}
    >
      <Tabs.Screen name="Workouts" component={WorkoutsScreen} />
      <Tabs.Screen name="Training" component={TrainingScreen} />
      <Tabs.Screen name="Exercises" component={ExercisesScreen} />
    </Tabs.Navigator>
  );
};

export default AppTabs;
