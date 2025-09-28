import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ImportResults } from './ImportResults'

import type { ByRoleMatcher, ByRoleOptions } from '@testing-library/react'
import type { ResultTypeWithTotal } from '../types'

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
    expect(getByText('No changes in imported data.')).toBeInTheDocument()

    // show the cancel button but not import
    expect(queryByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(queryByRole('button', { name: 'Import' })).not.toBeInTheDocument()
  })

  test('will handle new entries', () => {
    const data: Array<[string, string]> = [['2025-4', '{ "1": "remote" }']] 
    const { getAllByRole, queryByRole, getByText } = render(<ImportResults data={data} />)
    
    // all totals should be at 0
    const totals = getTotals(getAllByRole)
    expect(totals.new).toBe(1)
    expect(totals.match).toBe(0)
    expect(totals.conflict).toBe(0)
    expect(totals.total).toBe(1)

    // no radio fields, just the warning text
    expect(queryByRole('radiogroup')).not.toBeInTheDocument()
    expect(getByText('Add items now test')).toBeInTheDocument() // TODO: change text

    // show the cancel and import button
    expect(queryByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(queryByRole('button', { name: 'Import' })).toBeInTheDocument()
  })

  // TODO: more tests
})
