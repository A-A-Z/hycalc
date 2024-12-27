import { useMemo, useCallback } from 'react'
import { format, DATE_FORMATS } from 'lib/date'
import { useGridStatus } from 'features/status'
import '../assets/month-spinbutton.css'

import type { KeyboardEventHandler } from 'react'

export const MonthSpinbutton = (): JSX.Element => {
  const {
    monthOffset,
    firstOfTheMonth,
    isReadOnly,
    navMonthForward,
    navMonthBack
  } = useGridStatus()

  const valueTxt = useMemo(
    () => format(firstOfTheMonth, DATE_FORMATS.calendarTitleMonth), 
    [firstOfTheMonth]
  )

  // Handle arrow keys on the spinbutton
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(e => {
    switch (e.key) {
      case 'ArrowUp':
        navMonthBack()
        break
      case 'ArrowDown':
        navMonthForward()
        break
    }
  }, [])

  return (
    <div
      className="month-nav"
      role="spinbutton"
      tabIndex={0}
      aria-label="Select month"
      aria-valuenow={monthOffset}
      aria-valuetext={valueTxt}
      onKeyDown={handleKeyDown}
    >
      <button
        className="month-nav__btn month-nav__btn--back"
        onClick={navMonthBack}
        disabled={isReadOnly}
        aria-label="Prevous month"
        tabIndex={-1}
      />
      <button
        className="month-nav__btn month-nav__btn--forward"
        onClick={navMonthForward}
        disabled={isReadOnly}
        aria-label="Next month"
        tabIndex={-1}
      />
    </div>
  )
}