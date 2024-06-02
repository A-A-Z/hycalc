import { memo, useCallback } from 'react'
import clsx from 'clsx'
import { FaToggleOn, FaToggleOff } from 'react-icons/fa6'
import { format, startOfWeek, addDays, DATE_FORMATS } from 'lib/date'
// import { useGridStatus } from 'features/status'
import { useConfig } from 'features/config'
import { useActiveWeekdays } from '../hooks/useActiveWeekdays'
import '../assets/weekdayHeading.css'


interface HeadingTitleProps {
  date: Date
}

const HeadingTitle = ({ date }: HeadingTitleProps): JSX.Element => (
  <abbr title={format(date, DATE_FORMATS.weekdayFull)}>
    {format(date, DATE_FORMATS.weekdayAbbr)}
  </abbr>
)

const HeadingsSrc = (): JSX.Element => {
  const start = startOfWeek(new Date)
  const days = Array.from({ length: 7 }).map((_, index) => addDays(start, index))
  // const { status: { isCustomMode } } = useGridStatus()
  const { config: { weekdays }, setConfig } = useConfig()

  const { isCustomMode, isActiveWeekday } = useActiveWeekdays()

  const toggleWeekday = useCallback((weekdayIndex: number) => {
    const index = weekdays.indexOf(weekdayIndex)
    const newWeekdays = [...weekdays]

    if (index === -1) {
      // weekday not in array, add it
      newWeekdays.push(weekdayIndex)
      newWeekdays.sort((a, b) => a - b)
    } else {
      // weekday is in array, remove it
      newWeekdays.splice(index, 1)
      console.log('remove', index, newWeekdays)
    }

    // update the weekdays config
    setConfig('weekdays', newWeekdays)
  }, [weekdays, setConfig])

  let colIndex = 0

  return (
    <div className="week week--header" role="row">
      {days.map((headerDate, dayIndex) => {
        // const isColActive = weekdays.some(day => day === dayIndex)

        // if (!isColActive && !isCustomMode) {
        //   // if inactive weekday and not in custom mode then don't show this heading
        //   return null
        // }
        const isColActive = isActiveWeekday(headerDate)
        if (!isCustomMode && !isColActive) {
          return null
        }

        // only count the columns that are rendered
        colIndex++

        const key = format(headerDate, DATE_FORMATS.weekdayAbbr)

        if (isCustomMode) {
          return (
            <div
              key={key}
              className="weekday-heading weekday-heading--custom-mode"
              role="columnheader"
              aria-colindex={colIndex}
            >
              <button
                type="button"
                className={clsx('weekday-heading__button', isColActive && 'weekday-heading__button--active',)}
                onClick={() => { toggleWeekday(dayIndex) }}
              >
                <HeadingTitle date={headerDate} />{isColActive ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
          )
        }

        return (
          <div
            key={key}
            className="weekday-heading"
            role="columnheader"
            aria-colindex={colIndex}
          >
            <HeadingTitle date={headerDate} />
          </div>
        )
      })}
    </div>
  )
}

export const Headings = memo(HeadingsSrc) 
