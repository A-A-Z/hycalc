export const mockLocalStorage: Storage = {
  store: {},
  getItem(key) {
    console.log('get')
    return this.store[key] ?? null
  },
  setItem(key, value) {
    console.log('set')
    this.store[key] = value
  },
  removeItem(key) {
    delete this.store[key]
  },
  clear() {
    this.store = {}
  },
  length: 0,
  key: () => null
}