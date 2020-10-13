import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Workout } from '../../../models/app';
import { AntDesign, Feather } from '@expo/vector-icons';

import TouchableIcon from '../../TouchableIcon/TouchableIcon';

interface WorkoutItemProps {
  title: string;
  duration: string;
  onSelect: (workout: Workout) => void;
  onEdit: (id: number) => void;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({
  title,
  duration,
  onSelect,
  onEdit,
}: WorkoutItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{duration}</Text>
      <TouchableIcon onPress={onSelect} style={styles.start}>
        <AntDesign name="playcircleo" size={28} color="tomato" />
      </TouchableIcon>
      <TouchableIcon onPress={onEdit}>
        <Feather name="edit" size={28} color="tomato" />
      </TouchableIcon>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
    borderColor: 'tomato',
  },
  start: {
    marginHorizontal: 10,
  },
  title: {
    flex: 1,
    color: 'tomato',
  },
  text: {
    color: 'tomato',
    fontSize: 12,
  },
});

export default WorkoutItem;
