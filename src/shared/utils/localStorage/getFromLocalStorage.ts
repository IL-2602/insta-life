function getFromLocalStorage<T>(key: string, defaultState: T) {
  let state = defaultState
  const stateAsString = localStorage.getItem(key)

  if (stateAsString !== null) {
    state = JSON.parse(stateAsString) as T
  }

  return state
}

export default getFromLocalStorage
