import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {getReadings} from '../database/Database';

const screenWidth = Dimensions.get('window').width;

const ReportsScreen = () => {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const loadReadings = async () => {
      const data = await getReadings();
      setReadings(data);
    };
    loadReadings();
  }, []);

  const chartData = {
    labels: readings.slice(-7).map(r => r.date), // Last 7 dates
    datasets: [{
      data: readings.slice(-7).map(r => r.value),
    }],
  };

  const totalConsumption = readings.length > 1 ? readings[readings.length - 1].value - readings[0].value : 0;
  const averageConsumption = readings.length > 0 ? totalConsumption / readings.length : 0;
  const predictedNext = averageConsumption * 1.1; // Simple prediction, 10% increase

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consumption Reports</Text>
      <Text>Total Consumption: {totalConsumption.toFixed(2)} m³</Text>
      <Text>Average per Reading: {averageConsumption.toFixed(2)} m³</Text>
      <Text>Predicted Next Reading: {predictedNext.toFixed(2)} m³</Text>
      <Text style={styles.subtitle}>Consumption Trend</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ReportsScreen;