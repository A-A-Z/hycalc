import clsx from 'clsx'

import type { FC } from 'react'
import type { ResultCellProp } from '../types'

export const ResultCell: FC<ResultCellProp> = ({ groupType }) => (
  <div className={clsx('results-grid__cell', `results-grid__cell--${groupType}`)} />
)
