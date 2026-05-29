import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { theme } from '../styles/theme';

export default function StatusModal({ status }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.card,
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center'
  },
  text: {
    color: theme.text,
    fontSize: 16,
    fontWeight: 'bold'
  }
});