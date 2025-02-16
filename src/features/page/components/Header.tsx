import '../assets/logo.css'
import '../assets/header.css'

import type { FC } from 'react'

export const Header: FC = () => {
  return (
    <header className="header">
      <img src="./hycalc-logo.svg" alt="HyCalc logo" />
      <h1 className="header__title logo">
        <span>Hy</span><span>Calc</span>
      </h1>
      <p>Hybrid workplace calculator</p>
    </header>
  )
}
