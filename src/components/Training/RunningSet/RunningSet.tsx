import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Timer from '..//Timer/Timer';
import Player from '../Player/Player';
import useCountdown from '../../../utils/hooks/useCountdown';
import State from '../../../models/redux/state';
import Workout from '../../../models/Workout';
import { GO_TO_SET, NEXT_REPETITION } from '../../../store/actions/training';
import StylableButton from '../../StyledButton/StyledButton';

interface RunningSetProps {
  workout: Workout;
}

const RunningSet: React.FC<RunningSetProps> = ({ workout }) => {
  const dispatch = useDispatch();
  const { setIndex, repetition } = useSelector(
    (state: State) => state.currentTraining
  );
  console.log('repetition', repetition);
  const {
    count: countdown,
    isRunning,
    done,
    start: startCountdown,
    pause,
    resume,
  } = useCountdown();

  const [isResting, setIsResting] = useState(false);

  const set = workout.sets[setIndex];
  const numberOfSets = workout.sets.length || 0;

  useEffect(() => {
    startCountdown(workout.preparation);
  }, []);

  useEffect(() => {
    if (done) {
      if (setIndex < 0) {
        console.log('done INDEX 0');
        dispatch({ type: GO_TO_SET, index: 0 });
      } else {
        setIsResting(false);
        console.log('done NEXT REP');
        if (set?.repetition && repetition < set.repetition) {
          dispatch({ type: NEXT_REPETITION });
        } else {
          dispatch({ type: GO_TO_SET, index: setIndex + 1 });
        }
      }
    }
  }, [done, setIndex, set]);

  useEffect(() => {
    if (set?.unit.type === 'Duration') {
      // set.unit.rest
      //   ? startCountdown(set.unit.duration, set.unit.rest)
      //   : startCountdown(set.unit.duration);
      set.unit.rest ? startCountdown(10, 3) : startCountdown(4);
    }
  }, [setIndex, repetition]);

  const handleNext = () => {
    if (!!set && set.unit.rest > 0) {
      // startCountdown(unit.rest);
      setIsResting(true);
      startCountdown(3);
    } else {
      if (set?.repetition && repetition < set.repetition) {
        dispatch({ type: NEXT_REPETITION });
      } else {
        dispatch({ type: GO_TO_SET, index: setIndex + 1 });
      }
    }
  };

  const runningLabel = () => {
    let label = 'GET READY !';
    if (setIndex >= 0) {
      if (isResting) {
        label = `REST - Next: ${set.unit.exercise.title}`;
      } else {
        label = `${set.unit.exercise.title} - ${repetition} / ${set.repetition}`;
      }
    }

    return label;
  };
  const label = runningLabel();
  const hasTimer = isRunning || setIndex < 0 || set?.unit.type === 'Duration';

  return (
    <View>
      <Text style={styles.runningLabel}>{label}</Text>

      {hasTimer && <Timer time={countdown!} />}
      {set?.unit.type === 'Repetion' && (
        <StylableButton title="DONE" onPress={handleNext} />
      )}

      <Player
        canPause={hasTimer}
        isRunning={isRunning}
        hasPrevious={setIndex > 0}
        hasNext={setIndex < numberOfSets - 1}
        onToggle={isRunning ? pause : resume}
        onPrevious={() => {}}
        onNext={handleNext}
      />
    </View>
  );
  //   {setIndex >= 0 && (
  //     <Text>{`${set!.unit.exercise.title} - ${repetition} / ${
  //       set!.repetition
  //     }`}</Text>
  //   )}
  //   {!!countdown && <Timer time={countdown!} />}

  //   {!!set && set!.unit.type === 'Repetion' && (
  //     <StylableButton title="DONE" onPress={handleNext} style={styles.button}/>
  //   )}
  //   {hasStarted && (

  //   )}
};

const styles = StyleSheet.create({
  runningLabel: {
    fontSize: 20,
    color: '#EDEDED',
  },
});

export default RunningSet;
