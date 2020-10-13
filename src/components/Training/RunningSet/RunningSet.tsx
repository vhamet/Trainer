import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Countdown from '../Countdown/Countdown';
import Player from '../Player/Player';
import StyledButton from '../../StyledButton/StyledButton';
import Cards from '../Cards/Cards';
import useSound from '../../../utils/hooks/useSound';
import useCountdown from '../../../utils/hooks/useCountdown';
import { State } from '../../../models/redux';
import { SetTypeEnum } from '../../../models/app';
import { GO_TO_PIPE_INDEX } from '../../../store/actions/training';

const RunningSet: React.FC = () => {
  const dispatch = useDispatch();
  const { pipe, pipeIndex } = useSelector(
    (state: State) => state.currentTraining,
  );
  const { soundOn } = useSelector((state: State) => state.settings);
  const { beep, bleep } = useSound();

  const next = pipeIndex < pipe.length - 1 ? pipe[pipeIndex + 1] : null;

  const {
    count: countdown,
    isRunning,
    done,
    start: startCountdown,
    pause,
    resume,
    stop,
  } = useCountdown();

  useEffect(() => {
    if (soundOn && !!countdown && countdown < 4 && countdown > 0) {
      beep();
    }
  }, [countdown]);

  useEffect(() => {
    if (
      pipe[pipeIndex].type === SetTypeEnum.Duration &&
      pipe[pipeIndex].duration > 0
    ) {
      //   startCountdown(pipe[pipeIndex].duration);
      startCountdown(5);
    }
  }, [pipeIndex]);

  const [doneLabel, setDoneLabel] = useState<string>();
  useEffect(() => {
    if (done) {
      setDoneLabel(next?.isRest ? '-' : 'GO!');
    }
  }, [done]);

  useEffect(() => {
    const handleNextAsync = () => {
      setTimeout(() => {
        handleNext();
        setDoneLabel(undefined);
      }, 1000);
    };

    if (doneLabel) {
      if (soundOn) {
        bleep().then(() => handleNextAsync());
      } else {
        handleNextAsync();
      }
    }
  }, [doneLabel]);

  const handleNext = useCallback(() => {
    stop();
    dispatch({ type: GO_TO_PIPE_INDEX, index: pipeIndex + 1 });
  }, [pipeIndex]);
  const handlePrevious = useCallback(() => {
    stop();
    dispatch({ type: GO_TO_PIPE_INDEX, index: pipeIndex - 1 });
  }, [pipeIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.exercise}>
          {pipe[pipeIndex].label.toUpperCase()}
        </Text>
        {pipe[pipeIndex].type === SetTypeEnum.Duration ? (
          <Countdown
            label={doneLabel ?? `${countdown}`}
            percentage={
              doneLabel
                ? 100
                : ((pipe[pipeIndex].duration - (countdown || 0)) /
                    pipe[pipeIndex].duration) *
                  100
            }
          />
        ) : (
          <StyledButton title="DONE" onPress={handleNext} />
        )}

        <Player
          canPause={pipe[pipeIndex].type === SetTypeEnum.Duration}
          isRunning={isRunning}
          hasPrevious={pipeIndex > 0}
          hasNext={pipeIndex < pipe.length - 1}
          onToggle={isRunning ? pause : resume}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </View>

      <Cards
        exercise={pipeIndex === 0 ? '-' : pipe[pipeIndex].label}
        currentRep={pipe[pipeIndex].currentRep}
        duration={pipe[pipeIndex].sDuration}
        next={next ? next.label : 'FINISHED !'}
        nextRep={next ? next.currentRep : ' '}
        set={pipe[pipeIndex].currentSet}
        isDuration={pipe[pipeIndex].type === SetTypeEnum.Duration}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  exercise: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'tomato',
    textAlign: 'center',
  },
  content: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 30,
  },
  cardTitle: {
    color: 'white',
    fontSize: 10,
  },
  cardContent: {
    color: 'white',
    fontSize: 20,
  },
});

export default RunningSet;
