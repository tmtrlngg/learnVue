import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '../views/product/product-index.vue'
import ProductDetail from '../views/product/product-detail.vue'
import Cart from '../views/cart/cart-index.vue'
import Notfound from '../views/errors/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'product',
    component: Product
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetail
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '*',
    component: Notfound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
