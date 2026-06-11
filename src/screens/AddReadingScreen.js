
import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import ReadingForm from '../components/ReadingForm';

const AddReadingScreen = ({navigation}) => {
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (_value, _date) => {
    try {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
      setTimeout(() => navigation.goBack(), 2500);
    } catch (e) {
      Alert.alert('Error', 'Failed to add reading');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Reading</Text>
      <View style={styles.card}>
        <ReadingForm onSubmit={handleSubmit} submitLabel="Add Reading" />
        {saved && <Text style={styles.successText}>Reading added!</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  successText: {
    marginTop: 12,
    color: '#137333',
    textAlign: 'center',
  },
});

export default AddReadingScreen;




