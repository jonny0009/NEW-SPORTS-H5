const routers = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      showHead: false
    },
    component: () => import('@/views/login')
  }
]
export default routers
