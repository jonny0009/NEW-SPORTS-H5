import { imgUrl } from '@/config'
export default url => {
  if (url && !url.includes('http')) {
    return imgUrl + url.replace(/(^\s*)|(\s*$)/g, '')
  }
  return url
}
