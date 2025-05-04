import { useId } from 'react'
import '../assets/modal.css'

import type { FC } from 'react'
import type { ModalProps } from '../types'

export const Modal: FC<ModalProps> = ({ ref, id, title, children, actions = [] }) => {
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
      <h2 id={titleId} className="modal__title">{title}</h2>
      <div className="modal__body">{children}</div>
      {actions.length > 0 && <div className="modal__actions">action here</div>}
    </dialog>
  )
}
