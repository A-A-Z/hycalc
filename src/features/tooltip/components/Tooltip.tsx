import { Button } from 'features/button'
import '../assets/tooltip.css'

import type { FC } from 'react'

export const Tooltip: FC = () => {
  return (
    <div role="dialog" className="tooltip">
      <h3>Tip of the day</h3>
      <p>Here is a tip of the day</p>
      <div className="tooltip__footer">
        <div>
          <button>Go away forever</button>
        </div>
        <div>
          <Button variant="light">Got it</Button>
        </div>
      </div>
    </div>
  )
}
