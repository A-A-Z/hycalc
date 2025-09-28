import { getCappedTotals } from '../utils/getCappedTotals'
import { ResultGroup } from './ResultGroup'
import { RESULT_TYPES } from '../constants'
import '../assets/results-grid.css'

import type { FC } from 'react'
import type { ImportResult } from '../types'

export const ResultsGrid: FC<ImportResult> = props => {
  // cap all the totals so they fit nicely in the grid
  const cappedTotal = getCappedTotals(props, 152)
  return (
    <>
      <div className="results-grid" role="presentation">
        {RESULT_TYPES.map(resultType => (
          <ResultGroup
            key={resultType}
            groupType={resultType}
            count={cappedTotal[resultType]}
            isCapped={cappedTotal[resultType] !== props[resultType]}
          />
        ))}
      </div>
    </>
  )
}
