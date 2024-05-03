import { points } from '@/utils'
export default (number, bit = 2) => {
  if (!(number * 1) || isNaN(number * 1)) {
    return number
  }
  return points(number, bit)
}
