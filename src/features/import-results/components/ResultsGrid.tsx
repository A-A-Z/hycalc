import { ResultGroup } from './ResultGroup'
import { RESULT_TYPES } from '../constants'
import '../assets/results-grid.css'

import type { FC } from 'react'
import type { ImportResult } from '../types'

export const ResultsGrid: FC<ImportResult> = props => {
  console.log('test', RESULT_TYPES, props[RESULT_TYPES[0]])
  return (
    <>
      <div className="results-grid" role="presentation">
        {RESULT_TYPES.map(resultType => (
          <ResultGroup
            key={resultType}
            groupType={resultType}
            count={props[resultType]}
          />
        ))}
      </div>
    </>
  )
}
