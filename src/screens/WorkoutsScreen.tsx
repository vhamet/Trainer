import React from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import WorkoutItem from '../components/Workouts/WorkoutItem/WorkoutItem';
import { State } from '../models/redux';
import { Workout } from '../models/app';
import { INIT_TRAINING } from '../store/actions/training';
import useCountdown from '../utils/hooks/useCountdown';

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const WorkoutsScreen: React.FC<WorkoutsScreenProps> = ({
  navigation: { navigate },
}: WorkoutsScreenProps) => {
  const dispatch = useDispatch();
  const { workouts } = useSelector((state: State) => state.data);
  const { stop: stopCountdown } = useCountdown();

  const selectWorkout = (workout: Workout) => {
    stopCountdown();
    dispatch({ type: INIT_TRAINING, workout });
    navigate('Training');
  };

  if (!workouts || !workouts.length) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => `${item.id}`}
        data={workouts}
        renderItem={({ item }) => (
          <WorkoutItem workout={item} onSelect={selectWorkout} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '10%',
  },
});

export default WorkoutsScreen;
