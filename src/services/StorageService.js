import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@sensor_history';

export const saveSensorData = async (data) => {
  try {

    const existingData =
      await AsyncStorage.getItem(STORAGE_KEY);

    const parsedData =
      existingData ? JSON.parse(existingData) : [];

    parsedData.unshift({
      ...data,
      timestamp: new Date().toISOString()
    });

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(parsedData)
    );

  } catch (error) {
    console.log('Erro ao salvar', error);
  }
};

export const getSensorHistory = async () => {
  try {

    const data =
      await AsyncStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];

  } catch (error) {
    console.log('Erro ao buscar histórico', error);
    return [];
  }
};

export const clearHistory = async () => {
  try {

    await AsyncStorage.removeItem(STORAGE_KEY);

  } catch (error) {
    console.log('Erro ao limpar histórico', error);
  }
};
