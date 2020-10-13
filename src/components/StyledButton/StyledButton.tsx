import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface StyledButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  title,
  onPress,
  style,
}: StyledButtonProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style ?? {}]}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: 'tomato',
  },
  text: {
    color: '#EDEDED',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StyledButton;
