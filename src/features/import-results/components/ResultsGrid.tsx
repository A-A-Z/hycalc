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
  props = {
    new: 105,
    match: 0,
    conflict: 0
  }
  // TODO:
  // If total is over X amount, switch to summary mode
  // Would be good if only summary of some types
  // so total still equals X
  // X = 105

  // order types from smallest to largest
  // check each type if over?
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
