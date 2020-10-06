import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface TouchableIconProps {
  onPress: () => void;
  [prop: string]: any 
}

const TouchableIcon: React.FC<TouchableIconProps> = ({ onPress, children, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default TouchableIcon;
