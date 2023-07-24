import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/monsters',
      name: 'monsters',
      component: () => import('../views/MonsterArenaView.vue')
    },
    {
      path: '/quests',
      name: 'quests',
      component: () => import('../views/QuestBoardView.vue')
    },
  ]
})

export default router
