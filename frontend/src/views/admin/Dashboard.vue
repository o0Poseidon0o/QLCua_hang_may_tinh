<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Tổng quan</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <el-card shadow="hover" class="border-t-4 border-t-blue-500">
        <template #header>
          <div class="card-header font-semibold text-gray-700">Tổng sản phẩm</div>
        </template>
        <div class="text-3xl font-bold text-blue-600">124</div>
      </el-card>
      <el-card shadow="hover" class="border-t-4 border-t-green-500">
        <template #header>
          <div class="card-header font-semibold text-gray-700">Tồn kho khả dụng</div>
        </template>
        <div class="text-3xl font-bold text-green-600">1,024</div>
      </el-card>
      <el-card shadow="hover" class="border-t-4 border-t-purple-500">
        <template #header>
          <div class="card-header font-semibold text-gray-700">Đơn hàng chờ xử lý</div>
        </template>
        <div class="text-3xl font-bold text-purple-600">12</div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
