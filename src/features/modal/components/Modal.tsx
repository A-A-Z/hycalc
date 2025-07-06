import { useId } from 'react'
import { ModalProvider } from '../context/ModalProvider'
import '../assets/modal.css'

import type { FC } from 'react'
import type { ModalProps } from '../types'

export const Modal: FC<ModalProps> = ({
  ref,
  id,
  title,
  children,
  onClose
}) => {
  const defaultId = useId()
  const modalId = id ?? defaultId
  const titleId = modalId + '-title'

  return (
    <dialog
      ref={ref}
      id={modalId}
      className="modal"
      aria-labelledby={titleId}
      aria-modal={true}
    >
      <ModalProvider onClose={onClose}>
        <div className="modal__wrapper">
          <h2 id={titleId} className="modal__title">{title}</h2>
          <div className="modal__body">{children}</div>
        </div>
      </ModalProvider>
    </dialog>
  )
}
