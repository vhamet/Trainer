import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import StyledButton from '../StyledButton/StyledButton';
import TouchableIcon from '../TouchableIcon/TouchableIcon';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: string) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
}: NumberInputProps) => {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [val, setVal] = useState(`${value}`);

  const showModal = () => setIsModalShowing(true);
  const handleChange = (text: string) => setVal(text.replace(/[^0-9]/g, ''));
  const handleCancel = () => setIsModalShowing(false);
  const handleSubmit = () => {
    onChange(val);
    setIsModalShowing(false);
  };

  const handleDecrement = () => setVal(`${Math.max(0, +val - 1)}`);
  const handleIncrement = () => setVal(`${+val + 1}`);

  return (
    <>
      <TouchableOpacity onPress={showModal} style={styles.container}>
        <Text style={styles.label}>
          {label}: {value}
        </Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent visible={isModalShowing}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>{label}</Text>
            <View style={styles.inputs}>
              <TouchableIcon onPress={handleDecrement} style={styles.icon}>
                <AntDesign name="minus" size={24} color="#DEDEDE" />
              </TouchableIcon>
              <TextInput
                keyboardType="numeric"
                value={val}
                onChangeText={handleChange}
                style={styles.input}
              />
              <TouchableIcon onPress={handleIncrement} style={styles.icon}>
                <AntDesign name="plus" size={24} color="#DEDEDE" />
              </TouchableIcon>
            </View>
            <View style={styles.actions}>
              <StyledButton title="Cancel" onPress={handleCancel} />
              <StyledButton title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#303030',
    borderWidth: 0.5,
    borderColor: '#BCBCBC',
    borderRadius: 10,
  },
  label: {
    color: '#DEDEDE',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303030EE',
  },
  modalContent: {
    width: '70%',
    alignItems: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: 'tomato',
    borderRadius: 10,
    backgroundColor: '#252525',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#DEDEDE',
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
    padding: 5,
    borderWidth: 0.5,
    borderColor: '#DEDEDE',
    borderRadius: 10,
  },
  input: {
    marginVertical: 15,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: '#272727',
    borderColor: '#DEDEDE',
    borderBottomWidth: 0.5,
    color: '#DEDEDE',
    fontSize: 30,
    textAlign: 'right',
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NumberInput;
