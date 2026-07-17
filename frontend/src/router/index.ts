import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/PublicLayout.vue'),
      children: [
        { path: '', name: 'Home', component: () => import('../views/public/Home.vue') },
        { path: 'shop', name: 'Shop', component: () => import('../views/public/Shop.vue') },
        { path: 'about', name: 'About', component: () => import('../views/public/About.vue') },
        { path: 'services/repair', name: 'RepairService', component: () => import('../views/public/RepairService.vue') },
        { path: 'services/it-outsourcing', name: 'ITService', component: () => import('../views/public/ITService.vue') },
        { path: 'p/:slug', name: 'DynamicPage', component: () => import('../views/public/DynamicPage.vue') }
      ]
    },
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'AdminDashboard',
          component: () => import('../views/admin/Dashboard.vue')
        },
        {
          path: 'categories',
          name: 'AdminCategories',
          component: () => import('../views/admin/Categories.vue')
        },
        {
          path: 'products',
          name: 'AdminProducts',
          component: () => import('../views/admin/Products.vue')
        },
        {
          path: 'inventory',
          name: 'AdminInventory',
          component: () => import('../views/admin/Inventory.vue')
        },
        {
          path: 'cms',
          name: 'AdminCMS',
          component: () => import('../views/admin/CMS.vue')
        }
      ]
    }
  ]
})

export default router
