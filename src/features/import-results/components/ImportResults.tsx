// import { useState, useEffect } from 'react'
import { useMemo } from 'react'

import { Button } from 'features/button'
import { getAllRecords, flattenRecords } from 'features/records'

import type { FC } from 'react'
import type { ImportResultsProps } from '../types'

// interface ImportCount {
//   new: number
//   match: number
//   conflict: number
// }

interface ImportResult {
  new: number
  match: number
  conflict: number
  total: number
}

export const ImportResults: FC<ImportResultsProps> = ({ data }) => {
  const results: ImportResult = useMemo(() => {
    const currentData = flattenRecords(getAllRecords())
    const newData = flattenRecords(data)
    console.log('imports', { currentData, newData })

    // run over all the new entries and check them
    const resultCount = Object.entries(newData).reduce((acc: ImportResult, [date, value]) => {
      // new
      if (currentData[date] === undefined) {
        return {
          ...acc,
          new: acc.new + 1,
          total: acc.total + 1
        }
      }

      // match
      if (currentData[date] === value) {
        return {
          ...acc,
          match: acc.match + 1,
          total: acc.total + 1
        }
      }

      // conflict
      return {
        ...acc,
        conflict: acc.conflict + 1,
        total: acc.total + 1
      }
    }, { new: 0, match: 0, conflict: 0, total: 0 } as ImportResult)

    return resultCount
  }, [data])

  return (
    <div>
      <h3 id="grid-title">Imported entries</h3>
      <div role="grid" aria-labelledby="grid-title">
        <div role="row">
          <div role="rowheader">Range</div>
          <div role="cell">x - y</div>
        </div>
        <div role="row">
          <div role="rowheader">New enties</div>
          <div role="cell">{results.new}</div>
        </div>
        <div role="row">
          <div role="rowheader">Match enties</div>
          <div role="cell">{results.match}</div>
        </div>
        <div role="row">
          <div role="rowheader">Conflicting enties</div>
          <div role="cell">{results.conflict}</div>
        </div>
        <div role="row">
          <div role="rowheader">Total</div>
          <div role="cell">{results.total}</div>
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
