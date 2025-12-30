export const parseYear = (year: string | undefined): number => {
  const MIN_YEAR = 2015
  const MAX_YEAR = 2099

  // returns the year as a number if it is valid and within range MIN_YEAR and MAX_YEAR
  // else return the current year as a number

  const currentYear = new Date().getFullYear()

  // must be string
  if (typeof year !== 'string') return currentYear

  // accept exactly 4 digits (no spaces, no signs, no decimals)
  if (!/^\d{4}$/.test(year)) return currentYear

  const yearNum = Number(year)
  return yearNum >= MIN_YEAR && yearNum <= MAX_YEAR ? yearNum : currentYear
}
