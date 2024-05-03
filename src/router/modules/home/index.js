const routers = [
  {
    path: '/',
    name: 'start',
    meta: {
      showHead: true
    },
    component: () => import('@/views/start')
  }
]
export default routers
