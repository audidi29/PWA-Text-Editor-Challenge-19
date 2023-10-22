import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Initialize the database
const dbPromise = initdb();

// Function to add content to the database
export const putDb = async (content) => {
  const db = await dbPromise;
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  try {
    // Add the content to the database
    await store.add({ content });
    console.log('Content added to the database');
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }

  await tx.done;
};

// Function to get all content from the database
export const getDb = async () => {
  const db = await dbPromise;
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  try {
    // Retrieve all content from the database
    const allContent = await store.getAll();
    return allContent;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    return [];
  } finally {
    tx.done;
  }
};
