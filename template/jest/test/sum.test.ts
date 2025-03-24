// @ts-ignore
import { sum } from '@/sum'

test('sum', async () => {
  await new Promise((resolve):void => {
    resolve(undefined)
  })
  expect(sum(1, 1)).toBe(2)
})
