<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Cửa hàng Linh kiện</h1>
      <p class="mt-4 text-lg text-gray-500">Tìm kiếm các sản phẩm chính hãng với giá tốt nhất thị trường.</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar Categories -->
      <aside class="w-full lg:w-64 flex-shrink-0">
        <h3 class="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Danh mục Sản phẩm</h3>
        <el-menu
          default-active="all"
          class="border-none bg-transparent"
          active-text-color="#16a34a"
        >
          <el-menu-item index="all">
            <span>Tất cả Sản phẩm</span>
          </el-menu-item>
          <el-sub-menu index="linh-kien">
            <template #title>
              <span>Linh kiện máy tính</span>
            </template>
            <el-menu-item index="cpu">CPU - Bộ vi xử lý</el-menu-item>
            <el-menu-item index="ram">RAM - Bộ nhớ trong</el-menu-item>
            <el-menu-item index="vga">VGA - Card màn hình</el-menu-item>
            <el-menu-item index="psu">Nguồn - PSU</el-menu-item>
            <el-menu-item index="mainboard">Mainboard - Bo mạch chủ</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="laptop">
            <template #title>
              <span>Laptop & Máy tính xách tay</span>
            </template>
            <el-menu-item index="laptop-gaming">Laptop Gaming</el-menu-item>
            <el-menu-item index="laptop-office">Laptop Văn phòng</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="gear">
            <span>Gaming Gear</span>
          </el-menu-item>
        </el-menu>
      </aside>

      <!-- Products Area -->
      <div class="flex-1">
        <!-- Filters & Search -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <el-input v-model="searchQuery" placeholder="Tìm kiếm sản phẩm..." class="w-full md:w-80">
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <div class="flex gap-4 w-full md:w-auto">
            <el-select v-model="sortBy" placeholder="Sắp xếp" class="w-full md:w-48">
              <el-option label="Mới nhất" value="newest" />
              <el-option label="Giá thấp đến cao" value="price-asc" />
              <el-option label="Giá cao đến thấp" value="price-desc" />
            </el-select>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <el-card v-for="product in products" :key="product.id" shadow="hover" class="border-0 ring-1 ring-gray-100 group relative">
            <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-100 flex justify-center items-center h-48 mb-4 group-hover:opacity-75">
              <el-icon :size="64" class="text-gray-300"><Cpu /></el-icon>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px]">
                <a href="#">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  {{ product.name }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">Mã SP: {{ product.sku }}</p>
              <div class="mt-4 flex items-center justify-between">
                <p class="text-lg font-bold text-green-600">${{ product.price.toFixed(2) }}</p>
                <el-button type="success" circle>
                  <el-icon><ShoppingCart /></el-icon>
                </el-button>
              </div>
            </div>
          </el-card>
        </div>

        <!-- Pagination -->
        <div class="mt-12 flex justify-center">
          <el-pagination background layout="prev, pager, next" :total="50" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, ShoppingCart, Cpu } from '@element-plus/icons-vue'

const searchQuery = ref('')
const sortBy = ref('newest')

const products = ref([
  { id: 1, name: 'Intel Core i9-13900K Desktop Processor 24 cores', sku: 'CPU-INTEL-i9', price: 589.99 },
  { id: 2, name: 'NVIDIA GeForce RTX 4090 24GB GDDR6X', sku: 'GPU-NV-4090', price: 1599.99 },
  { id: 3, name: 'Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz', sku: 'RAM-COR-32', price: 149.99 },
  { id: 4, name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe SSD', sku: 'SSD-SAM-2TB', price: 179.99 },
  { id: 5, name: 'ASUS ROG Maximus Z790 Hero Motherboard', sku: 'MB-ASUS-Z790', price: 629.99 },
  { id: 6, name: 'Corsair RM1000x 1000 Watt 80 Plus Gold Power Supply', sku: 'PSU-COR-1000', price: 189.99 },
])
</script>
