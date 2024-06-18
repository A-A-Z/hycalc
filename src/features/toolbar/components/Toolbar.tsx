import { ToolCustom } from './ToolCustom'
import '../assets/toolbar.css'

// Ref: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/

interface ToolbarProps {
  gridId: string
}

export const Toolbar = ({ gridId }: ToolbarProps): JSX.Element => {
  return (
    <ul
      role="toolbar"
      className="toolbar"
      aria-label="Calendar Toolbar"
      aria-controls={gridId}
    >
      <li className="toolbar__tool">
        <ToolCustom index={0} />
      </li>
    </ul>
  )
}
