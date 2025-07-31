import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import CreatePostView from '../views/CreatePostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostView,
      props: true
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePostView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: CreatePostView,
      props: true
    }
  ]
})

export default router