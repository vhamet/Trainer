import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { Audio } from 'expo';

interface CountdownProps {
  count: number;
  duration: number;
}

const Countdown = ({ count, duration }: CountdownProps) => {
  console.log(count, duration, (count / duration) * 100);
  return (
    <View style={styles.container}>
      <ProgressCircle
        percent={((duration - count) / duration) * 100}
        radius={80}
        borderWidth={8}
        color="tomato"
        shadowColor="#999"
        bgColor="#303030"
      >
        <Text style={styles.count}>{count}</Text>
      </ProgressCircle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  count: {
    color: 'tomato',
    fontFamily: 'digital',
    fontSize: 100,
  },
});

export default Countdown;
