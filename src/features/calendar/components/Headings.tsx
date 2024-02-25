import { memo } from 'react'
import { format, startOfWeek, addDays } from 'date-fns'
import '../assets/weekdayHeading.css'

const HeadingsSrc = (): JSX.Element => {
  const start = startOfWeek(new Date)
  const days = Array.from({ length: 7 }).map((_, index) => addDays(start, index))
  return (
    <>
      {days.map(headerDate => (
        <li key={format(headerDate, 'EEE')} className='weekday-heading'><abbr title={format(headerDate, 'EEEE')}>{format(headerDate, 'EEE')}</abbr></li>)
      )}
    </>
  )
}

export const Headings = memo(HeadingsSrc) 
