/* If the browser doesn't support indexedDB, then we'll use the next best thing, which is the older API
called mozIndexedDB, or the newer API called webkitIndexedDB. */
if (!window.indexedDB)
  window.indexedDB =
    window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB

/* This is a JavaScript conditional that checks if the browser supports the IDBTransaction object. If
the browser does not support the IDBTransaction object, then it will use the webkitIDBTransaction or
the msIDBTransaction object. */
if (!window.IDBTransaction)
  window.IDBTransaction = window.webkitIDBTransaction || window.msIDBTransaction

if (!window.IDBKeyRange)
  window.IDBKeyRange = window.webkitIDBKeyRange || window.msIDBKeyRange

/* The code is checking if the browser supports the IndexedDB API. If it does not, it throws an error. */
if (!window.indexedDB) throw new Error('IndexedDB is not available')

// Promise wrapper for indexedDB.open
/**
 * It opens the database, and if it doesn't exist, it creates it
 * @param keyPath - The keyPath is the path to the value you want to store.
 * @returns A promise that resolves to the database object.
 */
function openDatabasePromise(keyPath) {
  return new Promise((resolve, reject) => {
    /* The below code is creating a request to open the database. */
    const dbOpenRequest = window.indexedDB.open('SecretKeys', 1) || {}

    /* The below code is creating a new database object and then opening the database. */
    dbOpenRequest.onblocked = () => {
      reject('Data structure update is required')
    }

    /* Error handling */
    dbOpenRequest.onerror = (err) => {
      reject(
        'Not possible to open DB' + (err.message ? 'Info: ' + err.message : '')
      )
    }

    /* When the database is first created, it creates a new object store called `KeysStore` and sets
    the `keyPath` to `'key'`. */
    dbOpenRequest.onupgradeneeded = (event) => {
      const db = event.target.result
      try {
        db.deleteObjectStore('KeysStore')
      } catch (err) {
        console.log(err)
      }
      db.createObjectStore('KeysStore', { keyPath })
    }

    dbOpenRequest.onsuccess = () => {
      resolve(dbOpenRequest.result)
    }

    dbOpenRequest.onerror = reject
  })
}

export default openDatabasePromise
