<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
      <el-button type="primary">Thêm Sản phẩm</el-button>
    </div>
    
    <el-card shadow="never">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="sku" label="Mã SP (SKU)" width="150" />
        <el-table-column prop="name" label="Tên Sản phẩm" />
        <el-table-column prop="category" label="Danh mục" width="150" />
        <el-table-column prop="price" label="Giá Bán" width="150">
          <template #default="scope">
            ${{ scope.row.price.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="200" align="right">
          <template #default>
            <el-button size="small">Sửa</el-button>
            <el-button size="small" type="danger">Xóa</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { sku: 'CPU-INTEL-i9', name: 'Intel Core i9-13900K', category: 'CPU', price: 589.99 },
  { sku: 'GPU-NV-4090', name: 'NVIDIA GeForce RTX 4090', category: 'VGA', price: 1599.99 },
  { sku: 'RAM-COR-32', name: 'Corsair Vengeance 32GB DDR5', category: 'RAM', price: 149.99 },
])
</script>
