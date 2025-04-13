import { useId } from 'react'
import '../assets/modal.css'
import type { FC, Ref, ReactNode } from 'react'

interface ModalProps {
  ref?: Ref<HTMLDivElement>
  id?: string
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ id, children, ref }) => {
  const defaultId = useId()
  const modalId = id ?? defaultId
  const titleId = modalId + '-title'

  return (
    <div
      ref={ref}
      id={modalId}
      className="popover"
      popover="manual"
      role="dialog"
      aria-labelledby={titleId}
      aria-modal={true}
    >
      <h2 id={titleId}>Hello</h2>
      <div>
       {children} 
      </div>
    </div>
  )
}
