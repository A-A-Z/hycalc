import { describe, test, expect, vi, afterEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { createContext } from 'react'
import * as records from 'features/records'
import { ImportResults } from './ImportResults'
import {
  MERGE_OPTION_LABELS,
  IMPORT_NO_CHANGE_COPY,
  IMPORT_NO_CURRENT_DATA_COPY
} from '../constants'

import type { ByRoleMatcher, ByRoleOptions } from '@testing-library/react'
import type { DateRecordsProviderProps, DateRecordsContextProps } from 'features/records'
import type { ResultTypeWithTotal } from '../types'

const mocks = vi.hoisted(() => ({
  replaceRecords: vi.fn()
}))

vi.mock('features/records', async (importActual) => ({
  ...(await importActual<typeof import('features/modal')>()),
  DateRecordsContext: createContext<DateRecordsContextProps>({
    records: {},
    setDateRecord: vi.fn(),
    replaceRecords: mocks.replaceRecords,
    ratio: 0,
    estRatio: 0,
    hasPlans: false,
    isLoaded: false
  })
}))

type GetAllByRoleFn = (role: ByRoleMatcher, options?: ByRoleOptions | undefined) => HTMLElement[]

// convert the terms/definition into a object with the group totals
const getTotals = (getAllByRole: GetAllByRoleFn): Record<ResultTypeWithTotal, number> => {
  const terms = getAllByRole('term')
  const definition = getAllByRole('definition')
  return terms.reduce((acc: Record<string, number>, term, index) => {
    const key = term.getAttribute('data-group-key')

    if (key === null) return acc

    const value = parseInt(definition[index].innerHTML)
    acc[key as ResultTypeWithTotal] = value
    return acc
  }, {})
}

describe('<ImportResults />', () => {
  const confirmTxt = 'Are you sure? This action can not be undone.'

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('will handle no data', () => {
    const { getAllByRole, queryByRole, getByText } = render(<ImportResults data={[]} />)
    
    // all totals should be at 0
    const totals = getTotals(getAllByRole)
    expect(totals.new).toBe(0)
    expect(totals.match).toBe(0)
    expect(totals.conflict).toBe(0)
    expect(totals.total).toBe(0)

    // no radio fields, just the warning text
    expect(queryByRole('radiogroup')).not.toBeInTheDocument()
    expect(getByText(IMPORT_NO_CHANGE_COPY)).toBeInTheDocument()

    // show the cancel button but not import
    expect(queryByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(queryByRole('button', { name: 'Import' })).not.toBeInTheDocument()
  })

  test('will handle new entries with no current data', () => {
    const data: Array<[string, string]> = [['2025-4', '{ "1": "remote" }']] 
    const { getAllByRole, queryByRole, getByText } = render(<ImportResults data={data} />)
    
    // totals with one new entry
    const totals = getTotals(getAllByRole)
    expect(totals.new).toBe(1)
    expect(totals.match).toBe(0)
    expect(totals.conflict).toBe(0)
    expect(totals.total).toBe(1)

    // no radio fields, just the warning text
    expect(queryByRole('radiogroup')).not.toBeInTheDocument()
    expect(getByText(IMPORT_NO_CURRENT_DATA_COPY)).toBeInTheDocument()

    // show the cancel and import button
    expect(queryByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(queryByRole('button', { name: 'Import' })).not.toBeDisabled()
  })

  test('will handle new entries with current data', () => {
    const spy = vi.spyOn(records, 'getAllRecords')
    spy.mockReturnValue([['2025-5', '{ "2": "remote" }']])
    const data: Array<[string, string]> = [['2025-4', '{ "1": "remote" }']]
    const { getAllByRole, getByRole, getByLabelText } = render(<ImportResults data={data} />)
    
    // totals with one new entry
    const totals = getTotals(getAllByRole)
    expect(totals.new).toBe(1)
    expect(totals.match).toBe(0)
    expect(totals.conflict).toBe(0)
    expect(totals.total).toBe(1)

    // show radio fields with correct options
    expect(getByRole('group', { name: 'Select merge method' })).toBeInTheDocument()
    expect(getAllByRole('radio').length).toBe(2)
    expect(getByLabelText(MERGE_OPTION_LABELS.merge)).toBeInTheDocument()
    expect(getByLabelText(MERGE_OPTION_LABELS.flush)).toBeInTheDocument()

    // show the cancel and import button
    expect(getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(getByRole('button', { name: 'Import' })).toBeDisabled()
  })

  test('will handle only matching entries', () => {
    const spy = vi.spyOn(records, 'getAllRecords')
    spy.mockReturnValue([['2025-4', '{ "1": "remote" }']])
    const data: Array<[string, string]> = [['2025-4', '{ "1": "remote" }']]
    const { getAllByRole, getByRole, queryByRole, getByText } = render(<ImportResults data={data} />)
    
    // totals with one matching entry
    const totals = getTotals(getAllByRole)
    expect(totals.new).toBe(0)
    expect(totals.match).toBe(1)
    expect(totals.conflict).toBe(0)
    expect(totals.total).toBe(1)

    // no radio fields, just the warning text
    expect(queryByRole('radiogroup')).not.toBeInTheDocument()
    expect(getByText(IMPORT_NO_CHANGE_COPY)).toBeInTheDocument()

    // show the cancel and import button
    expect(getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(queryByRole('button', { name: 'Import' })).not.toBeInTheDocument()
  })

  test('will handle only conflicting entries', () => {
    const spy = vi.spyOn(records, 'getAllRecords')
    spy.mockReturnValue([['2025-4', '{ "1": "remote" }']])
    const data: Array<[string, string]> = [['2025-4', '{ "1": "onsite" }']]
    const { getAllByRole, getByRole, getByLabelText } = render(<ImportResults data={data} />)
    
    // totals with one conflicting entry
    const totals = getTotals(getAllByRole)
    expect(totals.new).toBe(0)
    expect(totals.match).toBe(0)
    expect(totals.conflict).toBe(1)
    expect(totals.total).toBe(1)

    // show radio fields with correct options
    expect(getByRole('group', { name: 'Select merge method' })).toBeInTheDocument()
    expect(getAllByRole('radio').length).toBe(3)
    expect(getByLabelText(MERGE_OPTION_LABELS.keep)).toBeInTheDocument()
    expect(getByLabelText(MERGE_OPTION_LABELS.overwrite)).toBeInTheDocument()
    expect(getByLabelText(MERGE_OPTION_LABELS.flush)).toBeInTheDocument()

    // show the cancel and import button
    expect(getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(getByRole('button', { name: 'Import' })).toBeDisabled()
  })

  test('will handle mixed types', () => {
    const spy = vi.spyOn(records, 'getAllRecords')
    spy.mockReturnValue([['2025-4', '{ "1": "remote", "2": "remote" }']])
    const data: Array<[string, string]> = [['2025-4', '{ "1": "onsite", "2": "remote", "3": "onsite" }']]
    const { getAllByRole, getByRole, getByLabelText } = render(<ImportResults data={data} />)
    
    // totals with mixed results
    const totals = getTotals(getAllByRole)
    expect(totals.new).toBe(1)
    expect(totals.match).toBe(1)
    expect(totals.conflict).toBe(1)
    expect(totals.total).toBe(3)

    // show radio fields with correct options
    expect(getByRole('group', { name: 'Select merge method' })).toBeInTheDocument()
    expect(getAllByRole('radio').length).toBe(3)
    expect(getByLabelText(MERGE_OPTION_LABELS.keep)).toBeInTheDocument()
    expect(getByLabelText(MERGE_OPTION_LABELS.overwrite)).toBeInTheDocument()
    expect(getByLabelText(MERGE_OPTION_LABELS.flush)).toBeInTheDocument()

    // show the cancel and import button
    expect(getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(getByRole('button', { name: 'Import' })).toBeDisabled()
  })

  test('shows confirming message if mergining data', () => {
    const spy = vi.spyOn(records, 'getAllRecords')
    spy.mockReturnValue([['2025-4', '{ "1": "remote" }']])
    const data: Array<[string, string]> = [['2025-4', '{ "1": "onsite" }']]
    const { getByRole, getByLabelText, getByText, queryByText } = render(<ImportResults data={data} />)

    // no confirm message yet
    expect(queryByText(confirmTxt)).not.toBeInTheDocument()

    const importBtn = getByRole('button', { name: 'Import' })
    const radioOption = getByLabelText(MERGE_OPTION_LABELS.overwrite)

    // import button starts disabled
    expect(importBtn).toBeDisabled()
    
    // select overwrite option
    fireEvent.click(radioOption)

    // import button now active
    expect(importBtn).not.toBeDisabled()

    // click on import button
    fireEvent.click(importBtn)

    // shows confirm message
    expect(getByText(MERGE_OPTION_LABELS.overwrite)).toBeInTheDocument()
    expect(getByText(confirmTxt)).toBeInTheDocument()
    const yesBtn = getByRole('button', { name: 'Yes' })
    const noBtn = getByRole('button', { name: 'No' })
    expect(yesBtn).toBeInTheDocument()
    expect(noBtn).toBeInTheDocument()

    // click No to cancel
    fireEvent.click(noBtn)

    // returned to form
    expect(queryByText(confirmTxt)).not.toBeInTheDocument()
    expect(getByRole('heading', { name: 'Imported entries' })).toBeInTheDocument()
  })

  test('can confirm to update records', async () => {
    const wrapper = ({ children }: DateRecordsProviderProps) =>
          <records.DateRecordsProvider>{children}</records.DateRecordsProvider>
    const spy = vi.spyOn(records, 'getAllRecords')
    spy.mockReturnValue([['2025-4', '{ "1": "remote" }']])
    const data: Array<[string, string]> = [['2025-4', '{ "1": "onsite" }']]
    const { getByRole, getByLabelText } = render(<ImportResults data={data} />, { wrapper })

    const importBtn = getByRole('button', { name: 'Import' })
    const radioOption = getByLabelText(MERGE_OPTION_LABELS.overwrite)
    
    // select overwrite option
    fireEvent.click(radioOption)

    // click on import button
    fireEvent.click(importBtn)

    // shows confirm message
    const yesBtn = getByRole('button', { name: 'Yes' })
    expect(yesBtn).toBeInTheDocument()

    // click No to cancel
    fireEvent.click(yesBtn)

    // calls replaceRecord with new data
    expect(mocks.replaceRecords).toHaveBeenCalledWith([['2025-4', '{"1":"onsite"}']])
  })
})
