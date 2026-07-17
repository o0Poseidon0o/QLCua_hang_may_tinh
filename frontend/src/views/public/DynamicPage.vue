<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <div v-if="isLoading" class="text-center py-20 text-gray-500">
      <el-icon class="is-loading" :size="32"><Loading /></el-icon>
      <p class="mt-2">Đang tải nội dung...</p>
    </div>
    <div v-else-if="page">
      <!-- Hero Banner -->
      <div 
        class="relative w-full h-80 md:h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden"
      >
        <img 
          v-if="page.coverImage" 
          :src="page.coverImage" 
          alt="Cover" 
          class="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div v-else class="absolute inset-0 w-full h-full bg-gradient-to-r from-green-700 to-emerald-900 opacity-90"></div>
        
        <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            {{ page.title }}
          </h1>
          <p v-if="page.excerpt" class="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto drop-shadow-sm">
            {{ page.excerpt }}
          </p>
        </div>
      </div>

      <!-- Content Area -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <!-- The 'prose' class from Tailwind Typography will make the HTML look good, but we can also add custom styling if we didn't install the typography plugin -->
          <div class="ql-editor !px-0" v-html="page.content"></div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">404 - Không tìm thấy trang</h2>
      <p class="text-gray-500 mb-8">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
      <router-link to="/" class="text-white bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md font-medium transition">
        Về trang chủ
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Loading } from '@element-plus/icons-vue'
import api from '../../services/api'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const route = useRoute()
const page = ref<any>(null)
const isLoading = ref(true)

const loadPage = async () => {
  isLoading.value = true
  const slug = route.params.slug
  try {
    const res = await api.get(`/content/${slug}`)
    if (res.data) {
      page.value = res.data
    } else {
      page.value = null
    }
  } catch (error) {
    page.value = null
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadPage()
})

watch(() => route.params.slug, () => {
  loadPage()
})
</script>
