import {
  deletePromise,
  getAllPromises,
  getPromise,
  openDatabasePromise,
  putPromise
} from './methods'

class InDB {
  constructor(keyPath) {
    this.error = null
    this.keyPath = keyPath
    this.openDatabasePromise = this._openDatabase(keyPath)
  }

  async _openDatabase(keyPath) {
    try {
      this.dbConnection = await openDatabasePromise(keyPath)
    } catch (error) {
      this.error = error
      throw error
    }
  }

  async _tx(txMode, callback) {
    await this.openDatabasePromise // await db connection
    const transaction = this.dbConnection.transaction(['KeysStore'], txMode)
    const objectStore = transaction.objectStore('KeysStore')
    const callbackResponse = await callback(objectStore)
    return callbackResponse
  }

  async findAll() {
    return this._tx('readonly', (objectStore) => getAllPromises(objectStore))
  }

  async findById(key) {
    return this._tx('readonly', (objectStore) => getPromise(objectStore, key))
  }

  async deleteById(key) {
    return this._tx('readwrite', (objectStore) =>
      deletePromise(objectStore, key)
    )
  }

  async save(item) {
    return this._tx('readwrite', (objectStore) => putPromise(objectStore, item))
  }
}

export default InDB
