import type { RadioInputProps, OptionValue } from '../types'
import '../assets/radio.css'

export const RadioInput = <T extends OptionValue>({ id, label, name, value, isSelected, updateValue }: RadioInputProps<T>) => (
  <li className="radio" tabIndex={0}>
    <input
      id={id}
      className="visually-hidden"
      type="radio"
      name={name}
      value={value}
      checked={isSelected}
      onChange={(event) => {
        console.log(event)
        updateValue(value)
      }}
      tabIndex={0}
    />
    <label htmlFor={id} className="radio__label">
      <span className="radio__check" />
      {label}
    </label>
  </li>
)
