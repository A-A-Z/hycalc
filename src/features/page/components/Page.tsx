import '../assets/page.css'

interface PageProps {
  children: React.ReactNode
}

export const Page = ({ children }: PageProps): JSX.Element => {
  return (
    <div className="page">
      <header className="page__header">
        <h1>HyCalc</h1>
      </header>
      <main className="page__body">{children}</main>
    </div>
  )
}

