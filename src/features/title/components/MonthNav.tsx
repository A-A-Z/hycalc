import { useGridStatus } from 'features/status'

export const MonthNav = (): JSX.Element => {
  const {
    isReadOnly,
    navMonthForward,
    navMonthBack
  } = useGridStatus()
  return (
    <div className="month-nav">
      <button
        className="month-nav__btn month-nav__btn--back"
        onClick={navMonthBack}
        disabled={isReadOnly}
        aria-label="Prevous month"
      />
      <button
        className="month-nav__btn month-nav__btn--forward"
        onClick={navMonthForward}
        disabled={isReadOnly}
        aria-label="Next month"
      />
    </div>
  )
}