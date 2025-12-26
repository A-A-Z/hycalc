import { useMemo, use } from 'react'
import { ConfigContext } from 'features/config'
import { StatusContext } from 'features/status'
import { Header } from './Header'
import '../assets/layout.css'
import '../assets/page.css'

import type { FC, CSSProperties, ReactNode } from 'react'

interface PageProps {
  children: ReactNode
}

export const Page: FC<PageProps> = ({ children }) => {
  const { isCustomMode } = use(StatusContext)
  const { config: { weekdays } } = use(ConfigContext)
  const columnCount = isCustomMode ? 7 : weekdays.length
  const inlineStyle = useMemo(() => ({
    '--column-count': columnCount
  } as CSSProperties), [columnCount])

  return (
    <div className="page" style={inlineStyle}>
      <Header />
      <main className="page__body">{children}</main>
    </div>
  )
}

