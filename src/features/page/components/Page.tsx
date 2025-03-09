import { useMemo, use } from 'react'
import { ConfigContext } from 'features/config'
import { StatusContext } from 'features/status'
import { Tooltip } from 'features/tooltip'
import { Header } from './Header'
import { Footer } from './Footer'
import '../assets/layout.css'
import '../assets/page.css'

import type { FC, CSSProperties } from 'react'

interface PageProps {
  children: React.ReactNode
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
      <Footer />
      <Tooltip />
    </div>
  )
}
