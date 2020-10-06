import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import SetUnit from '../../../models/SetUnit';
import { GO_TO_INDEX } from '../../../store/actions/training';

interface StepProps {
  unit: SetUnit;
  index: number;
  percentage?: number;
}

const Step: React.FC<StepProps> = ({
  unit: { exercise, type, duration },
  index,
  percentage = 0,
}) => {
  const dispatch = useDispatch();
  const goToUnit = () => dispatch({ type: GO_TO_INDEX, index });

  const dur = type === 'D' ? `${duration}s` : `x${duration}`;

  return (
    <TouchableOpacity onPress={goToUnit} style={styles.container}>
      <View style={{ ...styles.loader, width: `${percentage}%` }}></View>
      <View style={styles.content}>
        <Text>{exercise.title}</Text>
        <Text style={styles.duration}>({dur})</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#75b34c',
    borderWidth: 1,
  },
  loader: {
    position: 'absolute',
    height: '100%',
    width: '66%',
    left: 0,
    backgroundColor: '#a2d895',
    borderRadius: 10,
  },
  content: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    marginLeft: 2,
    fontSize: 12,
  },
});

export default React.memo(Step);
