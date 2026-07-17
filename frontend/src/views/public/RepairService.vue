<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 text-center">
      <h2 class="text-base font-semibold text-blue-600 tracking-wide uppercase">Dịch vụ</h2>
      <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Sửa chữa máy tính chuyên nghiệp</p>
      <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">Khắc phục mọi sự cố phần cứng, phần mềm nhanh chóng, uy tín, bảo hành dài hạn.</p>
    </div>
    
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <div class="prose prose-blue prose-lg text-gray-500">
          <p>Tại NetSoft, chúng tôi hiểu rằng máy tính là công cụ không thể thiếu trong công việc và cuộc sống của bạn. Đội ngũ kỹ thuật viên giàu kinh nghiệm của chúng tôi sẵn sàng giải quyết mọi vấn đề từ cơ bản đến phức tạp nhất.</p>
          <ul class="space-y-4 mt-8">
            <li class="flex items-start">
              <el-icon class="text-green-500 mt-1 mr-3"><Check /></el-icon>
              <span>Chuẩn đoán và báo giá minh bạch trước khi sửa.</span>
            </li>
            <li class="flex items-start">
              <el-icon class="text-green-500 mt-1 mr-3"><Check /></el-icon>
              <span>Thay thế linh kiện chính hãng 100%.</span>
            </li>
            <li class="flex items-start">
              <el-icon class="text-green-500 mt-1 mr-3"><Check /></el-icon>
              <span>Sửa chữa lấy liền đối với các lỗi nhẹ.</span>
            </li>
            <li class="flex items-start">
              <el-icon class="text-green-500 mt-1 mr-3"><Check /></el-icon>
              <span>Bảo mật dữ liệu tuyệt đối cho khách hàng.</span>
            </li>
          </ul>
        </div>
        <div class="mt-10">
          <el-button type="primary" size="large" class="shadow-lg">Đặt lịch sửa chữa ngay</el-button>
          <el-button size="large" class="ml-4">Xem bảng giá tham khảo</el-button>
        </div>
      </div>
      <div class="bg-gray-100 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden shadow-inner">
        <el-icon :size="120" class="text-gray-300"><Setting /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, Setting } from '@element-plus/icons-vue'
</script>
