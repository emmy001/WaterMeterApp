import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {getReadings} from '../database/Database';

const DashboardScreen = ({navigation}) => {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const loadReadings = async () => {
      const data = await getReadings();
      setReadings(data);
    };
    loadReadings();
  }, []);

  const averageConsumption = readings.length > 1 ? (readings[readings.length - 1].value - readings[0].value) / readings.length : 0;
  const lastReading = readings.length > 0 ? readings[readings.length - 1].value : 0;
  const highUsage = lastReading > averageConsumption * 1.5; // Alert if 50% above average

  const renderReading = ({item}) => (
    <View style={styles.readingItem}>
      <Text>Date: {item.date}</Text>
      <Text>Reading: {item.value} m³</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {highUsage && <Text style={styles.alert}>Alert: High water usage detected!</Text>}
      <Button title="Add New Reading" onPress={() => navigation.navigate('AddReading')} />
      <Button title="View Reports" onPress={() => navigation.navigate('Reports')} />
      <Text style={styles.subtitle}>Recent Readings:</Text>
      <FlatList
        data={readings.slice(-5)} // Last 5
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReading}
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
  alert: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  readingItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DashboardScreen;