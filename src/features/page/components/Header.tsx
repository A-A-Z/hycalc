import '../assets/logo.css'
import '../assets/header.css'

import type { FC } from 'react'

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__left">
        <img src="./hycalc-logo.svg" alt="HyCalc logo" />
        {/* <h1 className="header__title logo">
          <span>Hy</span><span>Calc</span>
        </h1> */}
        <h1>Hybrid Workplace<br />Calculator</h1>
      </div>
      <div className="header__right">
        <p><abbr title="Version number">V</abbr>{APP_VERSION}</p>
        <a
          href="https://github.com/A-A-Z/hycalc"
          target="_blank"
          rel="noopener"
          aria-label="HyCalc on GitHub"
        >
          <img src="./github-mark-white.svg" />
        </a>
      </div>
    </header>
  )
}
