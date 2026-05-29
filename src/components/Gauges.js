import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import CircularProgress from 'react-native-circular-progress-indicator';
import { theme } from '../styles/theme';

export default function Gauges({
  temperature,
  humidity
}) {
  return (
    <View style={styles.container}>

      <View style={styles.gaugeContainer}>
        <Text style={styles.label}>
          Temperatura
        </Text>

        <CircularProgress
          value={parseFloat(temperature)}
          radius={80}
          maxValue={50}
          title={'°C'}
        />
      </View>

      <View style={styles.gaugeContainer}>
        <Text style={styles.label}>
          Umidade
        </Text>

        <CircularProgress
          value={parseFloat(humidity)}
          radius={80}
          maxValue={100}
          title={'%'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  gaugeContainer: {
    backgroundColor: theme.card,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center'
  },
  label: {
    color: theme.text,
    fontSize: 18,
    marginBottom: 10
  }
});