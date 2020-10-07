import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface StyledButtonProps {
  title: string;
  onPress: () => void;
}

const StyledButton: React.FC<StyledButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
  );

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'tomato',
  },
  text: {
    color: '#EDEDED',
  },
});

export default StyledButton;
