import { useId } from 'react'

import type { FC } from 'react'

export const FileButton: FC = () => {
  const inputId = useId()
  return (
    <>
      <label htmlFor={inputId}></label>
      <input id={inputId} type="file" />
    </>
  )
}
