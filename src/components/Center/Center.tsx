import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CenterProps {}

const Center: React.FC<CenterProps> = ({ children }) => {
  return <View style={styles.center}>{children}</View>;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Center;
