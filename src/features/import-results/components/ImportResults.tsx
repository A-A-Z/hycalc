// import { useState, useEffect } from 'react'
import { useMemo, useState, useCallback } from 'react'

import { Button } from 'features/button'
import { getAllRecords, flattenRecords } from 'features/records'
import { RadioField } from 'features/radio-field'

import type { FC } from 'react'
import type { Option } from 'features/radio-field'
import type { ImportResultsProps } from '../types'

// interface ImportCount {
//   new: number
//   match: number
//   conflict: number
// }

// TODO: move
interface ImportResult {
  new: number
  match: number
  conflict: number
  total: number
}
type MergeOption = 'merge' | 'overwrite' | 'keep' | 'flush'

export const ImportResults: FC<ImportResultsProps> = ({ data }) => {
  const [selectedMergeOption, setSelectedMergeOption] = useState<MergeOption | null>(null)

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

  const mergeOptions: Array<Option<MergeOption>> = [
    { id: 'm1', label: 'Merge data', value: 'merge' },
    { id: 'm2', label: 'Merge data, overwrite old enties', value: 'overwrite' },
    { id: 'm3', label: 'Merge data, keep old enties', value: 'keep' },
    { id: 'm4', label: 'Delete all old data, add new enties', value: 'flush' }
  ]

  // TODO: can't click on modal
  const handleMergeOptionChagne = useCallback((value: MergeOption | null) => {
    console.log('click')
    setSelectedMergeOption(value)
  }, [])

  return (
    <form>
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

      <RadioField<MergeOption>
        label="Select merge method"
        name="merge-method"
        options={mergeOptions}
        value={selectedMergeOption}
        updateValue={handleMergeOptionChagne}
      />

      <ul>
        <li><Button type="submit" onClick={() => { console.log('click') }}>Comfirm</Button></li>
        <li><Button type="reset">Cancel</Button></li>
      </ul>
    </form>
  )
}
