import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface TimerProps {
  time: number;
}

const Timer = ({ time }: TimerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  timer: {
    color: '#EDEDED',
    fontFamily: 'digital',
    fontSize: 100
  }
});

export default Timer;
