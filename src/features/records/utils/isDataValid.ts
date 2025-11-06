// TODO: unit test me
export const isDataValid = (data: unknown): boolean => {
  // data must be an array
  if (!Array.isArray(data)) return false

  const [firstEntry] = data

  // the first enrey must be an array
  if (!Array.isArray(firstEntry)) return false

  const [dateString, valueString] = firstEntry

  // dateString must be valid yyyy-m format
  if (!/^([0-9]{4})-([0-9]{1,2})$/.test(dateString)) return false
  
  // valueString must be a object in string form
  return /^{(.*)}$/.test(valueString)
}
