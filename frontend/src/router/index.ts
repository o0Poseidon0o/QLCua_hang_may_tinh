import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore, type PermissionKey } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/PublicLayout.vue'),
      children: [
        { path: '', name: 'Home', component: () => import('../views/public/Home.vue') },
        { path: 'shop', name: 'Shop', component: () => import('../views/public/Shop.vue') },
        { path: 'product/:id', name: 'ProductDetail', component: () => import('../views/public/ProductDetail.vue') },
        { path: 'pc-builder', name: 'PcBuilder', component: () => import('../views/public/PcBuilder.vue') },
        { path: 'cart', name: 'Cart', component: () => import('../views/public/Cart.vue') },
        { path: 'checkout', name: 'Checkout', component: () => import('../views/public/Checkout.vue') },
        { path: 'about', name: 'About', component: () => import('../views/public/About.vue') },
        { path: 'services/repair', name: 'RepairService', component: () => import('../views/public/RepairService.vue') },
        { path: 'services/it-outsourcing', name: 'ITService', component: () => import('../views/public/ITService.vue') },
        { path: 'tin-tuc', name: 'Blog', component: () => import('../views/public/Blog.vue') },
        { path: 'tin-tuc/:slug', name: 'BlogDetail', component: () => import('../views/public/BlogDetail.vue') },
        { path: 'p/:slug', name: 'DynamicPage', component: () => import('../views/public/DynamicPage.vue') }
      ]
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('../views/admin/Login.vue')
    },
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'AdminDashboard',
          meta: { requiresAuth: true, permission: 'dashboard' as PermissionKey },
          component: () => import('../views/admin/Dashboard.vue')
        },
        {
          path: 'orders',
          name: 'AdminOrders',
          meta: { requiresAuth: true, permission: 'orders' as PermissionKey },
          component: () => import('../views/admin/Orders.vue')
        },
        {
          path: 'categories',
          name: 'AdminCategories',
          meta: { requiresAuth: true, permission: 'categories' as PermissionKey },
          component: () => import('../views/admin/Categories.vue')
        },
        {
          path: 'products',
          name: 'AdminProducts',
          meta: { requiresAuth: true, permission: 'products' as PermissionKey },
          component: () => import('../views/admin/Products.vue')
        },
        {
          path: 'inventory',
          name: 'AdminInventory',
          meta: { requiresAuth: true, permission: 'inventory' as PermissionKey },
          component: () => import('../views/admin/Inventory.vue')
        },
        {
          path: 'services',
          name: 'AdminServices',
          meta: { requiresAuth: true, permission: 'services' as PermissionKey },
          component: () => import('../views/admin/Services.vue')
        },
        {
          path: 'banners',
          name: 'AdminBanners',
          meta: { requiresAuth: true, permission: 'banners' as PermissionKey },
          component: () => import('../views/admin/BannerAdmin.vue')
        },
        {
          path: 'it-outsourcing',
          name: 'AdminITOutsourcing',
          meta: { requiresAuth: true, permission: 'it_outsourcing' as PermissionKey },
          component: () => import('../views/admin/ITOutsourcingAdmin.vue')
        },
        {
          path: 'news',
          name: 'AdminNews',
          meta: { requiresAuth: true, permission: 'news' as PermissionKey },
          component: () => import('../views/admin/NewsAdmin.vue')
        },
        {
          path: 'about',
          name: 'AdminAbout',
          meta: { requiresAuth: true, permission: 'about' as PermissionKey },
          component: () => import('../views/admin/AboutAdmin.vue')
        },
        {
          path: 'cms',
          name: 'AdminCMS',
          meta: { requiresAuth: true, permission: 'cms' as PermissionKey },
          component: () => import('../views/admin/CMS.vue')
        },
        {
          path: 'users',
          name: 'AdminUsers',
          meta: { requiresAuth: true, permission: 'users' as PermissionKey },
          component: () => import('../views/admin/Users.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.name === 'AdminLogin' && authStore.isAuthenticated) {
    return { path: '/admin' }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      return {
        path: '/admin/login',
        query: { redirect: to.fullPath }
      }
    }

    const requiredPerm = to.meta.permission as PermissionKey | undefined
    if (requiredPerm && !authStore.hasPermission(requiredPerm)) {
      ElMessage.warning('Tài khoản của bạn không có quyền truy cập vào danh mục này!')
      return { path: '/admin' }
    }
  }

  return true
})

export default router
