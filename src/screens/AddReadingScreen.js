import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {addReading} from '../database/Database';

const AddReadingScreen = ({navigation}) => {
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAdd = async () => {
    if (!value) {
      Alert.alert('Error', 'Please enter a reading value');
      return;
    }
    await addReading(parseFloat(value), date);
    Alert.alert('Success', 'Reading added');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Meter Reading</Text>
      <TextInput
        style={styles.input}
        placeholder="Reading Value (m³)"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Add Reading" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddReadingScreen;