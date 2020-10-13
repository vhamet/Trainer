import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Center from '../components/Center/Center';
import StyledButton from '../components/StyledButton/StyledButton';
import SetItem from '../components/Workouts/SetItem/SetItem';
import { State } from '../models/redux';
import { Set } from '../models/app';
import { WorkoutsParamList } from '../navigation/WorkoutsStack';

type EditWorkoutProps = StackScreenProps<WorkoutsParamList, 'EditWorkout'>;

const EditWorkout: React.FC<EditWorkoutProps> = ({
  route,
  navigation,
}: EditWorkoutProps) => {
  const workout = useSelector((state: State) =>
    state.data.workouts.find((w) => w.id === route.params?.workoutId),
  );

  if (!workout) {
    return (
      <Center>
        <ActivityIndicator size="large" color="tomato" />
      </Center>
    );
  }

  const handleSelectSet = (set: Set) => navigation.navigate('EditSet', { set });

  const handleSave = () => console.log('Saved !');

  const handleCancel = () => navigation.pop();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.title}</Text>
      <Text style={styles.preparation}>PREPARATION: {workout.preparation}</Text>
      <Text style={styles.sets}>SETS</Text>
      <FlatList
        data={workout.sets}
        keyExtractor={(item, i) => `${item.unit.exercise.id}_${i}`}
        renderItem={({ item }) => (
          <SetItem set={item} onSelect={handleSelectSet.bind(this, item)} />
        )}
        style={styles.list}
      />
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
  title: {
    margin: 10,
    color: 'tomato',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  preparation: {
    marginVertical: 15,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#303030',
    color: '#DEDEDE',
    borderColor: '#BCBCBC',
    borderWidth: 0.5,
    borderRadius: 10,
    textAlign: 'center',
  },
  sets: {
    marginHorizontal: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    color: 'tomato',
    fontWeight: 'bold',
    borderBottomColor: 'tomato',
    borderBottomWidth: 1,
  },
  list: {
    marginVertical: 5,
    paddingHorizontal: 10,
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

export default EditWorkout;
