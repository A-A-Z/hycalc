import { getCappedTotals } from '../utils/getCappedTotals'
import { ResultGroup } from './ResultGroup'
import { RESULT_TYPES } from '../constants'
import '../assets/results-grid.css'

import type { FC } from 'react'
import type { ImportResult } from '../types'

export const ResultsGrid: FC<ImportResult> = props => {
  // console.log('test', RESULT_TYPES, props[RESULT_TYPES[0]])
  console.log({ props })
  // props = {
  //   new: 56,
  //   match: 52,
  //   conflict: 15
  // }
  // console.log(getCappedTotals(props, 20))
  props = {
    new: 210,
    match: 230,
    conflict: 15
  }
  
  const cappedTotal = getCappedTotals(props, 152)
  console.log({ cappedTotal })

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
