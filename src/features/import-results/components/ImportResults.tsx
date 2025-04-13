import { Button } from 'features/button'

import type { FC } from 'react'
import type { ImportResultsProps } from '../types'

export const ImportResults: FC<ImportResultsProps> = ({ data }) => {
  return (
    <div>
      <h3 id="grid-title">Imported entries</h3>
      <div role="grid" aria-labelledby="grid-title">
        <div role="row">
          <div role="rowheader">New enties</div>
          <div role="cell">0</div>
        </div>
        <div role="row">
          <div role="rowheader">Match enties</div>
          <div role="cell">0</div>
        </div>
        <div role="row">
          <div role="rowheader">Conflicting enties</div>
          <div role="cell">0</div>
        </div>
        <div role="row">
          <div role="rowheader">Total</div>
          <div role="cell">{data.length}</div>
        </div>
      </div>

      <ul>
        <li><Button>Import enties</Button></li>

        <li><Button>Overwrite old enties</Button></li>
        <li><Button>Keep old enties</Button></li>
        
        <li><Button>Cancel</Button></li>
      </ul>
    </div>
  )
}
