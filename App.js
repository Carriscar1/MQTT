import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';

import Gauge from './src/components/Gauges';
import LightControl from './src/components/LightControl';
import StatusModal from './src/components/StatusModal';
import HistoryCard from './src/components/HistoryCard';

import { connectMQTT } from './src/services/mqttService';
import {saveSensorData, getSensorHistory, } from './src/services/StorageService';

import { Topics } from './src/utils/topics';
import { theme } from './src/styles/theme';

export default function App() {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [status, setStatus] = useState('Conectando...');
  const [lightOn, setLightOn] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();

    connectMQTT(
      handleMessage,
      () => setStatus('MQTT Conectado'),
      (error) => setStatus(error)
    );
  }, []);

  const loadHistory = async () => {
    const data = await getSensorHistory();
    setHistory(data);
  };

  const handleMessage = async (topic, message) => {
    console.log(topic, message);

    if (topic === TOPICS.TEMPERATURE) {
      setTemperature(message);
    }

    if (topic === TOPICS.HUMIDITY) {
      setHumidity(message);
    }

    if (topic === TOPICS.STATUS) {
      setStatus(message);
    }

    if (topic === TOPICS.LIGHT) {
      setLightOn(message === '1');
    }

    if (topic === TOPICS.SENSOR_DATA) {
      try {
        const data = JSON.parse(message);

        setTemperature(data.temperatura);
        setHumidity(data.umidade);

        await saveSensorData({
          temperatura: data.temperatura,
          umidade: data.umidade,
        });

        loadHistory();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <Text style={styles.title}>
          Dashboard IoT
        </Text>

        <StatusModal status={status} />

        <Gauge
          temperature={temperature}
          humidity={humidity}
        />

        <LightControl lightOn={lightOn} />

        <HistoryCard history={history} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 20,
  },

  title: {
    color: theme.text,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});