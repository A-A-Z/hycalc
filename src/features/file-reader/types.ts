import type { ChangeEventHandler } from 'react'

export interface UseFileReaderProps {
  onFileLoad: (data: string) => void
}

export interface UseFileReaderReturn {
  isLoading: boolean
  isError: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}
