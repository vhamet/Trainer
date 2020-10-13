import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';

interface FromDatabase {
  id: number;
  label?: string;
  title?: string;
}

interface CustomPickerProps<T extends FromDatabase> {
  values: T[];
  selectedValue: number;
  onSelectValue: (value: string | number) => void;
}

function CustomPicker<T extends FromDatabase>({
  values,
  selectedValue,
  onSelectValue,
}: CustomPickerProps<T>): React.ReactElement<CustomPickerProps<T>> {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onSelectValue}
        style={styles.picker}
      >
        {values.map(({ id, label, title }) => (
          <Picker.Item key={id} label={label || title} value={id} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    backgroundColor: '#303030',
    borderWidth: 0.5,
    borderColor: '#BCBCBC',
    borderRadius: 10,
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 0.5,
    borderColor: 'red',
    color: '#DEDEDE',
    fontWeight: 'bold',
  },
});

export default CustomPicker;
