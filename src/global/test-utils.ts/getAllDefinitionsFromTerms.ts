// getAllDefinitionsFromTerms
import { buildQueries, queryHelpers } from '@testing-library/react'

const queryAllByTerm = (container: HTMLElement) => {
  return queryHelpers.queryAllByAttribute('role', container, 'term')
}

const getMultipleError = () =>
  `Found multiple elements with the role of term`
const getMissingError = () =>
  `Unable to find an element with the role of term`

// This creates `queryByTerm`, `getAllByTerm`, `getByTerm`, etc.
export const [
  queryByTerm,
  getAllByTerm,
  getByTerm,
  findAllByTerm,
  findByTerm
] = buildQueries(queryAllByTerm, getMultipleError, getMissingError)

// Now define your custom helper that extracts text
export const getAllTerms = (container: HTMLElement): string[] => {
  return getAllByTerm(container).map(el => el.textContent ?? '')
}