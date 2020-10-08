import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }: CardProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexBasis: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
    backgroundColor: 'tomato',
    borderRadius: 10,
  },
});

export default React.memo(Card);
