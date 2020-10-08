import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Card from './Card';

interface CardsProps {
  exercise: string;
  currentRep: string;
  duration: string;
  next: string;
  nextRep: string;
  set: string;
  isDuration: boolean;
}

const Cards: React.FC<CardsProps> = ({
  exercise,
  currentRep,
  duration,
  next,
  nextRep,
  set,
  isDuration,
}: CardsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        <Card>
          <Text style={styles.cardTitle}>EXERCISE</Text>
          <Text style={styles.cardContent}>{exercise}</Text>
          <Text style={styles.sub}>{currentRep}</Text>
        </Card>
        <Card>
          <Text style={styles.cardTitle}>
            {isDuration ? 'DURATION' : 'REPETITION'}
          </Text>
          <Text style={styles.cardContent}>{duration}</Text>
          <Text></Text>
        </Card>
      </View>
      <View style={styles.cards}>
        <Card>
          <Text style={styles.cardTitle}>NEXT</Text>
          <Text style={styles.cardContent}>{next}</Text>
          <Text style={styles.sub}>{nextRep}</Text>
        </Card>
        <Card>
          <Text style={styles.cardTitle}>SET</Text>
          <Text style={styles.cardContent}>{set}</Text>
          <Text></Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cards: {
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardTitle: {
    color: 'white',
    fontSize: 10,
  },
  cardContent: {
    color: 'white',
    fontSize: 20,
  },
  sub: {
    color: 'white',
    fontSize: 15,
  },
});

export default React.memo(Cards);
