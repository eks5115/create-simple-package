import {spawn, StdioOptions} from 'child_process'

interface Option {
  cwd?: string,
  stdio?: StdioOptions | undefined
}

let cwd = ''
export const exec = (command: string, option?: Option): Promise<void> => {
  if (option?.cwd) cwd = option.cwd
  return new Promise((resolve, reject) => {
    const commands = command.split(' ')
    let args: string[] = []
    if (commands.length > 1) {
      args = commands.slice(1, commands.length)
    }
    const child = spawn(commands[0], args, {
      cwd,
      stdio: option?.stdio ?? 'inherit'
    })
    child.on('close', (code: number) => {
      if (code > 0) {
        reject()
      }
      resolve()
    })
  })
}
