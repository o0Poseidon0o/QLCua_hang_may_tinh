<template>
  <div class="bg-slate-900 text-white min-h-[calc(100vh-80px)]">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        <div class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
          <h1 class="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            <span class="block">Giải pháp toàn diện</span>
            <span class="block text-blue-400">IT Outsourcing</span>
          </h1>
          <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
            Tối ưu hóa chi phí vận hành, nâng cao hiệu suất làm việc với dịch vụ IT thuê ngoài chuyên nghiệp dành cho doanh nghiệp. Chúng tôi đóng vai trò như một phòng IT thực thụ của bạn.
          </p>
          <div class="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
            <el-button type="primary" size="large" class="bg-blue-600 hover:bg-blue-700 border-none">Nhận tư vấn & Báo giá</el-button>
          </div>
        </div>
        <div class="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
          <div class="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md bg-slate-800 p-8 border border-slate-700">
            <h3 class="text-2xl font-bold mb-6">Các gói dịch vụ</h3>
            <ul class="space-y-6">
              <li class="flex items-start">
                <div class="flex-shrink-0">
                  <el-icon class="h-6 w-6 text-blue-400"><Monitor /></el-icon>
                </div>
                <p class="ml-3 text-base text-gray-300">Bảo trì hệ thống máy tính văn phòng định kỳ.</p>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0">
                  <el-icon class="h-6 w-6 text-blue-400"><Connection /></el-icon>
                </div>
                <p class="ml-3 text-base text-gray-300">Quản trị hệ thống mạng, Server, cấu hình Router/Switch.</p>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0">
                  <el-icon class="h-6 w-6 text-blue-400"><DataLine /></el-icon>
                </div>
                <p class="ml-3 text-base text-gray-300">Sao lưu an toàn dữ liệu, chống thất thoát và mã độc (Ransomware).</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Monitor, Connection, DataLine } from '@element-plus/icons-vue'
</script>
