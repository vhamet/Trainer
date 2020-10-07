import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import TouchableIcon from '../../TouchableIcon/TouchableIcon';

interface PlayerProps {
  canPause: boolean;
  isRunning: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  onToggle: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const Player: React.FC<PlayerProps> = ({
  canPause,
  isRunning,
  hasPrevious,
  hasNext,
  onToggle,
  onPrevious,
  onNext,
}) => {
  return (
    <View style={styles.container}>
      <TouchableIcon onPress={onPrevious} disabled={!hasPrevious}>
        <AntDesign
          name="stepbackward"
          size={32}
          color={hasPrevious ? 'tomato' : '#ffd0c7'}
        />
        ;
      </TouchableIcon>
      <TouchableIcon onPress={onToggle} disabled={!canPause}>
        {isRunning ? (
          <MaterialIcons name="pause" size={38} color={canPause ? 'tomato' : 'transparent'} />
        ) : (
          <AntDesign name="caretright" size={32} color={canPause ? 'tomato' : 'transparent'} />
        )}
      </TouchableIcon>
      <TouchableIcon onPress={onNext} disabled={!hasNext}>
        <AntDesign
          name="stepforward"
          size={32}
          color={hasNext ? 'tomato' : '#ffd0c7'}
        />
        ;
      </TouchableIcon>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '40%',
  },
  hidden: { opacity: 0, height: 0 },
});

export default Player;
