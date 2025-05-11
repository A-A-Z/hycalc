// import { useState, useEffect } from 'react'
import { useMemo, useState, useCallback } from 'react'

import { Button } from 'features/button'
import { getAllRecords, flattenRecords } from 'features/records'
import { RadioField } from 'features/radio-field'
import { ActionList } from 'features/action-list'
import { ResultsGrid } from './ResultsGrid'

import type { FC } from 'react'
import type { Option } from 'features/radio-field'
import type {
  ImportResultsProps,
  ImportResult,
  MergeOption
} from '../types'

// interface ImportCount {
//   new: number
//   match: number
//   conflict: number
// }

// TODO: move
// interface ImportResult {
//   new: number
//   match: number
//   conflict: number
//   total: number
// }
// type MergeOption = 'merge' | 'overwrite' | 'keep' | 'flush'

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
          new: acc.new + 1
        }
      }

      // match
      if (currentData[date] === value) {
        return {
          ...acc,
          match: acc.match + 1
        }
      }

      // conflict
      return {
        ...acc,
        conflict: acc.conflict + 1
      }
    }, { new: 0, match: 0, conflict: 0 } as ImportResult)

    return resultCount
  }, [data])

  const mergeOptions: Array<Option<MergeOption>> = [
    { id: 'm1', label: 'Merge data', value: 'merge' },
    { id: 'm2', label: 'Merge data, overwrite old enties', value: 'overwrite' },
    { id: 'm3', label: 'Merge data, keep old enties', value: 'keep' },
    { id: 'm4', label: 'Delete all old data, add new enties', value: 'flush' }
  ]

  const handleMergeOptionChagne = useCallback((value: MergeOption | null) => {
    setSelectedMergeOption(value)
  }, [])

  return (
    <form>
      <h3 id="grid-title">Imported entries</h3>

      <ResultsGrid {...results} />
      
      <RadioField<MergeOption>
        label="Select merge method"
        name="merge-method"
        options={mergeOptions}
        value={selectedMergeOption}
        updateValue={handleMergeOptionChagne}
      />

      <ActionList actions={[
        { id: 'confirm', content: <Button type="submit">Comfirm</Button> },
        { id: 'concel', content: <Button type="reset">Cancel</Button> }
      ]} />
    </form>
  )
}
