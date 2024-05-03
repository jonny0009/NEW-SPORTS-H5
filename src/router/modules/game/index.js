const routers = [
  {
    path: '/game',
    name: 'Game',
    meta: {
      showHead: false
    },
    component: () => import('@/views/game')
  },
  {
    path: '/7luckyGame',
    name: '7luckyGame',
    meta: {
      showHead: false
    },
    component: () => import('@/views/home/7luckyGame.vue')
  },
  {
    path: '/businessCooperation',
    name: 'BusinessCooperation',
    meta: {
      showHead: false
    },
    component: () => import('@/views/BusinessCooperation/index.vue')
  }
]
export default routers
