import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import Step from './Step';
import WorkoutSet from '../../../models/Set';

interface StepsProps {
  sets: WorkoutSet[];
}

const Steps = ({ sets }: StepsProps) => (
  <View style={styles.steps}>
    <FlatList
      keyExtractor={(set, index) => `${set.unit.exercise.id}_${index}`}
      data={sets}
      renderItem={({ item, index }) => (
        <Step key={index} unit={item.unit} index={index} />
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  steps: {
    flex: 1,
    width: '100%',
    padding: '10%',
  },
});

export default Steps;
