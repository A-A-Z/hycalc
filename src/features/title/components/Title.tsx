import { format } from 'date-fns'
import { useDateRecords } from 'features/records'
import { Ratio } from './Ratio'
import '../assets/title.css'

interface TitleProps {
  gridId: string
  year: number
  month: number
}

export const Title = ({ gridId, year, month }: TitleProps): JSX.Element => {
  const { ratio } = useDateRecords(1)
  const firstOfTheMonth = new Date(year, (month - 1), 1)
  return (
    <div className="title">
      <h2 id={gridId}><time dateTime={format(firstOfTheMonth, 'yyyy-MM')}>{format(firstOfTheMonth, 'MMMM yyyy')}</time></h2>
      <Ratio value={ratio} />
    </div>
  )
}
