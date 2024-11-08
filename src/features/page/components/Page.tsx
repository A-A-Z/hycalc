import { useMemo } from 'react'
import { useConfig } from 'features/config'
import { useGridStatus } from 'features/status'
import { Header } from './Header'
import { Footer } from './Footer'
import '../assets/layout.css'
import '../assets/page.css'

import type { CSSProperties } from 'react'

interface PageProps {
  children: React.ReactNode
}

export const Page = ({ children }: PageProps): JSX.Element => {
  const { isCustomMode } = useGridStatus()
  const { config: { weekdays } } = useConfig()
  const columnCount = isCustomMode ? 7 : weekdays.length
  const inlineStyle = useMemo(() => ({
    '--column-count': columnCount
  } as CSSProperties), [columnCount])

  return (
    <div className="page" style={inlineStyle}>
      <Header />
        <main className="page__body">{children}</main>
      <Footer />
    </div>
  )
}

