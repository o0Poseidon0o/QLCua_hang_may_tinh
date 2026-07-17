<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-16 lg:pt-24 px-4 sm:px-6 lg:px-8">
          <main class="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block xl:inline">Giải pháp công nghệ</span>
                <span class="block text-green-600 xl:inline">chuyên nghiệp</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Từ linh kiện máy tính chất lượng cao, dịch vụ sửa chữa nhanh chóng đến các giải pháp IT Outsourcing toàn diện cho doanh nghiệp của bạn.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link to="/shop" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
                    Khám phá sản phẩm
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link to="/services/it-outsourcing" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10">
                    Tư vấn IT
                  </router-link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50 flex items-center justify-center p-12">
        <div class="grid grid-cols-2 gap-4 w-full max-w-lg">
           <div class="bg-green-100 rounded-2xl h-48 sm:h-64 flex items-center justify-center shadow-inner transform translate-y-8">
             <el-icon :size="64" class="text-green-500"><Cpu /></el-icon>
           </div>
           <div class="bg-emerald-100 rounded-2xl h-48 sm:h-64 flex items-center justify-center shadow-inner transform -translate-y-8">
             <el-icon :size="64" class="text-emerald-500"><Monitor /></el-icon>
           </div>
        </div>
      </div>
    </section>

    <!-- Services Overview -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Dịch vụ nổi bật</h2>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Chúng tôi cung cấp các giải pháp tối ưu nhất cho nhu cầu của bạn.
          </p>
        </div>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-gray-100 text-center group">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6 group-hover:scale-110 transition-transform">
              <el-icon :size="32"><Monitor /></el-icon>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Linh kiện & Thiết bị</h3>
            <p class="text-gray-500 mb-6">Cung cấp linh kiện chính hãng, máy bộ cấu hình cao phục vụ công việc và giải trí.</p>
            <router-link to="/shop" class="text-green-600 font-medium hover:text-green-800">Xem cửa hàng &rarr;</router-link>
          </div>

          <!-- Card 2 -->
          <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-gray-100 text-center group">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6 group-hover:scale-110 transition-transform">
              <el-icon :size="32"><Setting /></el-icon>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Sửa chữa chuyên sâu</h3>
            <p class="text-gray-500 mb-6">Dịch vụ bảo trì, sửa chữa phần cứng và phần mềm nhanh chóng, uy tín.</p>
            <router-link to="/services/repair" class="text-green-600 font-medium hover:text-green-800">Tìm hiểu thêm &rarr;</router-link>
          </div>

          <!-- Card 3 -->
          <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-gray-100 text-center group">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
              <el-icon :size="32"><Connection /></el-icon>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">IT Outsourcing</h3>
            <p class="text-gray-500 mb-6">Giải pháp quản trị hệ thống mạng, máy chủ trọn gói cho doanh nghiệp.</p>
            <router-link to="/services/it-outsourcing" class="text-green-600 font-medium hover:text-green-800">Chi tiết dịch vụ &rarr;</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Cpu, Monitor, Setting, Connection } from '@element-plus/icons-vue'
</script>
