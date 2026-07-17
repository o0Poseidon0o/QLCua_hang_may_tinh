<template>
  <el-container class="min-h-screen">
    <!-- Sidebar -->
    <el-aside width="250px" class="bg-gray-800 text-white flex flex-col">
      <div class="p-4 flex items-center justify-center border-b border-gray-700 bg-white">
        <img src="../assets/logo/logo.gif" alt="Company Logo" class="max-h-16" />
      </div>
      <el-menu
        active-text-color="#16a34a"
        background-color="#1f2937"
        text-color="#fff"
        class="border-none flex-1"
        :default-active="$route.path"
        router
      >
        <el-menu-item index="/admin">
          <el-icon><DataBoard /></el-icon>
          <span>Tổng quan</span>
        </el-menu-item>
        <el-menu-item index="/admin/categories">
          <el-icon><Collection /></el-icon>
          <span>Danh mục</span>
        </el-menu-item>
        <el-menu-item index="/admin/products">
          <el-icon><Goods /></el-icon>
          <span>Sản phẩm</span>
        </el-menu-item>
        <el-menu-item index="/admin/inventory">
          <el-icon><Box /></el-icon>
          <span>Kho hàng</span>
        </el-menu-item>
        <el-menu-item index="/admin/cms">
          <el-icon><Document /></el-icon>
          <span>Nội dung (CMS)</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- Main Content -->
    <el-container>
      <el-header class="bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800">Quản trị Hệ thống (ERP)</h2>
        <div class="flex items-center gap-4">
          <el-dropdown>
            <span class="flex items-center cursor-pointer text-gray-600 hover:text-green-600 transition">
              <el-avatar size="small" class="mr-2 bg-green-500">A</el-avatar>
              Quản trị viên
              <el-icon class="ml-1"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Hồ sơ cá nhân</el-dropdown-item>
                <el-dropdown-item divided>Đăng xuất</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="bg-gray-50 p-6">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { DataBoard, Goods, Box, Document, ArrowDown, Collection } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-menu-item {
  font-weight: 500;
}
</style>
