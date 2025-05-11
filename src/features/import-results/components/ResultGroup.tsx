import { ResultCell } from './ResultCell'

import type { FC } from 'react'
import type { ResultGroupProps } from '../types'

export const ResultGroup: FC<ResultGroupProps> = ({ count, groupType }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <ResultCell key={index} groupType={groupType} />
    ))}
  </>
)
