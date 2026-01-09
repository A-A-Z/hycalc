import clsx from 'clsx'
import { Link } from 'react-router'
import { FaForward } from 'react-icons/fa6'
import { isSameMonth, isBefore } from 'lib/date'
import { useDateFromParams } from 'features/date'
import '../assets/home-link.css'

import type { FC } from 'react'

export const HomeLink: FC = () => {
  const [routeDate] = useDateFromParams()
  const currentDate = new Date()

  // don't show link if on the current month
  if (isSameMonth(routeDate, currentDate)) return null

  const direction = isBefore(routeDate, currentDate)
    ? 'home-link--forward'
    : 'home-link--back'

  return (
    <Link
      to="/"
      className={clsx('home-link', direction)}
      aria-label="Return to current month"
    >
      <FaForward />
    </Link>
  )
}
