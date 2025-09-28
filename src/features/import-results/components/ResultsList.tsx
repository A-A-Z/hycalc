import { Fragment, useMemo } from 'react'
import clsx from 'clsx'
import { RESULT_TYPE_LABELS } from '../constants'
import '../assets/results-list.css'

import type { FC } from 'react'
import type { ImportResult, ResultTypeWithTotal } from '../types'

export const ResulstList: FC<ImportResult> = props => {
  const groups: Array<[string, number]> = useMemo(() => [
    ...Object.entries(props),
    ['total', (props.new + props.match + props.conflict)]
  ], [props])
  return (
    <dl className="results-list" aria-label="Results">
      {groups.map(([group, value]) => (
        <Fragment key={group}>
          <dt className="results-list__label">
            {RESULT_TYPE_LABELS[group as ResultTypeWithTotal]}
          </dt>
          <dd className={clsx(
            'results-list__value',
            value > 0 && `results-list__value--${group}`
          )} data-value={value}>
            {value}
          </dd>
        </Fragment>
      ))}
    </dl>
  )
}
