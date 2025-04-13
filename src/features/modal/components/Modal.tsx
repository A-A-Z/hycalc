import { useId } from 'react'
import '../assets/modal.css'
import type { FC, Ref, ReactNode } from 'react'

interface ModalProps {
  ref?: Ref<HTMLDivElement>
  id?: string
  title: string
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ id, title, children, ref }) => {
  const defaultId = useId()
  const modalId = id ?? defaultId
  const titleId = modalId + '-title'

  return (
    <div
      ref={ref}
      id={modalId}
      className="modal"
      popover="manual"
      role="dialog"
      aria-labelledby={titleId}
      aria-modal={true}
    >
      <h2 id={titleId} className="modal__title">{title}</h2>
      <div className="modal__body">
       {children} 
      </div>
    </div>
  )
}
