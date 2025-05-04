import { RadioInput } from './RadioInput'

import type { RadioFieldProps, OptionValue } from '../types'

export const RadioField= <T extends OptionValue>({ label, name, options, value, updateValue }: RadioFieldProps<T>)=> (
  <fieldset>
    <legend>{label}</legend>
    <ul>
      {options.map((option) => 
        <RadioInput
          key={option.id}
          name={name}
          isSelected={(value === option.value)}
          updateValue={updateValue}
          {...option}
        />
      )}
    </ul>
  </fieldset>
)
