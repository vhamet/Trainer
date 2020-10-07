import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

interface CountdownProps {
  count: number;
  duration: number;
  label?: string;
}

const Countdown: React.FC<CountdownProps> = ({
  count,
  duration,
  label,
}: CountdownProps) => {
  const percentage = label ? 100 : ((duration - count) / duration) * 100;

  return (
    <View style={styles.container}>
      <ProgressCircle
        percent={percentage}
        radius={90}
        borderWidth={8}
        color="tomato"
        shadowColor="#999"
        bgColor="#303030"
      >
        <Text style={{ ...styles.count, ...(label ? styles.go : {}) }}>
          {label || count}
        </Text>
      </ProgressCircle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  count: {
    color: 'tomato',
    fontFamily: 'digital',
    fontSize: 100,
  },
  go: {
    fontSize: 80,
  },
});

export default Countdown;
