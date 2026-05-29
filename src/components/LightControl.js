import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { publishMessage } from '../services/mqttService';
import { TOPICS } from '../utils/topics';
import { theme } from '../styles/theme';

export default function LightControl({ lightOn }) {

  const toggleLight = () => {
    publishMessage(
      TOPICS.LIGHT,
      lightOn ? '0' : '1'
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Controle de Luz
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              lightOn
                ? theme.success
                : theme.danger
          }
        ]}
        onPress={toggleLight}
      >
        <Text style={styles.buttonText}>
          {lightOn ? 'DESLIGAR' : 'LIGAR'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.card,
    padding: 20,
    borderRadius: 20,
    marginTop: 20
  },
  title: {
    color: theme.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  button: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
});