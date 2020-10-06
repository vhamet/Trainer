import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Steps from '../components/Training/Step/Steps';
import Center from '../components/Center/Center';
import RunningSet from '../components/Training/RunningSet/RunningSet';
import StylableButton from '../components/StyledButton/StyledButton';
import State from '../models/redux/state';
import { START_TRAINING } from '../store/actions/training';

const TrainingScreen = () => {
  const dispatch = useDispatch();
  const { workout, hasStarted } = useSelector(
    (state: State) => state.currentTraining
  );

  if (!workout) {
    return (
      <Center>
        <ActivityIndicator size="large" color="tomato" />
      </Center>
    );
  }

  const handleStart = () => dispatch({ type: START_TRAINING });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.title}</Text>
      {/* <Steps sets={workoutx.sets} /> */}
      {hasStarted ? (
        <RunningSet workout={workout} />
      ) : (
        <StylableButton title="START TRAINING" onPress={handleStart} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'rgb(25,25,25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'tomato',
    fontSize: 30,
  },
});

export default TrainingScreen;
