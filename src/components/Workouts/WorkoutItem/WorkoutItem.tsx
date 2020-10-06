import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Workout from '../../../models/Workout';

interface WorkoutItemProps {
  workout: Workout;
  onSelect: (workout: Workout) => void;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(workout)} style={styles.container}>
      <View style={styles.content}>
        <Text>{workout.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#75b34c',
    borderWidth: 1,
  },

  content: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WorkoutItem;
