export const getAllRecords = () => {
  // const recordsJson = localStorage.getItem(recordKey)
  // return localStorage.map(record => {
  //   console.log(record)
  //   return record
  // })
  return Object.entries(localStorage)
    .filter(([, value]) => value !== '{}')
}
