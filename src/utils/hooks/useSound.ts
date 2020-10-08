import { useState, useEffect } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const beepSource = require('../../../assets/sounds/Beep.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bleepSource = require('../../../assets/sounds/Bleep.mp3');

interface Sounds {
  beep: () => Promise<false | AVPlaybackStatus>;
  bleep: () => Promise<false | AVPlaybackStatus>;
}

export default (): Sounds => {
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

  const playBeep = async () => !!beep && beep.replayAsync();
  const playBleep = async () => !!bleep && bleep.replayAsync();

  return { beep: playBeep, bleep: playBleep };
};
