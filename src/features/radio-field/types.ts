export type OptionValue = string | number

export interface Option<T extends OptionValue> {
  id: string
  label: string
  value: T
}

export interface RadioFieldProps<T extends OptionValue> {
  label: string
  name: string
  options: Array<Option<T>>
  value: T | null
  updateValue: (value: T) => void
}

export interface RadioInputProps<T extends OptionValue> extends Option<T> {
  name: string
  isSelected: boolean
  updateValue: (value: T) => void
}
