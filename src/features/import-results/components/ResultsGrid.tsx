import '../assets/results-grid.css'
import type { FC } from 'react'
import type { ImportResult } from '../types'

export const ResultsGrid: FC<ImportResult> = (results) => {
  return (
    <>
      <div className="results-grid">
        <ResultGroup count={results.new} />
      </div>
    </>
  )
}

interface ResultGroupProps {
  count: number
}

const ResultGroup: FC<ResultGroupProps> = ({ count }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      // using the index as key is OK here because the list is static
      <ResultCell key={index} />
    ))}
  </>
)

const ResultCell: FC = () => (
  <div>X</div>
)