import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface TouchableIconProps {
  onPress: (param?: any) => void;
  children: React.ReactNode;
  [prop: string]: unknown;
}

const TouchableIcon: React.FC<TouchableIconProps> = ({
  onPress,
  children,
  ...props
}: TouchableIconProps) => (
  <TouchableOpacity onPress={onPress} {...props}>
    <Text>{children}</Text>
  </TouchableOpacity>
);

export default TouchableIcon;
