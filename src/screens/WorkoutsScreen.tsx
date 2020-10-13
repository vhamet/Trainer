import React, { useState } from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import FilterInput from '../components/FilterInput/FilterInput';
import WorkoutItem from '../components/Workouts/WorkoutItem/WorkoutItem';
import StyledButton from '../components/StyledButton/StyledButton';
import useCountdown from '../utils/hooks/useCountdown';
import { State } from '../models/redux';
import { Workout } from '../models/app';

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const toMinutes = (seconds: number): string =>
  (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ':' : ':0') + seconds;

const WorkoutsScreen: React.FC<WorkoutsScreenProps> = ({
  navigation: { navigate },
}: WorkoutsScreenProps) => {
  const { workouts } = useSelector((state: State) => state.data);
  const { stop: stopCountdown } = useCountdown();

  const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

  if (!workouts || !workouts.length) {
    return <Text>Loading...</Text>;
  }

  const handleFilterWorkouts = (text: string) => {
    const regex = new RegExp(text, 'i');
    setFilteredWorkouts(
      workouts.filter((workout) => workout.title.match(regex)),
    );
  };

  const handleSelectWorkout = (workout: Workout) => {
    stopCountdown();
    navigate('Training', { workout });
  };

  const handleCreateWorkout = () => navigate('EditWorkout');

  const handleEditWorkout = (id: number) =>
    navigate('EditWorkout', { workoutId: id });

  return (
    <View style={styles.container}>
      <FilterInput
        onChange={handleFilterWorkouts}
        placeholder="Search workout"
      />
      <FlatList
        keyExtractor={(item) => `${item.id}`}
        data={filteredWorkouts}
        renderItem={({ item }) => {
          const duration = item.sets.reduce(
            (total, set) =>
              (total +=
                (set.rest || 0) +
                (set.unit.duration + set.unit.rest) * set.repetition),
            0,
          );

          return (
            <WorkoutItem
              title={item.title}
              duration={toMinutes(duration)}
              onSelect={handleSelectWorkout.bind(this, item)}
              onEdit={handleEditWorkout.bind(this, item.id)}
            />
          );
        }}
        style={styles.list}
      />
      <View style={styles.create}>
        <StyledButton title="NEW WORKOUT" onPress={handleCreateWorkout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#191919',
  },
  list: {
    paddingHorizontal: 10,
  },
  create: {
    padding: 10,
    alignItems: 'center',
  },
});

export default WorkoutsScreen;
