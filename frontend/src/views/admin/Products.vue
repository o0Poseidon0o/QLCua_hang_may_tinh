<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
      <el-button type="success" color="#00733c">Thêm Sản phẩm</el-button>
    </div>
    
    <el-card shadow="never">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="sku" label="Mã SP (SKU)" width="170" />
        <el-table-column prop="name" label="Tên Sản phẩm" />
        <el-table-column prop="categoryName" label="Danh mục" width="180" />
        <el-table-column prop="brand" label="Thương hiệu" width="130" />
        <el-table-column prop="price" label="Giá Bán" width="160">
          <template #default="scope">
            <span class="font-bold text-red-600">{{ formatPrice(scope.row.price) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="180" align="right">
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
import { mockProducts } from '../../data/mockProducts'

const tableData = ref(mockProducts)

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
</script>
