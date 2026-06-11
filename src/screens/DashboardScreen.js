import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView, Alert} from 'react-native';
import ReadingForm from '../components/ReadingForm';
import {getReadings, addReading, updateReading, deleteReading} from '../database/Database';

const DashboardScreen = ({navigation}) => {
  const [readings, setReadings] = useState([]);
  const [editingReading, setEditingReading] = useState(null);

  const loadReadings = async () => {
    const data = await getReadings();
    setReadings(data);
  };

  React.useEffect(() => {
    loadReadings();
  }, []);

  const handleAdd = async (value, date) => {
    await addReading(value, date);
    loadReadings();
    setEditingReading(null);
  };

  const handleUpdate = async (id, value, date) => {
    await updateReading(id, value, date);
    loadReadings();
    setEditingReading(null);
  };

  const handleDelete = async (id) => {
    Alert.alert('Delete', 'Delete this reading?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteReading(id);
          loadReadings();
        },
      },
    ]);
  };

  const recentReadings = readings.slice(-5).reverse();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.card}>
        <ReadingForm
          onSubmit={editingReading ? (value, date) => handleUpdate(editingReading.id, value, date) : handleAdd}
          initialValue={editingReading?.value || ''}
          initialDate={editingReading?.date || ''}
          submitLabel={editingReading ? 'Update Reading' : 'Add Reading'}
          onCancel={editingReading ? () => setEditingReading(null) : null}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Readings</Text>
        {recentReadings.map((item) => (
          <View key={item.id} style={styles.item}>
            <View>
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={styles.valueText}>{item.value} m³</Text>
            </View>
            <View style={styles.actionButtons}>
              <Button title="Edit" onPress={() => setEditingReading(item)} />
              <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        ))}
        {readings.length === 0 && <Text style={styles.emptyText}>No readings yet</Text>}
      </View>

      <View style={styles.buttonRow}>
        <Button title="View Reports" onPress={() => navigation.navigate('Reports')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 20,
    fontStyle: 'italic',
  },
  buttonRow: {
    marginBottom: 20,
  },
});

export default DashboardScreen;


