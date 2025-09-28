import { useMemo, useState, useCallback, use } from 'react'

import { Button } from 'features/button'
import { getAllRecords, flattenRecords } from 'features/records'
import { RadioField } from 'features/radio-field'
import { ActionList } from 'features/action-list'
import { ModalContext } from 'features/modal'
import { ResulstList } from './ResultsList'
import { ResultsGrid } from './ResultsGrid'
import { MERGE_OPTIONS, MERGE_OPTION_LABELS } from '../constants'
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

  const currentData = useMemo(() => flattenRecords(getAllRecords()), [])
  console.log({ currentData })

  const results: ImportResult = useMemo(() => {
    const newData = flattenRecords(data)
    console.log({ newData })

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
  }, [data, currentData])

  const hasExisitingData = useMemo(() => Object.keys(currentData).length > 0, [currentData])
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
    console.log('run merge')
    onCancel()
  }, [onCancel])

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
      <section className="import-results import-results--confirm">
        <p><strong>{MERGE_OPTION_LABELS[selectedMergeOption]}</strong></p>
        <p>Are you sure? This action can not be undone.</p>
        <ActionList align="center" actions={[
          {
            id: 'yes',
            content: <Button
              type="button"
              size="large"
              highlight="onsite"
              onClick={onConfirm}
            >Yes</Button>
          },
          {
            id: 'no',
            content: <Button
              type="button"
              size="large"
              highlight="remote"
              onClick={onBack}
            >No</Button>
          }
        ]} />
      </section>
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
