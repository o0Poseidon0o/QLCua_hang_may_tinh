<template>
  <div class="min-h-screen flex flex-col bg-slate-50 font-sans">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group">
          <img src="../assets/logo/logo.gif" alt="Logo" class="h-12 w-auto transition-transform group-hover:scale-105" />
          <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
            NetSoft
          </span>
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex gap-8">
          <router-link to="/" class="text-gray-600 hover:text-green-600 font-medium transition-colors" active-class="text-green-600">
            Trang chủ
          </router-link>
          <router-link to="/shop" class="text-gray-600 hover:text-green-600 font-medium transition-colors" active-class="text-green-600">
            Cửa hàng
          </router-link>
          
          <el-dropdown trigger="hover">
            <span class="text-gray-600 hover:text-green-600 font-medium transition-colors cursor-pointer outline-none flex items-center">
              Dịch vụ <el-icon class="ml-1"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link to="/services/repair" class="w-full h-full block">Sửa chữa máy tính</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/services/it-outsourcing" class="w-full h-full block">IT Outsourcing</router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <!-- Dynamic Menu Items -->
          <router-link 
            v-for="item in dynamicMenuItems" 
            :key="item.id" 
            :to="'/p/' + item.slug" 
            class="text-gray-600 hover:text-green-600 font-medium transition-colors" 
            active-class="text-green-600"
          >
            {{ item.title }}
          </router-link>
        </nav>

        <!-- CTA & Mobile Menu Button -->
        <div class="flex items-center gap-4">
          <el-button type="primary" round class="hidden md:inline-flex shadow-md hover:shadow-lg transition-shadow">
            Liên hệ ngay
          </el-button>
          <!-- Placeholder for mobile menu toggle -->
          <button class="md:hidden text-gray-600">
            <el-icon :size="24"><Menu /></el-icon>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <img src="../assets/logo/logo.gif" alt="Logo" class="h-10 opacity-90" />
            <span class="text-xl font-bold text-white">NetSoft</span>
          </div>
          <p class="text-sm text-gray-400">
            Giải pháp công nghệ toàn diện cho doanh nghiệp và cá nhân. Đảm bảo uy tín, chất lượng và tốc độ.
          </p>
        </div>
        
        <div>
          <h4 class="text-white font-semibold mb-4">Dịch vụ</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/services/repair" class="hover:text-white transition">Sửa chữa máy tính</router-link></li>
            <li><router-link to="/services/it-outsourcing" class="hover:text-white transition">IT Outsourcing</router-link></li>
            <li><router-link to="/shop" class="hover:text-white transition">Linh kiện chính hãng</router-link></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-white font-semibold mb-4">Công ty</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/about" class="hover:text-white transition">Về chúng tôi</router-link></li>
            <li><a href="#" class="hover:text-white transition">Tin tức</a></li>
            <li><a href="#" class="hover:text-white transition">Tuyển dụng</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Liên hệ</h4>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start gap-2">
              <el-icon class="mt-0.5"><Location /></el-icon>
              <span>123 Đường Công Nghệ, Quận 1, TP. HCM</span>
            </li>
            <li class="flex items-center gap-2">
              <el-icon><Phone /></el-icon>
              <span>0123.456.789</span>
            </li>
            <li class="flex items-center gap-2">
              <el-icon><Message /></el-icon>
              <span>contact@techcenter.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
        &copy; 2024 NetSoft. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowDown, Menu, Location, Phone, Message } from '@element-plus/icons-vue'
import api from '../services/api'

const dynamicMenuItems = ref<any[]>([])

const fetchMenuPages = async () => {
  try {
    const res = await api.get('/content')
    dynamicMenuItems.value = res.data.filter((page: any) => page.isMenuItem === true)
  } catch (error) {
    console.error('Lỗi khi tải menu động:', error)
  }
}

onMounted(() => {
  fetchMenuPages()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
