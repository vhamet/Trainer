import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Countdown from '../Countdown/Countdown';
import Player from '../Player/Player';
import StyledButton from '../../StyledButton/StyledButton';
import Cards from '../Cards/Cards';
import useSound from '../../../utils/hooks/useSound';
import useCountdown from '../../../utils/hooks/useCountdown';
import { State } from '../../../models/redux';
import { SetType } from '../../../models/app';
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
      pipe[pipeIndex].type === SetType.Duration &&
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
        {pipe[pipeIndex].type === SetType.Duration ? (
          <Countdown
            count={countdown!}
            duration={pipe[pipeIndex].duration}
            label={doneLabel}
          />
        ) : (
          <StyledButton title="DONE" onPress={handleNext} />
        )}

        <Player
          canPause={pipe[pipeIndex].type === SetType.Duration}
          isRunning={isRunning}
          hasPrevious={pipeIndex > 0}
          hasNext={pipeIndex < pipe.length - 1}
          onToggle={isRunning ? pause : resume}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </View>

      <Cards
        exercise={pipe[pipeIndex].label}
        currentRep={pipe[pipeIndex].currentRep}
        duration={pipe[pipeIndex].sDuration}
        next={next ? next.label : 'FINISHED !'}
        nextRep={next ? next.currentRep : ' '}
        set={pipe[pipeIndex].currentSet}
        isDuration={pipe[pipeIndex].type === SetType.Duration}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
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
