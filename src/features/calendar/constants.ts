import type {
  DateRecordStatus,
  DateRecordNormalStatus,
  DateRecordPlanStatus
} from 'features/records'

export const statusOptions: DateRecordNormalStatus[] = [
  'none', 'remote', 'onsite'
]

export const statusIndexNormalMap: Record<DateRecordStatus, DateRecordNormalStatus> = {
  none: 'none',
  remote: 'remote',
  onsite: 'onsite',
  'p-onsite': 'none',
  'p-remote': 'none'
}

export const statusIndexNormalForward: Record<DateRecordStatus, DateRecordNormalStatus> = {
  none: 'remote',
  remote: 'onsite',
  onsite: 'none',
  'p-onsite': 'onsite',
  'p-remote': 'remote'
}

export const statusIndexNormalBack: Record<DateRecordStatus, DateRecordNormalStatus> = {
  none: 'onsite',
  remote: 'none',
  onsite: 'remote',
  'p-onsite': 'onsite',
  'p-remote': 'remote'
}

export const statusIndexPlanForward: Record<DateRecordStatus, DateRecordPlanStatus> = {
  none: 'p-remote',
  remote: 'none',
  onsite: 'none',
  'p-remote': 'p-onsite',
  'p-onsite': 'none'
}

export const statusIndexPlanBack: Record<DateRecordStatus, DateRecordPlanStatus> = {
  none: 'p-onsite',
  remote: 'none',
  onsite: 'none',
  'p-remote': 'none',
  'p-onsite': 'p-remote'
}

export const statusIndexPlanMap: Record<DateRecordStatus, DateRecordPlanStatus> = {
  none: 'none',
  remote: 'none',
  onsite: 'none',
  'p-onsite': 'p-onsite',
  'p-remote': 'p-remote'
}

export const statusLabel: Record<DateRecordStatus, string>  = {
  none: 'None',
  onsite: 'On Site',
  remote: 'Remote',
  'p-remote': 'none',
  'p-onsite': 'none'
}
