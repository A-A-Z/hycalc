import { use } from 'react'
import clsx from 'clsx'
import { StatusContext } from 'features/status'
import { useDateLabel } from '../hooks/useDateLabel'

import type { FC } from 'react'

export const DateLabel: FC = () => {
  const { gridId } = use(StatusContext)
  const {
    thisMonth,
    lastMonth,
    datetime,
    yearLabel,
    direction
  } = useDateLabel()

  return (
    <h2 id={gridId}>
      <time className="title__time" dateTime={datetime}>
        <span className={clsx('title__label', 'title__label--month', `title__label--${direction}`)}>
          <span className="title__label-offset" key={`month-${thisMonth}`}>
            <span>{thisMonth}</span>
            <span aria-hidden="true">{lastMonth}</span>
          </span>
        </span>
        <span className={clsx('title__label', 'title__label--year', `title__label--${direction}`)}>
          {yearLabel}
        </span>
      </time>
    </h2>
  )
}
