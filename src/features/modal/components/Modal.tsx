import type { FC, ReactNode } from 'react'

interface ModalProps {
  id: string
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ id, children }) => {
  return (
    <div
      // ref={popoverRef}
      id={id}
      className="popover"
      popover="auto"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Hello</h2>
      <div>
       {children} 
      </div>
    </div>
  )
}
