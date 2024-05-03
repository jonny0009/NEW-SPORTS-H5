const routers = [
  {
    path: '/98',
    name: 'start98',
    meta: {
      showHead: true
    },
    component: () => import('@/views/start')
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      showHead: true
    },
    component: () => import('@/views/home')
  }
]
export default routers
