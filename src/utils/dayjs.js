import dayJs from 'dayjs'

const dayjs = val => {
  if (!val) {
    return dayJs()
  }
  if (typeof val === 'number') {
    return dayJs(val)
  }
  return dayJs(val.replace(/[-.]/g, '/'))
}

export default dayjs
