
export type DateRecordType = 'remote' | 'onsite'

export type DateRecordStatus = DateRecordType | 'none'

export type DateRecords = Record<number, DateRecordType>
