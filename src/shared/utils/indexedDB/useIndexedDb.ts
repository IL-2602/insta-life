import { useEffect, useState } from 'react'

interface ObjectStore {
  name: string
  options: IDBObjectStoreParameters
}

export const useIndexedDB = (
  databaseName: string,
  version: number,
  objectStores: ObjectStore[]
) => {
  const [db, setDb] = useState<IDBDatabase | null>(null)

  useEffect(() => {
    const request = window.indexedDB.open(databaseName, version)

    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result

      objectStores.forEach(store => {
        if (!db.objectStoreNames.contains(store.name)) {
          db.createObjectStore(store.name, store.options)
        }
      })
    }

    request.onsuccess = event => {
      setDb((event.target as IDBOpenDBRequest).result)
    }

    request.onerror = event => {
      console.error('IndexedDB error:', (event.target as IDBOpenDBRequest).error)
    }

    return () => {
      if (db) {
        db.close()
      }
    }
  }, [databaseName, version, objectStores])

  return db
}
