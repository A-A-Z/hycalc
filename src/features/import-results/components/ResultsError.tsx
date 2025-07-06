import { use } from 'react'

import { ModalContext } from 'features/modal'
import { Button } from 'features/button'
import { ActionList } from 'features/action-list'

import type { FC } from 'react'

export const ResultsError: FC = () => {
  const { onClose } = use(ModalContext)
  // const onCancel = useCallback(() => {
  //   if (onClose !== undefined) onClose()
  // }, [onClose])
  return (
    <div className="sections">
      <section>
        <p><strong>There was an error with the selected file.</strong></p>
        <p>The either contained not valid entries or the file was incorrectly formatted.</p>
      </section>

      <section>
        <ActionList actions={[
          {
            id: 'close',
            content: <Button
              type="button"
              size="large"
              highlight="remote"
              onClick={onClose}
            >Close</Button>
          }
        ]} />
      </section>
    </div>
  )
}
