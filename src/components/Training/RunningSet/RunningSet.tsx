import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Audio } from 'expo-av';

import Countdown from '../Countdown/Countdown';
import Player from '../Player/Player';
import useCountdown from '../../../utils/hooks/useCountdown';
import { State } from '../../../models/redux';
import { SetType } from '../../../models/app';
import { GO_TO_PIPE_INDEX } from '../../../store/actions/training';
import StylableButton from '../../StyledButton/StyledButton';
import Cards from '../Cards/Cards';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const beepSource = require('../../../../assets/sounds/Beep.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bleepSource = require('../../../../assets/sounds/Bleep.mp3');

const RunningSet: React.FC = () => {
  const dispatch = useDispatch();
  const { workout, pipe, pipeIndex } = useSelector(
    (state: State) => state.currentTraining,
  );
  const { soundOn } = useSelector((state: State) => state.settings);

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

  const [beep, setBeep] = useState<Audio.Sound>();
  const [bleep, setBleep] = useState<Audio.Sound>();
  useEffect(() => {
    const loadSound = async () => {
      const sound1 = new Audio.Sound();
      sound1.loadAsync(beepSource).then(() => setBeep(sound1));
      const sound2 = new Audio.Sound();
      sound2.loadAsync(bleepSource).then(() => setBleep(sound2));

      return async () => {
        await sound1.unloadAsync();
        await sound2.unloadAsync();
      };
    };

    loadSound();
  }, []);

  useEffect(() => {
    if (soundOn && !!countdown && countdown < 4 && countdown > 0 && !!beep) {
      beep.replayAsync();
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
    if (doneLabel) {
      if (soundOn && doneLabel === 'GO!' && !!bleep) {
        bleep.replayAsync();
      }
      setTimeout(() => {
        handleNext();
        setDoneLabel(undefined);
      }, 1000);
    }
  }, [doneLabel]);

  const handleNext = () => {
    stop();
    dispatch({ type: GO_TO_PIPE_INDEX, index: pipeIndex + 1 });
  };
  const handlePrevious = () => {
    stop();
    dispatch({ type: GO_TO_PIPE_INDEX, index: pipeIndex - 1 });
  };

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
          <StylableButton title="DONE" onPress={handleNext} />
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
        set={`${workout?.sets.length}`}
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
