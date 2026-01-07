import { parse, isValid } from 'lib/date'

export const parseMonth = (month: string | undefined): number => {
  // return month as number (1-12) if it is valid (e.g. dec, Feb, JAN)
  // else return the current month as number (1-12)

  const currentMonth = new Date().getMonth() + 1

  // must be string
  if (typeof month !== 'string') return currentMonth

  const trimmed = month.trim()
  if (trimmed === '') return currentMonth

  // Parse month abbreviation (MMM) in a stable way by anchoring it to a fixed day/year.
  // date-fns parse is case-insensitive for month names in most locales.
  const parsed = parse(trimmed, 'MMM', new Date(2000, 0, 1))

  if (!isValid(parsed)) return currentMonth

  return parsed.getMonth() + 1
}
