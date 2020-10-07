import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Countdown from '../Countdown/Countdown';
import Player from '../Player/Player';
import useCountdown from '../../../utils/hooks/useCountdown';
import State from '../../../models/redux/state';
import Workout from '../../../models/Workout';
import { SetType } from '../../../models/SetUnit';
import { PIPE_NEXT } from '../../../store/actions/training';
import StylableButton from '../../StyledButton/StyledButton';

interface RunningSetProps {
  workout: Workout;
}

const RunningSet: React.FC<RunningSetProps> = ({ workout }) => {
  const dispatch = useDispatch();
  const { pipe, pipeIndex } = useSelector(
    (state: State) => state.currentTraining
  );

  const {
    count: countdown,
    isRunning,
    done,
    start: startCountdown,
    pause,
    resume,
  } = useCountdown();

  useEffect(() => {
    if (pipe[pipeIndex].type === SetType.Duration && pipe[pipeIndex].duration > 0) {
      //   startCountdown(pipe[pipeIndex].duration);
      startCountdown(5);
    }
  }, [pipeIndex]);

  useEffect(() => {
    if (done) {
      dispatch({ type: PIPE_NEXT });
    }
  }, [done]);

  const handleNext = () => dispatch({ type: PIPE_NEXT });

  return (
    <View>
      <Text style={styles.runningLabel}>{pipe[pipeIndex].label}</Text>
      <Text style={styles.nextLabel}>{`Next: ${
        pipeIndex < pipe.length - 1 ? pipe[pipeIndex + 1].label : 'FINISHED !'
      }`}</Text>

      {pipe[pipeIndex].type === SetType.Duration ? (
        <Countdown count={countdown!} duration={pipe[pipeIndex].duration}/>
      ) : (
        <StylableButton title="DONE" onPress={handleNext} />
      )}
      
      <Player
        canPause={pipe[pipeIndex].type === SetType.Duration}
        isRunning={isRunning}
        hasPrevious={pipeIndex > 0}
        hasNext={pipeIndex < pipe.length - 1}
        onToggle={isRunning ? pause : resume}
        onPrevious={() => {}}
        onNext={handleNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  runningLabel: {
    fontSize: 30,
    color: '#EDEDED',
  },
  nextLabel: {
    fontSize: 20,
    color: '#EDEDED',
  },
});

export default RunningSet;
