import { RadioInput } from './RadioInput'
import '../assets/radio-field.css'

import type { RadioFieldProps, OptionValue } from '../types'

export const RadioField= <T extends OptionValue>({ label, name, options, value, updateValue }: RadioFieldProps<T>)=> (
  <fieldset className="radio-field">
    <legend className="radio-field__title sections__title">{label}</legend>
    <ul className="radio-field__list">
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
