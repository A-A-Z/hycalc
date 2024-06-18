import clsx from 'clsx'
import '../assets/toggle.css'

interface ToggleProps {
  isActive: boolean
}

export const Toggle = ({ isActive }: ToggleProps): JSX.Element => (
  <div className={clsx('toggle', isActive && 'toggle--active')} role="presentation"></div>
)
