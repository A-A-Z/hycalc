import { useNavigate } from 'react-router'
import { format, subMonths, isSameMonth } from 'lib/date'
import { useDateFromParams } from './useDateFromParams'

import type { DateNavigateFn } from '../types'

export const useDateNavigate = (): DateNavigateFn => {
  const navigate = useNavigate()
  const [currentDate] = useDateFromParams()
  
  const dateNavigate: DateNavigateFn = (monthOffset) => {
    const today = new Date()
    // get new date
    const newDate = subMonths(currentDate, monthOffset)

    if (isSameMonth(today, newDate)) {
      // if the current month then force the index url
      navigate('/')
      return
    }

    // parse date into string (nov, dec, etc)
    const url = format(newDate, '/yyyy/MMM').toLocaleLowerCase()
    // navigate to this date
    navigate(url)
  }

  return dateNavigate
}
