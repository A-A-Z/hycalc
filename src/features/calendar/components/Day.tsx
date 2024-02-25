import { format } from 'date-fns'
import '../assets/day.css'

interface DayProps {
  date: Date
  isOffMonth: boolean
}

export const Day = ({ date, isOffMonth }: DayProps): JSX.Element => {
  return (
    <div role="gridcell" className="day">
      {isOffMonth
        ? (
          <button type="button" className="day__btn">
            <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'dd')}</time>
          </button>
        ) : (
          <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'dd')}</time>
        )}
    </div>
  )
}
