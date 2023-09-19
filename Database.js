// Image Databse using SQLite from react native || Expo also has expo-sqlite-storage
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const databaseName = 'YourGalleryApp.db';
const databaseVersion = '1.0';
const databaseDisplayName = 'Camera Photos';
const databaseSize = 200000;
// const databaseLocation = "default"; 

const db = SQLite.openDatabase(
  databaseName,
  databaseVersion,
  databaseDisplayName,
  databaseSize,
//   databaseLocation,
);

// Save image metadata during initialization of the db by creating a table
db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Images (id INTEGER PRIMARY KEY AUTO INCREMENT, imagePath TEXT, latitude REAL, longitude REAL, captureDate TEXT)',
      [],
      () => {
        console.log('Table Created');
      },
      (error) => {
        console.error('Failed to create table:', error);
      }
    );
  });

//   Manage Saved Image & Metadata using methods such as add or delete 
export const imageMetadata= (imagePath, latitude, longitude, captureDate) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO Images (imagePath, latitude, longitude, captureDate) VALUES (?, ?, ?, ?)',
          [imagePath, latitude, longitude, captureDate],
          (_, result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  };
  
  // Retrieve all image metadata from the database: date & time + image location on  that date
  export const getAllImageMetadata = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Images',
          [],
          (_, { rows }) => {
            resolve(rows.raw());
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  };
  
  // Delete image metadata by ID
  export const deleteImageMetadataById = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM Images WHERE id = ?',
          [id],
          (_, result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  };
  

export default db;
