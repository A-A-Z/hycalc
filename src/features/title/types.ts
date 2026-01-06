export type ChangeDirection = 'none' | 'forward' | 'back'

export interface UseDateLabelReturn {
  /** The label of the current month */
  thisMonth: string
  /** The label of the prevous month */
  lastMonth: string
  /** Date formatted for datetime attr on <time> element */
  datetime: string,
  /** The label of the current year */
  yearLabel: string,
  /** Which direction the date is moving */
  direction: ChangeDirection
}
