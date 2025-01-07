export type HandleKeyDownFn = (key: string, index: number) => void

export interface ToolProps {
  index: number
  handleKeyDown: HandleKeyDownFn
}
