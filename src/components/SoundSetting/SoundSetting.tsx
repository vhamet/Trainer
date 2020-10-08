import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import TouchableIcon from '../TouchableIcon/TouchableIcon';
import { State } from '../../models/redux';
import { TOGGLE_SOUND } from '../../store/actions/settings';
import useSound from '../../utils/hooks/useSound';

const SoundSetting: React.FC = () => {
  const dispatch = useDispatch();
  const { soundOn } = useSelector((state: State) => state.settings);
  const toggleSound = () => dispatch({ type: TOGGLE_SOUND });

  useSound();

  return (
    <View style={styles.container}>
      <TouchableIcon onPress={toggleSound}>
        <Octicons
          name={soundOn ? 'unmute' : 'mute'}
          size={16}
          color="rgba(255,99,71, 0.5)"
        />
        ;
      </TouchableIcon>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: 'rgba(255,99,71, 0.5)',
    borderWidth: 2,
    borderRadius: 50,
  },
});

export default SoundSetting;
