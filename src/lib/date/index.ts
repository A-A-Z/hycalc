import { setDefaultOptions } from 'date-fns/setDefaultOptions'
import { enAU } from 'date-fns/locale'

setDefaultOptions({ locale: enAU, weekStartsOn: 1 })

export * from 'date-fns'
export * from './utils'
export * from './const'
