import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ImportResults } from './ImportResults'

// TODO: buidl query for totals list?
// https://github.com/testing-library/dom-testing-library/issues/140#issuecomment-1473148255

describe('<ImportResults />', () => {
  test('will handle no data', () => {
    const { getAllByRole, queryByRole, getByText } = render(<ImportResults data={[]} />)
    
    // all totals should be at 0
    const totals = getAllByRole('definition')
    expect(totals[0]).toHaveTextContent('0')
    expect(totals[1]).toHaveTextContent('0')
    expect(totals[2]).toHaveTextContent('0')
    expect(totals[3]).toHaveTextContent('0')

    // no radio fields, just the warning text
    expect(queryByRole('radiogroup')).not.toBeInTheDocument()
    expect(getByText('No changes in imported data.')).toBeInTheDocument()

    // show the cancel button but not import
    expect(queryByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(queryByRole('button', { name: 'Import' })).not.toBeInTheDocument()
  })

  // TODO: more tests
})
