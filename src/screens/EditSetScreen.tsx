import React, { useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import StyledButton from '../components/StyledButton/StyledButton';
import Center from '../components/Center/Center';
import NumberInput from '../components/NumberInput/NumberInput';
import CustomPicker from '../components/CustomPicker/CustomPicker';
import { WorkoutsParamList } from '../navigation/WorkoutsStack';
import { SetTypeEnum } from '../models/app';
import { State } from '../models/redux';

const toNumber = (value: string, defaultValue = 1) => {
  let number = parseInt(value.replace(/[^0-9]/g, ''), 10);
  if (isNaN(number)) {
    number = defaultValue;
  }

  return number;
};

type EditSetProps = StackScreenProps<WorkoutsParamList, 'EditSet'>;

const EditSet: React.FC<EditSetProps> = ({
  route,
  navigation,
}: EditSetProps) => {
  const { setTypes, exercises } = useSelector((state: State) => state.data);

  const [set, setSet] = useState(route.params?.set);

  if (!set) {
    return (
      <Center>
        <ActivityIndicator size="large" color="tomato" />
      </Center>
    );
  }

  const { unit, repetition, rest } = set;

  const handleSelectExercise = (value: number | string) =>
    setSet({
      ...set,
      unit: { ...unit, exercise: exercises.get(+value)! },
    });

  const handleSelectType = (value: number | string) =>
    setSet({ ...set, unit: { ...unit, type: +value } });

  const handleRepetitionChange = (value: string) => {
    setSet({ ...set, repetition: toNumber(value) });
  };

  const handleRestChange = (value: string) =>
    setSet({ ...set, rest: toNumber(value, 0) });

  const handleDurationChange = (value: string) =>
    setSet({ ...set, unit: { ...unit, duration: toNumber(value) } });

  const handleUnitRestChange = (value: string) =>
    setSet({ ...set, unit: { ...unit, rest: toNumber(value, 0) } });

  const handleSave = () => console.log('Saved !');

  const handleCancel = () => navigation.pop();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SET</Text>
        <NumberInput
          label="Repetition"
          value={repetition}
          onChange={handleRepetitionChange}
        />
        <NumberInput
          label="Rest"
          value={rest || 0}
          onChange={handleRestChange}
        />
        <Text style={styles.title}>UNIT</Text>
        <CustomPicker
          values={Array.from(exercises.values())}
          selectedValue={unit.exercise.id}
          onSelectValue={handleSelectExercise}
        />
        <CustomPicker
          values={setTypes}
          selectedValue={unit.type}
          onSelectValue={handleSelectType}
        />
        <NumberInput
          label={SetTypeEnum[unit.type]}
          value={unit.duration}
          onChange={handleDurationChange}
        />
        <NumberInput
          label="Unit Rest"
          value={unit.rest}
          onChange={handleUnitRestChange}
        />
      </View>
      <View style={styles.actions}>
        <StyledButton
          title="Cancel"
          onPress={handleCancel}
          style={styles.action}
        />
        <StyledButton title="Save" onPress={handleSave} style={styles.action} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    marginBottom: 10,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: 'tomato',
    color: 'tomato',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 5,
    marginTop: 10,
    paddingVertical: 10,
    borderTopColor: 'tomato',
    borderTopWidth: 1,
  },
  action: {
    flex: 1,
    maxWidth: '30%',
  },
});

export default EditSet;
