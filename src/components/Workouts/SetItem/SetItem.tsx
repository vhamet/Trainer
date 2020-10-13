import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { Set, SetTypeEnum } from '../../../models/app';

interface SetItemProps {
  set: Set;
  onSelect: () => void;
}

const SetItem: React.FC<SetItemProps> = ({
  set: { unit, repetition, rest },
  onSelect,
}: SetItemProps) => {
  const duration =
    unit.type === SetTypeEnum.Repetition
      ? `x${unit.duration}`
      : `${unit.duration}s`;

  return (
    <TouchableOpacity onPress={onSelect} style={styles.container}>
      <View style={styles.line}>
        <Text style={styles.title}>{unit.exercise.title}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>DURATION: {duration}</Text>
        <Text style={styles.text}>
          REST: {unit.rest === 0 ? '-' : `${unit.rest}s`}
        </Text>
        <Text style={styles.text}>REPETITION: x{repetition}</Text>
      </View>
      {!!rest && rest > 0 && (
        <Text style={styles.setRest}>SET REST: {rest}s</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#303030',
    borderWidth: 0.5,
    borderColor: '#BCBCBC',
    borderRadius: 10,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  title: {
    color: 'tomato',
    fontWeight: 'bold',
  },
  text: {
    color: '#DEDEDE',
    fontSize: 12,
  },
  setRest: {
    marginTop: 3,
    paddingTop: 3,
    borderTopWidth: 0.5,
    borderColor: '#BCBCBC',
    color: '#DEDEDE',
    fontSize: 11,
    textAlign: 'center',
  },
});

export default SetItem;
