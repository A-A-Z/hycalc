import { useMemo, useState, useCallback, use } from 'react'

import { Button } from 'features/button'
import { getAllRecords, flattenRecords } from 'features/records'
import { RadioField } from 'features/radio-field'
import { ActionList } from 'features/action-list'
import { ModalContext } from 'features/modal'
import { ResulstList } from './ResultsList'
import { ResultsGrid } from './ResultsGrid'
import { MergeConfirm } from './MergeConfirm'
import { MERGE_OPTIONS } from '../constants'
import { getMergedData } from '../utils/getMergedData'
import '../assets/import-results.css'

import type { FC, FormEventHandler } from 'react'
import type {
  ImportResultsProps,
  ImportResult,
  MergeOption
} from '../types'

export const ImportResults: FC<ImportResultsProps> = ({ data }) => {
  const [selectedMergeOption, setSelectedMergeOption] = useState<MergeOption | null>(null)
  const [isConfirming, setIsConfiming] = useState(false)
  const { onClose } = use(ModalContext)

  // TODO: BUG doesn't get latest, just on mounted
  const currentData = useMemo(() => getAllRecords(), [])
  const currentDataFlat = useMemo(() => flattenRecords(currentData), [currentData])
  console.log({ currentDataFlat })

  const results: ImportResult = useMemo(() => {
    const newData = flattenRecords(data)

    // run over all the new entries and check them
    const resultCount = Object.entries(newData).reduce((acc: ImportResult, [date, value]) => {
      // new
      if (currentDataFlat[date] === undefined) {
        return {
          ...acc,
          new: acc.new + 1
        }
      }

      // match
      if (currentDataFlat[date] === value) {
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
  }, [data, currentDataFlat])

  const hasExisitingData = useMemo(() => Object.keys(currentDataFlat).length > 0, [currentDataFlat])
  const hasConflicts = results.conflict > 0
  const hasChanges = hasConflicts || results.new > 0
  const mergeOptions = useMemo(() => MERGE_OPTIONS
    .filter(({ value }) => {
      if (value === 'merge' && hasConflicts) return false
      if (value === 'overwrite' && !hasConflicts) return false
      if (value === 'keep' && !hasConflicts) return false
      return true
    })
  , [hasConflicts])

  const handleMergeOptionChagne = useCallback((value: MergeOption | null) => {
    setSelectedMergeOption(value)
  }, [])

  const onCancel = useCallback(() => {
    setSelectedMergeOption(null)
    setIsConfiming(false)
    if (onClose !== undefined) onClose()
  }, [onClose])

  const onBack = useCallback(() => {
    setSelectedMergeOption(null)
    setIsConfiming(false)
  }, [])

  const onConfirm = useCallback(() => {
    // TODO: run me
    console.log('run merge')
    const mergedData = getMergedData(currentData, data, selectedMergeOption!)
    console.log('merged', { mergedData })

    onCancel()
  }, [currentData, data, onCancel, selectedMergeOption])

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(event => {
    event.preventDefault()

    if (!hasExisitingData) {
      onConfirm()
      return
    }
  
    setIsConfiming(true)
  }, [hasExisitingData, onConfirm])

  if (isConfirming && selectedMergeOption !== null) {
    // show confirm message
    return (
      <MergeConfirm
        selectedMergeOption={selectedMergeOption}
        onConfirm={onConfirm}
        onBack={onBack}
      />
    )
  }

  return (
    <form className="import-results sections" onSubmit={onSubmit}>
      <section>
        <h3 id="grid-title" className="sections__title">Imported entries</h3>
        
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
        {(hasChanges && hasExisitingData) &&
          <RadioField<MergeOption>
            label="Select merge method"
            name="merge-method"
            options={mergeOptions}
            value={selectedMergeOption}
            updateValue={handleMergeOptionChagne}
          />
        }
        {(hasChanges && !hasExisitingData) &&
          // TODO: add copy
          <p>Add items now test</p>
        }
        {!hasChanges &&
          // TODO: add copy
          <p>No changes in imported data.</p>
        }
      </section>

      <section>
        <ActionList actions={[
          {
            id: 'confirm',
            isActive: hasChanges,
            content: <Button
              type="submit"
              size="large"
              highlight="onsite"
              disabled={selectedMergeOption === null && hasExisitingData}
            >Import</Button>
          },
          {
            id: 'concel',
            content: <Button
              type="button"
              size="large"
              highlight="remote"
              onClick={onCancel}
            >Cancel</Button>
          }
        ]} />
      </section>
    </form>
  )
}
