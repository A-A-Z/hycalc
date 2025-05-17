import { useMemo, useState, useCallback } from 'react'

import { Button } from 'features/button'
import { getAllRecords, flattenRecords } from 'features/records'
import { RadioField } from 'features/radio-field'
import { ActionList } from 'features/action-list'
import { ResulstList } from './ResultsList'
import { ResultsGrid } from './ResultsGrid'
import '../assets/import-results.css'

import type { FC } from 'react'
import type { Option } from 'features/radio-field'
import type {
  ImportResultsProps,
  ImportResult,
  MergeOption
} from '../types'

export const ImportResults: FC<ImportResultsProps> = ({ data }) => {
  const [selectedMergeOption, setSelectedMergeOption] = useState<MergeOption | null>(null)

  const results: ImportResult = useMemo(() => {
    const currentData = flattenRecords(getAllRecords())
    const newData = flattenRecords(data)

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

  // TODO: deal with all matches
  // TODO: deal with zero results

  return (
    <form className="import-results">
      <section>
        <h3 id="grid-title">Imported entries</h3>
        
        <div className="import-results__columns">
          <div>
            <ResulstList {...results} />
          </div>
          <div>
            <ResultsGrid {...results} />
          </div>
        </div>
      </section>

      <section>
        <RadioField<MergeOption>
          label="Select merge method"
          name="merge-method"
          options={mergeOptions}
          value={selectedMergeOption}
          updateValue={handleMergeOptionChagne}
        />
      </section>

      <section>
        <ActionList actions={[
          { id: 'confirm', content: <Button type="submit">Comfirm</Button> },
          { id: 'concel', content: <Button type="reset">Cancel</Button> }
        ]} />
      </section>
    </form>
  )
}
