
/** Fetches My List */
export const fetchMyList = () => {
  var existing = localStorage.getItem(`${import.meta.env.REACT_APP_LOCALSTORAGE_KEY}`)
  return existing ? JSON.parse(existing) : []
}

/** Saves My List */
export const saveMyList = updated => {
  localStorage.setItem(`${import.meta.env.REACT_APP_LOCALSTORAGE_KEY}`, JSON.stringify(updated))
}

/** Removes an item from My List */
export const removeItem = item => {
  const list = fetchMyList()
  const updated = list.filter(i => i !== item.uri)
  saveMyList(updated)
}

/** Saves item to MyList */
export const saveItem = item => {
  var list = fetchMyList()
  !list.includes(item.uri) && list.push(item.uri)
  saveMyList(list)
}

/** Indicates whether or not an item is present in My List */
export const isItemSaved = (item, list) => {
  list = list ? list : fetchMyList()
  return list.includes(item.uri)
}
