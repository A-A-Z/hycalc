import { Button } from 'features/button'
import { ActionList } from 'features/action-list'
import { MERGE_OPTION_LABELS } from '../constants'

import type { FC } from 'react'
import type { MergeConfirmProps } from '../types'

export const MergeConfirm: FC<MergeConfirmProps> = ({
  selectedMergeOption,
  onConfirm,
  onBack
}) => (
  <section className="import-results import-results--confirm">
    <p><strong>{MERGE_OPTION_LABELS[selectedMergeOption]}</strong></p>
    <p>Are you sure? This action can not be undone.</p>
    <ActionList align="center" actions={[
      {
        id: 'yes',
        content: <Button
          type="button"
          size="large"
          highlight="onsite"
          onClick={onConfirm}
        >Yes</Button>
      },
      {
        id: 'no',
        content: <Button
          type="button"
          size="large"
          highlight="remote"
          onClick={onBack}
        >No</Button>
      }
    ]} />
  </section>
)
