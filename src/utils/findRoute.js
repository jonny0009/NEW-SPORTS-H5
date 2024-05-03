// 根据name查找对应的路由信息
export const findRoute = (routes, name) => {
  const deepRouters = getDeepRouters(routes)
  const routeItem = deepRouters.find(item => item.name === name)
  return routeItem
}

// 获取路由
const getDeepRouters = routes => {
  let deepRouters = []
  Array.isArray(routes) &&
    routes.forEach(r => {
      if (Array.isArray(r.children)) {
        deepRouters = deepRouters.concat(getDeepRouters(r.children))
      } else {
        deepRouters.push(r)
      }
    })
  return deepRouters
}
