import { useState, useEffect, useCallback } from 'react'
import type { ChangeEventHandler } from 'react'
import type { UseFileReaderProps, UseFileReaderReturn} from  '../types'

export const useFileReader = ({ onFileLoad }: UseFileReaderProps): UseFileReaderReturn => {
  const [file, setFile] = useState<Blob | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    setFile(event.currentTarget.files![0])
  }, [])

  useEffect(() => {
    if (file == null) return
  
    const reader = new FileReader()
  
    reader.onloadstart = () => {
      setIsLoading(true)
      setIsError(false)
    }
  
    reader.onloadend = () => {
      setIsLoading(false)
    }

    reader.onload = event => {
      if (typeof event.target?.result === 'string') {
        onFileLoad(event.target.result)
        return
      }

      setIsError(true)
    }

    reader.onerror = () => {
      setIsError(true)
    }

    reader.readAsText(file)
  }, [file, onFileLoad])

  return { isLoading, isError, onChange }
}
