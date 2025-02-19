import { FaBuilding, FaHouse } from 'react-icons/fa6'

import type { FC, ReactNode } from 'react'
import type { DateRecordStatus } from 'features/records'

interface StatusIconProps {
  status: DateRecordStatus
}

export const StatusIcon: FC<StatusIconProps> = ({ status }) => {
  const icons: Record<DateRecordStatus, ReactNode> = {
    none: <span />,
    remote: <FaHouse aria-hidden={true} />,
    onsite: <FaBuilding aria-hidden={true} />,
    'p-remote': <FaHouse aria-hidden={true} />,
    'p-onsite': <FaBuilding aria-hidden={true} />
  }

  return icons[status]
}
