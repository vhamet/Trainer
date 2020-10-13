import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface FilterInputProps {
  onChange: (text: string) => void;
  placeholder?: string;
}

const FilterInput: React.FC<FilterInputProps> = ({
  onChange,
  placeholder = '',
}: FilterInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={26} color="#181818" style={styles.icon} />
      <TextInput
        onChangeText={onChange}
        placeholder={placeholder}
        style={{ ...styles.filter, ...(isFocused ? styles.focused : {}) }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    left: 5,
  },
  filter: {
    flex: 1,
    paddingVertical: 5,
    paddingLeft: 40,
    paddingRight: 15,
    backgroundColor: '#AAAAAA',
    borderRadius: 50,
    color: '#181818',
  },
  focused: {
    borderColor: 'tomato',
    borderWidth: 1,
  },
});

export default FilterInput;
