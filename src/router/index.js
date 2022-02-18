import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Collection from '../views/Collection.vue'
//import PrismicTest from '../views/PrismicTest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/collections/:id',
    name: 'Collection',
    component: Collection
  },
  // {
  //   path: '/prismic-test',
  //   name: 'Prismic Test',
  //   component: PrismicTest
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
