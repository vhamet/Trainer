import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import StyledButton from '../components/StyledButton/StyledButton';
import { WorkoutsParamList } from '../navigation/WorkoutsStack';
import Center from '../components/Center/Center';

type EditSetProps = StackScreenProps<WorkoutsParamList, 'EditSet'>;

const EditSet: React.FC<EditSetProps> = ({
  route,
  navigation,
}: EditSetProps) => {
  const set = route.params?.set;

  if (!set) {
    return (
      <Center>
        <ActivityIndicator size="large" color="tomato" />
      </Center>
    );
  }

  const { unit, repetition, rest } = set;

  const handleSave = () => console.log('Saved !');

  const handleCancel = () => navigation.pop();

  return (
    <View style={styles.container}>
      <Text>{unit.exercise.title}</Text>
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 5,
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
