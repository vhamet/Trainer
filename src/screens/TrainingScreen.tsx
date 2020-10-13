import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import Center from '../components/Center/Center';
import TopBar from '../components/TopBar/TopBar';
import RunningSet from '../components/Training/RunningSet/RunningSet';
import StyledButton from '../components/StyledButton/StyledButton';
import { State } from '../models/redux';
import { INIT_TRAINING, START_TRAINING } from '../store/actions/training';
import { AppTabsParamList } from '../navigation/AppTabs';

type TrainingProps = BottomTabScreenProps<AppTabsParamList, 'Training'>;

const TrainingScreen: React.FC<TrainingProps> = ({
  route: { params },
}: TrainingProps) => {
  const dispatch = useDispatch();
  const { workout, hasStarted } = useSelector(
    (state: State) => state.currentTraining,
  );

  useEffect(() => {
    if (params?.workout) {
      dispatch({ type: INIT_TRAINING, workout: params.workout });
    }
  }, [params]);

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
      <TopBar title={workout.title} />
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
    backgroundColor: '#191919',
  },
  start: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default TrainingScreen;
