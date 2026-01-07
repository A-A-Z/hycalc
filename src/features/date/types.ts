export type CalendarViewParams = Record<'year' | 'month', string>

export type DateNavigateFn = (monthOffset: number) => void
