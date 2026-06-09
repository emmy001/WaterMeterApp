import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'WaterMeter.db', location: 'default'});

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS readings (id INTEGER PRIMARY KEY AUTOINCREMENT, value REAL, date TEXT);'
    );
  });
};

export const addReading = (value, date) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO readings (value, date) VALUES (?, ?);',
        [value, date],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};

export const getReadings = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM readings ORDER BY date ASC;',
        [],
        (_, {rows}) => {
          const readings = [];
          for (let i = 0; i < rows.length; i++) {
            readings.push(rows.item(i));
          }
          resolve(readings);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const updateReading = (id, value, date) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE readings SET value = ?, date = ? WHERE id = ?;',
        [value, date, id],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteReading = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM readings WHERE id = ?;',
        [id],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};

initDB();
