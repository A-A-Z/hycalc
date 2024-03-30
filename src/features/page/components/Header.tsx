import '../assets/logo.css'
import '../assets/header.css'

export const Header = (): JSX.Element => {
  return (
    <header className="header">
      <img src="./hycalc-logo.svg" />
      <h1 className="header__title logo">
        <span>Hy</span><span>Calc</span>
      </h1>
      <p>Hybrid workplace calculator</p>
    </header>
  )
}
