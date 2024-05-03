class LocalStore {
  getItem(key) {
    let value = window.localStorage.getItem(key)
    if (!value) {
      return null
    }
    try {
      value = JSON.parse(value)
    } catch (e) {
      // console.log(e)
    }
    return value
  }

  setItem(key, value) {
    if (typeof value === 'undefined') {
      return undefined
    }
    if (typeof value === 'number' || typeof value === 'string') {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }

  // store push arr
  push(key, value) {
    const store = this.getItem(key)
    if (store) {
      this.setItem(key, [...store, value])
    } else {
      this.setItem(key, [value])
    }
  }

  unshift(key, value) {
    const store = this.getItem(key)
    if (store) {
      this.setItem(key, [value, ...store])
    } else {
      this.setItem(key, [value])
    }
  }

  // store slice arr
  slice(key, index, obj) {
    const store = this.getItem(key)
    if (!obj) {
      store.splice(index, 1)
    } else {
      store.splice(index, 1, obj)
    }
    this.setItem(key, store)
  }

  clear(key) {
    window.localStorage.removeItem(key)
  }

  removeItem(key) {
    this.clear(key)
  }
}

export default new LocalStore()
