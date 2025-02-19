import { createContext } from 'react'
import { StatusesInit } from '../constaints'

import type { StatusContextValues } from '../types'

export const StatusContext = createContext<StatusContextValues>(StatusesInit)
