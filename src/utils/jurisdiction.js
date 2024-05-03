import store from '@/store'
export const jurisdiction = authCode => {
  const jurisdictionMap = store.state.app.accassList || []
  return jurisdictionMap.some(item => {
    const { code, childList, enable } = item
    return (
      (enable * 1 === 1 && code === authCode) ||
      (childList &&
        childList.some(childItem => {
          return childItem.code === authCode && childItem.enable * 1 === 1
        }))
    )
  })
}
