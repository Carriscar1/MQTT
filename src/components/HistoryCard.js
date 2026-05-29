import React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

import { theme } from '../styles/theme';

export default function HistoryCard({ history }) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Histórico
      </Text>

      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.text}>
              🌡️ {item.temperatura}°C
            </Text>

            <Text style={styles.text}>
              💧 {item.umidade}%
            </Text>

            <Text style={styles.date}>
              {new Date(item.timestamp)
                .toLocaleString()}
            </Text>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },

  title: {
    color: theme.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },

  card: {
    backgroundColor: theme.card,
    padding: 15,
    borderRadius: 15,
    marginBottom: 10
  },

  text: {
    color: theme.text,
    fontSize: 16
  },

  date: {
    color: '#999',
    marginTop: 5
  }
});