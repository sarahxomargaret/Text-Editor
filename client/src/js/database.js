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

// logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', readwrite);
  const objStore = tx.objectStore('jate');
  const req = objStore.put({id: 1, value: content});
  const res = await req;
  console.log('data saved to database', res);
};

// logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB ('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const objStore = tx.objectStore('jate');
  const req = objStore.getAll();
  const res = await req;
  console.log('request.value', res);
}

initdb();
