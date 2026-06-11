import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const ReadingForm = ({
  onSubmit,
  initialValue = '',
  initialDate = '',
  submitLabel = 'Submit',
  onCancel = null,
}) => {
  const [value, setValue] = React.useState(initialValue);
  const [date, setDate] = React.useState(initialDate || new Date().toISOString().split('T')[0]);
  const [error, setError] = React.useState('');

  const handleSubmit = async () => {
    setError('');
    const val = parseFloat(value);
    if (!value || isNaN(val)) {
      setError('Please enter a valid reading value');
      return;
    }
    try {
      await onSubmit(val, date);
      setValue('');
      setDate(new Date().toISOString().split('T')[0]);
    } catch (err) {
      setError('Failed to save reading');
      console.error(err);
    }
  };

  return (
    <View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Reading Value (m³)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <Button title={submitLabel} onPress={handleSubmit} />
      {onCancel && <Button title="Cancel" onPress={onCancel} color="#999" />}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default ReadingForm;

