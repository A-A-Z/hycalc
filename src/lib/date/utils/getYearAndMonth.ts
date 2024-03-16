import { getYear, getMonth, subMonths } from 'date-fns'

export const getYearAndMonth = (monthOffset: number = 0): { year: number; month: number } => {
  // Subtract the monthOffset from the current date
  const date = subMonths(new Date(), monthOffset);
  
  // Use getYear and getMonth from date-fns to get the year and month
  // Note that getMonth returns a zero-based index, so we add 1 to get a non-zero-indexed month
  const year = getYear(date);
  const month = getMonth(date) + 1;
  
  return { year, month };
}
