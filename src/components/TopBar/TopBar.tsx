import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import SoundSetting from '../SoundSetting/SoundSetting';

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }: TopBarProps) => {
  return (
    <View style={styles.topBar}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      <View style={styles.sound}>
        <SoundSetting />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    marginTop: 30,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#DEDEDE',
    backgroundColor: '#303030',
  },
  sound: { flex: 0 },
  title: {
    flex: 1,
    color: 'tomato',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default TopBar;
