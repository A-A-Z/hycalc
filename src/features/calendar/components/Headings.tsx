import { memo, useCallback, useRef } from 'react'
import { format, startOfWeek, addDays, DATE_FORMATS } from 'lib/date'
import { useConfig } from 'features/config'
import { ToggleButton } from 'features/button'
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
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const start = startOfWeek(new Date)
  const days = Array.from({ length: 7 }).map((_, index) => addDays(start, index))
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
    }

    // update the weekdays config
    setConfig('weekdays', newWeekdays)
  }, [weekdays, setConfig])

  let colIndex = 0

  // for handling nav keys on the custom mode buttons
  const handleBtnArrowKey = useCallback((key: string, index: number) => {
    switch (key) {
      case 'ArrowRight':
        btnRefs.current[index + 1]?.focus()
        break

      case 'ArrowLeft':
        if (index > 0) {
          btnRefs.current[index - 1]?.focus()
        }
        break

      case 'Home':
        btnRefs.current[0]?.focus()
        break

      case 'End':
        btnRefs.current[6]?.focus()

    }
  }, [btnRefs.current])

  return (
    <div className="week week--header" role="row">
      {days.map((headerDate, dayIndex) => {
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
              <ToggleButton
                ref={el => { btnRefs.current[dayIndex] = el }}
                tabIndex={dayIndex === 0 ? 0 : -1}
                isActive={isColActive}
                onClick={() => { toggleWeekday(dayIndex) }}
                onKeyDown={e => handleBtnArrowKey(e.key, dayIndex)}
              >
                <HeadingTitle date={headerDate} />
                <span className="visually-hidden">Toggle weekday visibility</span>
              </ToggleButton>
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
