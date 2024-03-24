const colour1 = '#b556ff'
const colour2 = '#00d2d0'

export const log = (msg: string[]) => {
  const mainString = msg.map(string => `%c${string}`).join(' ')
  console.log(`💾  ${mainString}`, `color: ${colour1};background-color: #000;font-size: 14px;`, `color: ${colour2};background-color: #000;font-size: 14px;`)
}
