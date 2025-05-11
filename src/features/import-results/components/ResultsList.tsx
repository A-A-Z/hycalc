import '../assets/results-list.css'

import type { FC } from 'react'
import type { ImportResult } from '../types'

export const ResulstList: FC<ImportResult> = props => (
  <dl className="results-list">
    <dt>New entries</dt>
    <dd>{props.new}</dd>

    <dt>Matching</dt>
    <dd>{props.match}</dd>

    <dt>Conficts</dt>
    <dd>{props.conflict}</dd>

    <dt>Tolal</dt>
    <dd>{props.new + props.match + props.conflict}</dd>
  </dl>
)
