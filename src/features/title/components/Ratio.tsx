import { useMemo } from 'react'
import clsx from 'clsx'
import { useRatioNumber } from '../hooks/useRatioNumber'
import '../assets/ratio.css'

import type { FC } from 'react'

interface RatioProps {
  value: number
  estValue: number
  isEstVisible: boolean
}

export const Ratio: FC<RatioProps> = ({ value, estValue, isEstVisible }) => {
  const currentValue = useRatioNumber(value)
  const currentEstValue = useRatioNumber(estValue)
  const isUpdating = useMemo(() => (currentValue !== value), [currentValue, value])
  const isEstUpdating = useMemo(() => (currentEstValue !== estValue), [currentEstValue, estValue])
  return (
    <div className="ratio">
      <div
        role="status"
        className="visually-hidden"
        aria-live="polite"
      >
        {`${value} percent on site.`}
        {isEstVisible && `Estimated ${estValue} percent on site.`}
      </div>
      <div className={clsx(
        'ratio__label',
        'ratio__label--normal',
        isUpdating && 'ratio__label--updating'
      )}>
        <span className="ratio__number" aria-hidden="true" data-testid="counter">{currentValue}</span>
        <span aria-hidden="true">%</span>
      </div>
      <div className={clsx(
        'ratio__label',
        'ratio__label--est',
        isEstUpdating && 'ratio__label--updating',
        !isEstVisible && 'ratio__label--hidden'
      )}>
        <abbr title="Estimate">EST</abbr>
        <span className="ratio__number" aria-hidden="true" data-testid="est-counter">{currentEstValue}</span>
        <span aria-hidden="true">%</span>
      </div>
    </div>
  )
}
 