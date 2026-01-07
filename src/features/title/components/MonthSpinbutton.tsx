import { useCallback, use } from 'react'
import { useDateNavigate } from 'features/date'
import { StatusContext } from 'features/status'
import '../assets/month-spinbutton.css'

import type { FC, KeyboardEventHandler } from 'react'

export const MonthSpinbutton: FC = () => {
  const { isReadOnly } = use(StatusContext)
  const navToDate = useDateNavigate()
  const navMonthBack = useCallback(() => navToDate(1), [navToDate])
  const navMonthForward = useCallback(() => navToDate(-1), [navToDate])

  // Handle arrow keys on the spinbutton
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(e => {
    if (isReadOnly) {
      return
    }
    switch (e.key) {
      case 'ArrowUp':
        navMonthBack()
        break
      case 'ArrowDown':
        navMonthForward()
        break
    }
  }, [isReadOnly, navMonthBack, navMonthForward])

  return (
    <div
      className="month-nav"
      role="group"
      tabIndex={isReadOnly ? -1 : 0}
      onKeyDown={handleKeyDown}
      aria-label="Use up and down arrow keys to select month"
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