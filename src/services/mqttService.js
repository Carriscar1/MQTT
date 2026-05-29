import MQTT from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOPICS } from '../utils/topics';

global.localStorage = AsyncStorage;

const mqttConfig = {
  host: process.env.MQTT_HOST,
  port: Number(process.env.MQTT_PORT),
  path: '/mqtt',
  clientId: 'react_native_' + Math.random().toString(16).substr(2, 8),
  user: process.env.MQTT_USER,
  pass: process.env.MQTT_PASS,
  protocol: 'wss'
};

let client = null;

export const connectMQTT = (
  onMessage,
  onConnect,
  onError
) => {
  client = new MQTT.Client(
    mqttConfig.host,
    mqttConfig.port,
    mqttConfig.path,
    mqttConfig.clientId
  );

  client.onConnectionLost = (responseObject) => {
    console.log('Conexão perdida', responseObject);
  };

  client.onMessageArrived = (message) => {
    onMessage(message.destinationName, message.payloadString);
  };

  client.connect({
    useSSL: true,
    userName: mqttConfig.user,
    password: mqttConfig.pass,
    onSuccess: () => {
      console.log('MQTT conectado');

      client.subscribe(TOPICS.TEMPERATURE);
      client.subscribe(TOPICS.HUMIDITY);
      client.subscribe(TOPICS.STATUS);
      client.subscribe(TOPICS.SENSOR_DATA);

      onConnect();
    },
    onFailure: (error) => {
      console.log('Erro MQTT', error);
      onError(error.errorMessage);
    }
  });
};

export const publishMessage = (topic, message) => {
  if (!client) return;

  const mqttMessage = new MQTT.Message(message);
  mqttMessage.destinationName = topic;

  client.send(mqttMessage);
};