import type { RadioInputProps, OptionValue } from '../types'

export const RadioInput = <T extends OptionValue>({ id, label, name, value, isSelected, updateValue }: RadioInputProps<T>) => (
  <li>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type="radio"
      name={name}
      value={value}
      checked={isSelected}
      onClick={(event) => {
        console.log('click!', event)
        // updateValue(value)
      }}
      onChange={(event) => {
        console.log(event)
        updateValue(value)
      }}
    />
  </li>
)
