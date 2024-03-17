import { Header } from './Header'
import '../assets/page.css'

interface PageProps {
  children: React.ReactNode
}

export const Page = ({ children }: PageProps): JSX.Element => {
  return (
    <div className="page">
      <Header />
      <main className="page__body">{children}</main>
    </div>
  )
}

