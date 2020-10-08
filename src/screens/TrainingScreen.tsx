import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Center from '../components/Center/Center';
import RunningSet from '../components/Training/RunningSet/RunningSet';
import StyledButton from '../components/StyledButton/StyledButton';
import { State } from '../models/redux';
import { START_TRAINING } from '../store/actions/training';
import SoundSetting from '../components/SoundSetting/SoundSetting';

const TrainingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { workout, hasStarted } = useSelector(
    (state: State) => state.currentTraining,
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
      <View style={styles.topBar}>
        <View style={styles.sound}>
          <SoundSetting />
        </View>
        <Text style={styles.title}>{workout.title.toUpperCase()}</Text>
      </View>
      {hasStarted ? (
        <RunningSet />
      ) : (
        <View style={styles.start}>
          <StyledButton title="START TRAINING" onPress={handleStart} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(25,25,25)',
  },
  topBar: {
    width: '100%',
    marginTop: 30,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 0.5,
    borderColor: '#DEDEDE',
    backgroundColor: '#303030',
  },
  sound: {
    position: 'absolute',
    top: 15,
    right: 5,
  },
  title: {
    color: 'tomato',
    fontSize: 30,
    fontWeight: 'bold',
  },
  start: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default TrainingScreen;
