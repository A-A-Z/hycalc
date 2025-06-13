import type { RadioInputProps, OptionValue } from '../types'
import '../assets/radio.css'

export const RadioInput = <T extends OptionValue>({ id, label, name, value, isSelected, updateValue }: RadioInputProps<T>) => (
  <li role="radio" className="radio" tabIndex={0}>
    <input
      id={id}
      className="visually-hidden"
      type="radio"
      name={name}
      value={value}
      checked={isSelected}
      onChange={() => { updateValue(value) }}
      tabIndex={-1}
    />
    <label htmlFor={id} className="radio__label">
      <span className="radio__check" role="presentation" />
      {label}
    </label>
  </li>
)
