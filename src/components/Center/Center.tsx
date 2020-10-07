import React from 'react';
import { View, StyleSheet } from 'react-native';

const Center: React.FC = ({ children }) => {
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
